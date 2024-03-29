[![Build Status](https://github.com/mumbler9486/Leaderboard/actions/workflows/azure-staticwebapp.yml/badge.svg)](https://github.com/mumbler9486/Leaderboard/actions/workflows/azure-staticwebapp.yml)

# Leaderboard

Unofficial Leaderboard for PSO2:NGS.

# Questions, Suggestions, Issues

Please visit our Discord for any questions, suggestions, or issues regarding the website. [Discord Invite](https://discord.com/invite/fFtEEJHuFp)

**Do not submit Github issues regarding run disputes or run submissions. Please contact us on Discord.**

# Setup Local

This project is developed in VS Code.

1. Open repository in VS Code as a folder.
2. VS code will suggest extensions to install as prescribed by the workspace, install them.
3. Run `npm install` to install the required dependencies on your local machine.
4. Run the `npm run dev:mock` command. This starts the server with the API mock.
5. On VS code, click on the "Run and Debug" icon on the left, select the configuration "Debug Chrome w/Mock" and run it
6. A development chrome instance opens and you should see the Leaderboard.

# Development

Please adhere to the following when developing:

- Use "Format on Save" so we have consistent code throughout the code.

# Environment

To develop locally, first configure a `.env` file in the root of this repository. You may make a copy of `env.local.example` to get started. The values are already pre-configured for a local DB running in docker. See `/db_mocks` for more information on how to get a local DB running.

Please do not commit config values to this repository.

## Discord Webhooks

It is recommended to test with Discord webhooks. Create a private discord server for yourself and in the server settings, create a webhook to dump webhook messages to. Thumbnail can be left blank.
