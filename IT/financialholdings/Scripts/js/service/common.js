/* ng-member directive */
Ctrl.directive('ngMember' , ['$document' , function($document) {
	return {
		restrict : 'C',
		link     : function(scope , elem , attrs) {
			elem.on('click' , function(e){
				e.preventDefault();

				$.SugarFunBox.open({
					width        : 610,
					href         : attrs.href,
					closeBtnElem : $SugarFunBoxSet.closeBtnElem,
					loadImg      : $SugarFunBoxSet.loadimg
				});
			});
		}
	};
}]);

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

/* ng-forget-member directive */
Ctrl.directive('ngForgetMember' , ['$document' , function($document) {
	return {
		restrict : 'C',
		link     : function(scope , elem , attrs) {
			elem.on('click' , function(e){
				e.preventDefault();
				scope.Service.Member.Forget = true;
				scope.$apply();
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