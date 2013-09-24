//= require libs/underscore-min.js
//= require libs/backbone-min.js
//= require libs/jquery-ui-min.js

$(document).ready(function() {
  /*
  $('#navbar').on('click', '.new-director', function() {
    var $li = $(this);
    var $input = $('<input type="text"></input>');
    $(this).replaceWith($input);
    $input.focus().bind('blur', function() {
      var $self = $(this);
      var val = $self.val();
      if ($.trim(val) === "") {
        $self.replaceWith('<li class="new-director"><div class="add"></div><h3>new director</h3></li>');
      } else {
        var $replacement = $('<li><h2 class="home"><a href="/admin/' + val.toLowerCase().replace(' ', '-') + '">' + val.toLowerCase() + '</a></h2></li>');
        $self.replaceWith($replacement);

        $.ajax({
          url: '/api/admin/directors',
          data: {
            authenticity_token: $('meta').filter('[name="csrf-token"]').attr('content'),
            director: {name: val}
          },
          type: 'POST',
          success: function(response) {
            $replacement.after('<li class="new-director"><div class="add"></div><h3>new director</h3></li>');
          }
        });
      }
    });
  });
  */
});
