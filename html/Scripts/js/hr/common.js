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

Ctrl.controller('Hr' , ['$scope' , '$http' , function($scope , $http) {
	$scope.Jobs = '';

	AgElem(document).ready(function() {
		$scope.$apply();
	});
}]);