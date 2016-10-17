Meteor.startup(function() {

  // if there are no polls available
  if (Polls.find().count() === 0) {

    // create sample polls
    var samplePolls = [
      {
        question: 'Who has the best costume?',
        choices: [
          { text: 'Person A', votes: 0 },
          { text: 'Person B', votes: 0 },
          { text: 'Person C', votes: 0 }
        ]
      }
    ];

    // loop over each sample poll and insert into database
    _.each(samplePolls, function(poll) {
      Polls.insert(poll);
    });
  }

});