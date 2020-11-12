var JavaPackages = new JavaImporter(
    java.io,  
    java.util,
    java.net,
    com.polarion.platform, 
    com.polarion.platform.core, 
    com.polarion.platform.context, 
    com.polarion.platform.jobs,
    com.polarion.platform.persistence.model,
    com.polarion.platform.internal.security
); 

with( JavaPackages ) {
    function log(str) {
           out.write(str + "\n");
           out.flush();
    }

    function generateText(size) {
        var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");
        var out = "";
        for (var i = 0; i < size; i++) {
            var el = lorem[Math.floor(Math.random() * lorem.length)];
            out += " " + el;
        }
        return out;
    }

    var outFile = new FileWriter("./logs/main/createworkitems.log", true); 
    var out = new BufferedWriter(outFile);

    var wi = workflowContext.getTarget();
    var ts = wi.getTrackerService();
    var ps = ts.getProjectsService();
    var destProjectId = wi.getCustomField("prj");
    log("Destination project: " + destProjectId);
    var destProject = ps.getProject(destProjectId);
    var destTrackerProject = ts.getTrackerProject(destProject);
    var n = parseInt(wi.getCustomField("n"));
    var type = wi.getCustomField("t");
    log("Destination type: " + type);
    log("Number of item: " + n);
    var typeOpt = destTrackerProject.getWorkItemTypeEnum().wrapOption(type);
    for (var i = 0; i < n; i++) {
        var item = ts.createWorkItem(destProject);
        item.setType(typeOpt);
        var size = Math.floor(Math.random() * (10 - 5 + 1) + 5);
        var title = generateText(size);
        item.setTitle(title);
        item.save();
        log("Created: " + item.getId());
    }


    out.close();
}