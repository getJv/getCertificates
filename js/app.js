(function(angular){
var app = angular.module('getjvCertificates',['angular-bind-html-compile']);

app.controller('certCtrl',['$http',function($http){
	
	var cert = this;
	cert.form = {};
	cert.form.editTemplate = false;
	cert.form.showExample = false;
	cert.form.visualizar = false;
	cert.submit = function(){
		
		$url = '../wp-content/plugins/getCertificates/processaCertificados.php'; 
		$http.post($url,cert.form)
			.success(function(res){
						//console.log();
                        console.log(res);
						cert.form = {};
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
		cert.descricao_evento = 'Joy Of Code. é uma série de vídeos direcionada ao ensino de programação de jogos utilizando linguagem JAVA na plataforma Greenfoot.';
		cert.quantidade_horas = 36;
		cert.quantidade_meses = 6;
		cert.descricao_atividades = 'Tradução de vídeos; Revisão de textos e Sincronização de Legendas em Vídeos';
		cert.nome_assinante = 'Fernando Anselmo';
		cert.cargo_assinante = 'Coordenação DFJUG';
		cert.descricao_contribuicao = 'desta iniciativa que visa fomentar a melhoria da qualidade do ensino de programação de jogos Java para crianças no Brasil';
		cert.nome_voluntario = 'Jhonatan Vinicius Paulino de Morais';
	};
	
	cert.editTemplateToogle = function(){
		
		if(cert.form.editTemplate){
			cert.form.editTemplate = false;
		}else{
			
			cert.form.editTemplate = true;
		}
		
	};

	cert.nomeParaExemplo = function(){
		
		cert.form.nomeParaExemplo = cert.nome_voluntario;
			
		
	};	
	
	cert.showVisualizacao = function(){
		
		if(cert.form.visualizar){
			cert.form.visualizar = false;
		}else{
			
			cert.form.visualizar = true;
		}
		
	};	
	
	cert.form.template =
	
				'<h2 style="margin-top:10%" class="text-center">' 
				+	'CERTIFICADO DE PARTICIPAÇÃO'
				+'</h2>'
				+'<div style="margin-top:10%;" align="center" >'
				+	'<p style="width:80%; color:black; font-size:15px; text-indent: 15%;" class="text-center text-justify">'
				+		'O Grupo de Usuários Java do Distrito Federal – DFJUG tem a enorme satisfação '
				+		'em agradecer ao(a) Sr(a), {{cert.nome_voluntario | splitByCsv:0}} pela atuação como '
				+		'voluntário* nas atividades de {{cert.descricao_atividades}} desempenhadas no trabalho de {{cert.nome_evento}}**, pelo período de {{cert.quantidade_meses}} '
				+		'mês(es) ( {{cert.quantidade_horas}} horas). Certificamos que sua louvável atuação contribuiu para o sucesso {{cert.descricao_contribuicao}}. '
				+	'</p>'
				+'</div>'
				+'<div style="margin-top:12%; font-size:15px;" class="text-center">'
				+	'{{cert.nome_assinante}}'
				+'</div>'
				+'<div style="font-size:12px;" class="text-center">'
				+	'{{cert.cargo_assinante}}'
				+'</div>'
				+'<div style="width:90%; margin-top:1%; margin-left:5%; font-size:12px; " class="">'
				+	'<p style="line-height: 1">'
				+		'Chave de Assinatura: {{cert.hash}}'
				+	'</p>'
				+	'<p style="line-height: 1">'
				+		'Para validar a autenticidade deste documento acesse http://www.dfjug.org/certificados'
				+	'</p>'
				+	'<p style="line-height: 1">'
				+		'*Todos os voluntários do DFJUG atuam na modalidade de voluntariado não remunerado'
				+	'</p>'
				+	'<p style="line-height: 1">'
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



}(window.angular));