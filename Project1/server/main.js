import { Meteor } from 'meteor/meteor';

/*
-Comment Header-
Austin Lee
Jacob Mulroy
Conner Hundt
D'Angelo Abell
*/

Meteor.startup(function() {
  // code to run on server at startup
 Future = Npm.require('fibers/future');
});

Meteor.methods({
UploadRecordByRecord:function(case_id, Hospital_code, Hospital_type_code, City_Code_Hospital, Hospital_region_code, Available, Department, Ward_Type, Ward_Facility_Code, BedGrade, patientID, City_Code_Patient, TypeOfAdmission, SeverityOfIllness, Visitors, age, Admission_Deposit, Stay){
	console.log("Inside UploadRecordByRecord");
	console.log(case_id);
	console.log(Stay);
	var http = require("http");
	var MongoClient = require("mongodb").MongoClient;
	var url = "mongodb://localhost:27017/";
	var future = new Future();
	MongoClient.connect(url, function(err, db){
		if (err) throw err;
		var dbo = db.db("Hospital");
		dbo.collection("info1").insertOne({"case_id": case_id, "Hospital_code": Hospital_code,
		 "Hospital_type_code": Hospital_type_code, "City_Code_Hospital": City_Code_Hospital,
		  "Hospital_region_code": Hospital_region_code,"Available": Available, "Department": Department,
		   "Ward_Type": Ward_Type, "Ward_Facility_Code": Ward_Facility_Code, "BedGrade": BedGrade, "patientID": patientID,
			"City_Code_Patient": City_Code_Patient, "TypeOfAdmission": TypeOfAdmission, "SeverityOfIllness": SeverityOfIllness,
			 "Visitors": Visitors, "age": age, "Admission_Deposit": Admission_Deposit, "Stay":Stay}) 
	});
return future.wait(); 
},

UploadBulk:function(file){
	console.log("Inside UploadBulk");
	console.log(file[1])
	var http = require("http");
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";
	var future = new Future();	
	MongoClient.connect(url, function(err, db){
		if(err) throw err;
		console.log("connection");
		var dbo = db.db("Hospital");
		dbo.collection("bulktest").insertMany(file, function(err){
			if (err) console.log(err);
			console.log("Sucessful Insert (server side)");
			db.close;
		});
	});
},

query_info2:function(term, field){
	console.log("Inside query_info2");
	var http = require("http");
	var MongoClient = require("mongodb").MongoClient;
	var url = "mongodb://localhost:27017/";
	var future = new Future();
	MongoClient.connect(url, function(err, db){
		if (err) throw err;
		var query="";
		query = {[field]:term};
		console.log("Inside query");
		var dbo = db.db("Hospital");
		dbo.collection("info1").find(query).toArray(function(err, result) {
			if (err) console.log(err);
			var output="";
			for(var entry in result){
				var toclean=JSON.stringify(result[entry]);
				output += toclean + "\n"
				console.log(entry); 
						}			
			future.return(output);
			db.close();
		});
	});
return future.wait(); 
},

query_table:function(value){
	console.log("Inside query table");
	var http = require("http");
	var MongoClient = require("mongodb").MongoClient;
	var url = "mongodb://localhost:27017/";
	var future = new Future();
	MongoClient.connect(url, function(err, db){
		if (err) throw err;
		console.log("Inside querya");
		var dbo = db.db("Hospital");
		dbo.collection("info1").find({}).toArray(function(err, result) 
		{
			if (err) console.log(err);
			var output=JSON.stringify(result);
			//console.log(output);		
			future.return(output);

			db.close();
		}

		);
	});
console.log("finished");
return future.wait(); 
},
}) 
