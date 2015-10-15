Ctrl.controller('Announce' , ['$scope' , '$http' , function($scope , $http) {
	$scope.repeat = {
		Callback : function(){
			$scope.$parent.Common.Cloak = false;
			AgElem('.ng-pagination-action > *:eq('+ $scope.$parent.Common.Pagination.Active[0] +')').addClass('is-show');
			$scope.$parent.Common.Pagination.Page = $scope.Announce.Data.length;
		}
	},
	$scope.Announce = {
		Total   : AgElem('.ng-ajax > li').length,
		Length  : parseInt(AgElem('.ng-ajax').data('length') , 10),
		Data    : [],
		GetDate : function(){
			var $this = this,
				$Data = [];

			for ( var i = 0 ; i < $this.Total ; i ++ ) {
				$Data.push({
					'Title'  : AgElem('.ng-ajax > li:eq('+ i +') > em').text(),
					'Href'   : AgElem('.ng-ajax > li:eq('+ i +') > button').text(),
					'Target' : AgElem('.ng-ajax > li:eq('+ i +') > button').data('target')
				});
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
	};

	AgElem(document).ready(function() {
		$scope.Announce.GetDate();
		$scope.$apply();
	});
}]);