'use strict';
// angular JS name
var Ctrl   = angular.module(document.getElementsByTagName('body')[0].getAttribute('ng-app') , ['ngSanitize']),
	AgElem = angular.element;
var $animationend , $userAgent;
var $href     = window.location.href,
	$location = window.location.protocol + '//' + window.location.host + '/';
var $userDevice      = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
	$animateDevice   = /Android|webOS|iPad|BlackBerry/i;

function userAgentFun() {
	if ( window.innerWidth <= 800 ) {
		$userAgent = 'Mobile';
	} else {
		if ( $userDevice.test(navigator.userAgent) ) {
			$userAgent = 'Tablet';
		} else {
			$userAgent = 'PC';	
		}
	}
}

if ( $animateDevice.test(navigator.userAgent) ) {
	$animationend = 'webkitAnimationEnd webkitTransitionEnd';
} else {
	$animationend = 'animationend transitionend';
}

/* ng-search directive */
Ctrl.directive('ngSearch' , ['$document' , function($document) {
	return {
		restrict : 'C',
		link     : function(scope , elem , attrs) {
			elem.on('click' , function(e){
				if ( ! scope.Common.Search.Click ) {
					e.preventDefault();
					scope.Common.Search.Click = true;
					AgElem('.m-form-search').find('input[type="search"]').focus();
				}
				
				scope.$apply();

				$document.off('click touchstart').on('click touchstart' , function(e){
					e.stopPropagation();
					if ( ! $( e.target ).is('.m-header-search , .m-header-search *') ) {
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

/* ng-navicon directive */
Ctrl.directive('ngNavicon' , ['$document' , function($document) {
	return {
		restrict : 'C',
		link     : function(scope , elem , attrs) {
			elem.on('click' , function(e){
				if ( $userAgent === 'Mobile' ) {
					scope.Common.Nav.Mobile.Click = ! scope.Common.Nav.Mobile.Click;
					scope.$apply();
					
					if ( scope.Common.Nav.Mobile.Click ) {
						AgElem('html , body').css('overflow-x' , 'hidden');
						if ( 'transform' in window.document.body.style || '-webkit-transition' in window.document.body.style ) {
							AgElem('.l-body').one($animationend , function(){
								scope.Common.Nav.Mobile.Lock = ! scope.Common.Nav.Mobile.Lock;
								scope.$apply();
							});
						} else {
							scope.Common.Nav.Mobile.Lock = ! scope.Common.Nav.Mobile.Lock;
							scope.$apply();
						}
					} else {
						if ( 'transform' in window.document.body.style || '-webkit-transition' in window.document.body.style ) {
							AgElem('.l-nav').one($animationend , function(){
								AgElem('html , body').removeAttr('style');
								scope.$apply();
							});
						} else {
							AgElem('html , body').removeAttr('style');
							scope.$apply();
						}
					}

					$document.off('click touchstart').on('click touchstart' , function(e){
						e.stopPropagation();
						if ( ! $( e.target ).is('.ng-navicon , .ng-navicon * , .l-nav , .l-nav *') ) {
							scope.Common.Nav.Mobile.Click = false;
							scope.Common.Nav.Mobile.Lock  = false;
							AgElem('html , body').removeAttr('style');
							scope.$apply();
							$document.off('click touchstart');
						}
					});
				}
			});
		}
	};
}]);

/* ng-nav-item directive */
Ctrl.directive('ngNavItem' , ['$document' , function($document) {
	return {
		restrict : 'C',
		link     : function(scope , elem , attrs) {
			var $elementLi   = elem.find(' > li'),
				$elementLink = $elementLi.find(' > a');

			$elementLi.hover(function(){
				if ( $userAgent === 'PC' ) {
					scope.Common.Nav.Bar.Hover = ! scope.Common.Nav.Bar.Hover;
					scope.Common.Nav.Submenu.Position(AgElem(this));
				}
			} , function(){
				if ( $userAgent !== 'Mobile' ) {
					scope.Common.Nav.Bar.Hover          = ! scope.Common.Nav.Bar.Hover;
					scope.Common.Nav.Submenu.Left       = 0;
					scope.Common.Nav.Submenu.MarginLeft = 0;
					scope.$apply();
				}
			});

			$elementLink.on('click' , function(e){
				if ( $userAgent === 'Mobile' ) {
					if ( AgElem(this).next('div').length !== 0 ) {
						e.preventDefault();
						AgElem(this).parent().toggleClass('is-active').siblings().removeClass('is-active');
						AgElem('.ng-path').parent().removeClass('is-active');
					}
				} else if ( $userAgent === 'Tablet' ) {
					if ( AgElem(this).next('div').length !== 0 ) {
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
Ctrl.directive('ngPath' , ['$document' , function($document) {
	return {
		restrict : 'C',
		link     : function(scope , elem , attrs) {
			elem.on('click' , function(e){
				e.preventDefault();
				if ( $userAgent !== 'Mobile' ) {
					scope.Common.Nav.Path.Click = ! scope.Common.Nav.Path.Click;
					scope.$apply();
				} else {
					AgElem('.ng-nav-item').find(' > li').removeClass('is-active');
					AgElem(this).parent().toggleClass('is-active').siblings().removeClass('is-active');
				}
			});
		}
	};
}]);

/* ng-sitemap directive */
Ctrl.directive('ngSitemap' , ['$document' , function($document) {
	return {
		restrict : 'C',
		link     : function(scope , elem , attrs) {
			elem.on('click' , function(e){
				e.preventDefault();
				scope.Common.Footer.Sitemap.Click = ! scope.Common.Footer.Sitemap.Click;
				scope.$apply();
			});
		}
	};
}]);

/* ng-tel directive */
Ctrl.directive('ngTel' , ['$document' , function($document) {
	return {
		restrict : 'C',
		link     : function(scope , elem , attrs) {
			elem.on('click' , function(e){
				if ( $userAgent === 'PC' ) {
					e.preventDefault();
				}
			});
		}
	};
}]);

Ctrl.controller('Ctrl' , ['$scope' , '$http' , function($scope , $http) {
	$scope.Common = {
		Search : {
			Click : false
		},
		Nav : {
			Path : {
				Top        : 0,
				PaddingTop : parseInt(AgElem('.ng-nav').css('padding-top') , 10),
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
				Position : function(element) {
					$scope.Common.Nav.Bar.Left           = element.position().left;
					$scope.Common.Nav.Bar.Width          = element.width();
					$scope.Common.Nav.Submenu.Left       = 0;
					$scope.Common.Nav.Submenu.MarginLeft = 0;
					$scope.$apply();

					if ( element.find('> div').length !== 0 ) {
						if ( (element.find('> div').width() / 2)  > (AgElem('.ng-nav-item').outerWidth() - (element.position().left + (element.width() / 2))) ) {
							$scope.Common.Nav.Submenu.Left = (AgElem('.ng-nav-item').outerWidth()) - element.find('> div').width();
							$scope.$apply();
						} else {
							if ( element.find('> div').width() < AgElem('.ng-nav-item').outerWidth() ) {
								$scope.Common.Nav.Submenu.Left       = (element.position().left + (element.width() / 2));
								$scope.Common.Nav.Submenu.MarginLeft = ((element.find('> div').width() / 2) * (-1));
								$scope.$apply();

								if ( element.find('> div').offset().left < AgElem('.ng-nav-item').offset().left ) {
									$scope.Common.Nav.Submenu.Left       = 0;
									$scope.Common.Nav.Submenu.MarginLeft = 0;
									$scope.$apply();
								}
							}
						}
					}
				}
			},
			Bar        : {
				Left  : 0,
				Width : 0,
				Hover : false
			}
		},
		Footer : {
			Sitemap : {
				Click : false
			}
		}
	};

	AgElem(document).ready(function() {
		$scope.$apply();
	});

	AgElem(window).resize(function() {
		userAgentFun();
		if ( $userAgent === 'Mobile' ) {
			$scope.Common.Nav.Path.Top           = 0;
			$scope.Common.Nav.Path.PaddingTop    = parseInt(AgElem('.ng-nav').css('padding-top') , 10);
			$scope.Common.Nav.Path.Height        = 'auto';
			$scope.Common.Nav.Path.Click         = false;
			$scope.Common.Nav.Submenu.Left       = 0;
			$scope.Common.Nav.Submenu.MarginLeft = 0;
		} else {
			$scope.Common.Nav.Path.PaddingTop = parseInt(AgElem('.ng-nav').css('padding-top') , 10);
			$scope.Common.Nav.Path.Top        = ((AgElem('.ng-nav-path > ul > li > div').outerHeight() - $scope.Common.Nav.Path.PaddingTop) * -1);
			$scope.Common.Nav.Path.Height     = AgElem('.ng-nav-path > ul > li > div').outerHeight();
		}

		if ( ! $scope.$$phase ) {
			$scope.$apply();
		};
	}).resize();
}]);