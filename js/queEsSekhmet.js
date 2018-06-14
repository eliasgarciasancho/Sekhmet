$(document).ready(function () {
   
    /* Mostrar/ocultar submenu */
    
    $("#menuMas").on("click", function (e) {
        var $trigger = $(this),
            $menu = $(this).children("#menuExtra"),
            $fondoNegro = $('#menuFondo');
        $menu.slideToggle();

        if ( $fondoNegro.css('z-index') == '-3' ) {
            $fondoNegro.css('z-index', '9');
        } else {
            $fondoNegro.css('z-index', '-3');
        }
    });
    
    $("#menuFondo").on("click", function (e) {
        var $menu = $('#menuExtra');
        $menu.slideToggle();
        $(this).css('z-index', '-3');
    });

    $("#menuMas #menuExtra").click(function(e) {
        e.stopPropagation();
   });

      /* Hover sobre cada icono */

      $('#almacen').hover(function () {
        $(this).find('img').attr("src", 'img/almacenActivo.png');
        $(this).find('h6').css({'color':'#984E15','opacity':'1'});
      });
    
      $('#almacen').mouseleave(function () {
        $(this).find('img').attr("src", 'img/almacenInactivo.png');
        $(this).find('h6').css({'color':'black','opacity':'0.3'});
      });
    
       $('#poblacion').hover(function () {
        $(this).find('img').attr("src", 'img/poblacionActivo.png');
        $(this).find('h6').css({'color':'#984E15','opacity':'1'});
      });
    
      $('#poblacion').mouseleave(function () {
        $(this).find('img').attr("src", 'img/poblacionInactivo.png');
        $(this).find('h6').css({'color':'black','opacity':'0.3'});
      });
    
      $('#piramide').hover(function () {
        $(this).find('img').attr("src", 'img/piramideActivo.png');
        $(this).find('h6').css({'color':'#984E15','opacity':'1'});
      });
    
      $('#piramide').mouseleave(function () {
        $(this).find('img').attr("src", 'img/piramideInactivo.png');
        $(this).find('h6').css({'color':'black','opacity':'0.3'});
      });

});