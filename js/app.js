if(window.location.href.indexOf("localhost") > -1) {				
	var base_url = 'http://localhost/cordova_app/api/index.php/';
} else if(window.location.hostname.indexOf('192.168.0.210') !== -1) {
	var base_url = 'http://192.168.0.210/cordova_app/api/index.php/';
} else {
	var base_url = 'http://192.168.0.210/cordova_app/api/index.php/';
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

angular.module('imasters', ['ngAnimate', 'ngRoute', 'Login', 'Usuario'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		
		
	}])
	.run(function($window, $rootScope, $http) {		
	
		if(localStorage.getItem('tokenUsuario') != null && localStorage.getItem('tokenUsuario') != ''){
			$http.defaults.headers.common.Authorization = localStorage.getItem('tokenUsuario');
		}
		
	
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



angular.module('Login', [])
	.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
		$routeProvider
		.when('/', {
			 templateUrl: 'views/login.html'
			,controller: 'LoginController'			
			,controllerAs: 'Login'
		})
		.when('/login/', {			 
			 templateUrl: 'views/login.html'
			,controller: 'LoginController'			
			,controllerAs: 'Login'
		})
		.when('/criar/', {			 
			 templateUrl: 'views/criar.html'
			,controller: 'LoginController'			
			,controllerAs: 'Login'
		})
		.when('/logout/', {			 
			 template: ''
			,controller: 'LogoutController'			
		})
		;
		//$httpProvider.interceptors.push('authInterceptor');

	}])
	.service('LoginService', LoginService)
	.controller('LoginController', ['LoginService', '$location', LoginController])
	.controller('LogoutController', ['LoginService', '$location', LogoutController])
;

angular.module('Usuario', [])
	.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
		$routeProvider
		.when('/usuario', {			 
			 templateUrl: 'views/usuario/logado.html'
			,controller: 'UsuarioController'			
			,controllerAs: 'Usuario'
		})
		.when('/mensagem/criar', {			 
			 templateUrl: 'views/usuario/mensagem.html'
			,controller: 'UsuarioController'			
			,controllerAs: 'Usuario'
		})
		;

		//$httpProvider.interceptors.push('authInterceptor');

	}])
	.service('UsuarioService', UsuarioService)
	.controller('UsuarioController', ['UsuarioService', '$location', UsuarioController])	
	//.factory('authInterceptor',  authInterceptor)	
;

function LoginController(LoginService, $location){
	
	this.criarUsuario = function(usuario){
		//console.log(usuario);
		
		//Valida
		
		LoginService.add(usuario)
		.then(function successCallback(response){
			//console.log(response);
			json = response.data;
			
			//Salva dados no Storage
			localStorage.setItem('tokenUsuario', json.token);
			
			
			
			
			
			$location.path('/usuario');
			
		}
		,function errorCallback(err) {
			
			/*
			console.log('Get Storage');			
			//Se tiver algo mostra
			if(localStorage.getItem('usuarios')) {
				vm.usuarios = JSON.parse(localStorage.getItem('usuarios'));
			}
			*/
		})
		
			
	}
}

function LogoutController($location){
	localStorage.removeItem('cli');
	

	$location.path('/');
}

function UsuarioController(UsuarioService, $location){
	var vm = this;
	
	
	getAllMensagens();
	
	function getAllMensagens(){
		//console.log('dasdas');
		
		var request = {			
			tokenUsuario : localStorage.getItem('tokenUsuario')
		};
		
		UsuarioService.showMensagens(request)
		.then(function successCallback(response){
			//console.log(response);
			json = response.data;
			//console.log(json);
			
			//Salva dados no Storage
			//localStorage.setItem('tokenUsuario', JSON.stringify(json));
			
			//$location.path('/aluno/logado');
			
		}
		,function errorCallback(err) {
			
			/*
			console.log('Get Storage');			
			//Se tiver algo mostra
			if(localStorage.getItem('usuarios')) {
				vm.usuarios = JSON.parse(localStorage.getItem('usuarios'));
			}
			*/
		})
	}
	
	vm.controllerResume = controllerResume;
	function controllerResume(){
		//getAllRecados();		
		getAllMensagens();
	}
}

function UsuarioService($http){
	this.showMensagens = function(data){
		console.log(data);
		const url 		= base_url + 'showMensagens';
		const method 	= 'GET';
		const request 	= {
			 url	: url
			,method : method
			,data	: data
		};
		return $http(request);
	};	
}

function LoginService($http){
	this.add = function(data){
		
		data.device_register = '';
		if(localStorage.getItem('registrationId') != null){
			data.device_register = localStorage.getItem('registrationId');
		}
		
		const url 		= base_url + 'criarUsuario';
		const method 	= 'POST';
		const request 	= {
			 url	: url
			,method : method
			,data	: data
		};
		return $http(request);
	};
}