const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const { isTypedArray } = require('util/types');

// FTP Downloader Action

// Github Action Inputs
const input_host = core.getInput('ftp-host');
const input_user = core.getInput('ftp-user');
const input_pass = core.getInput('ftp-pass');
const input_path = core.getInput('ftp-path');
const input_port = core.getInput('ftp-port');
// download files from ftp directory
const download = async () => {
	const ftp = require('basic-ftp');
	const client = new ftp.Client();
	client.ftp.verbose = true;
	try {
        await client.access({
            host: input_host,
            user: input_user,
            password: input_pass,
            secure: false,
        })
		console.log(await client.list())
	}
	catch (err) {
		console.log(err)
		core.setFailed(err);
	}
	// Get the JSON webhook payload for the event that triggered the workflow
	const payload = JSON.stringify(github.context.payload, undefined, 2)
	console.log(`The event payload: ${payload}`);
	// download
	downloadToDir("latest/", input_path);
	client.close();
	
}


