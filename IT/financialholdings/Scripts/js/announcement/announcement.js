Ctrl.controller('Announcement' , ['$scope' , '$http' , function($scope , $http) {
	$scope.repeat = {
		Callback : function(){
			$scope.$parent.Common.Cloak = false;
			AgElem('.ng-pagination-action > *:eq('+ $scope.$parent.Common.Pagination.Active[0] +')').addClass('is-show');
			$scope.$parent.Common.Pagination.Page = $scope.Announcement.Data.length;
		}
	},
	$scope.Announcement = {
		Total   : AgElem('.ng-public-list > .m-list-hd > li').length,
		Length  : parseInt(AgElem('.ng-public-list').data('length') , 10),
		Year    : [],
		Model   : '',
		Data    : [],
		GetDate : function(){
			var $this = this,
				$Data = [];

			for ( var i = 0 ; i < $this.Total ; i ++ ) {
				if ( $.inArray(AgElem('.ng-public-list > .m-list-hd > li:eq('+ i +') > time').text() , $this.Year) === -1 ) {
					$this.Year.push(AgElem('.ng-public-list > .m-list-hd > li:eq('+ i +') > time').text());
				}
			};

			$this.Year.sort(function(a , b){
				return (b - a);
			});

			if ( $href.indexOf('?year=') === -1 ) {
				$this.Model = $this.Year[0];
			} else {
				for ( var i = 0 ; i < $this.Year.length ; i ++ ) {
					if ( $.inArray($href.split('?year=')[1] , $this.Year) === -1 ) {
						$this.Model = $this.Year[0];
					} else {
						$this.Model = $href.split('?year=')[1];
					}
				};
			}

			for ( var i = 0 ; i < $this.Total ; i ++ ) {
				if ( AgElem('.ng-public-list > .m-list-hd > li:eq('+ i +') > time').text() === $this.Model ) {
					$Data.push({
						'Time'  : AgElem('.ng-public-list > .m-list-hd > li:eq('+ i +') > time').text(),
						'Title' : AgElem('.ng-public-list > .m-list-hd > li:eq('+ i +') > em').text(),
						'Href'  : AgElem('.ng-public-list > .m-list-hd > li:eq('+ i +') > button').text()
					});
				}
			};

			for ( var i = 0 , $Len = 0 ; i < ( $Data.length / $this.Length ) ; i ++ ) {
				$this.Data.push([]);
				for ( var j = 0 ; j < $this.Length ; j ++ , $Len ++ ) {
					if ( $Len < $Data.length ) {
						$this.Data[i].push($Data[$Len]);
					}
				}
			}

			// for ( var i = 0 , $Len = 0 ; i < ( $this.Total / $this.Length ) ; i ++ ) {
			// 	$this.Data.push([]);
			// 	for ( var j = 0 ; j < $this.Length ; j ++ , $Len ++ ) {
			// 		if ( $Len < $this.Total ) {
			// 			$this.Data[i].push({
			// 				'Time'  : AgElem('.ng-public-list > .m-list-hd > li:eq('+ $Len +') > time').text(),
			// 				'Title' : AgElem('.ng-public-list > .m-list-hd > li:eq('+ $Len +') > em').text(),
			// 				'Href'  : AgElem('.ng-public-list > .m-list-hd > li:eq('+ $Len +') > button').text()
			// 			});
			// 		}
			// 	}
			// }
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
	};

	AgElem(document).ready(function() {
		$scope.Announcement.GetDate();
		$scope.$apply();
	});
}]);