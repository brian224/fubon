<<<<<<< HEAD
'use strict';
// angular JS name
var Ctrl = angular.module(document.getElementsByTagName('body')[0].getAttribute('ng-app'), ['ngSanitize']),
	AgElem = angular.element;
var $animationend, $userAgent;
var $href = window.location.href,
	$location = window.location.protocol + '//' + window.location.host + '/',
	$channel = $href.split('/')[($href.split('/').length - 1)] !== '' ? $href.split('/')[($href.split('/').length - 1)].split('.')[0] : $href.split('/')[($href.split('/').length - 2)].split('.')[0];
var $Device = /Android|webOS|iPad|BlackBerry/i,
	$userDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
var $Screen = 1000;
var $SugarFunBoxSet = {
	$mobile: false,
	$backdropclose: false,
	$loadimg: '<div class="b-loading"><span class="m-icon-stack"><i class="m-icon m-icon-fubon-blue is-absolute"></i><i class="m-icon m-icon-fubon-green"></i></span></div>'
}

/* aside accordion item add class */
var $AsideItem = document.getElementById('aside-item');

if ($AsideItem !== null) {
	for (var i = 0, $elem = $AsideItem.getElementsByTagName('li'); i < $elem.length; i++) {
		if ($elem[i].getAttribute('data-channel') !== null && $elem[i].getAttribute('data-channel') === $channel) {
			if ($elem[i].parentNode.parentNode.parentNode.nodeName.toLowerCase() === 'li') {
				if ($elem[i].parentNode.parentNode.parentNode.className.length !== 0) $elem[i].parentNode.parentNode.parentNode.className = $elem[i].parentNode.parentNode.parentNode.className + ' is-curr';
				else $elem[i].parentNode.parentNode.parentNode.className = $elem[i].parentNode.parentNode.parentNode.className + 'is-curr';
			}

			if ($elem[i].className.length === 0) $elem[i].className = ($elem[i].className + 'is-active is-curr');
			else $elem[i].className = ($elem[i].className + ' is-active is-curr');
		}
	};
}

function userAgentFun() {
	if (window.innerWidth < 768) {
		$userAgent = 'Mobile';
	} else {
		if ($Device.test(navigator.userAgent)) {
			$userAgent = 'Tablet';
		} else {
			$userAgent = 'PC';
		}
	}
}

if ($Device.test(navigator.userAgent)) {
	$animationend = 'webkitAnimationEnd webkitTransitionEnd';
} else {
	$animationend = 'animationend transitionend';
}

/* ng-repeat-done directive */
Ctrl.directive('ngRepeatDone', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			if (scope.$last) {
				if (typeof(AgElem('.ng-controller').scope().repeat) !== 'undefined' && AgElem('.ng-controller').scope().repeat.Callback !== undefined) {
					AgElem('.ng-controller').scope().repeat.Callback(elem);
				}

				scope.Common.Cloak = false;
			}
		}
	};
}]);

/* ng-image-load directive */
Ctrl.directive('ngImageLoad', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			var $image = elem.find('img');

			$image.bind('load', function() {
				var $this = AgElem(this);
				elem.find('.b-loading').addClass('is-hide');
				$this.addClass('is-loaded');
			});
		}
	};
}]);

/* ng-checkbox directive */
Ctrl.directive('ngCheckbox', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			var $elem = elem.find('.m-form[type="checkbox"]');

			$elem.on('click', function(e) {
				AgElem(this).parent().find('.m-icon').toggleClass('is-hide');
			});
		}
	};
}]);

/* ng-radio directive */
Ctrl.directive('ngRadio' , ['$document' , function($document) {
	return {
		restrict : 'C',
		link	 : function(scope , elem , attrs) {
			var $elem = elem.find('.m-form[type="radio"]');
			
			elem.find('.m-icon.is-hide').addClass('checked');
			elem.find('.m-form[type="radio"]:checked').parent().find('.m-icon').addClass('is-hide');
			elem.find('.m-form[type="radio"]:checked').parent().find('.m-icon.checked').removeClass('is-hide');

			$elem.on('click' , function(e){
				elem.find('.m-icon').removeClass('is-hide');
				elem.find('.m-icon.checked').addClass('is-hide');
				AgElem(this).parent().find('.m-icon').addClass('is-hide');
				AgElem(this).parent().find('.m-icon.checked').removeClass('is-hide');
			});
		}
	};
}]);

/* ng-top directive */
Ctrl.directive('ngTop', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click', function(e) {
				e.preventDefault();
				scope.Common.Animate.ScrollTop(500);
			});
		}
	};
}]);

/* ng-search directive */
Ctrl.directive('ngSearch', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click', function(e) {
				if ( ! scope.Common.Search.Click ) {
					e.preventDefault();
					scope.Common.Search.Click = true;
					AgElem('.m-form-search').find('input[type="search"]').focus();
				} else {
					if ( scope.Common.Search.Value === '' ) {
						e.preventDefault();
					}
				}

				scope.$apply();

				$document.off('click touchstart').on('click touchstart', function(e) {
					e.stopPropagation();
					if (!$(e.target).is('.m-header-search , .m-header-search *')) {
						scope.Common.Search.Click = false;
						AgElem('.m-form-search').find('input[type="search"]').blur();
						scope.$apply();
						$document.off('click touchstart');
					}
				});
			});
		}
	};
}]);

/* ng-search-result directive */
Ctrl.directive('ngSearchResult', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('keyup', function(e) {
				if ( scope.Common.Search.Value !== '' ) {
					if ( e.keyCode === 13 ) {
						window.location = AgElem('.ng-search').attr('href');
					}
				}
			});
		}
	};
}]);


/* ng-navicon directive */
Ctrl.directive('ngNavicon', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click', function(e) {
				scope.Common.Nav.Mobile.Click = !scope.Common.Nav.Mobile.Click;
				AgElem('.l-nav').removeClass('b-no-transition');
				scope.$apply();

				if (scope.Common.Nav.Mobile.Click) {
					AgElem('html , body').css('overflow-x', 'hidden');
					if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
						AgElem('.l-body').one($animationend, function() {
							scope.Common.Nav.Mobile.Lock = !scope.Common.Nav.Mobile.Lock;
							scope.$apply();
						});
					} else {
						scope.Common.Nav.Mobile.Lock = !scope.Common.Nav.Mobile.Lock;
						scope.$apply();
					}
				} else {
					if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
						AgElem('.l-nav').one($animationend, function() {
							AgElem('html , body').removeAttr('style');
							scope.$apply();
						});
					} else {
						AgElem('html , body').removeAttr('style');
						scope.$apply();
					}
				}

				$document.off('click touchstart').on('click touchstart', function(e) {
					e.stopPropagation();
					if (!$(e.target).is('.ng-navicon , .ng-navicon * , .l-nav , .l-nav *')) {
						scope.Common.Nav.Mobile.Click = false;
						scope.Common.Nav.Mobile.Lock = false;
						AgElem('html , body').removeAttr('style');
						scope.$apply();
						$document.off('click touchstart');
					}
				});
			});
		}
	};
}]);

