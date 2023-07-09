# Leaderboard Azure API

For serverless Azure functions. Uses Azure Functions runtime v4 of the which requires Node version v18+.

## Local Environment

Use the Azure Functions Core Tools to test and develop locally. https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Cportal%2Cv2%2Cbash&pivots=programming-language-typescript

Remember to change directory to this folder when running commands.

Run the dev:swa script in the main project to debug with the rest of the web project.

## V4 Preview

This project was developed during the v4 Preview. Cleanup after v4 is released:

- local.settings.json - Remove "AzureWebJobsFeatureFlags": "EnableWorkerIndexing", property
