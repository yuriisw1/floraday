
//IBG
jQuery(document)[0].querySelectorAll(".ibg").forEach(el => {
   if (el.querySelector('img')) {
      el.style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
      el.querySelector('img').style.display = 'none';
   }
});






"use strict";

(function () {
   let originalPositions = [];
   let daElements = document.querySelectorAll('[data-da]');
   let daElementsArray = [];
   let daMatchMedia = [];
   //Заполняем массивы
   if (daElements.length > 0) {
      let number = 0;
      for (let index = 0; index < daElements.length; index++) {
         const daElement = daElements[index];
         const daMove = daElement.getAttribute('data-da');
         if (daMove != '') {
            const daArray = daMove.split(',');
            const daPlace = daArray[1] ? daArray[1].trim() : 'last';
            const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
            const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
            const daDestination = document.querySelector('.' + daArray[0].trim())
            if (daArray.length > 0 && daDestination) {
               daElement.setAttribute('data-da-index', number);
               //Заполняем массив первоначальных позиций
               originalPositions[number] = {
                  "parent": daElement.parentNode,
                  "index": indexInParent(daElement)
               };
               //Заполняем массив элементов 
               daElementsArray[number] = {
                  "element": daElement,
                  "destination": document.querySelector('.' + daArray[0].trim()),
                  "place": daPlace,
                  "breakpoint": daBreakpoint,
                  "type": daType
               }
               number++;
            }
         }
      }
      dynamicAdaptSort(daElementsArray);

      //Создаем события в точке брейкпоинта
      for (let index = 0; index < daElementsArray.length; index++) {
         const el = daElementsArray[index];
         const daBreakpoint = el.breakpoint;
         const daType = el.type;

         daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
         daMatchMedia[index].addListener(dynamicAdapt);
      }
   }
   //Основная функция
   function dynamicAdapt(e) {
      for (let index = 0; index < daElementsArray.length; index++) {
         const el = daElementsArray[index];
         const daElement = el.element;
         const daDestination = el.destination;
         const daPlace = el.place;
         const daBreakpoint = el.breakpoint;
         const daClassname = "_dynamic_adapt_" + daBreakpoint;

         if (daMatchMedia[index].matches) {
            //Перебрасываем элементы
            if (!daElement.classList.contains(daClassname)) {
               let actualIndex = indexOfElements(daDestination)[daPlace];
               if (daPlace === 'first') {
                  actualIndex = indexOfElements(daDestination)[0];
               } else if (daPlace === 'last') {
                  actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
               }
               daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
               daElement.classList.add(daClassname);
            }
         } else {
            //Возвращаем на место
            if (daElement.classList.contains(daClassname)) {
               dynamicAdaptBack(daElement);
               daElement.classList.remove(daClassname);
            }
         }
      }
      customAdapt();
   }

   //Вызов основной функции
   dynamicAdapt();

   //Функция возврата на место
   function dynamicAdaptBack(el) {
      const daIndex = el.getAttribute('data-da-index');
      const originalPlace = originalPositions[daIndex];
      const parentPlace = originalPlace['parent'];
      const indexPlace = originalPlace['index'];
      const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
      parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
   }
   //Функция получения индекса внутри родителя
   function indexInParent(el) {
      var children = Array.prototype.slice.call(el.parentNode.children);
      return children.indexOf(el);
   }
   //Функция получения массива индексов элементов внутри родителя 
   function indexOfElements(parent, back) {
      const children = parent.children;
      const childrenArray = [];
      for (let i = 0; i < children.length; i++) {
         const childrenElement = children[i];
         if (back) {
            childrenArray.push(i);
         } else {
            //Исключая перенесенный элемент
            if (childrenElement.getAttribute('data-da') == null) {
               childrenArray.push(i);
            }
         }
      }
      return childrenArray;
   }
   //Сортировка объекта
   function dynamicAdaptSort(arr) {
      arr.sort(function (a, b) {
         if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
      });
      arr.sort(function (a, b) {
         if (a.place > b.place) { return 1 } else { return -1 }
      });
   }
   //Дополнительные сценарии адаптации
   function customAdapt() {
      //const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
   }
}());

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

var cdate = "02:03:32:00";
jQuery(function ($) { $("#ps_counter").countdown({ image: "js/digits.png", startTime: cdate }); });




function catalogItemCounter(field){
			
   var fieldCount = function(el) {

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
         if(!el.attr('disabled')){
            dec.on('click', decrement);
            inc.on('click', increment);
         }

         // Уменьшим значение
         function decrement() {
            var value = parseInt(el[0].value);
            value--;

            if(!min || value >= min) {
               el[0].value = value;
            }
         };

         // Увеличим значение
         function increment() {
            var value = parseInt(el[0].value);
               
            value++;

            if(!max || value <= max) {
               el[0].value = value++;
            }
         };
         
      }

      el.each(function() {
         init($(this));
      });
   };

   $(field).each(function(){
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


