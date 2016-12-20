Meteor.startup(function() {

  Session.set('sort_by', 'name');  

  $.getScript('vendor\jquery.countdown.js');

  $('.js-countdown').countdown('2016/12/24 17:00:00', function(event) {
    $(this).text(
    event.strftime('%D days %H hours %M minutes %S seconds'));
  }).on('finish.countdown', function() {
    $('.results-wrapper').show();
    $('.poll-wrapper').hide();
    Session.set('sort_by', 'results');  
  });

  Session.set('pollQuestion', 'Christmas');

}); 

Template.body.helpers({
  
  choices: function() {
    var sort = Session.get('sort_by');
    if (sort === 'results'){
       return Choices.find({}, {sort: {votes: -1}});
    } else {
       return Choices.find({}, {sort: {text: -1}});
    }
    
  },
  pollQuestion: function () {
    var name = Session.get('pollQuestion'),
        className = '';

    if (name==='Halloween') {
      text = 'Who has best costume?';
      className = 'halloween-body';
    } else if (name === 'Christmas') {
      text = 'Who has the ugliest sweater?';
      className = 'christmas-body';
    } else {
      text = 'I have no idea what this poll is for!';
    }

    $('body').attr('class', '').addClass(className);

    return text;
  }

});

Template.body.events({

  'change .select-mode': function(event) {
    var input = $('.select-mode'),
        name = input.val();

    Session.set('pollQuestion', name);
  },

  'click .add-person': function(event) {
    event.preventDefault();

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