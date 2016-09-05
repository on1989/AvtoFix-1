// START HOME PAGE



//START STAR 
(function() {
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
    this.rateFunction = function(rating) {
      console.log('Rating selected: ' + rating);
    };
  }

  function starRating() {
    return {
      restrict: 'EA',
      template:
        '<ul class="star-rating" ng-class="{readonly: readonly}">' +
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
      link: function(scope, element, attributes) {
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
        scope.toggle = function(index) {
          if (scope.readonly == undefined || scope.readonly === false){
            scope.ratingValue = index + 1;
            scope.onRatingSelect({
              rating: index + 1
            });
          }
        };
        scope.$watch('ratingValue', function(oldValue, newValue) {
          if (newValue) {
            updateStars();
          }
        });
      }
    };
  }
})();
//END STAR 

$(document).ready(function(){
	
	
	
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
    jQuery.fn.liTextLength = function(options){
    // настройки по умолчанию
    var o = jQuery.extend({
        length: 44,                                    //Видимое кол-во символов
        afterLength: '...',                                //Текст после видимого содержания
        fullText:true,                                    //Добавить ссылку для отображения скрытого текста
        moreText: '<br>полный&nbsp;текст',                //Текст ссылки до показа скрытого содержания
        lessText: '<br>скрыть&nbsp;полный&nbsp;текст'    //Текст ссылки после показа скрытого содержания
    },options);
    return this.each(function(){
        var
        $el = $(this),
        elText = $.trim($el.text()),
        elLength = elText.length;
        if(elLength > o.length){
            var
            textSlice = $.trim(elText.substr(0,o.length)),
            textSliced = $.trim(elText.substr(o.length));
            if(textSlice.length < o.length){
                var
                textVisible = textSlice,
                textHidden = $.trim(elText.substr(o.length));
            }else{
                var
                arrSlice = textSlice.split(' '),
                popped = arrSlice.pop(),
                textVisible = arrSlice.join(' ') + ' ',
                textHidden = popped + textSliced  + ' ';
            };
            var
            $elTextHidden = $('<b>').addClass('elTextHidden').html(textHidden),
            $afterLength = $('<b>').addClass('afterLength').html(o.afterLength + ''),
            $more = $('<b>').addClass('more').html(o.moreText);
            $el.text(textVisible).append($afterLength).append($elTextHidden);
            var displayStyle = $elTextHidden.css('display');
            $elTextHidden.hide();
            if(o.fullText){
                $el.append($more);
                $more.click(function(){
                    if($elTextHidden.is(':hidden')){
                        $elTextHidden.css({display:displayStyle})    ;
                        $more.html(o.lessText);
                        $afterLength.hide();
                    }else{
                        $elTextHidden.hide();
                        $more.html(o.moreText);
                        $afterLength.show();
                    };
                    return false;
                });
            }else{
                $elTextHidden.remove();
            };
        };
    });
};
	$('.text-hidden').liTextLength({
		length: 44,
		afterLength: '...',
		fullText:false
	});
	
//START MENU
;
var menuOpen = 1;

$(".messages li a, .balance li a").each(function() {
	$(this).click(function(){
		if (menuOpen) {
			$(this).siblings(".sub-menu").show();
			menuOpen = 0;
			$('i').click(function(){
				$(".sub-menu").hide();
			});
		} else {
			$(this).siblings(".sub-menu").hide();
			menuOpen = 1;
		}
	});
});
var mobileMenuOpen = 1;

$(".mobile-menu").each(function() {
	$(this).click(function(){
		if (mobileMenuOpen) {
			$(".menu").slideDown();
			$('.mobile-menu').removeClass('fa-bars');
			$('.mobile-menu').addClass('fa-times');
			mobileMenuOpen = 0;
		} else {
			$(".menu").slideUp();
			$('.mobile-menu').addClass('fa-bars');
			$('.mobile-menu').removeClass('fa-times');
			mobileMenuOpen = 1;
		}
	});
});	
//END MENU	
//HIDE CLICK BODY
$(document).mouseup(function (e)  {
	var folder = $(".sub-menu, .input .categories");

	if (!folder.is(e.target) && folder.has(e.target).length === 0) {
		folder.hide();
	}
});
});

// END TEXT HIDE

// END HOME PAGE
//START FREELANCER SEARCH

//START INPUT CATEGORIES
var categoriesMenu = 1
$(".cat input").each(function() {
	$(this).click(function(){
		if (categoriesMenu) {
			$(".categories").slideDown();
			categoriesMenu = 0;
		} else {
			$(".categories").slideUp();
			categoriesMenu = 1;
		}
	});
});	
//END INPUT CATEGORIES
//START CHECKBOX MENU
var checkBoxMenu = 1
$(".checkbox-menu").each(function() {
	$(this).click(function(){
		if (checkBoxMenu) {
			$(".checkbox-subMenu").show();
			checkBoxMenu = 0;
		} else {
			$(".checkbox-subMenu").hide();
			checkBoxMenu = 1;
		}
	});
});
//END CHECKBOX MENU
//START ATR MENU
var actMenu = 1
$(".act .button").each(function() {
	$(this).click(function(){
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
$(document).ready(function(){
google.maps.event.addDomListener(window, 'load', init);

function init() {
	
	var mapOptions = {
		zoom: 11,
		center: new google.maps.LatLng(40.6700, -73.9400),
		styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
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