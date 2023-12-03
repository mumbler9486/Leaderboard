import shell from 'shelljs';

export const checkDockerRunning = () => {
	// Check docker is running
	const dockerStatCheck = shell.exec(`docker stats --no-stream`);
	const dockerError = dockerStatCheck.code !== 0;
	const dockerNotRunning =
		dockerStatCheck.stderr.indexOf(
			'error during connect: this error may indicate that the docker daemon is not running'
		) > -1;

	if (dockerNotRunning) {
		shell.echo('Docker Daemon not running, please start the docker daemon on your machine.');
		shell.exit(-1);
	} else if (dockerError) {
		shell.echo('Docker error, terminating...');
		shell.exit(-1);
	}
};

export const checkContainerRunning = (containerName) => {};

export const copyFilesToDocker = (containerName, sourceDir, destDir) => {
	// Bring script files to containers
	//dockerExec(containerName, '/', `rm -rf ${destDir}`);
	dockerExec(containerName, '/', `mkdir -p ${destDir}`);
	shell.exec(`docker cp ${sourceDir} ${containerName}:${destDir}`);
};

export const dockerExec = (containerName, workDir, command) =>
	shell.exec(`docker exec --workdir ${workDir} ${containerName} ${command}`);
