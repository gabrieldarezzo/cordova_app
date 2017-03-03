DROP DATABASE imasters;
CREATE DATABASE imasters;

USE imasters;

CREATE TABLE mensagem(
	 cod_mensagem INT(8) PRIMARY KEY AUTO_INCREMENT
	,assunto VARCHAR(200)
	,corpo TEXT 
	,usuario_id INT(8)
);

CREATE TABLE usuario(
	 id INT(8) PRIMARY KEY AUTO_INCREMENT	 
	,nome VARCHAR(50) NOT NULL
	,email VARCHAR(150)	NOT NULL
	,senha VARCHAR(150)	NOT NULL
	,token CHAR(32)
	,device_register VARCHAR(300)	
);




