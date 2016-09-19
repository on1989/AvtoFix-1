// START HOME PAGE



//START STAR 
(function () {
  'use strict';

  angular
    .module('app', [])
    .controller('RatingController', RatingController)
    .directive('starRating', starRating);

  function RatingController() {
    this.rating1 = 5;
    this.rating2 = 3;
    this.rating3 = 4;
    this.rating4 = 1;
    this.rating5 = 4;
    this.rating6 = 3;
    this.rating7 = 1;
    this.rating8 = 2;
    this.isReadonly = true;
    this.rateFunction = function (rating) {
      console.log('Rating selected: ' + rating);
    };
  }

  function starRating() {
    return {
      restrict: 'EA',
      template: '<ul class="star-rating" ng-class="{readonly: readonly}">' +
        '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
        '    <i class="fa fa-star"></i>' + // or &#9733
        '  </li>' +
        '</ul>',
      scope: {
        ratingValue: '=ngModel',
        max: '=?', // optional (default is 5)
        onRatingSelect: '&?',
        readonly: '=?'
      },
      link: function (scope, element, attributes) {
        if (scope.max == undefined) {
          scope.max = 5;
        }

        function updateStars() {
          scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled: i < scope.ratingValue
            });
          }
        };
        scope.toggle = function (index) {
          if (scope.readonly == undefined || scope.readonly === false) {
            scope.ratingValue = index + 1;
            scope.onRatingSelect({
              rating: index + 1
            });
          }
        };
        scope.$watch('ratingValue', function (oldValue, newValue) {
          if (newValue) {
            updateStars();
          }
        });
      }
    };
  }
})();
//END STAR 

//$(document).ready(function () {



  //START SLIDER
  $('.slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
    },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
    },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
    }
]
  });
  //END SLIDER	

  // START TEXT HIDE	
  //плагин
  jQuery.fn.liTextLength = function (options) {
    // настройки по умолчанию
    var o = jQuery.extend({
      length: 44, //Видимое кол-во символов
      afterLength: '...', //Текст после видимого содержания
      fullText: true, //Добавить ссылку для отображения скрытого текста
      moreText: '<br>полный&nbsp;текст', //Текст ссылки до показа скрытого содержания
      lessText: '<br>скрыть&nbsp;полный&nbsp;текст' //Текст ссылки после показа скрытого содержания
    }, options);
    return this.each(function () {
      var
        $el = $(this),
        elText = $.trim($el.text()),
        elLength = elText.length;
      if (elLength > o.length) {
        var
          textSlice = $.trim(elText.substr(0, o.length)),
          textSliced = $.trim(elText.substr(o.length));
        if (textSlice.length < o.length) {
          var
            textVisible = textSlice,
            textHidden = $.trim(elText.substr(o.length));
        } else {
          var
            arrSlice = textSlice.split(' '),
            popped = arrSlice.pop(),
            textVisible = arrSlice.join(' ') + ' ',
            textHidden = popped + textSliced + ' ';
        };
        var
          $elTextHidden = $('<b>').addClass('elTextHidden').html(textHidden),
          $afterLength = $('<b>').addClass('afterLength').html(o.afterLength + ''),
          $more = $('<b>').addClass('more').html(o.moreText);
        $el.text(textVisible).append($afterLength).append($elTextHidden);
        var displayStyle = $elTextHidden.css('display');
        $elTextHidden.hide();
        if (o.fullText) {
          $el.append($more);
          $more.click(function () {
            if ($elTextHidden.is(':hidden')) {
              $elTextHidden.css({
                display: displayStyle
              });
              $more.html(o.lessText);
              $afterLength.hide();
            } else {
              $elTextHidden.hide();
              $more.html(o.moreText);
              $afterLength.show();
            };
            return false;
          });
        } else {
          $elTextHidden.remove();
        };
      };
    });
  };
  $('.text-hidden').liTextLength({
    length: 44,
    afterLength: '...',
    fullText: false
  });

  //START MENU
  ;

  $(".icon-messages > li > a, .balance > li > a, .balance-mobile > li > a, .language > li > a").each(function (i, item) {
    $(this).attr("data-close", "true").click(function (e) {
      e.preventDefault();
      if ( $(this).attr("data-close") === 'true' ) {
        $(this).siblings(".sub-menu").show();
        $(item).attr("data-close", "false");
        $('i.fa-times').click(function () {
          $(".sub-menu").hide();
          $(item).attr("data-close", "true");
        });
      } else {
        $(this).siblings(".sub-menu").hide();
        $(item).attr("data-close", "true");
      }
    });
  });

  $(window).click(function(e) {
    var target = $(e.target).hasClass("mobile-menu");
    var openClass = $(e.target).hasClass("fa-times");
    var closeClass = $(e.target).hasClass("fa-bars");
    var mobMenu = $(".mobile-menu");

    if (target && closeClass) {
      $(".header-block-2").css("display", "block");
      mobMenu.removeClass('fa-bars').addClass('fa-times');
    } else if ((target && openClass) || (mobMenu.hasClass("fa-times") && !target) ) {
         $(".header-block-2").css("display", "none");
         mobMenu.addClass('fa-bars').removeClass('fa-times');
    }

  });

  $(window).click(function(e) {
    var target = $(e.target).hasClass("burger-menu");
    var openClass = $(e.target).hasClass("fa-times");
    var closeClass = $(e.target).hasClass("fa-bars");
    var mobMenu = $(".burger-menu");

    if (target && closeClass) {
      $(".landing-page .mob-menu-landing").css("display", "block");
      mobMenu.removeClass('fa-bars').addClass('fa-times');
    } else if (target && openClass || (!target || openClass) ) {
       $(".landing-page .mob-menu-landing").css("display", "none");
       mobMenu.addClass('fa-bars').removeClass('fa-times');
    }
  });
  //END MENU	

  $(".slider-menu .item-slider a").click(function(event) {
    event.preventDefault();
  });

  //HIDE CLICK BODY
  $(document).mouseup(function (e) {
    var folder = $(".sub-menu, .input .categories");

    if (!folder.is(e.target) && folder.has(e.target).length === 0) {
      folder.hide();
    }
  });

