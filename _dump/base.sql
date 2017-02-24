CREATE TABLE imasters;

USER imasters;

CREATE TABLE mensagem(
	 cod_mensagem int(8) primary key auto_increment
	,assunto varchar(200)
	,corpo TEXT 
	,usuario_id int(8)
);

CREATE TABLE usuario(
	 id int(8) primary key auto_increment	 
	,nome varchar(50) not null
	,email varchar(150)	not null
	,senha varchar(150)	not null
	,token char(32)
	,device_register varchar(300)	
);




