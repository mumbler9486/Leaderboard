import shell from 'shelljs';
import { checkDockerRunning, copyFilesToDocker, dockerExec } from './utils/docker.js';
import { dockerExecPSql } from './utils/psql.js';

// Config
// shell.config.verbose = true; // Show commands used

const dbContainerName = 'pso2-lebrd-pg-db';
const sourceScriptDir = 'db_mocks/';
const destScriptDir = '/src/';
const workDir = '/src/db_mocks/';
const databaseName = 'pso2_leaderboard_local';
const databaseUser = 'local_dev';

// Check if docker is running
checkDockerRunning();

// Copy script files
shell.echo('');
shell.echo(`Loading script files to container: "${dbContainerName}".`);
copyFilesToDocker(dbContainerName, sourceScriptDir, destScriptDir);

// Drop old tables
shell.echo('');
shell.echo('Cleaning old tables and data');
dockerExec(
	dbContainerName,
	`${workDir}utils`,
	`bash drop_tables.sh ${databaseUser} ${databaseName}`
);

// Initialize tables, must go in a particular order
shell.echo('');
shell.echo('Running script files.');
dockerExecPSql(dbContainerName, workDir, databaseUser, databaseName, `-f scripts/tables.sql`);
dockerExecPSql(dbContainerName, workDir, databaseUser, databaseName, `-f scripts/players.sql`);
dockerExecPSql(dbContainerName, workDir, databaseUser, databaseName, `-f scripts/runs.sql`);

// Done
shell.echo('');
shell.echo('DB Server Reloaded.');