/* ng-nav-item directive */
Ctrl.directive('ngNavItem', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			var $elementLi = elem.find(' > li'),
				$elementLink = $elementLi.find(' > a');

			// AgElem(window).finish().delay(0).queue(function(){

			// });

			if ( $elementLi.hasClass('is-curr') ) {
				scope.Common.Nav.Bar.Hover = true;
				scope.Common.Nav.Submenu.Position(elem.find(' > li.is-curr'));
			}

			$elementLi.hover(function() {
				if ($userAgent === 'PC') {
					if (!$elementLi.hasClass('is-curr')) {
						scope.Common.Nav.Bar.Hover = !scope.Common.Nav.Bar.Hover;
					}
					scope.Common.Nav.Submenu.Position(AgElem(this));
				}
			}, function() {
				if ($userAgent !== 'Mobile') {
					if (!$elementLi.hasClass('is-curr')) {
						scope.Common.Nav.Bar.Hover = !scope.Common.Nav.Bar.Hover;
						scope.Common.Nav.Submenu.Left = 0;
						scope.Common.Nav.Submenu.MarginLeft = 0;
						scope.$apply();
					} else {
						scope.Common.Nav.Submenu.Position(elem.find(' > li.is-curr'));
					}
				}
			});

			$elementLink.on('click', function(e) {
				if ($userAgent === 'Mobile') {
					if (AgElem(this).next('div').length !== 0) {
						e.preventDefault();
						AgElem(this).parent().toggleClass('is-active').siblings().removeClass('is-active');
						AgElem('.ng-path').parent().removeClass('is-active');
					}
				} else if ($userAgent === 'Tablet') {
					if (AgElem(this).next('div').length !== 0) {
						e.preventDefault();
						scope.Common.Nav.Bar.Hover = true;
						scope.Common.Nav.Submenu.Position(AgElem(this).parent());
					}
				}
			});
		}
	};
}]);

/* ng-path directive */
Ctrl.directive('ngPath', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click', function(e) {
				e.preventDefault();
				if ($userAgent !== 'Mobile') {
					scope.Common.Nav.Path.Click = !scope.Common.Nav.Path.Click;
					scope.$apply();
				} else {
					AgElem('.ng-nav-item').find(' > li').removeClass('is-active');
					AgElem(this).parent().toggleClass('is-active').siblings().removeClass('is-active');
				}
			});
		}
	};
}]);

/* ng-pagination directive */
Ctrl.directive('ngPagination', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click', function(e) {
				e.preventDefault();
				AgElem('.ng-pagination-action .is-height-zero').removeClass('is-height-zero');
				scope.Common.Pagination.Active[0] = parseInt(attrs.value, 10);
				scope.Common.Pagination.Action('.ng-pagination-action');
				scope.$apply();
			});
		}
	};
}]);

/* ng-pagination-more directive */
Ctrl.directive('ngPaginationMore', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click', function(e) {
				e.preventDefault();
				if (!elem.hasClass('b-disabled')) {
					scope.Common.Pagination.Active[0] = (scope.Common.Pagination.Active[0] + parseInt(attrs.value, 10));
					scope.Common.Pagination.MobileAction();
				}
				scope.$apply();
			});
		}
	};
}]);


/* ng-sitemap directive */
Ctrl.directive('ngSitemap', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click', function(e) {
				e.preventDefault();
				scope.Common.Footer.Sitemap.Click = !scope.Common.Footer.Sitemap.Click;
				scope.$apply();
			});
		}
	};
}]);

/* ng-aside-select directive */
Ctrl.directive('ngAsideSelect', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click', function(e) {
				if (!elem.parents('.m-aside').hasClass('is-disabled')) {
					e.preventDefault();
					scope.Common.Aside.Selected = !scope.Common.Aside.Selected;
					scope.$apply();

					$document.off('click').on('click', function(e) {
						e.stopPropagation();

						if (!$(e.target).is('.ng-aside-accordion *')) {
							scope.Common.Aside.Selected = false;
							scope.$apply();
							$document.off('click');
						}
					});
				}
			});
		}
	};
}]);

/* ng-aside-accordion-item directive */
Ctrl.directive('ngAsideAccordionItem', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			var $element = elem.find(' > li > h6 > a');

			scope.Common.Aside.Toggle.Text = $element.parents('li.is-curr').find(' > h6 > a').text();

			$element.on('click', function(e) {
				if (AgElem(this).parents('li').hasClass('is-curr') && !AgElem(this).parents('li').hasClass('is-curred')) {
					AgElem(this).parents('li').removeClass('is-curr').addClass('is-curred');
					if ($userAgent === 'PC') {
						AgElem(this).parents('li').addClass('is-hide');
					} else {
						AgElem(this).parents('li').toggleClass('is-active').siblings().removeClass('is-active');
					}
				} else {
					$element.parents('li.is-curr').addClass('is-curred');
					AgElem(this).parents('li').removeClass('is-curr is-hide');
					if (AgElem(this).parent().next('div').length !== 0) {
						AgElem(this).parents('li').toggleClass('is-active').siblings().removeClass('is-active');
						if (!AgElem(this).parents('li').hasClass('is-active')) {
							$element.parents('li.is-curr.is-curred').removeClass('is-curred');
						}
					}
				}
				if (AgElem(this).parent().next('div').length !== 0) {
					e.preventDefault();
				}
				scope.$apply();
			});
		}
	};
}]);

/* ng-tel directive */
Ctrl.directive('ngTel', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click', function(e) {
				if ($userAgent === 'PC') {
					e.preventDefault();
				}
			});
		}
	};
}]);

/* ng-map directive */
Ctrl.directive('ngMap', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click', function(e) {
				e.preventDefault();

				AgElem(elem).SugarFunBox({
					mobile: $SugarFunBoxSet.mobile,
					backdropclose: $SugarFunBoxSet.backdropclose,
					click: false,
					loadimg: $SugarFunBoxSet.loadimg
				});
			});
		}
	};
}]);

/* ng-tab directive */
Ctrl.directive('ngTab', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			var $elementItem = elem.find(' > ul > li'),
				$elementTab = $elementItem.find('> a');

			AgElem(document).finish().delay(0).queue(function() {
				if (document.documentMode === 8 || navigator.userAgent.indexOf('MSIE 8.0') > 0 || window.innerWidth >= $Screen) {
					elem.addClass('b-no-transition');
					scope.Common.Tab.Height = ($elementItem.eq(0).outerHeight() + parseInt(elem.find(' > ul').css('margin-top'), 10));
					// for (var i = 0; i < $elementItem.length; i++) {
					// $elementTab.eq(i).css('left', ($elementTab.outerWidth() * i));
					// };
				}

				scope.Common.Tab.Width = $elementTab.outerWidth();
				$elementItem.find('> div').addClass('b-cloak');
				$elementItem.eq(scope.Common.Tab.ClickArray[0]).find('> div').removeClass('b-cloak');
				$elementItem.eq(scope.Common.Tab.ClickArray[1]).find('> div').removeClass('b-cloak');
				scope.$apply();
			});

			$elementTab.on('click', function(e) {
				var $this = AgElem(this),
					$index = $this.parent().index();

				e.preventDefault();
				elem.removeClass('b-no-transition');

				if (document.documentMode === 8 || navigator.userAgent.indexOf('MSIE 8.0') > 0 || window.innerWidth >= $Screen) {
					scope.Common.Tab.ClickArray[1] = scope.Common.Tab.ClickArray[0];
					scope.Common.Tab.ClickArray[0] = $index;
					$elementItem.eq(scope.Common.Tab.ClickArray[0]).find('> div').removeClass('b-cloak');
					scope.Common.Tab.Height = ($elementItem.eq($index).outerHeight() + parseInt(elem.find(' > ul').css('margin-top'), 10));
					scope.Common.Tab.Animate($elementItem.find('> div'));
					scope.Common.Tab.Left = $this.position().left;
				} else {
					$elementItem.find('> div').removeClass('b-cloak');
					AgElem(this).parent().toggleClass('is-active').siblings().removeClass('is-active');
				}
				scope.$apply();
			});
		}
	};
}]);

