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
;

function UserService($http){
	if(window.location.href.indexOf("localhost") > -1) {		
		var base_url = 'http://localhost/storage/api/dados.php';
	} else {		
		var base_url = 'http://192.168.0.210/storage/api/dados.php';
	}
	
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
		//console.log('Ativar');
		
		UserService.list()
		.success(function(json){
			console.log('Ativado');
			
			vm.usuarios = json;
			
			//Salva dados no Storage
			localStorage.setItem('usuarios', JSON.stringify(json));
		})
		.error(function(err){		
			console.log('Get Storage');
			
			//Se tiver algo mostra
			if(localStorage.getItem('usuarios')) {
				vm.usuarios = JSON.parse(localStorage.getItem('usuarios'));
			}
		});
	};
	
	
	//RUN
	updateUsuarios();
	
}