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

Ctrl.controller('Product' , ['$scope' , '$http' , function($scope , $http) {
	AgElem(document).ready(function() {
		$scope.$apply();
	});
}]);