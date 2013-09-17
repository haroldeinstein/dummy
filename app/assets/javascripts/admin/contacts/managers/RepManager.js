function RepManager() {
  this.reps = new RepsCollection();
  this.reps.fetch();
}

RepManager.prototype = {
  showModal: function(id, $elem) {
    var $body = $('body');
    if ($body.hasClass('has-modal')) return;

    $body.addClass('has-modal');

    var rep = id ? this.reps.get(id).toJSON() : null;
    var modal = this.getModalHTML(rep);
    var $modal = $(modal);

    $body.append($modal);
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

    var manager = this;

    $('#cancel').bind('click', function() {
      $body.removeClass('has-modal');
      manager.hideModal();
    });

    $('#add-rep').bind('click', function() {
      // validate
      var data = {
        location: $('#location').val(),
        reps: [
          {
            name: $('#rep-one-name').val(),
            email: $('#rep-one-email').val()
          },
          {
            name: $('#rep-two-name').val(),
            email: $('#rep-two-email').val()
          }
        ]
      };

      manager.updateRepLocation(id, data);
      /*
      var success = function() {
        $elem.replaceWith($(manager.repTemplate(data)));
        $body.removeClass('has-modal');
        manager.hideModal();
      };

      if (id) manager.updateRepLocation(id, data, success);
      else manager.addRepLocation(data, success);
      */
    });
  },

  hideModal: function() {
    $('#rep-modal-container').remove();
  },

  addRepLocation: function(data, success) {
    var rep = new RepModel(data);
    this.reps.add(rep);
    if (success) success();
  },

  updateRepLocation: function(id, data, success) {
    rep = this.reps.get(id);
    console.log(rep, data);
    return;
    rep.set(data);
    if (success) success();
  },

  removeRep: function(id, success) {
    var model = this.reps.get(id);
    this.reps.remove(model);
    if (success) success();
  },

  getModalHTML: function(repLocation) {
    var html = "";
    html = '<div id="rep-modal-container">';
    html += '<div id="rep-modal">';

    html += '<input class="light" id="location" type="text" placeholder="location" value="';
    if (repLocation)
      html += repLocation.location;
    html += '"></input><br>';

    // first rep
      html += '<input class="light" id="rep-one-name" type="text" placeholder="name" value="';
      if (repLocation && repLocation.reps[0])
        html += repLocation.reps[0].name;
      html += '"></input><br>';

      html += '<input class="light" id="rep-one-email" type="text" placeholder="email" value="';
      if (repLocation && repLocation.reps[0])
        html += repLocation.reps[1].email;
      html += '"></input><br>';

    // second rep
      html += '<input class="light" id="rep-two-name" type="text" placeholder="name" value="';
      if (repLocation && repLocation.reps[1])
        html += repLocation.reps[0].name;
      html += '"></input><br>';

      html += '<input class="light" id="rep-two-email" type="text" placeholder="email" value="';
      if (repLocation && repLocation.reps[1])
        html += repLocation.reps[1].email;
      html += '"></input><br>';

    html += '<button id="cancel" class="btn" style="width: 48%;">cancel</button>';
    if (repLocation)
      html += '<button id="add-rep" class="btn" style="width: 48%;margin-left:8px;background-color:#000;">update</button>';
    else
      html += '<button id="add-rep" class="btn" style="width: 48%;margin-left:8px;background-color:#000;">add</button>';

    html += '</div>';
    html += '</div>';

    return html;
  },

  repTemplate: function(data) {
    var html = '';
    html += '<div class="rep">';
    html += '<p class="location">';
    if (data.location) {
      html += data.location;
    }
    html += '</p>';

    html += '<p class="bold">';
    if (data.nameOne) {
      html += data.nameOne;
    }
    html += '</p>';

    html += '<p class="bold">';
    if (data.nameTwo) {
      html += data.nameTwo;
    }
    html += '</p>';

    html += '</div>';
    return html;
  }
}
