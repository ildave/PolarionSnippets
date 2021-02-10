var JavaPackages = new JavaImporter(
    java.io,  
    java.util,
    java.net,
    com.polarion.platform, 
    com.polarion.platform.core, 
    com.polarion.platform.context, 
    com.polarion.platform.jobs,
    com.polarion.platform.persistence.model,
    com.polarion.platform.internal.security,
    com.polarion.core.util.types.Text
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

    function createItem(ts, destProject, typeOpt) {
        var item = ts.createWorkItem(destProject);
        item.setType(typeOpt);
        var size = Math.floor(Math.random() * (10 - 5 + 1) + 5);
        var title = generateText(size);
        item.setTitle(title);
        var desc = generateText(size * 3);
        var content = new Text(Text.TYPE_PLAIN, desc);
        item.setDescription(content);
        item.save();
        log("Created: " + item.getId());
        return item;
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
    
    var firstType = wi.getCustomField("t");
    var secondType = wi.getCustomField("t2");
    var link = wi.getCustomField("link");

    log("First Destination type: " + firstType);
    log("Second Destination type: " + secondType);
    log("Link: " + link);
    log("Number of item: " + n);

    var firstTypeOpt = destTrackerProject.getWorkItemTypeEnum().wrapOption(firstType);
    var secondTypeOpt = destTrackerProject.getWorkItemTypeEnum().wrapOption(secondType);
    var linkTypeOpt = destTrackerProject.getWorkItemLinkRoleEnum().wrapOption(link);
    for (var i = 0; i < n; i++) {
        var firstItem = createItem(ts, destProject, firstTypeOpt);
        var secondItem = createItem(ts, destProject, secondTypeOpt);
        firstItem.addLinkedItem(secondItem, linkTypeOpt, null, false);
        firstItem.save();
        secondItem.save();
    }


    out.close();
}