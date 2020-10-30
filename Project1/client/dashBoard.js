/*
DashBoard Template
*/

Template.DashBoard.onCreated(function DashBoardOnCreated(){

});

Template.DashBoard.events({    
    'click #btnTab':function(event, instance){
        console.log("Inside Dashboard init click");
        var collection = "TabularDisplay";
        Meteor.call(collection.toString(), function(err, res){
            if (err) console.log(err);
            console.log("call completed");
            console.log(res[15]);
            var col =[];      
            var lines = jQuery.parseJSON(JSON.stringify(res));      
            for(var i=0;i<res.length;i++){
                for(var key in lines[i]){
                    if (col.indexOf(key) === -1){
                        col.push(key);
                    }
                }            
            }
            var table = document.getElementById("myTable");        
            var tr = table.insertRow(-1);

            for (var i=0; i<lines.length;i++){
                tr = table.insertRow(-1);

                for (var j=1; j<col.length;j++){
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = lines[i][col[j]];
                }
            }

        })
    }
});

Template.DashBoard.helpers({

});
