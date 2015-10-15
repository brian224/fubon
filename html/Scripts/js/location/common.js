Ctrl.controller('Location' , ['$scope' , '$http' , function($scope , $http) {
	$scope.Location = {
		Tw : {
			Model : {
				Company : '',
				Service : '',
				County  : '',
				Area    : ''
			},
			GetModel : function() {
				var $this = this;
				
				if ( $href.toLowerCase().indexOf('bu=') !== -1 ) {
					for ( var i = 0 , $Length = AgElem('select[name="temp_bu"] > option').length ; i < $Length ; i ++ ) {
						if ( AgElem('select[name="temp_bu"] > option').eq(i).val().toLowerCase() === $href.split('bu=')[1].split('&')[0].toLowerCase() ) {
							$this.Model.Company = AgElem('select[name="temp_bu"] > option').eq(i).val();
						}
					};
				}

				if ( $href.toLowerCase().indexOf('maptype=') !== -1 ) {
					for ( var i = 0 , $Length = AgElem('select[name="maptype"] > option').length ; i < $Length ; i ++ ) {
						if ( AgElem('select[name="maptype"] > option').eq(i).val().toLowerCase() === $href.split('maptype=')[1].split('&')[0].toLowerCase() ) {
							$this.Model.Service = AgElem('select[name="maptype"] > option').eq(i).val();
						}
					};
				}

				if ( $href.toLowerCase().indexOf('temp_zoned=') !== -1 ) {
					for ( var i = 0 , $Length = AgElem('select[name="temp_zoned"] > option').length ; i < $Length ; i ++ ) {
						if ( AgElem('select[name="temp_zoned"] > option').eq(i).val() === decodeURIComponent($href.split('temp_zoned=')[1].split('&')[0]) ) {
							$this.Model.County = AgElem('select[name="temp_zoned"] > option').eq(i).val();
						}
					};
				}

				if ( $href.toLowerCase().indexOf('zoned_kind=') !== -1 ) {
					for ( var i = 0 , $Length = AgElem('select[name="zoned_kind"] > option').length ; i < $Length ; i ++ ) {
						if ( AgElem('select[name="zoned_kind"] > option').eq(i).val() === decodeURIComponent($href.split('zoned_kind=')[1].split('&')[0]) ) {
							$this.Model.Area = AgElem('select[name="zoned_kind"] > option').eq(i).val();
						}
					};
				}
			}
		},
		Overseas : {
			Model : {
				Area : ''
			}
		}
	};

	AgElem(document).ready(function() {
		if ( AgElem('.ng-controller').hasClass('location-content') ) {
			$scope.Location.Tw.GetModel();
		}
		$scope.$apply();
	});
}]);