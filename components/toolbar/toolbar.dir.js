(function() {
	'use strict';
	
	angular
	.module('authApp')
	.directive('toolbar', toolbar);
	
	
	
	function toolbar() {
		return {
			templateUrl: 'components/toolbar/toolbar.tpl.html',
			controller: toolbarController,
			controllerAs: 'toolbar'
			
		}
	}
	
	function toolbarController(store, $location, $scope, userService) {


	$scope.isAuthenticated = function() {
		if(localStorage.getItem('auth') == true){
			return true;}
			else {
				return false;
			}
		};

	$scope.today = moment(new Date()).format("MMMM D, YYYY");
	$scope.isAuthenticated = function(){
	if(store.get('profile')){
		$scope.isAuthenticated = true;
		console.log($scope.isAuthenticated);
	}	
	};
	

	
		$scope.logout = function() {
			store.remove('profile');
			userService.setUser(null);
			$scope.isAuthenticated = false;
			localStorage.setItem('auth', false);
			$location.path('/home');
		}
	
	
	}
	
	
	
	})();
	