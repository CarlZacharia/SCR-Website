(function()	{
'use strict';
angular
.module('authApp')
.controller('profileController', profileController);

function profileController($http, store) {
	var vm = this;

	vm.getMessage = getMessage;
	vm.getSecretMessage = getSecretMessage;
	vm.message;

	vm.profile = store.get('profile');


}

})();