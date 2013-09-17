//= require_tree ./admin/contacts

$(document).ready(function() {
  var manager = new RepManager();


  $('#reps').on('click', '.rep',  function(e) {
    var $self = $(this);
    if ($self.hasClass('blank')) return;
    var id = parseInt($self.attr('data-id'));
    manager.showModal(id, $(e.currentTarget));
  });

  $('#add-action').bind('click', function(e) {
    e.preventDefault();
    manager.showModal(null, $('.rep.blank').first());
  });
});
