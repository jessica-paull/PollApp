Template.body.helpers({
  
  choices: function() {
    return Choices.find({}, {sort: {votes: -1}});
  }

});

Template.body.events({

  // event to handle adding a person
  'click .add-person': function(event) {

    // prevent the default behavior
    event.preventDefault();
  
    // get the text for the new choice
    var input = $('input.new-person');
    var name = input.val();

    if (name && name.length) {

      $('#confirm-vote').modal({'show': true});

      input.val('');

      Choices.insert({
        text: name,
        votes: 1
      });

    }
    
  }
  
});