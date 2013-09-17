function RepManager() {

  var manager = this;
  this.reps = new RepsCollection();
  this.reps.fetch();
}

RepManager.prototype = {
  showModal: function(id, $elem) {
    var rep = id ? this.reps.get(id).toJSON() : null;
    var modal = this.getModalHTML(rep);
    var $modal = $(modal);
    $('body').append($modal);

    $modal.show();

    var modalHeight = $modal.outerHeight();
    var modalWidth = $modal.outerWidth();
    var offsetLeft = $elem.offset().left;
    var offsetTop = $elem.offset().top;

    $modal.hide();

    $modal.css({
      top : offsetTop,
      left : offsetLeft - modalWidth - 20
    });

    $modal.show();
  },

  hideEditModal: function() {

  },

  getModalHTML: function(repLocation) {

    var html = "";
    html = '<div id="rep-modal-container">';
    html += '<div id="rep-modal">';

    html += '<label>location</label>';
    html += '<input type="text" value="';
    if (repLocation)
      html += repLocation.location;
    html += '"></input><br>';

    html += '<label>name</label>';
    html += '<input type="text" value="';
    if (repLocation && repLocation.reps[0])
      html += repLocation.reps[0].name;
    html += '"></input><br>';

    html += '<label>name</label><br>';
    html += '<input type="text" value="';
    if (repLocation && repLocation.reps[1])
      html += repLocation.reps[1].name;
    html += '"></input><br>';

    html += '</div>';
    html += '</div>';

    return html;
  }
}
