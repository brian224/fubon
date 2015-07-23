Ctrl.controller('Branches' , ['$scope' , '$http' , function($scope , $http) {
	$scope.Branches = {
		Local : {
			Model : {
				Company : '',
				Service : '',
				County  : '',
				Area    : ''
			}
		},
		Overseas : {
			
		}
	};

	AgElem(document).ready(function() {
		$scope.$apply();
	});
}]);