/* ng-tab-ctrl directive */
Ctrl.directive('ngTabCtrl', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click', function(e) {
				var $this = AgElem(this);
				e.preventDefault();
				AgElem('.ng-tab-slide > li').removeClass('b-no-transition');
				scope.Common.Tab.ClickArray[1] = scope.Common.Tab.ClickArray[0];
				scope.Common.Tab.ClickArray[0] = scope.$index;
				AgElem('.ng-tab-slide > li:eq('+ scope.Common.Tab.ClickArray[0] +')').removeClass('b-cloak');
				scope.Common.Tab.SlideAnimate(AgElem('.ng-tab-slide'));
				scope.$apply();
			});
		}
	};
}]);

/* ng-select directive */
Ctrl.directive('ngSelect', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.find(' select ').removeClass('is-bgcolor').wrap('<span class="is-label"></span>');
			elem.find(' select ').parent('span').prepend('<i class="m-icon m-icon-arrow-angle-down" />');

			for (var i = 0; i < elem.find(' select ').length; i++) {
				if (elem.find(' select ').eq(i).attr('disabled') === 'disabled') {
					elem.find(' select ').eq(i).parent().addClass('is-disabled');
				}
			};
		}
	};
}]);

/* ng-history-back directive */
Ctrl.directive('ngHistoryBack', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click', function(e) {
				e.preventDefault();
				window.history.back();
			});
		}
	};
}]);

