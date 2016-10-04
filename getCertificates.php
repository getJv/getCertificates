<?php
/*
	Plugin Name: getCertificates
	Description: Create and Manager Courses certificates
	Version: 0.1
	License: GPL
	Author: Jhonatan Morais (jhonatanvinicius@gmail.com)
	Author URI: http://www.getJv.com.br
*/

	class GetJvCertificates{
			
		public function __construct()
		{	
			
			add_action('admin_menu', array( $this, 'register_MyMenu' ));
			add_action('admin_menu', array( $this, 'register_menu_filho' ));
			//update_option( 'getjv_certificates_database',0); // Descomentar caso queira recriar a tabela após excluir a mesma da base de dados.
			if(!get_option( 'getjv_certificates_database'))
			{
				
				$this->create_database();
				add_option( 'getjv_certificates_database',1 );
				update_option( 'getjv_certificates_database',1);
			}
		
			
			}
			
			/**
			* Configura um item de menu no muenu lateral do wordpress
			*
			* https://developer.wordpress.org/reference/functions/add_menu_page/
			*/
			public function register_MyMenu(){
				add_menu_page('Pagina de Certificados', 'Certificados', 'manage_options','getCertificates/certificados.php');
			}
			
			public function register_menu_filho(){
				add_submenu_page( 'getCertificates/certificados.php', 'Gerador de Certificados', 'Gerador','manage_options', 'getCertificates/gerador.php');
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
					`id` int(11) NOT NULL AUTO_INCREMENT,
					`nome_voluntario` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
					`email_voluntario` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
					`descricao_atividades` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
					`nome_evento` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
					`descricao_evento` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
					`quantidade_horas` int(11) NOT NULL,
					`quantidade_meses` int(11) NOT NULL,
					`hash` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
					`nome_assinante` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
					`cargo_assinante` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
					`descricao_contribuicao` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
					`template` text COLLATE utf8_unicode_ci NOT NULL,
					`criado_em` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
					`solicitante` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
					`status` tinyint(1) NOT NULL DEFAULT '1' ,
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