'use strict'

var authApp = angular
.module('authApp', ['angular-storage', 'ngMaterial', 'ui.router', 'ngResource', 'ngMaterial'])
.config(function($provide, $urlRouterProvider, $stateProvider, $httpProvider, $mdThemingProvider, $locationProvider){



$mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('deep-orange');


	$urlRouterProvider.otherwise('/home');

	
	$stateProvider
	.state('Main', {
		url:'/home',
		templateUrl: 'components/home/home.tpl.html',
		controller: 'homeController',
		deepStateRedirect: true,
		sticky: true
	})
	$stateProvider
	.state('maps', {
		url:'/googlemaps',
		templateUrl: 'components/googlemaps/googlemaps.html',
		controller: 'mapsController',
		deepStateRedirect: true,
		sticky: true
	})		
	$stateProvider
	.state('cal', {
		url:'/googlecal',
		templateUrl: 'components/googlecal/googlecal.html',
		controller: 'calController',
		deepStateRedirect: true,
		sticky: true
	})	

	$stateProvider
	.state('qc', {
		url:'/qc`',
		templateUrl: 'components/qc/qc.tpl.html',
		controller: 'qcController',
		deepStateRedirect: true,
		sticky: true
	})

	$stateProvider
	.state('manos', {
		url:'/manos',
		templateUrl: 'components/manos/manos.tpl.html',
		controller: 'manosController',
		deepStateRedirect: true,
		sticky: true,
	})		
	$stateProvider
	.state('auths', {
		url:'/auths',
		templateUrl: 'components/auths/auths.tpl.html',
		controller: 'authsController',
		deepStateRedirect: true,
		sticky: true,
	})		
	$stateProvider
	.state('docgen', {
		url:'/docgen',
		templateUrl: 'components/docgen/docgenmenu.tpl.html',
		controller: 'docsController',
		deepStateRedirect: true,
		sticky: true,
	})				
	$stateProvider
	.state('scrcases', {
		url:'/scrcases',
		templateUrl: 'components/scr/scrcases.html',
		controller: 'scrController',
		deepStateRedirect: true,
		sticky: true
	})	
	$stateProvider
	.state('casemain', {
		url:'/casemain',
		templateUrl: 'components/casemain/casemain.tpl.html',
		controller: 'casemainController',
		deepStateRedirect: true,
		sticky: true
	})	
	$stateProvider
	.state('calcsingleincome', {
		url:'/calcsingleincome',
		templateUrl: 'components/calcsingleincome/calcsingleincome.tpl.html',
		controller: 'csiController',
		deepStateRedirect: true,
		sticky: true
	})		
	.state('profile', {
		url:'/profile',
		templateUrl: 'components/profile/profile.tpl.html',
		controller: 'profileController as user',
		deepStateRedirect: true,
		sticky: true
	});

})


authApp.directive('fileModel', ['$parse', function ($parse) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
   };
}]);


authApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, cid){
         var fd = new FormData();
         fd.append('file', file);
         fd.append('cid', cid);
         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined,'Process-Data': false}
         })
         .success(function(){
            console.log("Success");
         })
         .error(function(){
            console.log("Error");
         });
     }
 }]);

 authApp.service('userService', function ($http) {
	var user;
	return {
		getUser: getUser,
		setUser: setUser
	};

	// .................

	function getUser() {
		return user;
	}

	function setUser(value) {
		user = value;
	}
});
 

