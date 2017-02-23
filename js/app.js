if(window.location.href.indexOf("localhost") > -1) {				
	var base_url = 'http://localhost/be_mean/api/user';
} else {		
	var base_url = 'http://192.168.0.210/be_mean/api/user';
}


function capitalize(input){
	return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
}

function sanitizeLogin(login){	
	//console.log(user);
	if(login != null){
		
		var auxValidate = login.replace(/[^0-9]/g,'');
		if(auxValidate.length == 11){

			var returnLogin = '';				
			returnLogin += auxValidate.substr(0, 3) + '.';
			returnLogin += auxValidate.substr(3, 3) + '.';
			returnLogin += auxValidate.substr(6, 3) + '-';
			returnLogin += auxValidate.substr(9, 2);			
			return returnLogin;
		}
		return ''
	}
}



	
angular.module('BeMEAN', ['ngAnimate', 'ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/', {
			 templateUrl: 'views/users-list.html'
			,controller: 'UserController'
			,controllerAs: 'vm'
		})	
		.otherwise({redirectTo: '/'});		
		;
		
	}])
	.service('UserService', UserService)
	.controller('UserController', ['UserService', UserController])	
	
	.run(function($window, $rootScope) {		
		$rootScope.online = navigator.onLine;
		
		$window.addEventListener("offline", function () {
			$rootScope.$apply(function() {
				$rootScope.online = false;
			});
		}, false);
		$window.addEventListener("online", function () {
			$rootScope.$apply(function() {
				$rootScope.online = true;
			});		
		}, false);
	})
	
	/*
	.run(function($location){		
		//alert(1);
		//Run Just OneTime
		if(localStorage.getItem('modulos') != null && localStorage.getItem('modulos') != ''){
			$location.path('/aluno/logado');
			return false;
		}
	})	
	
	*/
;

function UserService($http){
	
	this.list = function(){
		const url 		= base_url;
		const method 	= 'GET';
		const request 	= {
			 url	: url
			,method : method
		};
		return $http(request);
	};
}


function UserController(UserService){
	var vm = this;
	vm.usuarios = {};
	
	
	vm.updateUserAction = updateUsuarios;	
	
	
	
	function updateUsuarios(){		
		
		UserService.list()
		.then(function successCallback(response){
			json = response.data;
			
			console.log(json);
			vm.usuarios = json;
			
			//Salva dados no Storage
			localStorage.setItem('usuarios', JSON.stringify(json));
		}
		, function errorCallback(err) {
			
			console.log('Get Storage');			
			//Se tiver algo mostra
			if(localStorage.getItem('usuarios')) {
				vm.usuarios = JSON.parse(localStorage.getItem('usuarios'));
			}
		
		})
	};
	
	
	//RUN
	updateUsuarios();
	
}