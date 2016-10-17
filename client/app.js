Template.body.helpers({
  
  polls: function() {
    return Polls.find();
  }
  
});

UI.registerHelper('indexedArray', function(context, options) {
  if (context) {
    return context.map(function(item, index) {
      item._index = index;
      return item;
    });
  }
});

/*
Template.poll.helpers({
  choices: function() {
    var coll = Polls.findOne(this._id);
    return _.sortBy(coll.choices, function(choice) {
      return -choice.votes;
    });
  }
});*/