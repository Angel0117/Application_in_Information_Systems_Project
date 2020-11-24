import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


var index = 0;
var increment = 100;
var max = 0;
var lines = [];

Router.route('/dataView', function() {
    this.render('DataViewTemplate');
});

Template.DataViewTemplate.onCreated(function helloOnCreated() {
    this.counter = new ReactiveVar(0);
});

Template.DataViewTemplate.events({
    'click #btnLoad'(event, instance) {
        var collection = "query_table";

        Meteor.call(collection.toString(), function(err, res)
            {
                $("#tbl1 tr").remove();
    
                if (err) console.log(err);
                else
                    {
                    console.log("sucessful return");
                    console.log(res);
                    max=res.length;
                    //document.getElementById("comment_textarea").value = res + "\n" +"\n";
                    //instance.counter.set(instance.counter.get() + 1);
                    }
            var col =[];      
            lines = jQuery.parseJSON(JSON.stringify(res));      
            for(var i=index;i<increment + index;i++){
                for(var key in lines[i]){
                    if (col.indexOf(key) === -1){
                        col.push(key);
                    }
                }            
            }
            var table = document.getElementById("tbl1");        
            var tr = table.insertRow(-1);
    
            for (var i=index; i<increment + index;i++)
            {
                tr = table.insertRow(-1);
    
                for (var j=1; j<col.length;j++)
                {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = lines[i][col[j]];
                }
            }
            console.log(index);               
            });
        event.preventDefault();
          },
          'click #next'(event, instance){
            console.log("Inside Next 100");
            console.log(lines[5]);
            if(index + increment < lines.length - 1)
            {
                index += increment;
            
                if(lines.length - index > increment)
                {
                $("#tbl1 tr").remove();
                var col =[];      
    
                console.log("first for loop");
                for(var i=index;i<increment + index;i++){
                    for(var key in lines[i]){
                        console.log(key);
                        if (col.indexOf(key) === -1){
                            col.push(key);
                        }
                    }            
                }
                var table = document.getElementById("tbl1");        
                var tr = table.insertRow(-1);
                console.log("Creating table");
    
                for (var i=index; i<increment + index;i++){
                    tr = table.insertRow(-1);
    
                    for (var j=1; j<col.length;j++){
                        var tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = lines[i][col[j]];
                    }
                }       
                console.log("table loaded");   
                event.preventDefault();     
                }
                else
                {
                    console.log("inside ELSE")
                    $("#tbl1 tr").remove();
                    console.log("ELSE for loop 1");
                    var col = [];
                    for(var i=index;i < (lines.length%100) - 1 + index; i++)
                    {
                        for(var key in lines[i]){
                            console.log(key);
                            if (col.indexOf(key) === -1){
                                col.push(key);
                            }
                        }            
                    }
                    var table = document.getElementById("tbl1");        
                    var tr = table.insertRow(-1);
                    console.log("ELSE table created");
                    for (var i=index; i < (lines.length%100) - 1 + index;i++)
                    {
                        tr = table.insertRow(-1);
            
                        for (var j=1; j<col.length;j++)
                        {
                            var tabCell = tr.insertCell(-1);
                            tabCell.innerHTML = lines[i][col[j]];
                        }
                    }   
                }
            
            }
                event.preventDefault();  
            },
    
            'click #prev'(event, instance){
            console.log("Inside Next 100");
            console.log(lines[5]);
            if(index - increment >= 0)
            {
                index -= increment;
            //{
    //            if(lines.length - index > increment)
    //            {
                $("#tbl1 tr").remove();
                var col =[];      
    
                console.log("first for loop");
                for(var i=index;i<increment + index;i++){
                    for(var key in lines[i]){
                        console.log(key);
                        if (col.indexOf(key) === -1){
                            col.push(key);
                        }
                    }            
                }
                var table = document.getElementById("tbl1");        
                var tr = table.insertRow(-1);
                console.log("Creating table");
    
                for (var i=index; i<increment + index;i++){
                    tr = table.insertRow(-1);
    
                    for (var j=1; j<col.length;j++){
                        var tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = lines[i][col[j]];
                    }
                }       
                console.log("table loaded");   
                event.preventDefault();     
                }
                
                event.preventDefault();  
          },          
    
});