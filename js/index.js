function registerDeviceServer(registrationId = null, id_usuario = null){
	console.log('registrationId -> ', registrationId);
	
	if(registrationId == null){
		return false;
	}
	
	
	var ajax = new XMLHttpRequest();
	var params = 'cod_responsavel=' + cod_responsavel + '&registrationId=' + registrationId + '&cli=' + cli;
	
	//Lugar onde salvar no WebService...
	ajax.open("POST", 'http://192.168.0.210/cordova_app/api/index.php/register_device/', true);
	
	
	
	
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");			
	ajax.send(params);
	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4 && ajax.status == 200) {
			console.log(ajax.responseText);			
		}
	}
}


document.addEventListener('DOMContentLoaded', function() {
	
	document.addEventListener("deviceready", onDeviceReady, false);

});

    
//Mais eventos em: http://cordova.apache.org/docs/en/6.x/cordova/events/events.html
function onDeviceReady() {    
    document.addEventListener("backbutton", onBackKeyDown, false);
    document.addEventListener("resume", onResume, false);    

	
	//Notification	
	var app = this;	
	app.push = PushNotification.init({
		 "android": {
			  "senderID": "285166905606"
			 //,"icon" : 	'android_icon'
			 //,"iconColor": "#ff6600"			 
		 },
		 "ios": {
		   "sound": true,
		   "vibration": true,
		   "badge": true
		 },
		 "windows": {}
	 });

	app.push.on('registration', function(data) {
		
		var oldRegId = localStorage.getItem('registrationId');
		if (oldRegId !== data.registrationId) {
			// Save new registration ID
			localStorage.setItem('registrationId', data.registrationId);		
			
			//registerDeviceServer(localStorage.getItem('registrationId'));
		}
	});

	app.push.on('error', function(e) {
		console.log("push error = " + e.message);
	});
	
	app.push.on('notification', function(data) {		
		app.push.finish(function() {			 
			//Force to show data
			console.log('notification-app-push-success');
		}, function() {
			console.log('notification-app-push-error');
		});
	});
	//End - Notification
}

function onResume(){	
    //Se já estiver logado, força o reload dos recados
    if(localStorage.getItem('tokenUsuario') != null && localStorage.getItem('tokenUsuario') != ''){        
		//document.getElementById("id_element")
        angular.element($('#mvc')).scope().Usuario.controllerResume();
    }
}



function onBackKeyDown() {
    //angular.element($('#mvc')).scope().Aluno.closeModal();    
    //return false;
}