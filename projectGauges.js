// JavaScript source code

$(document).ready(function(){

var opt = {
	//webUrl: "/yourSiteName/",
	listName: "Projects"
};

//Make call to get list items
$().SPServices({
    operation: "GetListItems",
    // Force sync so that we have the right values for the child column onchange trigger
    async: false,
    //webURL: opt.webUrl,
    listName: opt.listName,
     // Override the default view rowlimit and get all appropriate rows
    CAMLRowLimit: 0,
    completefunc: function(xData, Status) {
		$(xData.responseXML).SPFilterNode("z:row").each(function() {
                projectName = $(this).attr("ows_Project_x0020_Name");
                
                status = $(this).attr("ows_Status");
                
                cleanProjectName = projectName.replace(/ /g,'');
                
                //For each project create a gauge area
                $('#mainContentGauges').append('<div id="' + cleanProjectName + '" class="gauges"></div>');
                
                //Do analysis to see if gauge should be red, yellow, or green
                var statusNumber;
                
                switch (status) {
                	case "Complete":
                		statusNumber = 100;
                		break;
                	case "In Progress":
                		statusNumber = 50;
                		break;
                	case "Not Started":
                		statusNumber = 1;
                		break;
                		
                		}
                		
                var myColors = [
                	"#e74c3c",
                	"#f1c40f",
                	"#27ae60"
                ]
                
                //Activate Gauge
                var g = new JustGage({
				    id: cleanProjectName, 
				    value: statusNumber, 
				    min: 0,
				    max: 100,
				    title: projectName,
				    levelColors: myColors
				  }); 
                
              
            });  //End for each 
            
		
    }
    
    
    
    });


}); //Close doc ready