//});

// END TEXT HIDE

// END HOME PAGE
//START FREELANCER SEARCH

// CHECKBOX MENU
$("#test1").click(function () {
    $(this).toggleClass('checked');
  if($(this).hasClass('checked')){
    $('.td .checkbox input').removeClass('checked');
  }else
    $('.td .checkbox input').addClass('checked');
});
$(".checkbox input").click(function () {
  $(this).toggleClass('checked');
});
//END CHECKBOX MENU

//START CUSTOM SELECT
$(".custom-select").each(function() {
  var classes = $(this).attr("class"),
      id      = $(this).attr("id"),
      name    = $(this).attr("name");
  var template =  '<div class="' + classes + '">';
      template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
      template += '<div class="custom-options">';
      $(this).find("option").each(function() {
        template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
      });
  template += '</div></div>';

  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$(".custom-option:first-of-type").hover(function() {
  $(this).parents(".custom-options").addClass("option-hover");
}, function() {
  $(this).parents(".custom-options").removeClass("option-hover");
});
$(".custom-select-trigger").on("click", function(event) {
  $('html').one('click',function() {
    $(".custom-select").removeClass("opened");
  });
  $(this).parents(".custom-select").toggleClass("opened");
  event.stopPropagation();
});
$(".custom-option").on("click", function() {
  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
  $(this).addClass("selection");
  $(this).parents(".custom-select").removeClass("opened");
  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
});
//END CUSTOM SELECT

$('.checkbox-menu').each(function(){
    $(this).click(function(){
        $(this).toggleClass('active');
    });
});

var checkedInput = 1;
$(".checkbox-menu input").each(function() {
	$(this).click(function(){
		if (checkedInput) {
			$(this).addClass('checked');
            $(this).closest('.messages-header-bottom ').next().find('input').addClass('checked');
			checkedInput = 0;
		} else {
			$(this).removeClass('checked');
             $(this).closest('.messages-header-bottom').next().find('input').removeClass('checked');
			checkedInput = 1;
		}
	});
});

$(".checkbox-menu-submenu .all").each(function() {
	$(this).click(function(){
		if (checkedMenu) {
            $(this).closest('.messages-header-bottom').next().find('input').addClass('checked');
            $(this).closest('.checkbox-menu').find('input').addClass('checked');
			checkedMenu = 0;
		} else {
			$(this).removeClass('checked');
            $(this).closest('.messages-header-bottom').next().find('input').removeClass('checked');
            $(this).closest('.checkbox-menu').find('input').removeClass('checked');
			checkedMenu = 1;
		}
	});
});

$(".checkbox-menu-submenu .read").each(function() {
	$(this).click(function(){
		if (checkedMenu) {
            $(this).closest('.messages-header-bottom').next().find('.read input').addClass('checked');

			checkedMenu = 0;
		} else {
			$(this).removeClass('checked');
            $(this).closest('.messages-header-bottom').next().find('.read input').removeClass('checked');

			checkedMenu = 1;
		}
	});
});

$(".checkbox-menu-submenu .not-read").each(function() {
	$(this).click(function(){
		if (checkedMenu) {
            $(this).closest('.messages-header-bottom').next().find('.not-read input').addClass('checked');

			checkedMenu = 0;
		} else {
			$(this).removeClass('checked');
            $(this).closest('.messages-header-bottom').next().find('.not-read input').removeClass('checked');

			checkedMenu = 1;
		}
	});
});
var checkedMenu = 1;
$(".checkbox-menu input").each(function() {
	$(this).click(function(){
		if (checkedMenu) {
            $(this).closest('.financial-report-header').next().find('input').addClass('checked');
			checkedMenu = 0;
		} else {
			$(this).removeClass('checked');
            $(this).closest('.financial-report-header').next().find('input').removeClass('checked');

			checkedMenu = 1;
		}
	});
});

// DATAPICKER
if ($('#datetimepicker').length > 0) {
  $('#datetimepicker').datepicker({
    keyboardNavigation: false,
    forceParse: false,
    autoclose: true,
    todayHighlight: true,
    toggleActive: true,
	language: "ru"
});
}
// END DATAPICKER

// lightBox
  $(function(){
    if ($(".fancybox").length > 0)
    $(".fancybox").fancybox();
  });
// END lightBox

//START ATR MENU
var actMenu = 1
$(".act .button").each(function () {
  $(this).click(function () {
    if (actMenu) {
      $(".act .subMenu").show();
      actMenu = 0;
    } else {
      $(".act .subMenu").hide();
      actMenu = 1;
    }
  });
});
//END ATR MENU
//END FREELANCER SEARCH
$(document).ready(function () {
  google.maps.event.addDomListener(window, 'load', init);

  function init() {

    var mapOptions = {
      zoom: 11,
      center: new google.maps.LatLng(40.6700, -73.9400),
      styles: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e9e9e9"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 29
        }, {
          "weight": 0.2
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 18
        }]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 16
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }, {
          "lightness": 21
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dedede"
        }, {
          "lightness": 21
        }]
      }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#ffffff"
        }, {
          "lightness": 16
        }]
      }, {
        "elementType": "labels.text.fill",
        "stylers": [{
          "saturation": 36
        }, {
          "color": "#333333"
        }, {
          "lightness": 40
        }]
      }, {
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f2f2f2"
        }, {
          "lightness": 19
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#fefefe"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#fefefe"
        }, {
          "lightness": 17
        }, {
          "weight": 1.2
        }]
      }]
    };
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(40.6700, -73.9400),
      map: map,
      icon: "images/marker-maps.png",
      title: 'Snazzy!'
    });
  }
});

