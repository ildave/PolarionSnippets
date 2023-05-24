/**
This workflow function create a new branch on a specified Gitlab project.
The script takes 5 arguments:
* gitlabURL -  the url of the GitLab instance
* projectid -  the numeric ID of the GitLab project
* branchfield -  the id of the custom field that contains the name of the branch to be created
* sourcebranchfield -  the id of the custom field that contains the name of the source branch - usually "main" or "master"
* userKey - the key of a User Account Valut entry that must be created to store the GitLab API key -  username can be anything, the password must be the token

The script creates the branch from the master.
A log is written in /opt/polarion/data/logs/main/gitlabbranch.log or in c:\polarion\data\logs\main\gitlabbranch.log

TODO: add some error checking :)
*/

function log(str) {
       out.write(str + "\n");
       out.flush();
}

function getAPIToken(userKey) {
       var vault = com.polarion.platform.internal.security.UserAccountVault.getInstance();
       var cred = vault.getCredentialsForKey(userKey);
       return cred.getPassword(); //cred.getUser()
}

var FileWriter = Java.type('java.io.FileWriter');
var outFile = new FileWriter("./logs/main/gitlabbranch.log", true); 

var BufferedWriter = Java.type('java.io.BufferedWriter')
var out = new BufferedWriter(outFile);

var wi = workflowContext.getTarget();
var gitlabURL = arguments.getAsString("gitlabURL"); //url of gitlab server
var id = arguments.getAsString("projectid"); //id of the gitlab project
var branchfieldname = arguments.getAsString("branchfield"); //id of the custom field that contains the branch name
var branchname = wi.getCustomField(branchfieldname);
var sourcefieldname = arguments.getAsString("sourcebranchfield");
var sourcebranch = wi.getCustomField(sourcefieldname);
var userKey = arguments.getAsString("userKey"); //id of the user account vault key that stores the API token
var token = getAPIToken(userKey);
var urlstring = gitlabURL + "/api/v4/projects/" + id + "/repository/branches?branch=" + branchname + "&ref=" + sourcebranch  
log(urlstring);
var URL = Java.type('java.net.URL');
var url = new URL(urlstring);
var conn = url.openConnection();
conn.setRequestMethod("POST");
conn.setRequestProperty("PRIVATE-TOKEN", token);
var response =  conn.getResponseCode();
log("Response: " + response);

out.close();

