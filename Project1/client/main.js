import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './dataView.html';
import './dataView.js';
import './query.html';
import './query.js';
import './queryResult.html';
import './queryResult.js';
import './queryPanel.html';
import './queryPanel.js';
import './dashBoard.html';
import './dashboard.js';

Router.route('/', function() {
  this.render('InputTemplate');
});

/*Router.route('/query', function() {
  this.render('QueryTemplate');
});*/

Router.route('/queryResult', function() {
  this.render('QueryResultTemplate');
});

Template.InputTemplate.onCreated(function InputTemplateOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  console.log("test1");
});

Template.InputTemplate.events({
      //Bulk Upload button event
	  'click #btnQuery2'(event, instance){
		console.log("Inside bulk button click");
		var collection = "UploadBulk";
		var infile = document.querySelector('#inFile').files[0];
		var reader = new FileReader();
		reader.readAsText(infile);
		//var finalcsv = [];
		reader.onload = function(e,res){
	
			var output = reader.result;
			var div = output.split("\n");
			div.pop();
			var headerline = div[0].split(",");
			var finalcsv = [];
	
			for(var i = 1; i < div.length; i++)
			{
					var obj ={};
  
					var line = div[i].split(",");
					for(var j = 0; j < headerline.length; j++)
					{
					  obj[headerline[j]] = line[j]; 
					}
					finalcsv.push(obj);
      }
      Meteor.call(collection.toString(), finalcsv, function(err, res){
        //console.log("inside meteor.call");
        //console.log(obj[1]);
        if(err)
        {
          console.log(err)
        } 
        else
        {
          console.log("Sucess");
        }
    })
			
	  }
	  
  },

  'click #btnQuery'(event, instance) {
  console.log("Inside individual button click");
  var case_id = document.getElementById("textcase_id").value;
  console.log(case_id);
  var Hospital_code = document.getElementById("textHospital_Code").value;
  var Hospital_type_code = document.getElementById("textHospital_type_code").value;
  var City_Code_Hospital = document.getElementById("textCity_Code_Hospital").value;
  var Hospital_region_code = document.getElementById("textHospital_region_code").value;
  var Available = document.getElementById("textAvailable").value;
  var Department = document.getElementById("textDepartment").value;
  var Ward_Type = document.getElementById("textWard_Type").value;
  var Ward_Facility_Code = document.getElementById("textWard_Facility_Code").value;
  var BedGrade = document.getElementById("textBedGrade").value;
  var patientID = document.getElementById("textpatientID").value;
  var City_Code_Patient = document.getElementById("textCity_Code_Patient").value;
  var TypeOfAdmission = document.getElementById("textTypeOfAdmission").value;
  var SeverityOfIllness = document.getElementById("textSeverityOfIllness").value;
  var Visitors = document.getElementById("textVisitors").value;
  var age = document.getElementById("textage").value;
  var Admission_Deposit = document.getElementById("textAdmission_Deposit").value;
  var Stay = document.getElementById("textStay").value;
  console.log(Hospital_code);
  //document.getElementById("results").value = name;  Just tests that the value is getting collected from the form
  var collection = "UploadRecordByRecord";
  //var result = "verify";  This tests to see if we can write something to the textarea
  Meteor.call(collection.toString(), case_id, Hospital_code, Hospital_type_code, City_Code_Hospital, Hospital_region_code, Available, Department, Ward_Type, Ward_Facility_Code, BedGrade, patientID, City_Code_Patient, TypeOfAdmission, SeverityOfIllness, Visitors, age, Admission_Deposit, Stay, function(err, res)
      {
      if (err) console.log(err);
  
      else
          {
          console.log("inside collection check");
          }
      });
          instance.counter.set(instance.counter.get() + 1);
   
    }, 
  
});
