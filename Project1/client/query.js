import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';

var index = 0;
var increment = 100;
var max = 0;
var lines = [];

Router.route('/query', function() {
    this.render('QueryTemplate');
});

Meteor.methods({
    loadTable(res){        
      },
});

Template.QueryTemplate.onCreated(function DataViewTemplateOnCreated() {

});

Template.QueryTemplate.events({
    'click #submitQuery'(event, instance) {

    //document.getElementById("comment_textarea").value="";
    document.getElementById("tbl1"),innerHTML = "";
    console.log("Inside query button click");
    var term = document.getElementById("queryinput").value;
    var field =  document.getElementById("choose").value;
    console.log(field);
    console.log(term);
    var collection = "query_info2";
    Meteor.call(collection.toString(), term, field, function(err, res)
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

    'click #lessThan'(event, instance) {
        $("#tbl1 tr").remove();

        index = 0;
        increment = 20;
        max =0;
        lines;
    console.log("Inside less than button click");
    var term = document.getElementById("queryinput").value;
    //var field =  document.getElementById("choose").value;
    //console.log(field);
    console.log(term);
    var collection = "queryLess";

    Meteor.call(collection.toString(), term, function(err, res)
        {
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
        for(var i=0;i<res.length;i++){
            for(var key in lines[i]){
                if (col.indexOf(key) === -1){
                    col.push(key);
                }
            }            
        }
        var table = document.getElementById("tbl1");        
        var tr = table.insertRow(-1);

        for (var i=index; i<increment;i++){
            tr = table.insertRow(-1);

            for (var j=1; j<col.length;j++){
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = lines[i][col[j]];
            }
        }
    })
    event.preventDefault();

      },

      'click #greaterThan'(event, instance) {
        $("#tbl1 tr").remove();

        index = 0;
        increment = 20;
        max =0;
        lines;
        console.log("Inside greater than button click");
        var term = document.getElementById("queryinput").value;
        //var field =  document.getElementById("choose").value;
        //console.log(field);
        console.log(term);
        var collection = "queryGreater";

        Meteor.call(collection.toString(), term, function(err, res)
        {
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
        for(var i=0;i<res.length;i++){
            for(var key in lines[i]){
                if (col.indexOf(key) === -1){
                    col.push(key);
                }
            }            
        }
        var table = document.getElementById("tbl1");        
        var tr = table.insertRow(-1);

        for (var i=index; i<increment;i++){
            tr = table.insertRow(-1);

            for (var j=1; j<col.length;j++){
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = lines[i][col[j]];
            }
        }
    })
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
            // else
            // {
            //     console.log("inside ELSE")
            //     $("#tbl1 tr").remove();
            //     console.log("ELSE for loop 1");
            //     var col = [];
            //     for(var i=index;i < (lines.length%100) - 1 + index; i++)
            //     {
            //         for(var key in lines[i]){
            //             console.log(key);
            //             if (col.indexOf(key) === -1){
            //                 col.push(key);
            //             }
            //         }            
            //     }
            //     var table = document.getElementById("tbl1");        
            //     var tr = table.insertRow(-1);
            //     console.log("ELSE table created");
            //     for (var i=index; i < (lines.length%100) - 1 + index;i++)
            //     {
            //         tr = table.insertRow(-1);
        
            //         for (var j=1; j<col.length;j++)
            //         {
            //             var tabCell = tr.insertCell(-1);
            //             tabCell.innerHTML = lines[i][col[j]];
            //         }
            //     }   
            // }
          //}
        //}
            event.preventDefault();  
      },
      
    });

Template.QueryTemplate.helpers({

});