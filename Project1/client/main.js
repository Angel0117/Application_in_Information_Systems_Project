import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

/*
-Comment Header-
Austin Lee
Jacob Mulroy
Conner Hundt
D'Angelo Abell
*/

Template.single.events({
  'click button'(event, instance) {
console.log("Inside individual button click");
var case_id = document.getElementById("textcase_id").value;
console.log("help");
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
console.log(name);
//document.getElementById("results").value = name;  Just tests that the value is getting collected from the form
var collection = "UploadRecordByRecord";
//var result = "verify";  This tests to see if we can write something to the textarea
Meteor.call(collection.toString(), case_id, Hospital_code, Hospital_type_code, City_Code_Hospital, Hospital_region_code, Available, Department, Ward_Type, Ward_Facility_Code, BedGrade, patientID, City_Code_Patient, TypeOfAdmission, SeverityOfIllness, Visitors, age, Admission_Deposit, Stay, function(err, res)
	{
		if (err) console.log(err);

		else
			{
			console.log(res);
			document.getElementById("results").value = "Succesfully inserted one record!";
			}
	});
 
  }, 
});        

Template.bulk.events({'click button'(event, instance) {
console.log("Inside bulk button click");

	console.log("Inside UploadBulk");
	//console.log(studentName);	
	var dataFile = "/home/leeaus/FinalExam/FinalAssign/public/DateSet.csv"
	var freader = new FileReader();
	freader.readAsText(dataFile);
	reader.onload = function(event)
	{
		var line=dataFile.split("\n");
		var topLine=line[0].split(",");

		for(var i=1;i<line.length;i++)
		{
			var obj = {}	
			var currentline=line[i].split(",");

			for(var j=0;j<headers.length;j++)
			{
				obj[headers[j]] = currentline[j];
			}
			outcsv.push(obj);
		}
		outcsv=JSON.stringify(resultcsv);
	}
Meteor.call(collection.toString(), function(err, res){
		if (err) console.log(err);

		else
			{
			console.log(res);
			document.getElementById("results").value = "Succesfully uploaded bulk records!";
			}
	});

  },
}); 
