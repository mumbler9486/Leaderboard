import { dockerExec } from './docker.js';

export const dockerExecPSql = (dbContainerName, workDir, databaseUser, databaseName, command) =>
	dockerExec(dbContainerName, workDir, `psql -U ${databaseUser} -d ${databaseName} ${command}`);
