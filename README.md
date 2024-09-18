# GitHub Platform Tutorial (GPT)

This repository serves to hold all the training material necessary for the GitHub Platform tutorial. Separate repos should be created for different instances of us teaching or using this material as this should be the private Coveros-only repo that everything stems from. If you have questions just ask the CODEOWNERS.

The actual offering associated with this repository may have a different name. As of updating this it is now called `GitHub Enterprise Foundations`.

### Once you create your version of the repo from the template be sure to update this README with the specifics of your offering. Also make sure to create an initial issue called `Add Your Comment`. This issue needs to ID 1 in the repo.

This repo contains the entire ghas-bootcamp repository to cover the GHAS section of the platform tutorial.

## Actions/Workflows we have created

For the purposes of either the Platform tutorial or things we have found to be common asks from clients, we are storing actions and workflows we have created here

-   enforce-favorite-number: A simple action that takes the Issue event that triggered the workflow and checks to see if the Favorite Number field has an appropriate value (used in ADOE 2023)
-   repo-name-complaince: Will pull all repos for a specific organization and determine if the name matches the pattern passed in. Housed in it's own repo as it is published to the marketplace (will include url once that is done)
-   tell-me-a-joke: Based on the input for the favorite number in the introduction activity, will prompt them with a new issue to tell them jokes.
-   pass-variables-linux: Shows different ways that you can pass job and environment variables between a workflow and an action in a linux environment.
-   pass-variables-windows: Shows different ways that you can pass job and environment variables between a workflow and an action in a windows environment.
-   ghas-alert-collection: Use the Octokit Javascript library to pull all alerts for a specific organization and then upload those alerts as a single JSON file as an artifact on the workflow run.
