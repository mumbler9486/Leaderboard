# DB Mocks

A local DB (Microsoft Azure SQL Server) in docker with some scripts to initialize the database with some useful dummy data.

It uses this docker image from Microsoft to closely emulate that of the Database used on Azure: https://hub.docker.com/_/microsoft-azure-sql-edge

This is not meant for use in production. Only for local testing.

## Accept the EULA

As per Microsoft's SQL image, please accept the EULA to run and use this container. See: https://hub.docker.com/_/microsoft-azure-sql-edge under "Environment Variables". The default for this mock project is '1' (accepted) for convenience.

## Startup Database

A docker compose is provided to startup a postgres DB server (similar DB with extension to the one on Azure). To build and run the containers in detached mode use `docker compose -f db_mocks/docker-compose.yml up -d`. Or more conveniently run the `start-local-db` script in the `package.json`.

It is recommended to use Azure Data Studio which you can get here: [Azure Data Studio Download](https://learn.microsoft.com/en-us/azure-data-studio/download-azure-data-studio)

## Loading Mock Data

To load the mock data into the DB container, run the `reloadDb.js` file with node while the docker is running. It is recommended to run it from the `package.json` using the `reload-db` script. Must run while the DB container is running.

This will **clear the entire database** and rebuild all the tables with the data.

## Managing the DB

After starting the DB docker with the script, configure Azure Data studio as follows:

- `Server=localhost,6969` - Yes with a comma
- `User name=sa`
- `Password=XXXXXXXXXX` - use the same password as the `MSSQL_SA_PASSWORD` in the docker-compose.yml, can save password as well

After clicking on 'Connect' you should get a prompt to trust the server certificate, accept and you should be logged in.
