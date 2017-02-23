<?php

/**
 * Classe de apoio para Disparo de PUSH
 * 
 * */
class PushMensagem extends GCMPushMessage{

	protected $cod_mensagem = '';
	//protected $cod_disparo = '';
	private   $apiKey;
	private   $devices = array();
	
	
	public function __construct($apiKey){		
		$this->apiKey = $apiKey;		
		return $this;
	}

	public function criarMensagem($assunto, $corpo){	
		
		if(!isset($assunto) || $assunto == ''){
			die('Assunto obrigatório');
		}

		if(!isset($corpo) || $corpo == ''){
			die('Assunto obrigatório');
		}
		
		/*
		CREATE TABLE mensagem(
			 cod_mensagem int(8) primary key auto_increment
			,assunto varchar(200)
			,corpo TEXT 
		);
		*/
		
		$db = getConnection();
		
		$sql = "INSERT INTO mensagem(assunto, corpo) VALUES (:assunto, :corpo)";
		$stmt = $db->prepare($sql);                                  

		$stmt->bindParam(':assunto', $assunto, PDO::PARAM_STR);
		$stmt->bindParam(':corpo', $corpo, PDO::PARAM_STR);


		$stmt->execute();
	 	$this->cod_mensagem = $db->lastInsertId();
		
		return $this;
	}

	
	public function setDisparoByIds($ids){	
	
		if(!isset($ids) || count($ids) == 0){
			die('ids obrigatório');
		}

		if($this->cod_alerta == ''){
			die('Test');
		}		

		$db = getConnection();
		
		//Faz de conta que você tem uma tabela de Usuarios, e nela que você alimenta o device_register
		$sql = "select device_register from usuario WHERE usuario.id IN ({$ids})";

		$stmt = $db->prepare($sql);			
		
		// bindvalue is 1-indexed, so $k+1
		foreach ($ids as $k => $id){
			$stmt->bindValue(($k+1), $id);
		}
		
		$stmt->execute();
		$usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
		
		$devices = array();
		foreach($usuarios as $usuarios){
			$devices[] = $usuarios->device_register;
		}
		
		$this->devices = $devices;
		

		return $this;
	}

	public function disparar(){

		$db = getConnection();
		
		if($this->cod_mensagem == ''){
			die('Necessario cod_mensagem');
		}	
		

		//Carrega o Alerta		
		$stmt = $db->prepare("SELECT * FROM mensagem WHERE cod_mensagem = :cod_mensagem");		
		$stmt->bindParam(':cod_mensagem', $this->cod_mensagem, PDO::PARAM_INT);

		$stmt->execute();
		$mensagem  = $stmt->fetch(PDO::FETCH_OBJ);
		$assunto = $mensagem->assunto;
		$corpo   = $mensagem->corpo;

	
		if(count($this->devices) == 0){
			return array('success' => true, 'msg' => 'Nenhum Rm encontrado');
		}

		parent::__construct($this->apiKey);
		$this->setDevices($devices);


		$response = $this->send($corpo, array(
			 'title'	=> $assunto
			//,'image'	=> 'www/img/icon/icon4android.png' // (possivel mudar dinamicamente desde que na exista na pasta local do App)
		));
		
		return json_decode($response);

	}
	
}