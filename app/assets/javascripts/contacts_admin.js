//= require_tree ./admin/contacts

function showEditHeadline($elem) {
  var text = $elem.text();
  var $input = $('<input type="text" id="edit-headline">');
  $input.val(text);
  $elem.replaceWith($input);

  var $save = $('<button class="btn active" id="save-headline">save</button>');
  var $cancel = $('<button class="btn negative" id="cancel-headline">cancel</button>');
  $save.appendTo('body');
  $cancel.appendTo('body');

  var offsetTop = $input.offset().top;
  var offsetLeft = $input.offset().left + $input.outerWidth();
  var inputHeight = $input.outerHeight();
  var saveWidth = $save.outerWidth();
  var cancelWidth = $cancel.outerWidth();

  $save.css({
    'position' : 'absolute',
    'left' : offsetLeft - saveWidth,
    'top' : inputHeight + offsetTop
  });

  $cancel.css({
    'position' : 'absolute',
    'left' : offsetLeft - saveWidth - cancelWidth,
    'top' : inputHeight + offsetTop
  });

  $('#save-headline').bind('click', function() {
    hideEditHeadline($input, true);
  });

  $('#cancel-headline').bind('click', function() {
    hideEditHeadline($input, false);
  });

}

function hideEditHeadline($input, save) {
  var headline = $input.val();

  if (save) {
    $.ajax({
      url: '/api/admin/headline',
      type: 'PUT',
      data: {
        authenticity_token: $('meta').filter('[name="csrf-token"]').attr('content'),
        headline: headline
      },
      success: function(response, status, xhr) {
        $('#save-headline').remove();
        $('#cancel-headline').remove();
        $input.replaceWith('<p class="contact-headline">'+headline+'</p>');
      }
    });
  } else {
    $('#save-headline').remove();
    $('#cancel-headline').remove();
    $input.replaceWith('<p class="contact-headline">'+headline+'</p>');
  }
}


$(document).ready(function() {
  var manager = new RepManager();

  $('#reps').sortable({
    cursor: 'move',
    items: '.rep',
    stop: function(e, ui) {
      var sort = $('#reps').sortable("serialize", {
        key: "sort"
      });
      manager.updateSort(sort);
    }
  });

  $('#reps').on('click', '.rep',  function(e) {
    var $self = $(this);
    if ($self.hasClass('blank')) return;
    var id = parseInt($self.attr('data-id'));
    var location = $self.attr('data-location');
    manager.showModal(location, $(e.currentTarget));
  });

  $('#add-action').bind('click', function(e) {
    e.preventDefault();
    manager.showModal(null, $('.rep.blank').first());
  });

  $('#save-button').bind('click', function(e) {
    if ($(this).hasClass('disabled')) return;
    manager.save();
  });

  $('#contact').on('click', '.contact-headline', function() {
    showEditHeadline($(this));
  });
});
