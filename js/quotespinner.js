var spinner = {
    index: 0,
    auto: function(currentIndex) {
      if (currentIndex != undefined) {
        spinner.index = currentIndex % spinner.quotes.length;
      } else {
        spinner.index = (spinner.index + 1) % spinner.quotes.length;
      }
      spinner.quotes.removeClass("show");
      $(spinner.quotes[spinner.index]).addClass("show");
      spinner.dots.removeClass('dot-fill');
      $(spinner.dots[spinner.index]).addClass('dot-fill');
    },

    initial: function(){
      this.quotes = $(".quote-rotate");
      this.images = $(".quote-image");
      spinner.quotes.first().addClass("show");
      //dots
      for (i = 0; i < spinner.quotes.length; i++) {
        $('.quote-dots').append('<div class="nav-dot"></div>');
      }
      this.dots = $(".nav-dot");
      $(spinner.dots).first().addClass('dot-fill');
    },

    dotnav: function(){
      $(spinner.dots).on("click", function(){
        var currentIndex = $(spinner.dots).index(this);
        spinner.auto(currentIndex);
        window.clearInterval(interval);
        interval = window.setInterval(spinner.auto, 3700);
      });
    }
  }

$(document).ready(function() {
  spinner.initial();
  spinner.dotnav();
  interval = window.setInterval(spinner.auto, 3700);
});
