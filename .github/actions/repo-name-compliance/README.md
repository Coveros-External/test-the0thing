# repo-name-compliance

<!-- about this action -->

| Input               | Description                                                                                                 | Required |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | -------- |
| `token`             | Token used to access the GitHub API. Use the `GITHUB_TOKEN` by default unless other permissions are needed. | yes      |
| `organization`      | The organization that you would like to check                                                               | yes      |
| `naming-convention` | The naming conventions that you require for repos to be compliant. Should be a regex string                 | yes      |
| `case-sensitive`    | Whether or not the name conventions are case sensitive.                                                     | no       |

## What checks does this action conduct?

-   Pulls all repos from the organization that the token can access and verifies if they confrom to the naming convention

## Summary

This action will check all repos in an organization to see if they conform to the naming convention that you specify. If they do not, it will return the list of non compliant repos.

## Future improvements

The action will create an issue on the repo with the naming convention that does not conform. This will allow the user to see the issue and fix it.