$(document).ready(function () {

  // ПОЛЗУНОК
  
  $(function(){
    if ($("#slider").length > 0) {
      $("#slider").slider({
    step: 100,
    range: true,
    min: 100,
    max: 30000,
    values: [100, 5000],
    slide: function (event, ui) {
      $("input#minCost").val($("#slider").slider("values", 0));
      $("input#maxCost").val($("#slider").slider("values", 1));

      $(".first-after").html($("input#minCost").val() + " грн");
      $(".last-after").html($("input#maxCost").val() + " грн");
    }

  });
  // добавление подписи под ползунками
  $($('#slider .ui-slider-handle')[0]).append("<span class='after first-after'>100 грн</span>");
  $($('#slider .ui-slider-handle')[1]).append("<span class='after last-after'>5000 грн</span>");

  // Изменение местоположения ползунка при вводе данных в первый элемент input
  $("input#minCost").change(function () {
    var value1 = $("input#minCost").val();
    var value2 = $("input#maxCost").val();
    var after1 = $('#slider .ui-slider-handle')[1];
    var after2 = $('#slider .ui-slider-handle')[2];

    if (parseInt(value1) > parseInt(value2)) {
      value1 = value2;
      $("input#minCost").val(value1);
    }
    $("#slider").slider("values", 0, value1);
    $(".first-after").html(value1 + " грн");
  });

  // Изменение местоположения ползунка при вводе данных в второй элемент input
  $("input#maxCost").change(function () {
    var value1 = $("input#minCost").val();
    var value2 = $("input#maxCost").val();

    if (value2 > 30000) {
      value2 = 30000;
      $("input#maxCost").val(30000)
    }

    if (parseInt(value1) > parseInt(value2)) {
      value2 = value1;
      $("input#maxCost").val(value2);
    }
    $("#slider").slider("values", 1, value2);
    $(".last-after").html(value2 + " грн");
  });

  // фильтрация ввода в поля только цифры
  $('input#minCost, input#maxCost').keypress(function (event) {
    var key, keyChar;
    if (!event) var event = window.event;

    if (event.keyCode) key = event.keyCode;
    else if (event.which) key = event.which;

    if (key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39) return true;
    keyChar = String.fromCharCode(key);

    if (!/\d/.test(keyChar)) return false;

  });
    }
  });
  
  // Выпадающий список
  
  if ($("#tokenize").length > 0) {
    var source = [
                  {label: 'Диагностика  двигателей', value: 'Диагностика  двигателей', img_1: "icon-car_engine"}, 
                  {label: 'Общая диагностика', value: 'Общая диагностика', img_1: "icon-car_look"},
                  {label: 'Рихтовка', value: 'Рихтовка', img_1: "icon-car_look"},
                  {label: 'Шиномантаж', value: 'Шиномантаж', img_1: "icon-car_tires"},
                  {label: 'Диагностика ходовой', value: 'Диагностика ходовой', img_1: "icon-car_chassis"},
                  {label: 'Покраска', value: 'Покраска', img_1: "icon-car_painting"},
                  {label: 'Сварка', value: 'Сварка', img_1: "icon-welding"},
                  {label: 'Балансировка колес', value: 'Балансировка колес', img_1: "icon-car_balance"},
                  {label: 'Ремонт ходовой', value: 'Ремонт ходовой', img_1: "icon-car_chassis"},
                  {label: 'Ремонт двигателей', value: 'Ремонт двигателей', img_1: "icon-car_engine"},
                  {label: 'Электрика', value: 'Электрика', img_1: "icon-car_electronick"},
                  {label: 'Тюниниг', value: 'Тюниниг', img_1: "icon-car_tuning"},
                  {label: 'Предпродажная подготовка', value: 'Предпродажная подготовка', img_1: "icon-car_sell"},
                  {label: 'Химчистка', value: 'Химчистка', img_1: "icon-car_wash"},
                  {label: 'Пошив салона', value: 'Пошив салона', img_1: "icon-car_seat"},
                  {label: 'Реставрация салона', value: 'Реставрация салона', img_1: "icon-car_seat"},
                  {label: 'Медвежатники', value: 'Медвежатники', img_1: "icon-car_lock"},
                  {label: 'Эвакуаторы', value: 'Эвакуаторы', img_1: "icon-car_evacuator"},
                  {label: 'Мастер на выезд', value: 'Мастер на выезд', img_1: "icon-car_master"},
                  {label: 'Аренда помещения под ремонт', value: 'Аренда помещения под ремонт', img_1: "icon-car_garage"},
                  {label: 'Аренда инструментов', value: 'Аренда инструментов', img_1: "icon-toolbox"}];
          $('#tokenize').tokenize({
            onDropdownAddItem: function() {
              $(".Dropdown li").each(function (e) {
                  $(this).addClass("item").html("<i class=" + source[$(this).attr("data-value")-1]["img_1"] + "></i><b>" + $(this).attr("data-text") + "</b><i class='fa fa-plus' aria-hidden='true'></i>");
              });
            }
          });
  }
  
  if ($( "#autocomplete" ).length > 0) {
    $( "#autocomplete" ).autocomplete({
        lookup: [ 'Диагностика  двигателей', 'Общая диагностика', 'Рихтовка', 'Шиномантаж', 'Диагностика ходовой', 'Покраска', 'Сварка', 'Балансировка колес', 'Ремонт ходовой', 'Ремонт двигателей', 'Электрика', 'Тюниниг', 'Предпродажная подготовка', 'Химчистка', 'Пошив салона', 'Реставрация салона', 'Медвежатники', 'Эвакуаторы', 'Мастер на выезд', 'Аренда помещения под ремонт', 'Аренда инструментов' ]
    });
  }


});
