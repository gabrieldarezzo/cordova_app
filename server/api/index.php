<?php

## ATENÇÃO leia o .htaccess desta budega ## 
//header('Content-Type: application/json; charset=utf-8');

header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');  
header('Access-Control-Allow-Headers: *');  
header('Access-Control-Max-Age: 86400'); 

ini_set('display_errors', true);
error_reporting(E_ALL);


//CORs Fix
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && (
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST' ||
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'DELETE' ||
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'PUT' )) {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Credentials: true");
        header('Access-Control-Allow-Headers: X-Requested-With');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT'); // http://stackoverflow.com/a/7605119/578667
        header('Access-Control-Max-Age: 86400');
    }
    exit;
}


// require_once 'class/PdoDebugger.php';
// echo \PdoDebugger::show($sql, array(
	 // 'cpf_aluno' => $aluno->login
	// ,'senha' 	=> $aluno->senha
// ));
// die();



define('API_KEY_MESSAGE', 'YOUR_KEY_HERE'); 

require_once 'class/lib.php';

require 'vendor/autoload.php';
require_once 'class/GCMPushMessage.php';
require_once 'class/PushMensagem.php';

//Don't touch in ISS server.
if(!function_exists('openssl_random_pseudo_bytes')){
	function openssl_random_pseudo_bytes($hash_length){
		return random_bytes($hash_length);
	}
}
 

//instancie o objeto
$app = new \Slim\Slim();


function getConnection() {

	try {
	    
		if(strpos($_SERVER['SERVER_NAME'], 'localhost') !== false || $_SERVER['SERVER_NAME']=='127.0.0.1' || $_SERVER['SERVER_NAME']=='192.168.0.210'){
			
			$cli = 'be_mean';
			
			$db = new PDO("mysql:host=localhost;dbname=" . $cli , 'root', '');  
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);		
			$db->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
			//$db->exec("set names utf8"); //Garante UTF em versão < 5.3
			return $db;
		} else {
			//PRODUÇÃO Conf.

			
			return $db;
		}
	} catch (PDOException $e) {
	    print "Error!: " . $e->getMessage() . "<br/>";
	    die();
	}
}

//	$token = bin2hex(openssl_random_pseudo_bytes(16));



$app->post('/register_device/', function () { 

	$app = \Slim\Slim::getInstance();
	$request = $app->request();
	$user_device = json_decode($request->getBody());

	if($user_device == null){
		$user_device = new stdClass;		
		$user_device->registrationId	= $_POST['registrationId']; 
		$user_device->cod_responsavel	= $_POST['cod_responsavel']; 
	}
		
	$db = getConnection();

	$registrationId = $user_device->registrationId;	
	$id 			= $user_device->cod_responsavel;
	

	if(!isset($id) || $id == ''){
		die('id not defined');
	}
	
	
	$sql = "UPDATE usuario SET device_register = :device_register WHERE id = :id";

	$stmt = $db->prepare($sql);

	$stmt->bindParam(':id', $id, PDO::PARAM_STR);       
	$stmt->bindParam(':device_register', $registrationId, PDO::PARAM_STR);       
	$stmt->execute();

});




$app->get('/', function () { 
	print json_encode(array('action' => false, 'message' => 'Root (/) empty'));
});


//rode a aplicação Slim 
$app->run();