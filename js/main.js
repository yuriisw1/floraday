//IBG
jQuery(document)[0].querySelectorAll(".ibg").forEach(el => {
   if (el.querySelector('img')) {
      el.style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
      el.querySelector('img').style.display = 'none';
   }
});


$(document).ready(function () {
   $('.slider').slick({
      arrows: false,
      dots: true,
      slidesToShow: 3,
      autoplay: false,
      speed: 1000,
      autoplaySpeed: 2000,
      centerMode: true,
      responsive: [
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1
            }
         },
         {
            breakpoint: 550,
            settings: {
               slidesToShow: 1
            }
         }
      ]
   });
});





function outputUpdate(vol) {
   var output = document.querySelector('#volume');
   output.value = vol;
   output.style.left = vol - 20;
   if (output.value > 9) {
      output.style.left = vol - 30;
   }
   if (output.value > 99) {
      output.style.left = vol - 40;
   }
   if (output.value > 240) {
      output.style.left = vol - 45;
   }
   if (output.value > 430) {
      output.style.left = vol - 50;
   }
   if (output.value > 470) {
      output.style.left = vol - 55;
   }
}


jQuery.fn.countdown = function (userOptions) {
   // Default options
   var options = {
      stepTime: 60,
      // startTime and format MUST follow the same format.
      // also you cannot specify a format unordered (e.g. hh:ss:mm is wrong)
      format: "dd:hh:mm:ss",
      startTime: "01:12:32:55",
      digitImages: 6,
      digitWidth: 53,
      digitHeight: 77,
      timerEnd: function () { },
      image: "digits.png"
   };
   var digits = [], interval;

   // Draw digits in given container
   var createDigits = function (where) {
      var c = 0;
      // Iterate each startTime digit, if it is not a digit
      // we'll asume that it's a separator
      for (var i = 0; i < options.startTime.length; i++) {
         if (parseInt(options.startTime[i]) >= 0) {
            elem = jQuery('<div id="cnt_' + i + '" class="cntDigit" />').css({
               height: options.digitHeight * options.digitImages * 10,
               float: 'left', background: 'url(\'' + options.image + '\')',
               width: options.digitWidth
            });
            digits.push(elem);
            margin(c, -((parseInt(options.startTime[i]) * options.digitHeight *
               options.digitImages)));
            digits[c].__max = 9;
            // Add max digits, for example, first digit of minutes (mm) has 
            // a max of 5. Conditional max is used when the left digit has reach
            // the max. For example second "hours" digit has a conditional max of 4 
            switch (options.format[i]) {
               case 'h':
                  digits[c].__max = (c % 2 == 0) ? 2 : 3;
                  if (c % 2 == 0)
                     digits[c].__condmax = 4;
                  break;
               case 'd':
                  digits[c].__max = 9;
                  break;
               case 'm':
               case 's':
                  digits[c].__max = (c % 2 == 0) ? 5 : 9;
            }
            ++c;
         }
         else
            elem = jQuery('<div class="cntSeparator"/>').css({ float: 'left' })
               .text(options.startTime[i]);

         where.append(elem)
      }
   };

   // Set or get element margin
   var margin = function (elem, val) {
      if (val !== undefined)
         return digits[elem].css({ 'marginTop': val + 'px' });

      return parseInt(digits[elem].css('marginTop').replace('px', ''));
   };

   // Makes the movement. This is done by "digitImages" steps.
   var moveStep = function (elem) {
      digits[elem]._digitInitial = -(digits[elem].__max * options.digitHeight * options.digitImages);
      return function _move() {
         mtop = margin(elem) + options.digitHeight;
         if (mtop == options.digitHeight) {
            margin(elem, digits[elem]._digitInitial);
            if (elem > 0) moveStep(elem - 1)();
            else {
               clearInterval(interval);
               for (var i = 0; i < digits.length; i++) margin(i, 0);
               options.timerEnd();
               return;
            }
            if ((elem > 0) && (digits[elem].__condmax !== undefined) &&
               (digits[elem - 1]._digitInitial == margin(elem - 1)))
               margin(elem, -(digits[elem].__condmax * options.digitHeight * options.digitImages));
            return;
         }

         margin(elem, mtop);
         if (margin(elem) / options.digitHeight % options.digitImages != 0)
            setTimeout(_move, options.stepTime);

         if (mtop == 0) digits[elem].__ismax = true;
      }
   };

   jQuery.extend(options, userOptions);
   this.css({ height: options.digitHeight, overflow: 'hidden' });
   createDigits(this);
   interval = setInterval(moveStep(digits.length - 1), 1000);
};

var cdate = "06:23:59:59";
jQuery(function ($) { $("#ps_counter").countdown({ image: "js/digits.png", startTime: cdate }); });




function catalogItemCounter(field) {

   var fieldCount = function (el) {

      var
         // Мин. значение
         min = el.data('min') || false,

         // Макс. значение
         max = el.data('max') || false,

         // Кнопка уменьшения кол-ва
         dec = el.prev('.dec'),

         // Кнопка увеличения кол-ва
         inc = el.next('.inc');

      function init(el) {
         if (!el.attr('disabled')) {
            dec.on('click', decrement);
            inc.on('click', increment);
         }

         // Уменьшим значение
         function decrement() {
            var value = parseInt(el[0].value);
            value--;

            if (!min || value >= min) {
               el[0].value = value;
            }
         };

         // Увеличим значение
         function increment() {
            var value = parseInt(el[0].value);

            value++;

            if (!max || value <= max) {
               el[0].value = value++;
            }
         };

      }

      el.each(function () {
         init($(this));
      });
   };

   $(field).each(function () {
      fieldCount($(this));
   });
}

catalogItemCounter('.fieldCount');







var timer;
var compareDate = new Date();
compareDate.setDate(compareDate.getDate() + 7);
timer = setInterval(function () {
   timeBetweenDates(compareDate);
}, 1000);
function timeBetweenDates(toDate) {
   var dateEntered = toDate;
   var now = new Date();
   var difference = dateEntered.getTime() - now.getTime();
   if (difference <= 0) {
      clearInterval(timer);
   } else {
      var seconds = Math.floor(difference / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
      var days = Math.floor(hours / 24);
      hours %= 24;
      minutes %= 60;
      seconds %= 60;
      $("#days").text(days);
      $("#hours").text(hours);
      $("#minutes").text(minutes);
      $("#seconds").text(seconds);
   }
}





$(document).ready(function () {
   $('.zoom-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      image: {
         verticalFit: true,
         titleSrc: function (item) {
            return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
         }
      },
      gallery: {
         enabled: true
      },
      zoom: {
         enabled: true,
         duration: 300, // don't foget to change the duration also in CSS
         opener: function (element) {
            return element.find('img');
         }
      }

   });
});




$(function () {
   $("a.button").click(function (e) {
      e.preventDefault();
      var href = $(this).attr('href');

      $([document.documentElement, document.body]).animate({
         scrollTop: $(href).offset().top
      }, 1000);
   });

   $('.form-form').submit(function (e) {
      e.preventDefault();

      var _this = $(this);
      var data = _this.serialize();
      var btn = _this.find('button[type=submit]');
      var btnText = btn.text();

      btn.text('Отправка...');

      $.ajax({
         url: "send.php",
         method: "POST",
         data: data,
         success: function (res) {
            btn.text(btnText);
            btn.before('<div style="text-align: center; margin-top: 20px; color: #0B9409; margin-bottom: -10px;">Сообщение успешно отправно!</div>');
         }
      });
   })
})