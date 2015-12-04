/* ng-video directive */
Ctrl.directive('ngVideo', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click' , function(e){
				if ( $userAgent === 'PC' && ! scope.Story.Youtube.Data[scope.$index].URL ) {
					e.preventDefault();
					scope.Story.Youtube.Index = scope.$index;
					scope.$apply();
				}
			});
		}
	};
}]);

Ctrl.controller('Story' , ['$scope' , '$http' , '$sce' , function($scope , $http , $sce) {
	$scope.repeat = {
		Callback : function(){
			AgElem(document).finish().delay(100).queue(function(){
				$scope.$parent.Common.Cloak = false;
				$scope.$apply();
				$scope.Story.owlCarousel.Setup();
				$scope.Story.owlCarousel.OnChange();
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
					dotsClass  : 'm-tab-ctrl',
					dotClass   : 'm-icon m-icon-point',
					slideBy    : 1
				});
			},
			OnChange : function() {
				var $this = this;

				$this.element.on('changed.owl.carousel' , function(e){
					$scope.Story.Youtube.Index = null;
					$scope.$apply();
				});
			}
		},
		Youtube : {
			AddIndex : 0,
			Index    : null,
			Url      : AgElem('.ng-youtube-ajax').data('url'),
			Setting  : AgElem('.ng-youtube-ajax').data('setting'),
			Data     : [],
			GetData : function(){
				var $this = this;

				for ( var i = 0 , $length = AgElem('.ng-youtube-ajax > li').length ; i < $length ; i ++ ) {
					$this.Data.push({
						'ID'   : AgElem('.ng-youtube-ajax > li > em:eq('+ i +')').text(),
						'Name' : AgElem('.ng-youtube-ajax > li > p:eq('+ i +')').text(),
						'URL'  : AgElem('.ng-youtube-ajax > li > button:eq('+ i +')') ? AgElem('.ng-youtube-ajax > li > button:eq('+ i +')').text() : ''
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