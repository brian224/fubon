/* ng-video directive */
Ctrl.directive('ngVideo', ['$document', function($document) {
	return {
		restrict: 'C',
		link: function(scope, elem, attrs) {
			elem.on('click' , function(e){
				if ( $userAgent === 'PC' && ! scope.About.Youtube.Data[scope.$index].URL ) {
					e.preventDefault();
					scope.About.Youtube.Index = scope.$index;
					scope.$apply();
				}
			});
		}
	};
}]);

Ctrl.controller('About' , ['$scope' , '$http' , '$sce' , function($scope , $http , $sce) {
	$scope.repeat = {
		Callback : function(){
			AgElem(document).finish().delay(100).queue(function(){
				$scope.$parent.Common.Cloak = false;
				$scope.$apply();
				$scope.About.owlCarousel.Setup();
				$scope.About.owlCarousel.OnChange();
			});
		}
	},
	$scope.About = {
		Honor : {
			NewYear   : ['' , ''],
			YearArray : [],
			GetYear : function() {
				var $this = this;

				for (var i = 0 , $Length = AgElem('.ng-tab-switch > li').length ; i < $Length ; i ++ ) {
					$this.YearArray.push((AgElem('.ng-tab-switch > li:eq('+ i +')').data('year') + ''));
				};

				if ( $href.indexOf('?year=') === -1 ) {
					$this.NewYear[0] = $this.YearArray[0];
					$this.NewYear[1] = $this.NewYear[0];
				} else {
					for ( var i = 0 ; i < $this.YearArray.length ; i ++ ) {
						if ( $.inArray( $href.split('?year=')[1] , $this.YearArray ) === -1 ) {
							$this.NewYear[0] = $this.YearArray[0];
							$this.NewYear[1] = $this.NewYear[0];
						} else {
							$this.NewYear[0] = $href.split('?year=')[1];
							$this.NewYear[1] = $this.NewYear[0];
						}
					};
				}
			},
			OnChange : function() {
				var $this = this;
				var $Reg = /year=/i;

				if ( ! $Reg.test($href) ) {
					document.location.href = $href + '?year=' + $this.NewYear[0];
				} else {
					document.location.href = $href.replace(/([?&]year)=([^#&]*)/g , '$1=' + $this.NewYear[0]);	
				}
			}
		},
		Milestone : {
			NewYear : '',
			YearArray : [],
			GetYear : function() {
				var $this = this;

				for (var i = 0 , $Length = AgElem('.ng-time-line .m-time-line-time').length ; i < $Length ; i ++ ) {
					$this.YearArray.push((AgElem('.ng-time-line .m-time-line-time:eq('+ i +')').text() + ''));
				};
			},
			OnChange : function() {
				var $this = this;

				jQuery.map( $this.YearArray , function(v , i){
					if ( v === $this.NewYear ) {
						AgElem('html , body').animate({
							'scrollTop' : AgElem('.ng-time-line > ul > li:eq('+ i +') .m-time-line-time').offset().top
						});
					}
				});
			}	
		},
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
					$scope.About.Youtube.Index = null;
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
		$scope.About.Youtube.GetData();

		if ( AgElem('.l-main').hasClass('honor-content') ) {
			$scope.About.Honor.GetYear();
		} else if ( AgElem('.l-main').hasClass('milestone-content') ) {
			$scope.About.Milestone.GetYear();
		}
		$scope.$apply();
	});
}]);