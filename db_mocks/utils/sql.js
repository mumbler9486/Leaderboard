import { dockerExec } from './docker.js';

export const dockerExecAzureSql = (
	dbContainerName,
	workDir,
	databaseUser,
	databasePassword,
	databaseName,
	scriptFile
) => {
	const useDatabase =
		databaseName === null || databaseName === undefined ? '' : `-d ${databaseName}`;
	dockerExec(
		dbContainerName,
		workDir,
		`/opt/mssql-tools/bin/sqlcmd -S localhost -U ${databaseUser} -P ${databasePassword} ${useDatabase} -i ${scriptFile}`
	);
};

export const dockerExecAzureSqlLogin = () => {};
