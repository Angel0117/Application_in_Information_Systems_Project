/*
Input.js
*/

Template.InputTemplate.onCreated(function helloOnCreated() {
    // counter starts at 0
    this.counter = new ReactiveVar(0);
  });
  //=======
  
  Template.InputTemplate.events({
      //File-by-File event
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
          //document.getElementById("comment_textarea").value = "Succesfully inserted one record!";
  
          }
      });
          instance.counter.set(instance.counter.get() + 1);
   
    }, 
    //Bulk Upload button event
    'click #btnQuery2'(event, instance){
      console.log("Inside bulk button click");
      var collection = "UploadBulk";
      var infile = document.querySelector('#inFile').files[0];
      var reader = new FileReader();
      reader.readAsText(infile);
      var finalcsv = [];
      reader.onload = function(e){
  
          var output = reader.result;
          var div = output.split("\n")
          var headerline = div[0].split(",");
  
          for(var i = 1; i < div.length; i++)
          {
                  var obj ={};
                  var line = div[i].split(",");
                  for(var j = 0; j < headerline.length; j++)
                  {
                      if(j==18)
                      {
                          obj[headerline[j]] = "";
                      }
                      else
                      {
                          obj[headerline[j]] = line[j];
                      }
                  }
                  finalcsv.push(obj);
              }
  
          }
          Meteor.call(collection.toString(), finalcsv, function(err, res){
              console.log("inside meteor.call");
              console.log(finalcsv[1]);
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
  
  }); 
  //=======
  
  Template.InputTemplate.helpers({
    counter() {
      return Template.instance().counter.get();
    },
  });