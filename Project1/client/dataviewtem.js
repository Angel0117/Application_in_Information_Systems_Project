/*
DataView.js
*/

Template.DataViewTemplate.onCreated(function helloOnCreated() {
    this.counter = new ReactiveVar(0);
});
//=======

Template.DataViewTemplate.helpers({

});
//=======

Template.DataViewTemplate.events({
    'click #btnLoad'(event, instance) {
        var collection = "query_table";
        var output=[];
        Meteor.call(collection.toString(), function(err, res)
        {
            if (err) console.log(err);
            else
                {
                console.log("sucessful return");
                //console.log(res);
                instance.counter.set(instance.counter.get() + 1);
                }
        })
        //event.preventDefault();       

            // get the reference for the body
            var body = document.getElementsByTagName("body")[0];
          
            // creates a <table> element and a <tbody> element
            var tbl = document.getElementById("tbl1");
            var tblBody = document.getElementById("tbody");
          
            // creating all cells
            for (var i = 0; i < 10; i++) {
              // creates a table row
              var row = document.createElement("tr");
          
              for (var j = 0; j < 18; j++) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                var cell = document.createElement("td");
                var cellText = document.createTextNode("sample text");
                cell.appendChild(cellText);
                //cell.appendChild("test");
                row.appendChild(cell);
              }
          
              // add the row to the end of the table body
              tblBody.appendChild(row);
            }
          
            // put the <tbody> in the <table>
            tbl.appendChild(tblBody);
            // appends <table> into <body>
            body.appendChild(tbl);
            // sets the border attribute of tbl to 2;
            tbl.setAttribute("border", "2");

          },
    
});