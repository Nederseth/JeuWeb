$(document).ready(function(){

	($.ajax({
      url: '/JeuWeb-static/js/cartesParam.json',
      dataType: "json",
      success: function (data) {
		jeu = new Jeu(data);
      }
	}));
});