Ctrl.controller('Ctrl', ['$scope', '$http', function($scope, $http) {
	$scope.Common = {
		IsReady   : false,
		UserAgent : '',
		Cloak     : true,
		Channel   : '',
		Search    : {
			Click : false,
			Value : ''
		},
		Nav : {
			Path : {
				Top        : 0,
				PaddingTop : parseInt(AgElem('.ng-nav').css('padding-top'), 10),
				Height     : 'auto',
				Click      : false
			},
			Mobile : {
				Click : false,
				Lock  : false
			},
			Submenu : {
				Left       : 0,
				MarginLeft : 0,
				Position   : function(element) {
					$scope.Common.Nav.Bar.Left = element.position().left;
					$scope.Common.Nav.Bar.Width = element.width();
					$scope.Common.Nav.Submenu.Left = 0;
					$scope.Common.Nav.Submenu.MarginLeft = 0;

					if (!$scope.$$phase) {
						$scope.$apply();
					};

					if (element.find('> div').length !== 0) {
						if ((element.find('> div').width() / 2) > (AgElem('.ng-nav-item').outerWidth() - (element.position().left + (element.width() / 2)))) {
							$scope.Common.Nav.Submenu.Left = (AgElem('.ng-nav-item').outerWidth()) - element.find('> div').width();
							$scope.$apply();
						} else {
							if (element.find('> div').width() < AgElem('.ng-nav-item').outerWidth()) {
								$scope.Common.Nav.Submenu.Left = (element.position().left + (element.width() / 2));
								$scope.Common.Nav.Submenu.MarginLeft = ((element.find('> div').width() / 2) * (-1));
								$scope.$apply();

								if (element.find('> div').offset().left < AgElem('.ng-nav-item').offset().left) {
									$scope.Common.Nav.Submenu.Left = 0;
									$scope.Common.Nav.Submenu.MarginLeft = 0;
									$scope.$apply();
								}
							}
						}
					}
				}
			},
			Bar : {
				Left  : 0,
				Width : 0,
				Hover : false
			}
		},
		Tab: {
			ClickArray : [0, 0],
			Left       : 0,
			Width      : 0,
			Height     : 'auto',
			Animate    : function(element) {
				var $this = this;

				if ($this.ClickArray[0] > $this.ClickArray[1]) {
					AgElem(window).finish().delay(0).queue(function() {
						element.css('left', '-100%');
					});

					if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
						element.one($animationend, function() {
							$this.ClickArray[1] = $this.ClickArray[0];
							element.addClass('b-no-transition');
							element.css('left', '0');
							element.addClass('b-cloak');
							element.eq($this.ClickArray[0]).removeClass('b-cloak');
							AgElem(window).finish().delay(0).queue(function() {
								element.removeClass('b-no-transition');
							});
						});
					} else {
						$this.ClickArray[1] = $this.ClickArray[0];
						AgElem(window).finish().delay(0).queue(function() {
							element.css('left', '0');
							element.addClass('b-cloak');
							element.eq($this.ClickArray[0]).removeClass('b-cloak');
						});
					}
				} else if ($this.ClickArray[0] < $this.ClickArray[1]) {
					if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
						element.addClass('b-no-transition');
						element.addClass('b-cloak');
						element.eq($this.ClickArray[0]).removeClass('b-cloak');
						element.eq($this.ClickArray[1]).removeClass('b-cloak');
						element.css('left', '-100%');
						AgElem(window).finish().delay(0).queue(function() {
							element.removeClass('b-no-transition');
							element.css('left', '0');
						});
						element.one($animationend, function() {
							$this.ClickArray[1] = $this.ClickArray[0];
							element.addClass('b-cloak');
							element.eq($this.ClickArray[0]).removeClass('b-cloak');
						});
					} else {
						$this.ClickArray[1] = $this.ClickArray[0];
						AgElem(window).finish().delay(0).queue(function() {
							element.css('left', '0');
							element.addClass('b-cloak');
							element.eq($this.ClickArray[0]).removeClass('b-cloak');
						});
					}
				}
			},
			Resize : function() {
				var $this = this;
				var $elementItem = AgElem('.ng-tab').find(' > ul > li'),
					$elementTab = $elementItem.find('> a');

				if ( window.innerWidth < $Screen ) {
					$elementTab.css('left', 0);
					$elementItem.css('left', 0);
					$this.Height = 'auto';
				} else {
					$this.Width = $elementTab.outerWidth();
					$this.Height = ($elementItem.eq($this.ClickArray[0]).outerHeight() + parseInt(AgElem('.ng-tab').find(' > ul').css('margin-top'), 10));
					for (var i = 0; i < $elementTab.length; i++) {
						$elementTab.eq(i).css('left', ($elementTab.outerWidth() * i));
					};
				}
			},
			SlidePoint : [],
			Slide      : function() {
				var $this = this;

				for ( var i = 0 , $length = AgElem('.ng-tab-slide > li').length ; i < $length ; i ++ ) {
				   $this.SlidePoint.push(i);
				};
				AgElem('.ng-tab-slide > li').addClass('b-cloak b-no-transition');
				AgElem('.ng-tab-slide > li:eq('+ $this.ClickArray[0] +')').removeClass('b-cloak');
				AgElem('.ng-tab-slide > li:eq('+ $this.ClickArray[1] +')').removeClass('b-cloak');
			},
			SlideAnimate : function(element) {
				var $this = this;

				if ( $this.ClickArray[0] > $this.ClickArray[1] ) {
					AgElem(window).finish().delay(0).queue(function() {
						element.css('left', '-100%');
					});

					if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
						element.one($animationend, function() {
							$this.ClickArray[1] = $this.ClickArray[0];
							element.addClass('b-no-transition');
							element.css('left', '0');
							element.find('> *').addClass('b-cloak');
							element.find('> *:eq('+ $this.ClickArray[0] +')').removeClass('b-cloak');
							AgElem(window).finish().delay(0).queue(function() {
								element.removeClass('b-no-transition');
							});
						});
					} else {
						$this.ClickArray[1] = $this.ClickArray[0];
						AgElem(window).finish().delay(0).queue(function() {
							element.css('left', '0');
							element.find('> *').addClass('b-cloak');
							element.find('> *:eq('+ $this.ClickArray[0] +')').removeClass('b-cloak');
						});
					}
				} else if ($this.ClickArray[0] < $this.ClickArray[1]) {
					if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
						element.addClass('b-no-transition');
						element.find('> *').addClass('b-cloak');
						element.find('> *:eq('+ $this.ClickArray[0] +')').removeClass('b-cloak');
						element.find('> *:eq('+ $this.ClickArray[1] +')').removeClass('b-cloak');
						element.css('left', '-100%');
						AgElem(window).finish().delay(0).queue(function() {
							element.removeClass('b-no-transition');
							element.css('left', '0');
						});
						element.one($animationend, function() {
							$this.ClickArray[1] = $this.ClickArray[0];
							element.find('> *').addClass('b-cloak');
							element.find('> *:eq('+ $this.ClickArray[0] +')').removeClass('b-cloak');
						});
					} else {
						$this.ClickArray[1] = $this.ClickArray[0];
						AgElem(window).finish().delay(0).queue(function() {
							element.css('left', '0');
							element.find('> *').addClass('b-cloak');
							element.find('> *:eq('+ $this.ClickArray[0] +')').removeClass('b-cloak');
						});
					}
				}
			}
		},
		Aside : {
			Selected : false,
			Toggle   : {
				text : ''
			}
		},
		Footer : {
			Sitemap : {
				Click : false
			}
		},
		Top : {
			Top       : parseInt(AgElem('.ng-top').css('top'), 10),
			Scrolling : function() {
				var $this = this;
				if ((AgElem(window).height() + AgElem(document).scrollTop()) >= AgElem('.l-footer').offset().top) {
					$this.Top = (AgElem('.l-footer').offset().top - AgElem(document).scrollTop() - (AgElem('.ng-top').outerHeight() * 1.7));
				} else {
					$this.Top = '';
				}
			}
		},
		Pagination : {
			Active : [0, 0],
			Page   : AgElem('#page') ? parseInt(AgElem('#page').val(), 10) : 0,
			Append : function() {
				var $this = this;
				if ($userAgent !== 'Mobile') {
					AgElem(window).finish().delay(0).queue(function() {
						AgElem('.ng-pagination-action').css('height', AgElem('.ng-pagination-action').find('> *:eq(' + $this.Active[0] + ') ').outerHeight());
					});
				} else {
					$this.MobileAction();
				}
			},
			Action : function() {
				var $this = this;

				if ($this.Active[0] > $this.Active[1]) {
					AgElem(window).finish().delay(0).queue(function() {
						AgElem('.ng-pagination-action').find('> *:eq(' + $this.Active[0] + ') ').removeClass('b-cloak');
						AgElem('.ng-pagination-action').css({
							'left': '-100%',
							'height': AgElem('.ng-pagination-action').find('> *:eq(' + $this.Active[0] + ') ').outerHeight()
						});
					});

					if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
						AgElem('.ng-pagination-action').one($animationend, function() {
							$this.Active[1] = $this.Active[0];
							AgElem('.ng-pagination-action').addClass('b-no-transition');
							AgElem('.ng-pagination-action').css('left', '0');
							AgElem('.ng-pagination-action').find('> * ').addClass('b-cloak');
							AgElem('.ng-pagination-action').find('> *:eq(' + $this.Active[0] + ') ').removeClass('b-cloak');
							AgElem(window).finish().delay(0).queue(function() {
								AgElem('.ng-pagination-action').removeClass('b-no-transition');
							});
						});
					} else {
						$this.Active[1] = $this.Active[0];
						AgElem(window).finish().delay(0).queue(function() {
							AgElem('.ng-pagination-action').css('left', '0');
							AgElem('.ng-pagination-action').find('> * ').addClass('b-cloak');
							AgElem('.ng-pagination-action').find('> *:eq(' + $this.Active[0] + ') ').removeClass('b-cloak');
							AgElem('.ng-pagination-action').css('height', AgElem('.ng-pagination-action').find('> *:eq(' + $this.Active[0] + ') ').outerHeight());
						});
					}
				} else if ($this.Active[0] < $this.Active[1]) {
					if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
						AgElem('.ng-pagination-action').addClass('b-no-transition').css('left', '-100%');
						AgElem('.ng-pagination-action').find('> * ').addClass('b-cloak');
						AgElem('.ng-pagination-action').find('> *:eq(' + $this.Active[0] + ') , > *:eq(' + $this.Active[1] + ') ').removeClass('b-cloak');
						AgElem(window).finish().delay(10).queue(function() {
							AgElem('.ng-pagination-action').removeClass('b-no-transition');
							AgElem('.ng-pagination-action').css({
								'left': '0',
								'height': AgElem('.ng-pagination-action').find('> *:eq(' + $this.Active[0] + ') ').outerHeight()
							});
						});
						AgElem('.ng-pagination-action').one($animationend, function() {
							$this.Active[1] = $this.Active[0];
							AgElem('.ng-pagination-action').find('> * ').addClass('b-cloak');
							AgElem('.ng-pagination-action').find('> *:eq(' + $this.Active[0] + ') ').removeClass('b-cloak');
						});
					} else {
						$this.Active[1] = $this.Active[0];
						AgElem(window).finish().delay(0).queue(function() {
							AgElem('.ng-pagination-action').css('left', '0');
							AgElem('.ng-pagination-action').find('> * ').addClass('b-cloak');
							AgElem('.ng-pagination-action').find('> *:eq(' + $this.Active[0] + ') ').removeClass('b-cloak');
							AgElem('.ng-pagination-action').css('height', AgElem('.ng-pagination-action').find('> *:eq(' + $this.Active[0] + ') ').outerHeight());
						});
					}
				}
			},
			MobileAction : function() {
				var $this = this;
				AgElem('.ng-pagination-action > *:lt(' + ($this.Active[0] + 1) + ')').addClass('is-show');
			}
		},
		Animate : {
			ScrollTop : function(Time) {
				AgElem('html , body').stop().animate({
					'scrollTop': 0
				}, Time);
			}
		},
		Accordion : {
			Aside : function() {

			},
			FAQ : function(parent, element) {
				if (document.documentMode === 8 || navigator.userAgent.indexOf('MSIE 8.0') > 0) {
					element.append('<span />');
					parent.find('.m-accordion-bd').append('<span />');
				}

				element.on('click', function(e) {
					e.preventDefault();
					element.parent().removeClass('is-active');
					AgElem(this).parent().addClass('is-active');
				});
			}
		},
		UserAgentSet : function() {
			var $this = this;

			userAgentFun();

			$scope.Common.UserAgent = $userAgent;

			if ($userAgent === 'Mobile') {
				$this.Nav.Path.Top = 0;
				$this.Nav.Path.PaddingTop = parseInt(AgElem('.ng-nav').css('padding-top'), 10);
				$this.Nav.Path.Height = 'auto';
				$this.Nav.Path.Click = false;
				$this.Nav.Submenu.Left = 0;
				$this.Nav.Submenu.MarginLeft = 0;
			} else {
				$this.Nav.Path.PaddingTop = parseInt(AgElem('.ng-nav').css('padding-top'), 10);
				$this.Nav.Path.Top = ((AgElem('.ng-nav-path > ul > li > div').outerHeight() - $this.Nav.Path.PaddingTop) * -1);
				$this.Nav.Path.Height = AgElem('.ng-nav-path > ul > li > div').outerHeight();
			}
		}
	};

	AgElem(document).ready(function() {
		$scope.Common.UserAgentSet();
		$scope.Common.Tab.Slide();
		$scope.$apply();
	});



	AgElem(window).load(function() {
		$scope.Common.IsReady = true;
		if (AgElem('.ng-top').length !== 0) {
			$scope.Common.Top.Scrolling();
		}
		$scope.$apply();
		$scope.Common.Pagination.Append('.ng-pagination-action');
	});

	AgElem(window).resize(function() {
		$scope.Common.UserAgentSet();
		$scope.Common.Tab.Resize();
		AgElem('.l-nav').addClass('b-no-transition');
		$scope.$apply();
	});

	AgElem(window).scroll(function() {
		$scope.Common.Top.Scrolling();
		$scope.$apply();
	});
}]);
=======
'use strict';
// angular JS name
var Ctrl = angular.module(document.getElementsByTagName('body')[0].getAttribute('ng-app'), ['ngSanitize']),
    AgElem = angular.element;
