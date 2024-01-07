import shell from 'shelljs';
import { checkDockerRunning, copyFilesToDocker, dockerExec } from './utils/docker.js';
import { dockerExecAzureSql } from './utils/sql.js';

// Config
shell.config.verbose = true; // Show commands used

const dbContainerName = 'pso2-lebrd-sql-db';
const sourceScriptDir = 'db_mocks/';
const destScriptDir = '/home/';
const workDir = '/home/db_mocks/';
const databaseName = 'pso2_leaderboard_local';
const databaseUser = 'sa';
const databasePassword = 'local_dev_password5#';

// Check if docker is running
checkDockerRunning();

// Copy script files
shell.echo('');
shell.echo(`Loading script files to container: "${dbContainerName}".`);
copyFilesToDocker(dbContainerName, sourceScriptDir, destScriptDir);

// SQL File Executer
const execSqlFile = (sqlFile) => {
	dockerExecAzureSql(
		dbContainerName,
		workDir,
		databaseUser,
		databasePassword,
		databaseName,
		sqlFile
	);
};

// Config database
shell.echo('');
shell.echo('Creating DB if not already');
execSqlFile('scripts/create_db.sql');

// Drop old tables
shell.echo('');
shell.echo('Cleaning old tables and data');
execSqlFile('scripts/drop_tables.sql');

// Initialize tables, must go in a particular order
shell.echo('');
shell.echo('Running script files.');
execSqlFile('scripts/tables.sql');
execSqlFile('scripts/players.sql');
execSqlFile('scripts/runs.sql');

// Done
shell.echo('');
shell.echo('DB Server Reloaded.');
