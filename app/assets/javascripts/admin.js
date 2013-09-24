//= require libs/underscore-min.js
//= require libs/backbone-min.js
//= require libs/jquery-ui-min.js

$(document).ready(function() {
  $('.new-director').bind('click', function() {
    var $li = $(this);
    var $input = $('<input type="text"></input>');
    $(this).replaceWith($input);
    $input.focus().bind('blur', function() {
      var $self = $(this);
      var val = $self.val();
      $self.replaceWith('<li><h2 class="home"><a href="/admin/' + val.toLowerCase().replace(' ', '-') + '">' + val.toLowerCase() + '</a></h2></li>');

      $.ajax({
        url: '/api/admin/directors',
        data: {
          authenticity_token: $('meta').filter('[name="csrf-token"]').attr('content'),
          director: {name: val}
        },
        type: 'POST',
        success: function(response) {
          console.log(response);
        }
      });
    });
  });
});
