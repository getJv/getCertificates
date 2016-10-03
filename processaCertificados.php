<?php
#http://stackoverflow.com/questions/5306612/using-wpdb-in-standalone-script
require_once('../../../wp-load.php');



#verificações básicas de segurança: https://developer.wordpress.org/plugins/users/roles-and-capabilities/
#https://developer.wordpress.org/plugins/users/roles-and-capabilities/
if ( !(is_user_logged_in() && current_user_can('create_certificates')))  
{ echo 'Acesso negado! somente usuários com a permissão de criar certificados podem acessar esta página.'; exit;}


global $wpdb;



$rawData = json_decode(file_get_contents("php://input"));

#Separa dados necessários
$dataTosave = array();

$dataTosave['nome_voluntario']         =     $rawData->nome_voluntario       ;
$dataTosave['email_voluntario']        =     $rawData->email_voluntario       ;
$dataTosave['descricao_atividades']    =     $rawData->descricao_atividades   ;
$dataTosave['quantidade_horas']        =     $rawData->quantidade_horas       ;
$dataTosave['quantidade_meses']        =     $rawData->quantidade_meses       ;
$dataTosave['hash']      			   =     md5($dataTosave['nome_voluntario'] . $dataTosave['descricao_atividades'] . microtime() );
$dataTosave['nome_assinante']          =     $rawData->nome_assinante         ;
$dataTosave['cargo_assinante']         =     $rawData->cargo_assinante        ;
$dataTosave['descricao_contribuicao']  =     $rawData->descricao_contribuicao ;
$dataTosave['solicitante']			   =     wp_get_current_user()->user_login ;  
$dataTosave['nome_evento']             =     $rawData->nome_evento            ;
$dataTosave['descricao_evento']        =     $rawData->descricao_evento       ;
$dataTosave['template']				   =     $rawData->template      	    ;
   	    
                                    

#validação recomendada pelo wordpress
if ( false ){
	echo "Os dados da requisição nao passaram na validação do wordpress." ;
	echo "<pre>";
	print_r("Arquivo: " . __FILE__);
	print_r("Arquivo: " . __LINE__);
	print_r($dataTosave);
	exit;
	
}
//print_r($dataTosave);
//exit;
//$data['dado'] = 'jhonatan';
$wpdb->insert('wp_getjv_certificates', $dataTosave, "%s"); 
$rowid = $wpdb->insert_id;
//echo '<pre>';
echo ($rowid);

//print_r($wpdb);
 









