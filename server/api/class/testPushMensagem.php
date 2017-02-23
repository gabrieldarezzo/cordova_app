<?php

require_once 'GCMPushMessage.php';
require_once 'PushMensagem.php';



//https://console.firebase.google.com/project/_/settings/cloudmessaging
define('API_KEY_MESSAGE', 'YOUR_KEY_HERE'); 

//Precisa alterar o ID/senderID do projeto... estilo um numero -> '285156905606'


$assunto 	= 'Boa tarde';
$corpo 		= '<strong>pra Vc tmb!</strong>';



$pushMensagem = new PushMensagem(API_KEY_MESSAGE);
	$response = $pushMensagem
 		->gerarMensagem($assunto, $corpo)
 		->gerarDisparo(array(2,4,5))
 		->disparar()
 	;
