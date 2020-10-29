/*
DashBoard Template
*/

Template.DashBoard.onCreated(function DashBoardOnCreated(){

});

Template.DashBoard.events({    
    'click #btnTab':function(event){
        console.log("Inside Dashboard init click");
        var collection = "TabularDisplay";
        Meteor.call(collection.toString(), function(err, res){
            if (err) console.log(err);
            else
                {
                console.log("sucessful return");
                //console.log(res);
                buildTable(res);
                }
        })
    }
});

function buildTable(result){
    var col=[];
    for(var i=0;i<result.length;i++)
    {
        for(var key in result[i]){
    
            if(col.indexOf(key)===-1){
                col.push(key);
            }
        }
    }        
    var table = document.createElement("myTable");        
    var tr= table.insertRow(-1);

    for(var i=0; i<col.length;i++){
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for(var i=0; i<result.length; i++){
        tr = table.insertRow(-1);
        for(var j=0; j<coll.length;j++){
            var tabCell = tr.insertCEll(-1);
            tabCell.innerHTML=result[i][col[j]];
        }

    }
};


Template.DashBoard.helpers({

});

