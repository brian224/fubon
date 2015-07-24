/* ng-member directive */
Ctrl.directive('ngMember' , ['$document' , function($document) {
	return {
		restrict : 'C',
		link     : function(scope , elem , attrs) {
			elem.on('click' , function(e){
				e.preventDefault();

				AgElem(elem).SugarFunBox({
					mobile        : $SugarFunBoxSet.mobile,
					backdropclose : $SugarFunBoxSet.backdropclose,
					click         : false,
					loadimg       : $SugarFunBoxSet.loadimg,
					width         : 610
				});
			});
		}
	};
}]);

Ctrl.controller('About' , ['$scope' , '$http' , function($scope , $http) {
	$scope.About = {
		Honor : {
			NewYear   : '',
			YearArray : [],
			GetYear : function() {
				var $this = this;

				for (var i = 0 , $Length = AgElem('.ng-tab-switch > li').length ; i < $Length ; i ++ ) {
					$this.YearArray.push((AgElem('.ng-tab-switch > li:eq('+ i +')').data('year') + ''));
				};

				if ( $href.indexOf('?year=') === -1 ) {
					$this.NewYear = $this.YearArray[0];
				} else {
					for ( var i = 0 ; i < $this.YearArray.length ; i ++ ) {
						if ( $.inArray( $href.split('?year=')[1] , $this.YearArray ) === -1 ) {
							$this.NewYear = $this.YearArray[0];
						} else {
							$this.NewYear = $href.split('?year=')[1];
						}
					};
				}
			},
			OnChange : function() {
				var $this = this;
				var $Reg = /year=/i;

				if ( ! $Reg.test($href) ) {
					document.location.href = $href + '?year=' + $this.NewYear;
				} else {
					document.location.href = $href.replace(/([?&]year)=([^#&]*)/g , '$1=' + $this.NewYear);	
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
							'scrollTop' : AgElem('.ng-time-line > li:eq('+ i +') .m-time-line-time').offset().top
						});
					}
				});
			}	
		}
	};

	AgElem(document).ready(function() {
		if ( AgElem('.l-main').hasClass('honor-content') ) {
			$scope.About.Honor.GetYear();
		} else if ( AgElem('.l-main').hasClass('milestone-content') ) {
			$scope.About.Milestone.GetYear();
		}
		$scope.$apply();
	});
}]);