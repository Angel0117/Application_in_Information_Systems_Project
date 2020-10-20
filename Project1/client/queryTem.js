/*
Query.js
*/

Template.QueryTemplate.onCreated(function helloOnCreated() {
    // counter starts at 0
    this.counter = new ReactiveVar(0);
  });
  //=======
  
  Template.QueryTemplate.events({
  'click button'(event, instance) {
  document.getElementById("comment_textarea").value="";
  console.log("Inside query button click");
  var term = document.getElementById("queryinput").value;
  var field =  document.getElementById("choose").value;
  console.log(field);
  console.log(term);
  var collection = "query_info2";
  Meteor.call(collection.toString(), term, field, function(err, res)
      {
          if (err) console.log(err);
          else
              {
              console.log("sucessful return");
              console.log(res);
              document.getElementById("comment_textarea").value = res + "\n" +"\n";
              instance.counter.set(instance.counter.get() + 1);
              }
      });
  event.preventDefault();
    },
  });
  //=======
  
  Template.QueryTemplate.helpers({
    counter() {
      return Template.instance().counter.get();
    },
  });