function RepManager() {
  this.reps = new RepsCollection();
  this.reps.fetch();
}

RepManager.prototype = {
  showModal: function(location, $elem) {
    var $body = $('body');
    if ($body.hasClass('has-modal')) return;

    $body.addClass('has-modal');

    var rep = location ? this.reps.where({"location" : location})[0].toJSON() : null;
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
      left : offsetLeft - modalWidth - 25
    });

    $modal.show();

    var manager = this;

    var proceed = function() {
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

      var success = function() {
        $elem.replaceWith($(manager.repTemplate(data)));
        $body.removeClass('has-modal');
        manager.hideModal();
      };

      if (location) manager.updateRepLocation(location, data, success);
      else manager.addRepLocation(data, success);

      $(document).unbind('keypress');
    }


    $('#cancel').bind('click', function() {
      $body.removeClass('has-modal');
      manager.hideModal();
    });

    $(document).bind('keypress', function(e) {
      if (e.keyCode === 13)
        proceed();
    });

    $('#add-rep').bind('click', function() {
      proceed();
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

  updateRepLocation: function(location, data, success) {
    rep = this.reps.where({"location":location})[0];
    rep.set(data);
    if (success) success();
  },

  removeRep: function(id, success) {
    var model = this.reps.get(id);
    this.reps.remove(model);
    if (success) success();
  },

  save: function() {
    var data = {
      authenticity_token: $('meta').filter('[name="csrf-token"]').attr('content'),
      reps: this.reps.toJSON()
    };

    $.ajax({
      url: '/api/admin/reps',
      data: data,
      type: 'PUT',
      success: function(response, status, xhr) {
        if (opts && opts.success) opts.success();
      },
      error: function(response) {
      }
    });
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
      html += '<input class="light no-margin" id="rep-one-name" type="text" placeholder="name" value="';
      if (repLocation && repLocation.reps[0])
        html += repLocation.reps[0].name;
      html += '"></input><br>';

      html += '<input class="light" id="rep-one-email" type="text" placeholder="email" value="';
      if (repLocation && repLocation.reps[0])
        html += repLocation.reps[0].email;
      html += '"></input><br>';

    // second rep
      html += '<input class="light no-margin" id="rep-two-name" type="text" placeholder="name" value="';
      if (repLocation && repLocation.reps[1])
        html += repLocation.reps[1].name;
      html += '"></input><br>';

      html += '<input class="light" id="rep-two-email" type="text" placeholder="email" value="';
      if (repLocation && repLocation.reps[1])
        html += repLocation.reps[1].email;
      html += '"></input><br>';

    html += '<button id="cancel" class="btn neutral" style="width: 48%;">cancel</button>';
    if (repLocation)
      html += '<button id="add-rep" class="btn positive" style="width: 48%;margin-left:8px;">update</button>';
    else
      html += '<button id="add-rep" class="btn positive" style="width: 48%;margin-left:8px;">add</button>';

    html += '</div>';
    html += '</div>';

    return html;
  },

  repTemplate: function(data) {
    var html = '';
    html += '<div class="rep" data-id="' + data.id + '" data-location="' + data.location + '">';
    html += '<p class="location">';
    if (data.location) {
      html += data.location;
    }
    html += '</p>';

    html += '<p class="bold">';
    if (data.reps[0] && data.reps[0].name) {
      html += data.reps[0].name;
    }
    html += '</p>';

    html += '<p class="bold">';
    if (data.reps[1] && data.reps[1].name) {
      html += data.reps[1].name;
    }
    html += '</p>';

    html += '</div>';
    return html;
  }
}
