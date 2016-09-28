(function(angular){
var app = angular.module('getjvCertificates',['angular-bind-html-compile']);

app.controller('certCtrl',['$http',function($http){
	
	var cert = this;
	cert.form = {};
	cert.form.editTemplate = false;
	cert.form.showExample = false;
	cert.form.visualizar = false;
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
                pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
            }
        });
		
		
	};
	cert.carregarExemplo = function(){
		
		cert.form.nomeEvento = 'tradução da série Joy Of Code';          
		cert.form.descricaoEvento = 'Joy Of Code. é uma série de vídeos direcionada ao ensino de programação de jogos utilizando linguagem JAVA na plataforma Greenfoot.';
		cert.form.quantidadeHoras = 36;
		cert.form.quantidadeMeses = 6;
		cert.form.descricaoAtividades = 'Tradução de vídeos; Revisão de textos e Sincronização de Legendas em Vídeos';
		cert.form.nomeAssinante = 'Fernando Anselmo';
		cert.form.cargoAssinante = 'Coordenação DFJUG';
		cert.form.descricaoContribuicao = 'desta iniciativa que visa fomentar a melhoria da qualidade do ensino de programação de jogos Java para crianças no Brasil';
		cert.form.nomeVoluntarios = 'Jhonatan Vinicius Paulino de Morais';
	};
	
	cert.editTemplateToogle = function(){
		
		if(cert.form.editTemplate){
			cert.form.editTemplate = false;
		}else{
			
			cert.form.editTemplate = true;
		}
		
	};

	cert.nomeParaExemplo = function(){
		
		cert.form.nomeParaExemplo = cert.form.nomeVoluntarios;
			
		
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
				+		'em agradecer ao(a) Sr(a), {{cert.form.nomeVoluntarios | splitByCsv:0}} pela atuação como '
				+		'voluntário* nas atividades de {{cert.form.descricaoAtividades}} desempenhadas no trabalho de {{cert.form.nomeEvento}}**, pelo período de {{cert.form.quantidadeMeses}} '
				+		'mês(es) ( {{cert.form.quantidadeHoras}} horas). Certificamos que sua louvável atuação contribuiu para o sucesso {{cert.form.descricaoContribuicao}}. '
				+	'</p>'
				+'</div>'
				+'<div style="margin-top:12%; font-size:15px;" class="text-center">'
				+	'{{cert.form.nomeAssinante}}'
				+'</div>'
				+'<div style="font-size:12px;" class="text-center">'
				+	'{{cert.form.cargoAssinante}}'
				+'</div>'
				+'<div style="width:90%; margin-top:1%; margin-left:5%; font-size:12px; " class="">'
				+	'<p style="line-height: 1">'
				+		'Chave de Assinatura: d149a86e4315eb2a33aec852f1301a3b'
				+	'</p>'
				+	'<p style="line-height: 1">'
				+		'Para validar a autenticidade deste documento acesse http://www.dfjug.org'
				+	'</p>'
				+	'<p style="line-height: 1">'
				+		'*Todos os voluntários do DFJUG atuam na modalidade de voluntariado não remunerado'
				+	'</p>'
				+	'<p style="line-height: 1">'
				+		'**{{cert.form.descricaoEvento}}'
				+	'</p>'
				+'</div>';

	

	
	
	
}]);
//http://stackoverflow.com/questions/17448100/how-to-split-a-string-with-angularjs
app.filter('splitByCsv', function() {
        return function(input, splitIndex) {
            // do some bounds checking here to ensure it has that index
            return input.split(';')[splitIndex];
        }
    });



}(window.angular));