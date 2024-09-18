import * as core from "@actions/core";
import * as github from "@actions/github";
import { Repository, User } from "@octokit/webhooks-definitions/schema";

interface TrimmedRepository {
    name: string;
    owner: TrimmedUser;
    organization?: string;
    url: string;
    size: number;
    archived: boolean;
}

interface TrimmedUser {
    name?: string;
    email?: string | null;
    type: "Bot" | "User" | "Organization";
    site_admin: boolean;
}

export async function run() {
    try {
        const event = github.context.payload;
        const token = core.getInput("token");
        const orgName = core.getInput("organization");
        const namingConvention = core.getInput("naming-convention");
        const caseSensitive = core.getInput("case-sensitive") === "true";
        const octokit = github.getOctokit(token);
        const allRepos: TrimmedRepository[] = [];
        const startTime = new Date().getTime();

        // Get all repos for the org, repeating the process for each page of results until nothing comes back as that is how the api works
        for (let page = 1; ; page++) {
            const response = await octokit.rest.repos.listForOrg({
                org: orgName,
                // type: "all",
                per_page: 100,
                page,
            });

            if (response.data.length === 0) {
                break;
            }

            const repositories = response.data as Repository[];
            // Maps all of the repos in the list to the TrimmerRepository interface and then pushes them into the allRepos array
            allRepos.push(
                ...repositories.map((x) => {
                    return { name: x.name, owner: { name: x.owner.name, email: x.owner.email, type: x.owner.type, site_admin: x.owner.site_admin }, organization: x.organization, url: x.url, size: x.size, archived: x.archived } as TrimmedRepository;
                })
            );
            core.debug(JSON.stringify(allRepos));

            // If we've been running for more than 10 minutes, stop
            if (new Date().getTime() - startTime > 10 * 60 * 1000) {
                core.setFailed("Timed out");
                return;
            }
        }

        // Loop through all repositories and find the ones that do not match the naming convention
        const nonCompliantRepos = allRepos.filter((repo) => {
            const repoName = repo.name;
            const regex = new RegExp(namingConvention, caseSensitive ? "" : "i");
            return !regex.test(repoName);
        });

        core.debug(`There are ${allRepos.length.toString()} that were found in the organization with the token provided`);
        core.debug(`There are ${nonCompliantRepos.length.toString()} that do not match the naming convention`);
        core.setOutput("repositories", JSON.stringify(nonCompliantRepos));
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
