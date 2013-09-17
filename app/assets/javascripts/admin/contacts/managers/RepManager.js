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
      left : offsetLeft - modalWidth - 30
    });

    $modal.show();
  },

  addRepLocation: function(data, success) {
    var rep = new RepModel(data);
    this.repsCollection.add(rep);
    if (success) success();
  },

  removeRep: function(id, success) {
    var model = this.repsCollection.get(id);
    this.repsCollection.remove(model);
    if (success) success();
  }

  hideEditModal: function() {

  },

  getModalHTML: function(repLocation) {

    var html = "";
    html = '<div id="rep-modal-container">';
    html += '<div id="rep-modal">';

    html += '<label class="light">location</label>';
    html += '<input class="light" type="text" value="';
    if (repLocation)
      html += repLocation.location;
    html += '"></input><br>';

    html += '<label class="light">name</label>';
    html += '<input class="light" type="text" value="';
    if (repLocation && repLocation.reps[0])
      html += repLocation.reps[0].name;
    html += '"></input><br>';

    html += '<label class="light">email</label><br>';
    html += '<input class="light" type="text" value="';
    if (repLocation && repLocation.reps[1])
      html += repLocation.reps[1].name;
    html += '"></input><br>';

    html += '<button id="cancel" class="btn" style="width: 48%;">cancel</button>';
    html += '<button id="add-rep" class="btn" style="width: 48%;margin-left:8px;background-color:#000;">add</button>';

    html += '</div>';
    html += '</div>';

    return html;
  }
}
