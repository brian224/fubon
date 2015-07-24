<<<<<<< HEAD
Ctrl.controller('Location' , ['$scope' , '$http' , function($scope , $http) {
	$scope.Location = {
		Tw : {
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
=======
Ctrl.controller('Location' , ['$scope' , '$http' , function($scope , $http) {
	$scope.Location = {
		Tw : {
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
>>>>>>> origin/master
}]);