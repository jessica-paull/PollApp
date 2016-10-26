Meteor.startup(function() {

  Session.set("sort_by", "name");  

  $.getScript("vendor\jquery.countdown.js");

  $(".js-countdown").countdown("2016/10/25 21:34:59", function(event) {
    $(this).text(
    event.strftime("%D days %H hours %M minutes %S seconds"));
  }).on("finish.countdown", function() {
    $(".results-wrapper").show();
    $(".poll-wrapper").hide();
    Session.set("sort_by", "results");  
  });

}); 

Template.body.helpers({
  
  choices: function() {
    var sort = Session.get("sort_by");
    if (sort === "results"){
       return Choices.find({}, {sort: {votes: -1}});
    } else {
       return Choices.find({}, {sort: {text: -1}});
    }
    
  }

});

Template.body.events({

  // event to handle adding a person
  "click .add-person": function(event) {

    // prevent the default behavior
    event.preventDefault();
  
    // get the text for the new choice
    var input = $("input.new-person");
    var name = input.val();

    if (name && name.length) {

      $("#confirm-vote").modal({"show": true});

      input.val("");

      Choices.insert({
        text: name,
        votes: 1
      });

    }
    
  }
  
});