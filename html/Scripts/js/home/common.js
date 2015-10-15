/* ng-gallery-item directive */
Ctrl.directive('ngGalleryItem', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
				var $Gallery = elem.find('.ng-gallery');

				$Gallery.on('click' , function(e){
					var $this = this;

					if ( $userAgent !== 'PC' ) {
						AgElem('.ng-gallery-item').find('.m-gallery-info').removeClass('b-middle');
						AgElem($this).parents('.ng-gallery-item').find('.m-gallery-group').css({
							'margin-top' : ( AgElem($this).parents('.ng-gallery-item').find('.m-gallery-group').height() / 2 * (-1) ) + 'px'
						});
						AgElem($this).parents('.ng-gallery-item').find('.m-gallery-info').height(AgElem($this).parents('.ng-gallery-item').find('.m-gallery-info').height());
						AgElem('.ng-gallery-item').removeClass('is-active');
						AgElem($this).parents('.ng-gallery-item').addClass('is-active');

						$document.off('click touchstart').on('click touchstart', function(e) {
							e.stopPropagation();
							if (!$(e.target).is('.ng-gallery , .ng-gallery * , .m-gallery-info , .m-gallery-info *')) {
								AgElem('.ng-gallery-item').removeClass('is-active');
								scope.$apply();
								$document.off('click touchstart');
							}
						});
					}

					scope.$apply();
				});
		}
	};
}]);

Ctrl.controller('Home' , ['$scope' , '$http' , '$sce' , function($scope , $http , $sce) {
	$scope.repeat = {
		Callback : function(){
			// AgElem('.ng-video-image img').bind('load' , function(){
			// 	$scope.Story.Youtube.AddIndex++;

			// 	if ( $scope.Story.Youtube.AddIndex === $scope.Story.Youtube.Data.length ) {
					
			// 		AgElem('.ng-owl-carousel').removeClass('b-cloak');
			// 		AgElem('.ng-video-frame:eq(0) iframe').bind('load' , function(){
			// 			$scope.$parent.Common.Cloak = false;
			// 			$scope.$apply();
			// 			$scope.Story.owlCarousel.Setup();
			// 			$scope.Story.owlCarousel.OnChange();

			// 			AgElem(window).finish().delay(0).queue(function(){
			// 				AgElem('.ng-video-frame').addClass('is-show');
			// 			});
			// 		});
			// 	}
			// });
		}
	},
	$scope.Home = {
		owlCarousel : {
			element : AgElem('.owl-carousel'),
			Setup   : function() {
				var $this = this;

				$this.element.owlCarousel({
					loop               : true,
					items              : 1,
					lazyLoad           : true,
					mouseDrag          : false,
					responsive         : true,
					center             : true,
					autoHeight         : true,
					autoplay           : true,
					autoplayTimeout    : 5000,
					autoplayHoverPause : true,
					dotsClass          : 'm-media-ctrl',
					dotClass           : 'm-icon m-icon-point',
					slideBy            : 1
				});
			},
			OnChange : function() {
				// var $this = this;
				// $this.element.on('changed.owl.carousel' , function(e){
				// 	$scope.Story.Youtube.Index = e.item.index;
				// 	$scope.$apply();
				// });
			}
		},
		Images : {
			Night : '',
			GetTime : function() {
				var $this = this;
				var $date    = new Date();
					$hours   = $date.getHours();
					$minutes = $date.getMinutes();

				if ( $hours < 6 || $hours >= 18 ) {
					$this.Night = '-n';
				}
			}
		}
	};

	AgElem(document).ready(function() {
		$scope.Home.Images.GetTime();
		$scope.$apply();
		$scope.Home.owlCarousel.Setup();
	});
}]);