<?php
#http://stackoverflow.com/questions/5306612/using-wpdb-in-standalone-script
require_once('../../../wp-load.php');

#verificações básicas de segurança: https://developer.wordpress.org/plugins/users/roles-and-capabilities/
#https://developer.wordpress.org/plugins/users/roles-and-capabilities/
if ( !(is_user_logged_in() && current_user_can('manage_options')))  
{ echo 'Acesso negado! somente usuários com a permissão de administrador podem acessar esta página.'; exit;}


global $wpdb;
$rawData = json_decode(file_get_contents("php://input"));


#Separa dados necessários

$row = $wpdb->get_row( "SELECT status FROM wp_getjv_certificates WHERE id = " . $rawData );
 
//var_dump($row);
 if($row->status){
	 $dataTosave[status] = 0;
	 echo $wpdb->update('wp_getjv_certificates', $dataTosave,array( 'id' => $rawData ), "%d"); 
	 
	
 }else{
	 
	 $dataTosave[status] = 1;
	 echo $wpdb->update('wp_getjv_certificates', $dataTosave,array( 'id' => $rawData ), "%d"); 
 }
 
 //print_r($wpdb);
 exit;
 
//print_r($dataTosave); exit;



 









