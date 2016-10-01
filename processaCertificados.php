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

$dataTosave['nome_voluntario']         =     $rawData->nomeVoluntario       ;
$dataTosave['email_voluntario']        =     $rawData->emailVoluntario       ;
$dataTosave['descricao_atividades']    =     $rawData->descricaoAtividades   ;
$dataTosave['quantidade_horas']        =     $rawData->quantidadeHoras       ;
$dataTosave['quantidade_meses']        =     $rawData->quantidadeMeses       ;
$dataTosave['hash']      			   =     md5($dataTosave['nome_voluntario'] . $dataTosave['descricao_atividades'] . microtime() );
$dataTosave['nome_assinante']          =     $rawData->nomeAssinante         ;
$dataTosave['cargo_assinante']         =     $rawData->cargoAssinante        ;
$dataTosave['descricao_contribuicao']  =     $rawData->descricaoContribuicao ;
$dataTosave['solicitante']			   =     wp_get_current_user()->user_login ;  
$dataTosave['nome_evento']             =     $rawData->nomeEvento            ;
$dataTosave['descricao_evento']        =     $rawData->descricaoEvento       ;
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
 









