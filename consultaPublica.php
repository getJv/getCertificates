<?php
#http://stackoverflow.com/questions/5306612/using-wpdb-in-standalone-script
require_once('../../../wp-load.php');
global $wpdb;
 

$rawData =file_get_contents("php://input");
//print_r($rawData); 

if(empty($rawData)){echo ""; exit;}

$certificados = $wpdb->get_results( 
										"
										SELECT * 
										FROM wp_getjv_certificates 
										where
										nome_voluntario like '%" . $rawData['s']. "%'
										or
										hash like '%" . $rawData['s']. "%'
										
										"
									);

print_r(json_encode($certificados));

exit;








