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


    /* Gestionar cantidad de trigo */

    $cantidadTrigo = Number(localStorage.getItem("cantidadTrigo"));
    
    $("#cantidadTrigo").text($cantidadTrigo);

    $("#aumentarTrigo").on("click", function () {
        var cantidadAumentar = Number($('#trigo').find('input').val());
        $cantidadTrigo += cantidadAumentar;
        $('#trigo').find('input').val('');
        localStorage.setItem("cantidadTrigo", $cantidadTrigo);
        $("#cantidadTrigo").text($cantidadTrigo); 
    });

    $("#disminuirTrigo").on("click", function () {
        var cantidadDisminuir = Number($('#trigo').find('input').val());
        if (($cantidadTrigo - cantidadDisminuir) >= 0) {
            $cantidadTrigo -= cantidadDisminuir;
            $('#trigo').find('input').val('');
            localStorage.setItem("cantidadTrigo", $cantidadTrigo);
            $("#cantidadTrigo").text($cantidadTrigo);
        }
    });


    /* Gestionar cantidad de piedra */

    $cantidadPiedra = Number(localStorage.getItem("cantidadPiedra"));
    
    $("#cantidadPiedra").text($cantidadPiedra);

    $("#aumentarPiedra").on("click", function () {
        var cantidadAumentar = Number($('#piedra').find('input').val());
        $cantidadPiedra += cantidadAumentar;
        $('#piedra').find('input').val('');
        localStorage.setItem("cantidadPiedra", $cantidadPiedra);
        $("#cantidadPiedra").text($cantidadPiedra); 
    });

    $("#disminuirPiedra").on("click", function () {
        var cantidadDisminuir = Number($('#piedra').find('input').val());
        if (($cantidadPiedra - cantidadDisminuir) >= 0) {
            $cantidadPiedra -= cantidadDisminuir;
            $('#piedra').find('input').val('');
            localStorage.setItem("cantidadPiedra", $cantidadPiedra);
            $("#cantidadPiedra").text($cantidadPiedra);
        }
    });

    $("#autoPiedra").on("click", function () {
        var cantidadCampesinos = Number(localStorage.getItem("campesinos")),
            cantidadEsclavos = Number(localStorage.getItem("esclavos"));

        $cantidadTrigo += cantidadCampesinos,
        $cantidadPiedra += cantidadEsclavos;

        localStorage.setItem("cantidadTrigo", $cantidadTrigo);
        $("#cantidadTrigo").text($cantidadTrigo);
        localStorage.setItem("cantidadPiedra", $cantidadPiedra);
        $("#cantidadPiedra").text($cantidadPiedra);
    });

    /* Gestionar cantidad de madera */

    $cantidadMadera = Number(localStorage.getItem("cantidadMadera"));
    
    $("#cantidadMadera").text($cantidadMadera);

    $("#aumentarMadera").on("click", function () {
        var cantidadAumentar = Number($('#madera').find('input').val());
        $cantidadMadera += cantidadAumentar;
        $('#madera').find('input').val('');
        localStorage.setItem("cantidadMadera", $cantidadMadera);
        $("#cantidadMadera").text($cantidadMadera); 
    });

    $("#disminuirMadera").on("click", function () {
        var cantidadDisminuir = Number($('#madera').find('input').val());
        if (($cantidadMadera - cantidadDisminuir) >= 0) {
            $cantidadMadera -= cantidadDisminuir;
            $('#madera').find('input').val('');
            localStorage.setItem("cantidadMadera", $cantidadMadera);
            $("#cantidadMadera").text($cantidadMadera);
        }
    });

    $("#autoMadera").on("click", function () {
        var cantidadCampesinos = Number(localStorage.getItem("campesinos")),
            cantidadEsclavos = Number(localStorage.getItem("esclavos"));

        $cantidadTrigo += cantidadCampesinos,
        $cantidadMadera += cantidadEsclavos;

        localStorage.setItem("cantidadTrigo", $cantidadTrigo);
        $("#cantidadTrigo").text($cantidadTrigo);
        localStorage.setItem("cantidadMadera", $cantidadMadera);
        $("#cantidadMadera").text($cantidadMadera);
    });

    /* Gestionar cantidad de oro */

    $cantidadOro = Number(localStorage.getItem("cantidadOro"));
    
    $("#cantidadOro").text($cantidadOro);

    $("#aumentarOro").on("click", function () {
        var cantidadAumentar = Number($('#oro').find('input').val());
        $cantidadOro += cantidadAumentar;
        $('#oro').find('input').val('');
        localStorage.setItem("cantidadOro", $cantidadOro);
        $("#cantidadOro").text($cantidadOro); 
    });

    $("#disminuirOro").on("click", function () {
        var cantidadDisminuir = Number($('#oro').find('input').val());
        if (($cantidadOro - cantidadDisminuir) >= 0) {
            $cantidadOro -= cantidadDisminuir;
            $('#oro').find('input').val('');
            localStorage.setItem("cantidadOro", $cantidadOro);
            $("#cantidadOro").text($cantidadOro);
        }
    });

    $("#autoOro").on("click", function () {
        var cantidadCampesinos = Number(localStorage.getItem("campesinos")),
            cantidadEsclavos = Number(localStorage.getItem("esclavos"));

        $cantidadTrigo += cantidadCampesinos,
        $cantidadOro += cantidadEsclavos;

        localStorage.setItem("cantidadTrigo", $cantidadTrigo);
        $("#cantidadTrigo").text($cantidadTrigo);
        localStorage.setItem("cantidadOro", $cantidadOro);
        $("#cantidadOro").text($cantidadOro);
    });

});