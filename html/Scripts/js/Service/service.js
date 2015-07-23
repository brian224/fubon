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

/* ng-forget-member directive */
Ctrl.directive('ngForgetMember' , ['$document' , function($document) {
	return {
		restrict : 'C',
		link     : function(scope , elem , attrs) {
			elem.on('click' , function(e){
				e.preventDefault();
				scope.Service.Member.Forget = true;
			});
		}
	};
}]);

Ctrl.controller('Service' , ['$scope' , '$http' , function($scope , $http) {
	$scope.Service = {
		Member : {
			Forget : false
		}
	};

	AgElem(document).ready(function() {
		$scope.$apply();
	});
}]);