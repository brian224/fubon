/* ng-accordion directive */
Ctrl.directive('ngAccordion' , ['$document' , function($document) {
	return {
		restrict : 'C',
		link     : function(scope , elem , attrs) {
			var $element = elem.find('.m-accordion-hd');
			scope.$parent.Common.Accordion.FAQ(elem , $element);
		}
	};
}]);

Ctrl.controller('Governance' , ['$scope' , '$http' , function($scope , $http) {
	$scope.repeat = {
		Callback : function(){
			$scope.$parent.Common.Cloak = false;
			AgElem('.ng-pagination-action > *:eq('+ $scope.$parent.Common.Pagination.Active[0] +')').addClass('is-show');
			$scope.$parent.Common.Pagination.Page = $scope.Governance.Shareholders.Data.length;
		}
	},
	$scope.Governance = {
		Shareholders : {
			Total   : AgElem('.ng-ajax > li').length,
			Length  : parseInt(AgElem('.ng-ajax').data('length') , 10),
			Data    : [],
			GetDate : function(){
				var $this = this,
					$Data = [];

				for ( var i = 0 ; i < $this.Total ; i ++ ) {
					$Data.push({
						'Title' : AgElem('.ng-ajax > li:eq('+ i +') > em').text(),
						'Table' : [],
						'File'  : [],
						'More'  : AgElem('.ng-ajax > li:eq('+ i +') > a').text()
					});

					for ( var j = 0 , $Length = AgElem('.ng-ajax > li:eq('+ i +') > time').length ; j < $Length ; j ++ ) {
						$Data[i].Table.push({
							'Date'    : AgElem('.ng-ajax > li:eq('+ i +') > time:eq('+ j +')').text().split('　')[0],
							'Time'    : AgElem('.ng-ajax > li:eq('+ i +') > time:eq('+ j +')').text().split('　')[1],
							'Address' : AgElem('.ng-ajax > li:eq('+ i +') > address:eq('+ j +')').text(),
							'County'  : AgElem('.ng-ajax > li:eq('+ i +') > span:eq('+ j +')').text()
						});
					};

					for ( var j = 0 , $Length = AgElem('.ng-ajax > li:eq('+ i +') > p').length ; j < $Length ; j ++ ) {
						$Data[i].File.push({
							'Name' : AgElem('.ng-ajax > li:eq('+ i +') > p:eq('+ j +')').text(),
							'Href' : AgElem('.ng-ajax > li:eq('+ i +') > button:eq('+ j +')').text()
						});
					};
				};

				for ( var i = 0 , $Length = 0 ; i < ( $Data.length / $this.Length ) ; i ++ ) {
					$this.Data.push([]);
					for ( var j = 0 ; j < $this.Length ; j ++ , $Length ++ ) {
						if ( $Length < $Data.length ) {
							$this.Data[i].push($Data[$Length]);
						}
					}
				}
			}	
		},
		BoardOfDirectors : {
			GetName : function() {
				if ( $href.indexOf('?p=') !== -1 ) {
					for ( var i = 0 , $length = AgElem('.ng-accordion > ol > li').length ; i < $length ; i ++ ) {
						if ( AgElem('.ng-accordion > ol > li:eq('+ i +')').data('name') === $href.split('?p=')[1] ) {
							var $index = i;

							AgElem('.ng-accordion > ol > li:eq('+ $index +')').addClass('is-active');

							if ('transform' in window.document.body.style || '-webkit-transition' in window.document.body.style) {
								AgElem('.ng-accordion > ol > li:eq('+ $index +')').one($animationend , function() {
									AgElem('html , body').animate({
										'scrollTop' : AgElem('.ng-accordion > ol > li:eq('+ $index +')').offset().top
									} , 500);
								});
							} else {
								AgElem('html , body').animate({
									'scrollTop' : AgElem('.ng-accordion > ol > li:eq('+ $index +')').offset().top
								} , 500);
							}
						}
					};
				}
			}
		},
		Resolutions : {
			Total   : AgElem('.ng-ajax > li').length,
			Length  : parseInt(AgElem('.ng-ajax').data('length') , 10),
			Year    : [],
			Model   : '',
			Data    : [],
			GetDate : function(){
				var $this = this,
					$Data = [];

				for ( var i = 0 ; i < $this.Total ; i ++ ) {
					if ( $.inArray(AgElem('.ng-ajax > li:eq('+ i +') > time').text().split('.')[0] , $this.Year ) === -1 ) {
						$this.Year.push(AgElem('.ng-ajax > li:eq('+ i +') > time').text().split('.')[0]);
					}
				};

				$this.Year.sort(function(a , b){
					return (b - a);
				});

				if ( $href.indexOf('?year=') === -1 ) {
					$this.Model = $this.Year[0];
				} else {
					for ( var i = 0 ; i < $this.Year.length ; i ++ ) {
						if ( $.inArray( $href.split('?year=')[1] , $this.Year ) === -1 ) {
							$this.Model = $this.Year[0];
						} else {
							$this.Model = $href.split('?year=')[1];
						}
					};
				}

				for ( var i = 0 ; i < $this.Total ; i ++ ) {
					if ( AgElem('.ng-ajax > li:eq('+ i +') > time').text().split('.')[0] === $this.Model ) {
						$Data.push({
							'Time'  : AgElem('.ng-ajax > li:eq('+ i +') > time').text(),
							'Title' : AgElem('.ng-ajax > li:eq('+ i +') > em').text()
						});
					}
				};

				for ( var i = 0 , $Length = 0 ; i < ( $Data.length / $this.Length ) ; i ++ ) {
					$this.Data.push([]);
					for ( var j = 0 ; j < $this.Length ; j ++ , $Length ++ ) {
						if ( $Length < $Data.length ) {
							$this.Data[i].push($Data[$Length]);
						}
					}
				}

				$scope.$parent.Common.Pagination.Page = $this.Data.length;
			},
			OnChange : function(){
				var $this = this;
				var $Reg = /year=/i;
				if ( ! $Reg.test($href) ) {
					document.location.href = $href + '?year=' + $this.Model;
				} else {
					document.location.href = $href.replace(/([?&]year)=([^#&]*)/g , '$1=' + $this.Model);	
				}
			}
		}
	};

	AgElem(document).ready(function() {
		if ( AgElem('.l-main').hasClass('shareholders-content') ) {
			$scope.Governance.Shareholders.GetDate();
		} else if ( AgElem('.l-main').hasClass('board_of_directors-content') ) {
			$scope.Governance.BoardOfDirectors.GetName();
		} else if ( AgElem('.l-main').hasClass('resolutions-content') ) {
			$scope.Governance.Resolutions.GetDate();
		}
		$scope.$apply();
	});
}]);