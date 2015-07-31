/* ng-video directive */
Ctrl.directive('ngVideo', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click' , function(e){
				scope.Story.Youtube.ID    = attrs.id;
				scope.Story.Youtube.Index = scope.$index;
				scope.$apply();
			});
		}
	};
}]);

Ctrl.controller('Story' , ['$scope' , '$http' , '$sce' , function($scope , $http , $sce) {
	$scope.repeat = {
		Callback : function(){
			var $imageLength = AgElem('.ng-video-image-load img').length;
			var $index = 0;

			AgElem('.ng-video-image-load img').bind('load', function() {
				$index += 1;
				AgElem(this).parents('.ng-owl-carousel').removeClass('b-cloak');

				if ( $index === $imageLength ) {
					$scope.Story.owlCarousel.Setup();
					$scope.Story.owlCarousel.OnChange();
				}
			});

			$scope.$parent.Common.Cloak = false;
		}
	},
	$scope.Story = {
		owlCarousel : {
			element : AgElem('.owl-carousel'),
			Setup   : function() {
				var $this = this;

				$this.element.owlCarousel({
					items      : 1,
					responsive : false,
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
					$scope.Story.Youtube.ID = '';
					$scope.$apply();
				});
			}
		},
		Youtube : {
			ID      : '',
			Index   : '',
			Url     : AgElem('.ng-youtube-ajax').data('url'),
			Data    : [],
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
					return $sce.trustAsResourceUrl($this.Url + ID);	
				}
			}
		}
	};

	AgElem(document).ready(function() {
		$scope.Story.Youtube.GetData();
		$scope.$apply();
	});
}]);