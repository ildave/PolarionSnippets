var FileWriter = Java.type('java.io.FileWriter');
var outFile = new FileWriter("./logs/fetchtest.log");
var BufferedWriter = Java.type('java.io.BufferedWriter');
var out = new BufferedWriter(outFile);

var IOException = Java.type('java.io.IOException');
var URI = Java.type('java.net.URI');
var HttpClient = Java.type('java.net.http.HttpClient');
var HttpRequest = Java.type('java.net.http.HttpRequest');
var BodyPublishers = Java.type('java.net.http.HttpRequest.BodyPublishers');
var HttpResponse = Java.type('java.net.http.HttpResponse');

var baseObject = workflowContext.getTarget();
var wi = {};
wi.id = baseObject.getId();
wi.title = baseObject.getTitle();
var jsonContent = JSON.stringify(wi);

out.write(jsonContent); out.newLine(); out.flush();

var client = HttpClient.newHttpClient();

var request = HttpRequest.newBuilder().uri(URI.create("https://httpbin.org/post"))
	.POST(BodyPublishers.ofString(jsonContent))
    .setHeader("accept", "application/json")
    .setHeader("content-type", "application/x-www-form-urlencoded")
    .build();

var response = client.send(request, HttpResponse.BodyHandlers.ofString());

out.write("STATUS CODE"); out.newLine(); out.flush();
out.write(response.statusCode()); out.newLine(); out.flush();
out.write("BODY"); out.newLine(); out.flush();
out.write(response.body()); out.newLine(); out.flush();

out.close();