var $animationend, $userAgent;
var $href = window.location.href,
    $location = window.location.protocol + '//' + window.location.host + '/',
    $channel = $href.split('/')[($href.split('/').length - 1)] !== '' ? $href.split('/')[($href.split('/').length - 1)].split('.')[0] : $href.split('/')[($href.split('/').length - 2)].split('.')[0];
var $Device = /Android|webOS|iPad|BlackBerry/i,
    $userDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
var $Screen = 1000;
var $SugarFunBoxSet = {
    mobile: false,
    backdropclose: false,
    loadimg: '<div class="b-loading"><span class="m-icon-stack"><i class="m-icon m-icon-fubon-blue is-absolute"></i><i class="m-icon m-icon-fubon-green"></i></span></div>'
}

/* aside accordion item add class */
var $AsideItem = document.getElementById('aside-item');

if ($AsideItem !== null) {
    for (var i = 0, $elem = $AsideItem.getElementsByTagName('li'); i < $elem.length; i++) {
        if ($elem[i].getAttribute('data-channel') !== null && $elem[i].getAttribute('data-channel') === $channel) {
            if ($elem[i].parentNode.parentNode.parentNode.nodeName.toLowerCase() === 'li') {
                if ($elem[i].parentNode.parentNode.parentNode.className.length !== 0) $elem[i].parentNode.parentNode.parentNode.className = $elem[i].parentNode.parentNode.parentNode.className + ' is-curr';
                else $elem[i].parentNode.parentNode.parentNode.className = $elem[i].parentNode.parentNode.parentNode.className + 'is-curr';
            }

            if ($elem[i].className.length === 0) $elem[i].className = ($elem[i].className + 'is-active is-curr');
            else $elem[i].className = ($elem[i].className + ' is-active is-curr');
        }
    };
}

function userAgentFun() {
    if (window.innerWidth < 768) {
        $userAgent = 'Mobile';
    } else {
        if ($Device.test(navigator.userAgent)) {
            $userAgent = 'Tablet';
        } else {
            $userAgent = 'PC';
        }
    }
}

if ($Device.test(navigator.userAgent)) {
    $animationend = 'webkitAnimationEnd webkitTransitionEnd';
} else {
    $animationend = 'animationend transitionend';
}

/* ng-repeat-done directive */
Ctrl.directive('ngRepeatDone', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            if (scope.$last) {
                if (typeof(AgElem('.ng-controller').scope().repeat) !== 'undefined' && AgElem('.ng-controller').scope().repeat.Callback !== undefined) {
                    AgElem('.ng-controller').scope().repeat.Callback(elem);
                }

                scope.Common.Cloak = false;
            }
        }
    };
}]);

/* ng-image-load directive */
Ctrl.directive('ngImageLoad', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            var $image = elem.find('img');

            $image.bind('load', function() {
                var $this = AgElem(this);
                elem.find('.b-loading').addClass('is-hide');
                $this.addClass('is-loaded');
            });
        }
    };
}]);

/* ng-checkbox directive */
Ctrl.directive('ngCheckbox', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            var $elem = elem.find(' .m-form[type="checkbox"] ');

            $elem.on('click', function(e) {
                AgElem(this).parent().find('.m-icon').toggleClass('is-hide');
            });
        }
    };
}]);

/* ng-top directive */
Ctrl.directive('ngTop', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            elem.on('click', function(e) {
                e.preventDefault();
                scope.Common.Animate.ScrollTop(500);
            });
        }
    };
}]);

/* ng-search directive */
Ctrl.directive('ngSearch', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            elem.on('click', function(e) {
                if ( ! scope.Common.Search.Click ) {
                    e.preventDefault();
                    scope.Common.Search.Click = true;
                    AgElem('.m-form-search').find('input[type="search"]').focus();
                } else {
                    if ( scope.Common.Search.Value === '' ) {
                        e.preventDefault();
                    }
                }

                scope.$apply();

                $document.off('click touchstart').on('click touchstart', function(e) {
                    e.stopPropagation();
                    if (!$(e.target).is('.m-header-search , .m-header-search *')) {
                        scope.Common.Search.Click = false;
                        AgElem('.m-form-search').find('input[type="search"]').blur();
                        scope.$apply();
                        $document.off('click touchstart');
                    }
                });
            });
        }
    };
}]);

/* ng-search-result directive */
Ctrl.directive('ngSearchResult', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            elem.on('keyup', function(e) {
                if ( scope.Common.Search.Value !== '' ) {
                    if ( e.keyCode === 13 ) {
                        window.location = AgElem('.ng-search').attr('href');
                    }
                }
            });
        }
    };
}]);


/* ng-navicon directive */
Ctrl.directive('ngNavicon', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            elem.on('click', function(e) {
                scope.Common.Nav.Mobile.Click = !scope.Common.Nav.Mobile.Click;
                AgElem('.l-nav').removeClass('b-no-transition');
                scope.$apply();

                if (scope.Common.Nav.Mobile.Click) {
                    AgElem('html , body').css('overflow-x', 'hidden');
                    if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
                        AgElem('.l-body').one($animationend, function() {
                            scope.Common.Nav.Mobile.Lock = !scope.Common.Nav.Mobile.Lock;
                            scope.$apply();
                        });
                    } else {
                        scope.Common.Nav.Mobile.Lock = !scope.Common.Nav.Mobile.Lock;
                        scope.$apply();
                    }
                } else {
                    if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
                        AgElem('.l-nav').one($animationend, function() {
                            AgElem('html , body').removeAttr('style');
                            scope.$apply();
                        });
                    } else {
                        AgElem('html , body').removeAttr('style');
                        scope.$apply();
                    }
                }

                $document.off('click touchstart').on('click touchstart', function(e) {
                    e.stopPropagation();
                    if (!$(e.target).is('.ng-navicon , .ng-navicon * , .l-nav , .l-nav *')) {
                        scope.Common.Nav.Mobile.Click = false;
                        scope.Common.Nav.Mobile.Lock = false;
                        AgElem('html , body').removeAttr('style');
                        scope.$apply();
                        $document.off('click touchstart');
                    }
                });
            });
        }
    };
}]);

