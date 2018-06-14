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
            $fondoNegro.css('z-index', '-3')
        }
    });

    $("#menuMas #menuExtra").click(function(e) {
        e.stopPropagation();
   });

    /* Mostrar info pantalla */

    $('#infoTrigger').click(function () { 
        $('#info').css('display', 'block');
        $('#menuFondo').css('z-index', '12');  
   });

   /* Cerrar info pantalla */

   $('#cerrarInfo').click(function () { 
        $('#info').css('display', 'none');
        $('#menuFondo').css('z-index', '-3');  
   });

   /* Fondo negro -> volver atrás */

   $("#menuFondo").on("click", function () {
    if ($('#menuExtra').css('display') == 'block') {
        $('#menuExtra').slideToggle();
    }
    if ($('#info').css('display') == 'block') {
        $('#info').css('display', 'none');
    }
    $(this).css('z-index', '-3');
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


/* PANEL */


// GESTIONAR CANTIDADES ROLES

// Definir funciones que se utilizarán más adelante

function recursosSuficientes (disponibleRecurso1, necesarioRecurso1, disponibleRecurso2, necesarioRecurso2, disponibleRecurso3, necesarioRecurso3, disponibleRecurso4, necesarioRecurso4) {
    if (disponibleRecurso1 >= necesarioRecurso1 && disponibleRecurso2 >= necesarioRecurso2 && disponibleRecurso3 >= necesarioRecurso3 && disponibleRecurso4 >= necesarioRecurso4) {
        return true;
    } else {
        return false;
    }
}

function recursoSuficiente (disponibleRecurso, necesarioRecurso) {
    if (disponibleRecurso >= necesarioRecurso) {
        return true;
    } else {
        return false;
    }
}

function convertirMayusPrimeraLetra(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function transparenciaInfoItem (disponibleRecurso1, necesarioRecurso1, disponibleRecurso2, necesarioRecurso2, disponibleRecurso3, necesarioRecurso3, disponibleRecurso4, necesarioRecurso4) {
    if (recursosSuficientes(disponibleRecurso1, necesarioRecurso1, disponibleRecurso2, necesarioRecurso2, disponibleRecurso3, necesarioRecurso3, disponibleRecurso4, necesarioRecurso4) == false) {
        
        $("#boton").addClass('insuficiente');
    
        if ( recursoSuficiente(disponibleRecurso1, necesarioRecurso1) == false) {
            $("#piedra").css("opacity", 0.4);
        }
        if ( recursoSuficiente(disponibleRecurso2, necesarioRecurso2) == false) {
            $("#madera").css("opacity", 0.4);
        }
        if ( recursoSuficiente(disponibleRecurso3, necesarioRecurso3) == false) {
            $("#oro").css("opacity", 0.4);
        }
        if ( recursoSuficiente(disponibleRecurso4, necesarioRecurso4) == false) {
            $("#rol").css("opacity", 0.4);
        }
    } else {
        $("#boton").removeClass('insuficiente');
        $("#piedra").css("opacity", 1);
        $("#madera").css("opacity", 1);
        $("#oro").css("opacity", 1);
        $("#rol").css("opacity", 1);
    }
}

function actualizarMostrarPanel (itemActivo) {

    /* Obtener la información específica a mostrar del ítem pinchado */

    var item = $(itemActivo).attr('id'),
    itemMayus = convertirMayusPrimeraLetra(item),
    srcImg = 'img/' + item + '.png',
    rol = eval('rol' + itemMayus),
    rolMayus = convertirMayusPrimeraLetra(rol),
    srcImgRol = 'img/' + rol + 'Icono.png',
    necesarioPiedra = eval(eval('necesario' + itemMayus + 'Piedra')),
    necesarioMadera = eval(eval('necesario' + itemMayus + 'Madera')),
    necesarioOro = eval(eval('necesario' + itemMayus + 'Oro')),
    necesarioRol = eval(eval('necesario' + itemMayus + rolMayus)),
    cantidadRol = eval(eval('$cantidad' + rolMayus));

    /* Correciones ortográficas (singular/plural y tildes) */

    if (rol == 'faraones' && necesarioRol == 1) { rolMayus = 'Faraón' };
    if (rol == 'sacerdotes' && necesarioRol == 1) { rolMayus = 'Sacerdote' };
    if (rol == 'escribanos' && necesarioRol == 1) { rolMayus = 'Escribano' };
    if (rol == 'artesanos' && necesarioRol == 1) { rolMayus = 'Artesano' };
    if (item == 'mascara') { itemMayus = 'Máscara' };
    if (item == 'lapida') { itemMayus = 'Lápida' };
    if (item == 'anfora') { itemMayus = 'Ánfora' };

    /* Mostrar información específica del item sobre el panel */

    $('#imagenItem').children('img').attr({"src": srcImg, "alt": item});
    $('#imagenItem').children('h2').text( itemMayus );
    $('#rol').children('img').attr({"src": srcImgRol, "alt": rol});
    $('#rol').children('h6').text( rolMayus );
    $('#piedra').children('h4').text( necesarioPiedra + '(' + $cantidadPiedra + ')' );
    $('#madera').children('h4').text( necesarioMadera + '(' + $cantidadMadera + ')' );
    $('#oro').children('h4').text( necesarioOro + '(' + $cantidadOro + ')' );
    $('#rol').children('h4').text( necesarioRol + '(' + cantidadRol + ')' );
    $('#boton').children('img').attr({"src": "img/tickAdquirirItem.png", "alt": 'eliminar item'});
    $('#boton').removeClass('adquirido');
    $("#piedra").css("opacity", 1);
    $("#madera").css("opacity", 1);       
    $("#oro").css("opacity", 1);
    $("#rol").css("opacity", 1);
    $('.itemActivo').children('.tick').children('img').attr({"src": "img/tickClaro.png", "alt": 'item adquirido'});
    $('.item').not('.itemActivo').children('.tick').children('img').attr({"src": "img/tickOscuro.png", "alt": 'item adquirido'});

    /* Mostrar transparencias en los recursos insuficientes, así como en el botón */

    transparenciaInfoItem ($cantidadPiedra, necesarioPiedra, $cantidadMadera, necesarioMadera, $cantidadOro, necesarioOro, cantidadRol, necesarioRol);

    /* Mostrar ítems en caso de tenerse ya adquirido */

    if ( localStorage.getItem(item) == 'true' ) {

        /* Poner las transparencias a los elementos indistintamente de si hay suficientes o no*/
    
        $("#piedra").css("opacity", 0.4);
        $("#madera").css("opacity", 0.4);       
        $("#oro").css("opacity", 0.4);
        $("#rol").css("opacity", 0.4);
    
        /* Poner el tick en el botón de adquirir ítem */
    
        $('#boton').children('img').attr({"src": "img/eliminarItem.png", "alt": 'eliminar item'});
        $('#boton').addClass('adquirido');
    
    }

};

function fondoOscuroItemsLogrados (item) {

    if (localStorage.getItem("mascara") == 'true' && item != 'mascara' ) {
        $('#mascara').css('background-color', '#984E15');
        $('#mascara').children('img').attr({"src": 'img/mascaraClaro.png', "alt": mascara});
        $('#mascara').children('.tick').css('display','flex');
    }
    if (localStorage.getItem("cruz") == 'true' && item != 'cruz' ) {
        $('#cruz').css('background-color', '#984E15');
        $('#cruz').children('img').attr({"src": 'img/cruzClaro.png', "alt": cruz});
        $('#cruz').children('.tick').css('display','flex');
    }
    if (localStorage.getItem("ojo") == 'true' && item != 'ojo' ) {
        $('#ojo').css('background-color', '#984E15');
        $('#ojo').children('img').attr({"src": 'img/ojoClaro.png', "alt": ojo});
        $('#ojo').children('.tick').css('display','flex');
    }
    if (localStorage.getItem("testamento") == 'true' && item != 'testamento' ) {
        $('#testamento').css('background-color', '#984E15');
        $('#testamento').children('img').attr({"src": 'img/testamentoClaro.png', "alt": testamento});
        $('#testamento').children('.tick').css('display','flex');
    }
    if (localStorage.getItem("papiro") == 'true' && item != 'papiro' ) {
        $('#papiro').css('background-color', '#984E15');
        $('#papiro').children('img').attr({"src": 'img/papiroClaro.png', "alt": papiro});
        $('#papiro').children('.tick').css('display','flex');
    }
    if (localStorage.getItem("lapida") == 'true' && item != 'lapida' ) {
        $('#lapida').css('background-color', '#984E15');
        $('#lapida').children('img').attr({"src": 'img/lapidaClaro.png', "alt": lapida});
        $('#lapida').children('.tick').css('display','flex');
    }
    if (localStorage.getItem("anfora") == 'true' && item != 'anfora' ) {
        $('#anfora').css('background-color', '#984E15');
        $('#anfora').children('img').attr({"src": 'img/anforaClaro.png', "alt": anfora});
        $('#anfora').children('.tick').css('display','flex');
    }
    if (localStorage.getItem("flor") == 'true' && item != 'flor' ) {
        $('#flor').css('background-color', '#984E15');
        $('#flor').children('img').attr({"src": 'img/florClaro.png', "alt": flor});
        $('#flor').children('.tick').css('display','flex');
    }
    if (localStorage.getItem("alfombra") == 'true' && item != 'alfombra' ) {
        $('#alfombra').css('background-color', '#984E15');
        $('#alfombra').children('img').attr({"src": 'img/alfombraClaro.png', "alt": alfombra});
        $('#alfombra').children('.tick').css('display','flex');
    }
    if (localStorage.getItem("varas") == 'true' && item != 'varas' ) {
        $('#varas').css('background-color', '#984E15');
        $('#varas').children('img').attr({"src": 'img/varasClaro.png', "alt": varas});
        $('#varas').children('.tick').css('display','flex');
    }
}

// Fin funciones


// Obtener recursos disponibles

$cantidadTrigo = Number(localStorage.getItem("cantidadTrigo"));
$cantidadPiedra = Number(localStorage.getItem("cantidadPiedra"));
$cantidadMadera = Number(localStorage.getItem("cantidadMadera"));
$cantidadOro = Number(localStorage.getItem("cantidadOro"));

// Obtener sociedad disponible

$cantidadFaraones = Number(localStorage.getItem("faraones"));
$cantidadSacerdotes = Number(localStorage.getItem("sacerdotes"));
$cantidadEscribanos = Number(localStorage.getItem("escribanos"));
$cantidadArtesanos = Number(localStorage.getItem("artesanos"));
$cantidadSoldados = Number(localStorage.getItem("soldados"));
$cantidadCampesinos = Number(localStorage.getItem("campesinos"));
$cantidadEsclavos = Number(localStorage.getItem("esclavos"));


/* Definir recursos necesarios */

var necesarioMascaraPiedra = 50,
    necesarioMascaraMadera = 50,
    necesarioMascaraOro = 50,
    necesarioMascaraFaraones = 1,

    necesarioCruzPiedra = 20,
    necesarioCruzMadera = 20,
    necesarioCruzOro = 20,
    necesarioCruzSacerdotes = 2,

    necesarioOjoPiedra = 30,
    necesarioOjoMadera = 30,
    necesarioOjoOro = 30,
    necesarioOjoSacerdotes = 3,

    necesarioTestamentoPiedra = 5,
    necesarioTestamentoMadera = 10,
    necesarioTestamentoOro = 2,
    necesarioTestamentoEscribanos = 1,

    necesarioPapiroPiedra = 8,
    necesarioPapiroMadera = 15,
    necesarioPapiroOro = 3,
    necesarioPapiroEscribanos = 2,

    necesarioLapidaPiedra = 20,
    necesarioLapidaMadera = 15,
    necesarioLapidaOro = 5,
    necesarioLapidaEscribanos = 3,

    necesarioAnforaPiedra = 3,
    necesarioAnforaMadera = 2,
    necesarioAnforaOro = 0,
    necesarioAnforaArtesanos = 1,

    necesarioFlorPiedra = 3,
    necesarioFlorMadera = 3,
    necesarioFlorOro = 1,
    necesarioFlorArtesanos = 1,

    necesarioAlfombraPiedra = 5,
    necesarioAlfombraMadera = 5,
    necesarioAlfombraOro = 1,
    necesarioAlfombraArtesanos = 2,

    necesarioVarasPiedra = 7,
    necesarioVarasMadera = 7,
    necesarioVarasOro = 2,
    necesarioVarasArtesanos = 2,

/* Definir tipo de rol necesario para cada ítem */

    rolMascara = 'faraones'
    rolCruz = 'sacerdotes',
    rolOjo = 'sacerdotes',
    rolTestamento = 'escribanos',
    rolPapiro = 'escribanos',
    rolLapida = 'escribanos',
    rolAnfora = 'artesanos',
    rolFlor = 'artesanos',
    rolAlfombra = 'artesanos',
    rolVaras = 'artesanos';

/* Mostrar los ítems logrados con el fondo oscuro */

fondoOscuroItemsLogrados ('ninguno');

/* Mostrar características en el panel refentes al ítem clickado */

$('.item').click(function () {

    var item = $(this).attr('id');

    /* Mover clase itemActivo al ítem clickado */

    $(this).addClass('itemActivo');
    $('.item').not(this).removeClass('itemActivo');

    /* Cambiar clase de infoInicial por la que muestra la información de los ítems */
    
    $('#panel').addClass('infoItem').removeClass('infoInicial');

    /* Mostrar fondo e ítem correcto */

    $('.itemActivo').css('background-color', '#E6D09A');
    $('.itemActivo').children('img').attr({"src": 'img/' + item + '.png', "alt": item});
    $('.item').not('.itemActivo').css('background-color', 'white');    

    /* Mostrar fondo oscuro ítems logrados */

    fondoOscuroItemsLogrados(item);

    /* Mostrar panel con el ítem indicado */

    actualizarMostrarPanel(this);

});


/* Actualización del panel tras adquirir un ítem */

$('#boton').click(function () {

    var item = $('.itemActivo').attr('id'),
    itemMayus = convertirMayusPrimeraLetra(item),
    rol = eval('rol' + itemMayus),
    rolMayus = convertirMayusPrimeraLetra(rol),
    necesarioPiedra = eval(eval('necesario' + itemMayus + 'Piedra')),
    necesarioMadera = eval(eval('necesario' + itemMayus + 'Madera')),
    necesarioOro = eval(eval('necesario' + itemMayus + 'Oro')),
    necesarioRol = eval(eval('necesario' + itemMayus + rolMayus));


    /* Eliminar ítem ya adquirido */

    if ( localStorage.getItem(item) == 'true' ) {

        localStorage.setItem(item, 'false');

        actualizarMostrarPanel ($('.itemActivo'));

        $('.itemActivo').children('.tick').css('display', 'none');

    } else {

        /* Si hay suficientes recursos y no se tiene ya adquirido el ítem */
        
        if ( !$(this).hasClass('insuficiente') && localStorage.getItem(item) == 'false' ) {

            /* Actualizar recursos disponibles */

            $cantidadPiedra -= necesarioPiedra;
            localStorage.setItem("cantidadPiedra", $cantidadPiedra);
            $cantidadMadera -= necesarioMadera;
            localStorage.setItem("cantidadMadera", $cantidadMadera);
            $cantidadOro -= necesarioOro;
            localStorage.setItem("cantidadOro", $cantidadOro);

            /* Comentado ya que no quiero que se disminuya la cantidad de población al
            adquirir un ítem, si así se quisiera, descomentar */

            // if ( rol == 'faraones' ) {
            //     $cantidadFaraones -= necesarioRol;
            //     localStorage.setItem("faraones", $cantidadFaraones);
            // };
            // if ( rol == 'sacerdotes' ) {
            //     $cantidadSacerdotes -= necesarioRol;
            //     localStorage.setItem("sacerdotes", $cantidadSacerdotes);
            // };
            // if ( rol == 'escribanos' ) {
            //     $cantidadEscribanos -= necesarioRol;
            //     localStorage.setItem("escribanos", $cantidadEscribanos);
            // };
            // if ( rol == 'artesanos' ) {
            //     $cantidadArtesanos -= necesarioRol;
            //     localStorage.setItem("artesanos", $cantidadArtesanos);
            // };
            
            /* Actualizar panel con los recursos disponibles actualizados */

            actualizarMostrarPanel($('.itemActivo'));

            /* Guardar en el localStorage que ya se tiene dicho ítem */

            localStorage.setItem(item, 'true');

            /* Convertir a transparentes los recursos aunque se tengan suficientes */

            $("#piedra").css("opacity", 0.4);
            $("#madera").css("opacity", 0.4);       
            $("#oro").css("opacity", 0.4);
            $("#rol").css("opacity", 0.4);

            /* Actualizar el botón de adquirir ítem */

            $('#boton').children('img').attr({"src": "img/eliminarItem.png", "alt": 'eliminar item'});
            $('#boton').addClass('adquirido');

            /* Mostrar tick */

            $('.itemActivo').children('.tick').css('display','flex');
        
        }

    }

});


});