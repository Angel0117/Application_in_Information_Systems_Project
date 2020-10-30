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

        Meteor.call(collection.toString(), function(err, res)
        {
            if (err) console.log(err);
            else
                {
                console.log("sucessful return");
                //console.log(res);
                instance.counter.set(instance.counter.get() + 1);
                }
                var col =[];      
                var lines = JSON.stringify(res);      
                for(var i=0;i<res.length;i++){
                    for(var key in lines[i]){
                        if (col.indexOf(key) === -1){
                            col.push(key);
                        }
                    }            
                }
                var table = document.getElementById("tbl1");        
                var tr = table.insertRow(-1);
    
                for (var i=0; i<lines.length;i++){
                    tr = table.insertRow(-1);
    
                    for (var j=1; j<col.length;j++){
                        var tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = lines[i][col[j]];
                    }
                }
         
        })
          },
    
});
