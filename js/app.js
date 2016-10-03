(function(angular){
var app = angular.module('getjvCertificates',['angular-bind-html-compile','ngModal']);

app.controller('certCtrl',['$http',function($http){
	
	var cert = this;
	//cert = {};
	cert.editTemplate = false;
	cert.showExample = false;
	cert.visualizar = false;
	cert.registrado = false;
	cert.submit = function(){
		cert.registrado = false;
		$url = '../wp-content/plugins/getCertificates/processaCertificados.php'; 
		$http.post($url,cert)
			.success(function(res){
						//console.log();
                        console.log(res);
						if(res > 0){
							cert.registrado = true;						
						}
						cert.resetForm();
					})
			.error(function(error){
                        console.log(error);
					});
		
		
		
	},
	
	
	
	
	cert.toPDF = function(){
		html2canvas(document.getElementById('toPDF'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
					pageSize: 'A4',
                    pageOrientation: 'landscape',
					content: [
									
					{
							image: data,
							width: 725,
							bold: true,
							//pageOrientation: 'portrait',
							
							
						}
					]
					
                };
                pdfMake.createPdf(docDefinition).download("certificado_modelo.pdf");
            }
        });
		
		
	};
	cert.carregarExemplo = function(){
		
		cert.nome_evento = 'tradução da série Joy Of Code';          
		cert.descricao_evento = 'Joy Of Code. é uma série de vídeos direcionada ao ensino de programação de jogos em JAVA utilizando a plataforma Greenfoot.';
		cert.quantidade_horas = 36;
		cert.quantidade_meses = 6;
		cert.descricao_atividades = 'Tradução de vídeos; Revisão de textos e Sincronização de Legendas em Vídeos';
		cert.nome_assinante = 'Fernando Anselmo';
		cert.cargo_assinante = 'Coordenação DFJUG';
		cert.descricao_contribuicao = 'desta iniciativa que visa fomentar a melhoria da qualidade do ensino de programação de jogos Java para crianças no Brasil';
		cert.nome_voluntario = 'Jhonatan Vinicius Paulino de Morais';
	};
	
	cert.resetForm = function(){
		
		cert.nome_evento = '';          
		cert.descricao_evento = '';
		cert.quantidade_horas = '';
		cert.quantidade_meses = '';
		cert.descricao_atividades = '';
		cert.nome_assinante = '';
		cert.cargo_assinante = '';
		cert.descricao_contribuicao = '';
		cert.nome_voluntario = '';
	};
	
	cert.editTemplateToogle = function(){
		
		if(cert.editTemplate){
			cert.editTemplate = false;
		}else{
			
			cert.editTemplate = true;
		}
		
	};

	cert.nomeParaExemplo = function(){
		
		cert.nomeParaExemplo = cert.nome_voluntario;
			
		
	};	
	
	cert.showVisualizacao = function(){
		
		if(cert.visualizar){
			cert.visualizar = false;
		}else{
			
			cert.visualizar = true;
		}
		
	};	
	
	cert.template =
	
				'<h2 style="margin-top:9%; text-align:center" align="center" >' 
				+	'CERTIFICADO DE PARTICIPAÇÃO'
				+'</h2>'
				+'<div style="margin-top:10%;" align="center" >'
				+	'<p style="width:80%; color:black; font-size:15px; text-indent: 15%; text-align:justify" align="center">'
				+		'O Grupo de Usuários Java do Distrito Federal – DFJUG tem a enorme satisfação '
				+		'em agradecer ao(a) Sr(a), {{cert.nome_voluntario | splitByCsv:0}} pela atuação como '
				+		'voluntário* nas atividades de {{cert.descricao_atividades}} desempenhadas no trabalho de {{cert.nome_evento}}**, pelo período de {{cert.quantidade_meses}} '
				+		'mês(es) ( {{cert.quantidade_horas}} horas). Certificamos que sua louvável atuação contribuiu para o sucesso {{cert.descricao_contribuicao}}. '
				+	'</p>'
				+'</div>'
				+'<div style="margin-top:16%; font-size:15px; text-align:center" align="center">'
				+	'{{cert.nome_assinante}}'
				+'</div>'
				+'<div style="font-size:12px; text-align:center" align="center" >'
				+	'{{cert.cargo_assinante}}'
				+'</div>'
				+'<div style="width:90%; margin:2% 0% 0 5%; font-size:12px; " class="">'
				+	'<p style="margin: initial">'
				+		'Chave de Assinatura: {{cert.hash}}'
				+	'</p>'
				+	'<p style="margin: initial" >'
				+		'Para validar a autenticidade deste documento acesse http://www.dfjug.org/certificados'
				+	'</p>'
				+	'<p style="margin: initial" >'
				+		'*Todos os voluntários do DFJUG atuam na modalidade de voluntariado não remunerado'
				+	'</p>'
				+	'<p style="margin: initial" >'
				+		'**{{cert.descricao_evento}}'
				+	'</p>'
				+'</div>';

	

	
	
	
}]);
//http://stackoverflow.com/questions/17448100/how-to-split-a-string-with-angularjs
app.filter('splitByCsv', function() {
        return function(input, splitIndex) {
            // do some bounds checking here to ensure it has that index
            if(!input )
				return "";
			return input.split(';')[splitIndex];
			
        }
    });
	
	
			app.config(function(ngModalDefaultsProvider) {
				  return ngModalDefaultsProvider.set({
					closeButtonHtml: "<i class='fa fa-times'></i>"
				  });
			  });
			  app.controller('DemoController', function($scope) {
				  $scope.myData = {
					link: "http://google.com",
					modalShown: false,
					hello: 'world',
					foo: 'bar'
				  }
				  $scope.logClose = function() {
					console.log('close!');
				  };
				  $scope.toggleModal = function() {
					$scope.myData.modalShown = !$scope.myData.modalShown;
				  };
			  });



}(window.angular));