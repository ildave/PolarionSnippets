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
        item.setTitle("New item " +  (i + 1));
        item.save();
        log("Created: " + item.getId());
    }


    out.close();
}