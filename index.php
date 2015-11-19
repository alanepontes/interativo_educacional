
<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="assets/jsxgraph/css/jsxgraph.css">
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
        <link rel="stylesheet" type="text/css" href="src/css/interactive132.css">
</head>
<body>
<div>	
	PROBLEMA:
	Dada uma grade, formada de triangulos menores, 3 pontos são escolhidos em seu bordo. Você saberia calcular a área deste triângulo?
</div>

<div>	
	COMO USAR:
	Dada a grade triangular abaixo, com A, B e C sendo escolhidos nos lados do seu bordo, formamos diversos triângulos possíveis. A grade é composta de 36 triângulos menores de área 1. Como você calcularia a área do ΔABC? No interativo, você pode movimentar os pontos A, B e C pelos pontos da grade triangular que estão no bordo dela. À medida que eles se movem, a área do ΔABC é atualizada na legenda. Caso deseje uma nova figura, clique no botão "Nova Configuração". Para ver a solução, clique em "Mostrar explicação."
</div>

<div class="spaced-v">
  <button type="button" class="btn btn-default  btn-primary" onClick="generateNewGame()">Nova Configuração</button>
</div>
<div class="spaced-v bordered">
	<div id="box" class="jxgbox center-img"></div>
</div>	

<div><b>Fonte do Problema:</b> <a href="http://www.cangurudematematicabrasil.com.br/index.php/anteriores/finish/6/19/">Olimpíada Canguru de Matemática Brasil 2010 - Nivel S - Problema 14</a> 
</div>
<div class="spaced-v">
     <button id="showAnswer" type="button" class="btn btn-default btn-success spaced-h" onClick="showAnswer();">Mostrar Explicação</button> 
</div> 



	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="assets/jsxgraph/js/jsxgraphcore.js"></script>
    <script type="text/javascript" src="src/js/interactive132.js"></script>
    <script type="text/javascript" src="assets/MathJax/MathJax.js"></script>
	
	
	<div>	
		<div id="answerExplanation" class="bordered answer-bg hidden height-auto">
		</div>
	</div>
	<script>
	$(document).ready(function () {
		generateGame();
	});
	MathJax.Hub.Config({
	  config: ["MMLorHTML.js"],
	  jax: ["input/AsciiMath","output/HTML-CSS","output/NativeMML"],
	  extensions: ["asciimath2jax.js","MathMenu.js","MathZoom.js"],
	  imageFont: null
	});
	
	</script>
</body>
</html>
