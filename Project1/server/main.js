import { resolveTxt } from 'dns';
import { Meteor } from 'meteor/meteor';

/*
-Comment Header-
Austin Lee
Jacob Mulroy
*/
var ids = [];
var counter = 0;
var main = 0;
var sub = 0;

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

ServerSideCount:function(){
	console.log("Inside server Side Count");
	var http = require("http");
	var MongoClient = require("mongodb").MongoClient;
	var url = "mongodb://localhost:27017/";
	var future = new Future();
	MongoClient.connect(url, function(err, db){
		if (err) throw err;
		var query="";
		query = {Department:"radiotherapy"};
		console.log("Inside query");
		console.log(query);
		var dbo = db.db("Hospital");
		dbo.collection("info2").find(query).toArray(function(err, result) {
			if (err) throw err;
			var output="";
			for(var entry in result){
				var toclean=JSON.stringify(result[entry]);
				output += toclean + "\n"
					}			
			main = output.length;
			db.close();
		});
	});
	
	MongoClient.connect(url, function(err, db){
		if (err) throw err;
		var query="";
		query = {$and:[{Department:"radiotherapy"}, {"Severity of Illness":"Extreme"}]};
		console.log("Inside query");
		console.log(query);
		var dbo = db.db("Hospital");
		dbo.collection("info2").find(query).toArray(function(err, result) {
			if (err) throw err;
			var output="";
			for(var entry in result){
				var toclean=JSON.stringify(result[entry]);
				output += toclean + "\n"
						}			
			sub= output.length;
			var final = 100*(sub/main);
			future.return(final)
			db.close();
		});
	});
	
return future.wait(); 
},

TabularDisplay:function(){
	console.log("Inside Tabular Display");
	var http = require("http");
	var MongoClient = require("mongodb").MongoClient;
	var url = "mongodb://localhost:27017/";
	var future = new Future();
	MongoClient.connect(url, function(err, db){
		if (err) throw err;
		var query="";
		query = {$and:[{Department:"radiotherapy"}, {"Severity of Illness":"Extreme"}]};
		console.log("Inside query");
		//console.log(query);
		var dbo = db.db("Hospital");
		dbo.collection("info2").find(query).toArray(function(err, result) {
			if (err) throw err;
/*			var output="";
			for(var entry in result){
				var toclean=JSON.stringify(result[entry]);
				output += toclean + "\n"
						}			
*/			future.return(result)
			db.close();
		});
	});
	return future.wait(); 
},

ClientSideCount:function(){
	console.log("Inside Client Side Count");
	var http = require("http");
	var MongoClient = require("mongodb").MongoClient;
	var url = "mongodb://localhost:27017/";
	var future = new Future();
	MongoClient.connect(url, function(err, db){
		if (err) throw err;
		var query="";
		query = {Department:"radiotherapy"};
		console.log("Inside query");
		console.log(query);
		var dbo = db.db("Hospital");
		dbo.collection("info2").find(query).toArray(function(err, result) {
			if (err) console.log(err);
			future.return(result);
			db.close();
		});
	});
return future.wait(); 
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

query_table:function(value){
	console.log("Inside Query_Table");
	var http = require("http");
	var MongoClient = require("mongodb").MongoClient;
	var url = "mongodb://localhost:27017/";
	var future = new Future();
	MongoClient.connect(url, function(err, db){
		if (err) throw err;
		var query="";
		query = {};
		console.log("Inside query");
		//console.log(query);
		var dbo = db.db("Hospital");
		dbo.collection("info1").find(query).toArray(function(err, result) {
			if (err) throw err;
/*			var output="";
			for(var entry in result){
				var toclean=JSON.stringify(result[entry]);
				output += toclean + "\n"
						}			
*/			future.return(result)
			db.close();
		});
	});
	return future.wait(); 
},
}) 
