var JavaPackages = new JavaImporter(
    java.io,  
    java.util,
    java.net,
    java.util.date,
    java.util.calendar,
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

    var outFile = new FileWriter("./logs/main/simulateplanning.log", true); 
    var out = new BufferedWriter(outFile);

    var tr = workflowContext.getTarget();
    log("Testrun: " + tr.getId());

    var cal = Calendar.getInstance();
    cal.setTimeInMillis(0);
    cal.set(2021, 03, 01, 11, 30, 00);
    var planned = cal.getTime(); // get back a Date object

    tr.setCustomField("planned_start", planned);

    out.close();

}