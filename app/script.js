var leadId;
var entity;
var entityId;
var sub_button = document.getElementById("sumbit_button");

////////////////////////////Page Load////////////////////////////
ZOHO.embeddedApp.on("PageLoad", function (data) {
    console.log(data);
    leadId = data.EntityId;
    entity = data.Entity;
    entityId = data.EntityId;
    fetchRecordInfo();
    status_options();
});

////////////////////////////Fetch Record////////////////////////////
function fetchRecordInfo() {
    console.log("fetch function called");
    document.getElementById("table_body").innerHTML = "";
    const IELTS = ZOHO.CRM.API.searchRecord({
        Entity: "IELTS_Applications",
        Type: "criteria",
        Query: `(Lead:equals:${leadId})`,
        delay:false,
    }).then((response)=> {
        console.log(response);
        console.log(response.data.length);
        if (response.data != undefined) {
            response.data.forEach((element) => {
                var table = document.getElementById("table_body");
                var row = table.insertRow(0);
                var status_cell = row.insertCell(0);
                var score_cell = row.insertCell(1);
                var listening_cell = row.insertCell(2);
                var reading_cell = row.insertCell(3);
                var writing_cell = row.insertCell(4);
                var speaking_cell = row.insertCell(5);
                var view_cell = row.insertCell(6);
                view_cell.style = "min-width :  150px";
                var view_record = document.createElement("a");
                view_record.href = `https://crm.zoho.com/crm/org757739095/tab/CustomModule1/${element.id}/`;
                view_record.className = "btn btn-primary";
                view_record.innerHTML = "View Record";
                view_record.target = "_blank";
                view_cell.appendChild(view_record);
                status_cell.innerHTML = element.Status;
                score_cell.innerHTML = element.Total_Score;
                listening_cell.innerHTML = element.Listening_Score;
                reading_cell.innerHTML = element.Reading_Score;
                writing_cell.innerHTML = element.Writing_Score;
                speaking_cell.innerHTML = element.Speaking_Score;
                status_options();
            });
       }
    });
}

////////////////////////////Submit Button////////////////////////////////////
sub_button.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("cover-spin").style="display:inherit";

    console.log(`Clicked`);
    var new_data = {
        Status: document.getElementById("stat").value,
        IELTS_ID: document.getElementById("id").value,
        Mode_of_Exam: document.getElementById("mode_exam").value,
        Test_Center: document.getElementById("tes_center").value,
        Test_Date: document.getElementById("tes_date").value,
        Training_Center_Name:
            document.getElementById("train_center_name").value,
        Training_Center_Location:
            document.getElementById("train_center_loc").value,
        Training_Started_On: document.getElementById("train_start_date").value,
        Training_Ending_On: document.getElementById("train_end_date").value,
        Planned_Exam_Date: document.getElementById("plan_exam_date").value,
        Expected_Result_Date: document.getElementById("exp_result_date").value,
        IELTS_Board: document.getElementById("board").value,
        Total_Score: document.getElementById("score").value,
        Listening_Score: document.getElementById("lis_score").value,
        Reading_Score: document.getElementById("read_score").value,
        Writing_Score: document.getElementById("writ_score").value,
        Speaking_Score: document.getElementById("speak_score").value,
        Lead: leadId,
    };
    const new_IELTS = ZOHO.CRM.API.insertRecord({
        Entity: "IELTS_Applications",
        APIData: new_data,
        Trigger: ["workflow"],
    }).then(function (data) {
        console.log(data);
        fetchRecordInfo();
        // location.reload();
        document.getElementById("entry").reset();
        document.getElementById("cover-spin").style="display:none";
        document.getElementById("form_div").hidden=true;
        document.getElementById("table").hidden=false;
        document.getElementById("new_entry").hidden=false
    });
});

////////////////////////////Status Options///////////////////////////////
function status_options() {
    var x = document.getElementById("stat");
    if (x.value == "Available") {
        document.getElementById(`div_id`).style = "display:inherit";
        document.getElementById('scores').style = "display:inherit";
        document.getElementById('board').style = "display:inherit";
        document.getElementById('exp_date_div').style = "display:none";
        document.getElementById('plan_div').style = "display:none";
        document.getElementById('training_div').style = "display:inherit";
        document.getElementById('test_div').style = "display:none";
        document.getElementById('mode_div').style = "display:none";
    }else if(x.value == "Waiting for Results"){
        document.getElementById(`div_id`).style = "display:inherit";
        document.getElementById('scores').style = "display:none";
        document.getElementById('board').style = "display:inherit";
        document.getElementById('exp_date_div').style = "display:inherit";
        document.getElementById('plan_div').style = "display:inherit";
        document.getElementById('training_div').style = "display:inherit";
        document.getElementById('test_div').style = "display:none";
        document.getElementById('mode_div').style = "display:inherit";
    }else if(x.value == "Exam Date Booked"){     
        document.getElementById(`div_id`).style = "display:none";   
        document.getElementById('scores').style = "display:none";
        document.getElementById('board').style = "display:inherit";
        document.getElementById('exp_date_div').style = "display:inherit";
        document.getElementById('plan_div').style = "display:inherit";
        document.getElementById('training_div').style = "display:inherit";
        document.getElementById('test_div').style = "display:inherit";
        document.getElementById('mode_div').style = "display:inherit";
    }else if(x.value == "Attended Training yet to take exam date"){
        document.getElementById(`div_id`).style = "display:none";
        document.getElementById('scores').style = "display:none";
        document.getElementById('board').style = "display:inherit";
        document.getElementById('exp_date_div').style = "display:inherit";
        document.getElementById('plan_div').style = "display:inherit";
        document.getElementById('training_div').style = "display:inherit";
        document.getElementById('test_div').style = "display:none";
        document.getElementById('mode_div').style = "display:none"; 
    }else if(x.value =="Attending Training"){
        document.getElementById(`div_id`).style = "display:none";
        document.getElementById('scores').style = "display:none";
        document.getElementById('board').style = "display:inherit";
        document.getElementById('exp_date_div').style = "display:inherit";
        document.getElementById('plan_div').style = "display:inherit";
        document.getElementById('training_div').style = "display:inherit";
        document.getElementById('test_div').style = "display:none";
        document.getElementById('mode_div').style = "display:none";      
    }else if(x.value == "Yet to Decide" || x.value == "Interested in without IELTS options" || x.value == " "){
        document.getElementById(`div_id`).style = "display:none";
        document.getElementById('scores').style = "display:none";
        document.getElementById('board').style = "display:none";
        document.getElementById('exp_date_div').style = "display:none";
        document.getElementById('plan_div').style = "display:none";
        document.getElementById('training_div').style = "display:none";
        document.getElementById('test_div').style = "display:none";
        document.getElementById('mode_div').style = "display:none";
 };
};
var cancel_btn=document.getElementById("cancel");
cancel_btn.addEventListener("click",function cancel_func(e){
    e.preventDefault();
    document.getElementById("form_div").hidden= true;
    document.getElementById("table").hidden = false;
    document.getElementById("new_entry").hidden= false;
    document.getElementById("entry").reset();
    status_options();
    //fetchRecordInfo();    
})

////////////////////////////New Entry////////////////////////////
var new_btn=document.getElementById("new_entry");
new_btn.addEventListener("click",function cancel_func(e){
    e.preventDefault();
    document.getElementById("form_div").hidden= false;
    document.getElementById("table").hidden = true;
    document.getElementById("new_entry").hidden= true;
    // console.log(document.getElementById('planned_date'));   
})

ZOHO.embeddedApp.init();
