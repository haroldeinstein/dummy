(function() {
  $.fn.easyAudio = function(options) {
    var opts = $.extend({}, $.fn.easyAudio.defaults, options);
    return this.each(function() {
      opts.$audio = $.fn.easyAudio.setupAudio(opts);
      if (!opts.$audio) {
        return false;
      }

      var audio = opts.audio = opts.$audio[0];
      if (opts.onMouseDown) {
        $(this).bind('mousedown', function() {
          if (audio.paused)
            audio.play();
          else
            audio.pause();
        });
      } else {
        $(this).bind('click', function() {
          if (audio.paused)
            audio.play();
          else
            audio.pause();
        });
      }

    });

  };

  $.fn.easyAudio.audio = null;

  $.fn.easyAudio.defaults = {
  };

  $.fn.easyAudio.setupAudio = function(opts) {
    var audio = document.createElement('audio');
    if (!!!audio.canPlayType) return false;

    var types = ['audio/mpeg', 'audio/ogg', 'audio/wav'];

    for (var i = 0; i < types.length; i++) {
      if (!!audio.canPlayType(types[i])) {
        var src = opts[types[i].replace('audio/','')];
        var $audio = $('<audio src="'+src+'"></audio>');
        $('body').append($audio);
        return $audio;
      }
    }

    return false;
  };

}(jQuery));