/* ng-nav-item directive */
Ctrl.directive('ngNavItem', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            var $elementLi = elem.find(' > li'),
                $elementLink = $elementLi.find(' > a');

            // AgElem(window).finish().delay(0).queue(function(){

            // });

            if ($elementLi.hasClass('is-curr')) {
                scope.Common.Nav.Bar.Hover = true;
                scope.Common.Nav.Submenu.Position(elem.find(' > li.is-curr'));
            }

            $elementLi.hover(function() {
                if ($userAgent === 'PC') {
                    if (!$elementLi.hasClass('is-curr')) {
                        scope.Common.Nav.Bar.Hover = !scope.Common.Nav.Bar.Hover;
                    }
                    scope.Common.Nav.Submenu.Position(AgElem(this));
                }
            }, function() {
                if ($userAgent !== 'Mobile') {
                    if (!$elementLi.hasClass('is-curr')) {
                        scope.Common.Nav.Bar.Hover = !scope.Common.Nav.Bar.Hover;
                        scope.Common.Nav.Submenu.Left = 0;
                        scope.Common.Nav.Submenu.MarginLeft = 0;
                        scope.$apply();
                    } else {
                        scope.Common.Nav.Submenu.Position(elem.find(' > li.is-curr'));
                    }
                }
            });

            $elementLink.on('click', function(e) {
                if ($userAgent === 'Mobile') {
                    if (AgElem(this).next('div').length !== 0) {
                        e.preventDefault();
                        AgElem(this).parent().toggleClass('is-active').siblings().removeClass('is-active');
                        AgElem('.ng-path').parent().removeClass('is-active');
                    }
                } else if ($userAgent === 'Tablet') {
                    if (AgElem(this).next('div').length !== 0) {
                        e.preventDefault();
                        scope.Common.Nav.Bar.Hover = true;
                        scope.Common.Nav.Submenu.Position(AgElem(this).parent());
                    }
                }
            });
        }
    };
}]);

/* ng-path directive */
Ctrl.directive('ngPath', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            elem.on('click', function(e) {
                e.preventDefault();
                if ($userAgent !== 'Mobile') {
                    scope.Common.Nav.Path.Click = !scope.Common.Nav.Path.Click;
                    scope.$apply();
                } else {
                    AgElem('.ng-nav-item').find(' > li').removeClass('is-active');
                    AgElem(this).parent().toggleClass('is-active').siblings().removeClass('is-active');
                }
            });
        }
    };
}]);

/* ng-pagination directive */
Ctrl.directive('ngPagination', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            elem.on('click', function(e) {
                e.preventDefault();
                AgElem('.ng-pagination-action .is-height-zero').removeClass('is-height-zero');
                scope.Common.Pagination.Active[0] = parseInt(attrs.value, 10);
                scope.Common.Pagination.Action('.ng-pagination-action');
                scope.$apply();
            });
        }
    };
}]);

/* ng-pagination-more directive */
Ctrl.directive('ngPaginationMore', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            elem.on('click', function(e) {
                e.preventDefault();
                if (!elem.hasClass('b-disabled')) {
                    scope.Common.Pagination.Active[0] = (scope.Common.Pagination.Active[0] + parseInt(attrs.value, 10));
                    scope.Common.Pagination.MobileAction();
                }
                scope.$apply();
            });
        }
    };
}]);


/* ng-sitemap directive */
Ctrl.directive('ngSitemap', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            elem.on('click', function(e) {
                e.preventDefault();
                scope.Common.Footer.Sitemap.Click = !scope.Common.Footer.Sitemap.Click;
                scope.$apply();
            });
        }
    };
}]);

/* ng-aside-select directive */
Ctrl.directive('ngAsideSelect', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            elem.on('click', function(e) {
                if (!elem.parents('.m-aside').hasClass('is-disabled')) {
                    e.preventDefault();
                    scope.Common.Aside.Selected = !scope.Common.Aside.Selected;
                    scope.$apply();

                    $document.off('click').on('click', function(e) {
                        e.stopPropagation();

                        if (!$(e.target).is('.ng-aside-accordion *')) {
                            scope.Common.Aside.Selected = false;
                            scope.$apply();
                            $document.off('click');
                        }
                    });
                }
            });
        }
    };
}]);

/* ng-aside-accordion-item directive */
Ctrl.directive('ngAsideAccordionItem', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            var $element = elem.find(' > li > h6 > a');

            scope.Common.Aside.Toggle.Text = $element.parents('li.is-curr').find(' > h6 > a').text();

            $element.on('click', function(e) {
                if (AgElem(this).parents('li').hasClass('is-curr') && !AgElem(this).parents('li').hasClass('is-curred')) {
                    AgElem(this).parents('li').removeClass('is-curr').addClass('is-curred');
                    if ($userAgent === 'PC') {
                        AgElem(this).parents('li').addClass('is-hide');
                    } else {
                        AgElem(this).parents('li').toggleClass('is-active').siblings().removeClass('is-active');
                    }
                } else {
                    $element.parents('li.is-curr').addClass('is-curred');
                    AgElem(this).parents('li').removeClass('is-curr is-hide');
                    if (AgElem(this).parent().next('div').length !== 0) {
                        AgElem(this).parents('li').toggleClass('is-active').siblings().removeClass('is-active');
                        if (!AgElem(this).parents('li').hasClass('is-active')) {
                            $element.parents('li.is-curr.is-curred').removeClass('is-curred');
                        }
                    }
                }
                if (AgElem(this).parent().next('div').length !== 0) {
                    e.preventDefault();
                }
                scope.$apply();
            });
        }
    };
}]);

/* ng-tel directive */
Ctrl.directive('ngTel', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            elem.on('click', function(e) {
                if ($userAgent === 'PC') {
                    e.preventDefault();
                }
            });
        }
    };
}]);

/* ng-map directive */
Ctrl.directive('ngMap', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            elem.on('click', function(e) {
                e.preventDefault();

                AgElem(elem).SugarFunBox({
                    mobile: $SugarFunBoxSet.mobile,
                    backdropclose: $SugarFunBoxSet.backdropclose,
                    click: false,
                    loadimg: $SugarFunBoxSet.loadimg
                });
            });
        }
    };
}]);

