/*
QueryPanel Template
*/

Template.QueryPanel.onCreated(function querypanelOnCreated(){

});

Template.QueryPanel.helpers({

});

Template.QueryPanel.events({
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
});