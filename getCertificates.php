<?php
/*
	Plugin Name: getCertificates
	Description: Create and Manager Courses certificates
	Version: 0.1
	License: GPL
	Author: Jhonatan Morais
	Author URI: http://www.getJv.com.br
*/

		
		
		
		
		
		
		class GetJvCertificates{
			
			public function __construct()
			{	
			
				add_action('admin_menu', array( $this, 'register_MYmenu' ));
				add_action('admin_menu', array( $this, 'register_menu_filho' ));
				$this->create_database();
			
			}
			
			/**
			* Configura um item de menu no muenu lateral do wordpress
			*
			* https://developer.wordpress.org/reference/functions/add_menu_page/
			*/
			public function register_MYmenu(){
				add_menu_page('Titulo da pagina', 'Certificados', 'manage_options', 'menu-getjv-certificates');
			}
			
			public function register_menu_filho(){
				add_submenu_page( 'menu-getjv-certificates', 'Titulo da pagina', 'Participantes','manage_options', 'getCertificates/participantes.php');
				//add_submenu_page( 'menu-getjv-certificates', 'My Custom Submenu Page', 'My Custom Submenu Page','manage_options', 'my-secondary-slug');
			}
			/**
			* TODO a todo momento esse metodo é executado, criar uma validaçãopara executar apenas quando o plugin for instalado
			*/
			private function create_database(){
				
				global $wpdb;
				require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
				
				$sql="
				   CREATE TABLE IF NOT EXISTS `".$wpdb->prefix."getjv_certificates` 
				  ( 
					`id` int(11) NOT NULL,
					`nome_voluntario` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
					`email_voluntario` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
					`desc_atividades` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
					`nome_iniciativa` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
					`desc_iniciativa` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
					`qnt_horas` int(11) NOT NULL,
					`qnt_meses` int(11) NOT NULL,
					`hash` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
					`nome_assinante` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
					`criado_em` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
					`solicitante` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
					`status` tinyint(1) NOT NULL DEFAULT '1' 
					 PRIMARY KEY (`id`) 
				  ) 
				engine = myisam 
				charset=utf8 
				COLLATE utf8_unicode_ci;";
				dbDelta($sql);
				
				
				
 
				
				
				
				
				
				
				
			}
			
			
			
		}
		
			// instantiate the plugin class
			$GetJvCertificates = new GetJvCertificates();