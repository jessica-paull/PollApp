// attach events to our poll template
Template.choice.events({

  // event to handle clicking a choice
  "click .choice": function(event) {

    // prevent the default behavior
    event.preventDefault();
  
    // get the parent (choice) id
    var choiceId = $(event.currentTarget).data("id");
    
    // increment the number of votes for this choice
    Choices.update(
      { _id: choiceId }, 
      { $inc: {votes: 1}  }
    );

  }

});