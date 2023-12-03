# DB Mocks

A local DB (postgres) in docker with some scripts to initialize the database with some useful dummy data.

## Startup Database

A docker compose is provided to startup a postgres DB server (similar DB with extension to the one on Azure). To build and run the containers in detached mode use `docker compose -f db_mocks/docker-compose.yml up -d`. Or more conveniently run the `start-local-db` script in the `package.json`.

The compose also contains a DB management tool PD-Admin to let you run queries against the DB. This tool is optional.

## Loading Mock Data

To load the mock data into the DB container, run the `reloadDb.js` file with node while the docker is running. It is recommended to run it from the `package.json` using the `reload-db` script. Must run while the DB is running.

This will clear the entire database and rebuild all the tables with the data.

## Management

You can manage the database including executing queries and such using pg-admin which is included in the docker compose. Once started and fully loaded, visit [http://localhost:6970] in your browser to use the tool.

It isn't necessary to use pg-admin while using the reload script. You can use your own preferred tools for managing your local DB server.

PG-Admin has been configured in Desktop mode without a master password for developer convenience. Please do not use it to connect to real or production databases as connections made by desktop mode are insecure. If needed, configure a master password with it `PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED`.

### DB Registration

Right click servers and register a new Server.

Set the following:

- General
  - Name - Should be the name of the container. In this case `pso2-lebrd-pg-db`
- Connection
  - Host name/address - `host.docker.internal`
  - Port - The exposed port in the docker compose
  - Maintenance database - The value of `POSTGRES_DB`
  - Username - The value of `POSTGRES_USER`
  - Password - The value of `POSTGRES_PASSWORD`

Click Save and you should see the database.

You can find the Leaderboard DB under:
Servers -> pso2-lebrd-pg-db -> Databases -> pso2_leaderboard_local -> Schemas -> public -> Tables
