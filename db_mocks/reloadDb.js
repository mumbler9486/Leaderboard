import shell from 'shelljs';
import { checkDockerRunning, copyFilesToDocker } from './utils/docker.js';
import { dockerExecAzureSql } from './utils/sql.js';

// Config
//shell.config.verbose = true; // Show commands used

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
	shell.echo('Running SQL file: ' + sqlFile);
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
dockerExecAzureSql(
	dbContainerName,
	workDir,
	databaseUser,
	databasePassword,
	undefined,
	'scripts/create_db.sql'
);

// Drop old tables
shell.echo('');
shell.echo('Cleaning old tables and data');
execSqlFile('scripts/drop_tables.sql');

// Initialize tables, must go in a particular order
shell.echo('');
shell.echo('Creating tables.');
execSqlFile('scripts/tables.sql');

shell.echo('Creating users.');
execSqlFile('scripts/players.sql');

shell.echo('Creating runs.');

shell.echo('1. Creating Purple runs.');
execSqlFile('scripts/runs/01_purples.sql');

shell.echo('2. Creating DF Aegis runs.');
execSqlFile('scripts/runs/02_dfaegis.sql');

shell.echo('3. Creating Duel runs.');
execSqlFile('scripts/runs/03_duels.sql');

shell.echo('4. Creating Solus runs.');
execSqlFile('scripts/runs/04_dfsolus.sql');

shell.echo('5. Creating Venogia runs.');
execSqlFile('scripts/runs/05_venogia.sql');

shell.echo('6. Creating Dalion runs.');
execSqlFile('scripts/runs/06_dfdalion.sql');

shell.echo('7. Creating Duel Masq runs.');
execSqlFile('scripts/runs/07_duel_masq.sql');

shell.echo('8. Creating Vael runs.');
execSqlFile('scripts/runs/08_dfvael.sql');

shell.echo('9. Creating Planetfall Strike runs.');
execSqlFile('scripts/runs/09_duel_planetfall_strike.sql');

// Run creation cleanup
shell.echo('Cleaning up run creation.');
execSqlFile('scripts/runs/99_cleanup.sql');

// Done
shell.echo('');
shell.echo('DB Server Reloaded.');
