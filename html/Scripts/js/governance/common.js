/* ng-accordion directive */
// Ctrl.directive('ngAccordion' , ['$document' , function($document) {
// 	return {
// 		restrict : 'C',
// 		link     : function(scope , elem , attrs) {
// 			var $element = elem.find('.m-accordion-hd');
// 			scope.$parent.Common.Accordion.FAQ(elem , $element);
// 		}
// 	};
// }]);

Ctrl.controller('Governance' , ['$scope' , '$http' , function($scope , $http) {
	$scope.repeat = {
		Callback : function(){
			$scope.$parent.Common.Cloak = false;
			AgElem('.ng-pagination-action > *:eq('+ $scope.$parent.Common.Pagination.Active[0] +')').addClass('is-show');
			$scope.$parent.Common.Pagination.Page = $scope.Governance.Data.length;
		}
	},
	$scope.Governance = {
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
					'File'  : []
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
	};

	AgElem(document).ready(function() {
		if ( AgElem('.l-main').hasClass('shareholders-content') ) {
			$scope.Governance.GetDate();
		}
		$scope.$apply();
	});
}]);