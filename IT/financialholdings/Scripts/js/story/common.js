/* ng-video directive */
// Ctrl.directive('ngVideo', ['$document', function($document) {
// 	return {
// 		restrict: 'C',
// 		link: function(scope, elem, attrs) {
// 			elem.on('click' , function(e){
// 				scope.Story.Youtube.Index = scope.$index;
// 				scope.$apply();
// 			});
// 		}
// 	};
// }]);

Ctrl.controller('Story' , ['$scope' , '$http' , '$sce' , function($scope , $http , $sce) {
	$scope.repeat = {
		Callback : function(){
			AgElem('.ng-video-image img').bind('load' , function(){
				$scope.Story.Youtube.AddIndex++;

				if ( $scope.Story.Youtube.AddIndex === $scope.Story.Youtube.Data.length ) {
					
					AgElem('.ng-owl-carousel').removeClass('b-cloak');
					AgElem('.ng-video-frame:eq(0) iframe').bind('load' , function(){
						$scope.$parent.Common.Cloak = false;
						$scope.$apply();
						$scope.Story.owlCarousel.Setup();
						$scope.Story.owlCarousel.OnChange();

						AgElem(window).finish().delay(0).queue(function(){
							AgElem('.ng-video-frame').addClass('is-show');
						});
					});
				}
			});
		}
	},
	$scope.Story = {
		owlCarousel : {
			element : AgElem('.owl-carousel'),
			Setup   : function() {
				var $this = this;

				$this.element.owlCarousel({
					items      : 1,
					mouseDrag  : false,
					responsive : true,
					center     : true,
					autoHeight : true,
					dotsClass  : 'm-tab-ctrl',
					dotClass   : 'm-icon m-icon-point',
					slideBy    : 1
				});
			},
			OnChange : function() {
				var $this = this;
				$this.element.on('changed.owl.carousel' , function(e){
					$scope.Story.Youtube.Index = e.item.index;
					$scope.$apply();
				});
			}
		},
		Youtube : {
			AddIndex : 0,
			Index    : 0,
			Url      : AgElem('.ng-youtube-ajax').data('url'),
			Setting  : AgElem('.ng-youtube-ajax').data('setting'),
			Data     : [],
			GetData : function(){
				var $this = this;

				for ( var i = 0 , $length = AgElem('.ng-youtube-ajax > li').length ; i < $length ; i ++ ) {
					$this.Data.push({
						'ID'   : AgElem('.ng-youtube-ajax > li > em:eq('+ i +')').text(),
						'Name' : AgElem('.ng-youtube-ajax > li > p:eq('+ i +')').text()
					});
				};
			},
			GetYoutube : function(ID) {
				var $this = this;

				if ( ID !== '' ) {
					return $sce.trustAsResourceUrl($this.Url + ID + $this.Setting);
				}
			}
		}
	};

	AgElem(document).ready(function() {
		$scope.Story.Youtube.GetData();
		$scope.$apply();
	});
}]);