/* ng-tab directive */
Ctrl.directive('ngTab', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            var $elementItem = elem.find(' > ul > li'),
                $elementTab = $elementItem.find('> a');

            AgElem(document).finish().delay(0).queue(function() {
                if (document.documentMode === 8 || navigator.userAgent.indexOf('MSIE 8.0') > 0 || window.innerWidth >= $Screen) {
                    elem.addClass('b-no-transition');
                    scope.Common.Tab.Height = ($elementItem.eq(0).outerHeight() + parseInt(elem.find(' > ul').css('margin-top'), 10));
                    // for (var i = 0; i < $elementItem.length; i++) {
                    //     $elementTab.eq(i).css('left', ($elementTab.outerWidth() * i));
                    // };
                }

                scope.Common.Tab.Width = $elementTab.outerWidth();
                $elementItem.find('> div').addClass('b-cloak');
                $elementItem.eq(scope.Common.Tab.ClickArray[0]).find('> div').removeClass('b-cloak');
                $elementItem.eq(scope.Common.Tab.ClickArray[1]).find('> div').removeClass('b-cloak');
                scope.$apply();
            });

            $elementTab.on('click', function(e) {
                var $this = AgElem(this),
                    $index = $this.parent().index();

                e.preventDefault();
                elem.removeClass('b-no-transition');

                if (document.documentMode === 8 || navigator.userAgent.indexOf('MSIE 8.0') > 0 || window.innerWidth >= $Screen) {
                    scope.Common.Tab.ClickArray[1] = scope.Common.Tab.ClickArray[0];
                    scope.Common.Tab.ClickArray[0] = $index;
                    $elementItem.eq(scope.Common.Tab.ClickArray[0]).find('> div').removeClass('b-cloak');
                    scope.Common.Tab.Height = ($elementItem.eq($index).outerHeight() + parseInt(elem.find(' > ul').css('margin-top'), 10));
                    scope.Common.Tab.Animate($elementItem.find('> div'));
                    scope.Common.Tab.Left = $this.position().left;
                } else {
                    $elementItem.find('> div').removeClass('b-cloak');
                    AgElem(this).parent().toggleClass('is-active').siblings().removeClass('is-active');
                }
                scope.$apply();
            });
        }
    };
}]);

/* ng-select directive */
Ctrl.directive('ngSelect', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            elem.find(' select ').removeClass('is-bgcolor').wrap('<span class="is-label"></span>');
            elem.find(' select ').parent('span').prepend('<i class="m-icon m-icon-arrow-angle-down" />');

            for (var i = 0; i < elem.find(' select ').length; i++) {
                if (elem.find(' select ').eq(i).attr('disabled') === 'disabled') {
                    elem.find(' select ').eq(i).parent().addClass('is-disabled');
                }
            };
        }
    };
}]);

/* ng-history-back directive */
Ctrl.directive('ngHistoryBack', ['$document', function($document) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            elem.on('click', function(e) {
                e.preventDefault();
                window.history.back();
            });
        }
    };
}]);

