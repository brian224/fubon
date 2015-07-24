/* ng-search-button directive */
Ctrl.directive('ngSearchButton' , ['$document' , function($document) {
	return {
		restrict : 'C',
		link     : function(scope , elem , attrs) {
			elem.on('click', function(e) {
				if ( scope.$parent.Common.Search.Value === '' ) {
					e.preventDefault();
				}
			});
		}
	};
}]);


Ctrl.controller('Search' , ['$scope' , '$http' , function($scope , $http) {
	AgElem(document).ready(function() {
		$scope.$apply();
	});
}]);