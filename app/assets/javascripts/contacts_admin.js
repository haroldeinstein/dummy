//= require_tree ./admin/contacts

$(document).ready(function() {
  var manager = new RepManager();


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
    manager.save();
  });
});
