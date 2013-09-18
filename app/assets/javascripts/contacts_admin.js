//= require_tree ./admin/contacts

$(document).ready(function() {
  var manager = new RepManager();

  /*
  $('#reps').sortable({
    items: '.rep',
    cursor: 'move',
    stop: function(e, ui) {
      var sort = $('#reps').sortable("serialize", {
        key: "sort"
      });
      console.log(sort);
      manager.updateSort(sort);
    }
  });
  */

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
