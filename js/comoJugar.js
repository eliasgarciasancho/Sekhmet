$(document).ready(function () {
   
    /* Mostrar/ocultar submenu */
    
    $("#menuMas").on("click", function () {
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
    
    $("#menuFondo").on("click", function () {
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

      /* Slider */

      var swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          clickable: 'true'
        },
        // autoHeight: 'true',
        // onSlideChangeEnd: function(){
        //   $('aside').height( $('.swiper-slide').hasClass('swiper-slide-active').height() );
        // },
        on: {
        //   slideChangeEnd: function() {
        //     console.log('slide cambiao');
        //     $(window).scrollTop(0);
        //   },

          slideChangeTransitionEnd: function () {

            console.log('slide cambiao');
            $('.swiper-slide').scrollTop(0);

            if( $('#requisitos').hasClass('swiper-slide-active') == true ) {
              $('#subtitulo').text('Requisitos');
              $('#imagenDesktop').fadeTo( 300, 0 ).delay( 300 ).queue(function (next) { 
                $(this).css('background-image','url(img/fotoSlider1.jpg)').fadeTo( 300, 1 ); 
                next(); 
              });
              var heightActive = $('.swiper-slide-active').height();
              console.log(heightActive);
              $('aside').css('height',heightActive);
            }
  
            if( $('#preparativos').hasClass('swiper-slide-active') == true ) {
              $('#subtitulo').text('Preparativos');
              $('#imagenDesktop').fadeTo( 300, 0 ).delay( 300 ).queue(function (next) { 
                $(this).css('background-image','url(img/fotoSlider2.jpg)').fadeTo( 300, 1 ); 
                next(); 
              });
              var heightActive = $('.swiper-slide-active').height();
              console.log(heightActive);
              $('aside').css('height',heightActive);
            }
  
            if( $('#desarrollo').hasClass('swiper-slide-active') == true ) {
              $('#subtitulo').text('Desarrollo');
              $('#imagenDesktop').fadeTo( 300, 0 ).delay( 300 ).queue(function (next) { 
                $(this).css('background-image','url(img/fotoSlider3.jpg)').fadeTo( 300, 1 ); 
                next(); 
              });
              var heightActive = $('.swiper-slide-active').height();
              console.log(heightActive);
              $('aside').css('height',heightActive);
            }
          },
        }
  
      });


});