Ctrl.controller('Ctrl', ['$scope', '$http', function($scope, $http) {
    $scope.Common = {
        UserAgent: '',
        Cloak: true,
        Channel: '',
        Search: {
            Click : false,
            Value : ''
        },
        Nav: {
            Path: {
                Top: 0,
                PaddingTop: parseInt(AgElem('.ng-nav').css('padding-top'), 10),
                Height: 'auto',
                Click: false
            },
            Mobile: {
                Click: false,
                Lock: false
            },
            Submenu: {
                Left: 0,
                MarginLeft: 0,
                Position: function(element) {
                    $scope.Common.Nav.Bar.Left = element.position().left;
                    $scope.Common.Nav.Bar.Width = element.width();
                    $scope.Common.Nav.Submenu.Left = 0;
                    $scope.Common.Nav.Submenu.MarginLeft = 0;

                    if (!$scope.$$phase) {
                        $scope.$apply();
                    };

                    if (element.find('> div').length !== 0) {
                        if ((element.find('> div').width() / 2) > (AgElem('.ng-nav-item').outerWidth() - (element.position().left + (element.width() / 2)))) {
                            $scope.Common.Nav.Submenu.Left = (AgElem('.ng-nav-item').outerWidth()) - element.find('> div').width();
                            $scope.$apply();
                        } else {
                            if (element.find('> div').width() < AgElem('.ng-nav-item').outerWidth()) {
                                $scope.Common.Nav.Submenu.Left = (element.position().left + (element.width() / 2));
                                $scope.Common.Nav.Submenu.MarginLeft = ((element.find('> div').width() / 2) * (-1));
                                $scope.$apply();

                                if (element.find('> div').offset().left < AgElem('.ng-nav-item').offset().left) {
                                    $scope.Common.Nav.Submenu.Left = 0;
                                    $scope.Common.Nav.Submenu.MarginLeft = 0;
                                    $scope.$apply();
                                }
                            }
                        }
                    }
                }
            },
            Bar: {
                Left: 0,
                Width: 0,
                Hover: false
            }
        },
        Tab: {
            ClickArray: [0, 0],
            Left: 0,
            Width: 0,
            Height: 'auto',
            Animate: function(element) {
                var $this = this;

                if ($this.ClickArray[0] > $this.ClickArray[1]) {
                    AgElem(window).finish().delay(0).queue(function() {
                        element.css('left', '-100%');
                    });

                    if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
                        element.one($animationend, function() {
                            $this.ClickArray[1] = $this.ClickArray[0];
                            element.addClass('b-no-transition');
                            element.css('left', '0');
                            element.addClass('b-cloak');
                            element.eq($this.ClickArray[0]).removeClass('b-cloak');
                            AgElem(window).finish().delay(0).queue(function() {
                                element.removeClass('b-no-transition');
                            });
                        });
                    } else {
                        $this.ClickArray[1] = $this.ClickArray[0];
                        AgElem(window).finish().delay(0).queue(function() {
                            element.css('left', '0');
                            element.addClass('b-cloak');
                            element.eq($this.ClickArray[0]).removeClass('b-cloak');
                        });
                    }
                } else if ($this.ClickArray[0] < $this.ClickArray[1]) {
                    if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
                        element.addClass('b-no-transition');
                        element.addClass('b-cloak');
                        element.eq($this.ClickArray[0]).removeClass('b-cloak');
                        element.eq($this.ClickArray[1]).removeClass('b-cloak');
                        element.css('left', '-100%');
                        AgElem(window).finish().delay(0).queue(function() {
                            element.removeClass('b-no-transition');
                            element.css('left', '0');
                        });
                        element.one($animationend, function() {
                            $this.ClickArray[1] = $this.ClickArray[0];
                            element.addClass('b-cloak');
                            element.eq($this.ClickArray[0]).removeClass('b-cloak');
                        });
                    } else {
                        $this.ClickArray[1] = $this.ClickArray[0];
                        AgElem(window).finish().delay(0).queue(function() {
                            element.css('left', '0');
                            element.addClass('b-cloak');
                            element.eq($this.ClickArray[0]).removeClass('b-cloak');
                        });
                    }
                }
            },
            Resize: function() {
                var $this = this;
                var $elementItem = AgElem('.ng-tab').find(' > ul > li'),
                    $elementTab = $elementItem.find('> a');

                if (window.innerWidth < $Screen) {
                    $elementTab.css('left', 0);
                    $elementItem.css('left', 0);
                    $this.Height = 'auto';
                } else {
                    $this.Width = $elementTab.outerWidth();
                    $this.Height = ($elementItem.eq($this.ClickArray[0]).outerHeight() + parseInt(AgElem('.ng-tab').find(' > ul').css('margin-top'), 10));
                    for (var i = 0; i < $elementTab.length; i++) {
                        $elementTab.eq(i).css('left', ($elementTab.outerWidth() * i));
                    };
                }
            }
        },
        Aside: {
            Selected: false,
            Toggle: {
                text: ''
            }
        },
        Footer: {
            Sitemap: {
                Click: false
            }
        },
        Top: {
            Top: parseInt(AgElem('.ng-top').css('top'), 10),
            Scrolling: function() {
                var $this = this;
                if ((AgElem(window).height() + AgElem(document).scrollTop()) >= AgElem('.l-footer').offset().top) {
                    $this.Top = (AgElem('.l-footer').offset().top - AgElem(document).scrollTop() - (AgElem('.ng-top').outerHeight() * 1.7));
                } else {
                    $this.Top = '';
                }
            }
        },
        Pagination: {
            Active: [0, 0],
            Page: AgElem('#page') ? parseInt(AgElem('#page').val(), 10) : 0,
            Append: function() {
                var $this = this;
                if ($userAgent !== 'Mobile') {
                    AgElem('.ng-pagination-action').wrapInner('<div class="b-slide"></div>');
                    AgElem(window).finish().delay(0).queue(function() {
                        AgElem('.ng-pagination-action').find('.b-slide').css('height', AgElem('.ng-pagination-action').find(' .b-slide > *:eq(' + $this.Active[0] + ') ').outerHeight());
                    });
                } else {
                    $this.MobileAction();
                }
            },
            Action: function() {
                var $this = this;

                if ($this.Active[0] > $this.Active[1]) {
                    AgElem(window).finish().delay(0).queue(function() {
                        AgElem('.ng-pagination-action').find(' .b-slide > *:eq(' + $this.Active[0] + ') ').removeClass('b-cloak');
                        AgElem('.ng-pagination-action').find('.b-slide').css({
                            'left': '-100%',
                            'height': AgElem('.ng-pagination-action').find(' .b-slide > *:eq(' + $this.Active[0] + ') ').outerHeight()
                        });
                    });

                    if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
                        AgElem('.ng-pagination-action').find(' .b-slide ').one($animationend, function() {
                            $this.Active[1] = $this.Active[0];
                            AgElem('.ng-pagination-action').find(' .b-slide ').addClass('b-no-transition');
                            AgElem('.ng-pagination-action').find(' .b-slide ').css('left', '0');
                            AgElem('.ng-pagination-action').find(' .b-slide > * ').addClass('b-cloak');
                            AgElem('.ng-pagination-action').find(' .b-slide > *:eq(' + $this.Active[0] + ') ').removeClass('b-cloak');
                            AgElem(window).finish().delay(0).queue(function() {
                                AgElem('.ng-pagination-action').removeClass('b-no-transition');
                            });
                        });
                    } else {
                        $this.Active[1] = $this.Active[0];
                        AgElem(window).finish().delay(0).queue(function() {
                            AgElem('.ng-pagination-action').find('.b-slide').css('left', '0');
                            AgElem('.ng-pagination-action').find(' .b-slide > * ').addClass('b-cloak');
                            AgElem('.ng-pagination-action').find(' .b-slide > *:eq(' + $this.Active[0] + ') ').removeClass('b-cloak');
                            AgElem('.ng-pagination-action').find('.b-slide').css('height', AgElem('.ng-pagination-action').find(' .b-slide > *:eq(' + $this.Active[0] + ') ').outerHeight());
                        });
                    }
                } else if ($this.Active[0] < $this.Active[1]) {
                    if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
                        AgElem('.ng-pagination-action').find(' .b-slide ').addClass('b-no-transition').css('left', '-100%');
                        AgElem('.ng-pagination-action').find(' .b-slide > * ').addClass('b-cloak');
                        AgElem('.ng-pagination-action').find(' .b-slide > *:eq(' + $this.Active[0] + ') , .b-slide > *:eq(' + $this.Active[1] + ') ').removeClass('b-cloak');
                        AgElem(window).finish().delay(10).queue(function() {
                            AgElem('.ng-pagination-action').find('.b-slide').removeClass('b-no-transition');
                            AgElem('.ng-pagination-action').find('.b-slide').css({
                                'left': '0',
                                'height': AgElem('.ng-pagination-action').find(' .b-slide > *:eq(' + $this.Active[0] + ') ').outerHeight()
                            });
                        });
                        AgElem('.ng-pagination-action').find(' .b-slide ').one($animationend, function() {
                            $this.Active[1] = $this.Active[0];
                            AgElem('.ng-pagination-action').find(' .b-slide > * ').addClass('b-cloak');
                            AgElem('.ng-pagination-action').find(' .b-slide > *:eq(' + $this.Active[0] + ') ').removeClass('b-cloak');
                        });
                    } else {
                        $this.Active[1] = $this.Active[0];
                        AgElem(window).finish().delay(0).queue(function() {
                            AgElem('.ng-pagination-action').find('.b-slide').css('left', '0');
                            AgElem('.ng-pagination-action').find(' .b-slide > * ').addClass('b-cloak');
                            AgElem('.ng-pagination-action').find(' .b-slide > *:eq(' + $this.Active[0] + ') ').removeClass('b-cloak');
                            AgElem('.ng-pagination-action').find('.b-slide').css('height', AgElem('.ng-pagination-action').find(' .b-slide > *:eq(' + $this.Active[0] + ') ').outerHeight());
                        });
                    }
                }
            },
            MobileAction: function() {
                var $this = this;
                AgElem('.ng-pagination-action > *:lt(' + ($this.Active[0] + 1) + ')').addClass('is-show');
            }
        },
        Animate: {
            ScrollTop: function(Time) {
                AgElem('html , body').stop().animate({
                    'scrollTop': 0
                }, Time);
            }
        },
        Accordion: {
            Aside: function() {

            },
            FAQ: function(parent, element) {
                if (document.documentMode === 8 || navigator.userAgent.indexOf('MSIE 8.0') > 0) {
                    element.append('<span />');
                    parent.find('.m-accordion-bd').append('<span />');
                }

                element.on('click', function(e) {
                    e.preventDefault();
                    AgElem(this).parent().toggleClass('is-active').siblings().removeClass('is-active');
                });
            }
        },
        UserAgentSet: function() {
            var $this = this;

            userAgentFun();

            $scope.Common.UserAgent = $userAgent;

            if ($userAgent === 'Mobile') {
                $this.Nav.Path.Top = 0;
                $this.Nav.Path.PaddingTop = parseInt(AgElem('.ng-nav').css('padding-top'), 10);
                $this.Nav.Path.Height = 'auto';
                $this.Nav.Path.Click = false;
                $this.Nav.Submenu.Left = 0;
                $this.Nav.Submenu.MarginLeft = 0;
            } else {
                $this.Nav.Path.PaddingTop = parseInt(AgElem('.ng-nav').css('padding-top'), 10);
                $this.Nav.Path.Top = ((AgElem('.ng-nav-path > ul > li > div').outerHeight() - $this.Nav.Path.PaddingTop) * -1);
                $this.Nav.Path.Height = AgElem('.ng-nav-path > ul > li > div').outerHeight();
            }
        }
    };

    AgElem(document).ready(function() {
        $scope.Common.UserAgentSet();
        $scope.$apply();
        $scope.Common.Pagination.Append('.ng-pagination-action');
    });



    AgElem(window).load(function() {
        if (AgElem('.ng-top').length !== 0) {
            $scope.Common.Top.Scrolling();
        }
        $scope.$apply();
    });

    AgElem(window).resize(function() {
        $scope.Common.UserAgentSet();
        $scope.Common.Tab.Resize();
        AgElem('.l-nav').addClass('b-no-transition');
        $scope.$apply();
    });

    AgElem(window).scroll(function() {
        $scope.Common.Top.Scrolling();
        $scope.$apply();
    });
}]);
>>>>>>> origin/master
