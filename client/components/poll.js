// attach events to our poll template
Template.poll.events({

  // event to handle clicking a choice
  'click .vote': function(event) {

    // prevent the default behavior
    event.preventDefault();
  
    // get the parent (poll) id
    var pollID = $(event.currentTarget).parent('.poll').data('id');
    var voteID = $(event.currentTarget).data('id');

    // create the incrementing object so we can add to the corresponding vote
    var voteString = 'choices.' + voteID + '.votes';
    var action = {};
    action[voteString] = 1;
    
    // increment the number of votes for this choice
    Polls.update(
      { _id: pollID }, 
      { $inc: action }
    );

  },

  // event to handle adding a person
  'click .add-person': function(event) {

    // prevent the default behavior
    event.preventDefault();
  
    // get the parent (poll) id
    var pollID = $(event.currentTarget).closest('.poll').data('id');

    // get the text for the new choice
    var input = $('input.new-person');
    var name = input.val();
    input.val("");

    //generate a new id
    //var id = new Meteor.Collection.ObjectID();

    Polls.update(
      { _id: pollID },
      { $push: { 
          choices: { text: name, votes: 1 } 
      } }
    );

  }

});