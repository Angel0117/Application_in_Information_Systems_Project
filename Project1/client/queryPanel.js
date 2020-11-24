import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Router.route('/queryPanel', function() {
    this.render('ProjectPart5');
});

Template.ProjectPart5.onCreated(function ProjectPart5TemplateOnCreated() {
});

Template.ProjectPart5.events({
    'click #btnClient':function(event){
        console.time("Client Counting");
        console.log("Inside Client side button click");
        Meteor.call('ClientSideCount', function(err, res){
            var numRadiotherapy = res.length;
            var numRadio_Extreme = 0;
            var perc;

            for(var i=0; i<res.length;i++){
                var key = Object.keys(res[i]);
                if(res[i][key[14]] == 'Extreme')
                {
                    numRadio_Extreme++;
                }
                perc = 100*(numRadio_Extreme / numRadiotherapy);                
            }
            document.getElementById("clientCount").value = "At present, " + 
            perc.toPrecision(4) + "% of Radiotherapy patients are from the Emergency room."
        })
        console.timeEnd("Client Counting");
    },

    'click #btnServer':async function(event){
        var total=0;
        var subset=0;
        console.time("Server Counting");
        perc = Meteor.call('ServerSideCount', function(err, res){
            console.log("Result" + res);
            //total = res.length;
            //console.log("perc" + perc);
            document.getElementById("clientCount").value = "At present, " + res.toPrecision(4) +
            "% of Radiotherapy patients have come from the Emergency room."
        });
        console.timeEnd("Server Counting");
    },

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