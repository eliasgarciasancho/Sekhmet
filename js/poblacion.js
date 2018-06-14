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

  $('#piramide').hover(function () {
    $(this).find('img').attr("src", 'img/piramideActivo.png');
    $(this).find('h6').css({'color':'#984E15','opacity':'1'});
  });

  $('#piramide').mouseleave(function () {
    $(this).find('img').attr("src", 'img/piramideInactivo.png');
    $(this).find('h6').css({'color':'black','opacity':'0.3'});
  });

   /* Desplegar submenú roles */

   $(".desplegableRol").on("click", function (e) {
        var $submenu = $(this).children(".extraRol"),
            $flecha = $(this).children("img");

        $submenu.slideToggle({
        duration: 300,
        start: function(){

           $submenu.css({"display": "flex"});

            /* Plegar otro rol abierto al seleccionado */

            $(".extraRol").not($submenu).slideUp( "300", function() {
                $(".desplegableRol").children("img").not($flecha).css("transform","rotate(0deg)");
                $(".extraRol").not($submenu).parents(".rol").next().css("margin-top", "0");
            });

            if ($submenu.is(':visible')) {
                $submenu.parents(".rol").next().css("margin-top", "50px");
                } else {
                $submenu.parents(".rol").next().css("margin-top", "0");
                }
        },
        done: function() {
            if ($submenu.is(':visible')) {
                $flecha.css("transform","rotate(180deg)");
            } else {
                $flecha.css("transform","rotate(0deg)");
                $submenu.parents(".rol").next().css("margin-top", "0");
            }
        }
        });


   });

   $(".desplegableRol .extraRol").click(function(e) {
    e.stopPropagation();
    });

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

function transparenciaRolRecurso (nombreRol, disponibleRecurso1, necesarioRecurso1, disponibleRecurso2, necesarioRecurso2, disponibleRecurso3, necesarioRecurso3, disponibleRecurso4, necesarioRecurso4) {
    if (recursosSuficientes(disponibleRecurso1, necesarioRecurso1, disponibleRecurso2, necesarioRecurso2, disponibleRecurso3, necesarioRecurso3, disponibleRecurso4, necesarioRecurso4) == false) {

        let nombreRolMayus = convertirMayusPrimeraLetra(nombreRol);
        
        $("#aumentar" + nombreRolMayus).css({"opacity": '0.4', 'cursor': 'auto' });
    
        if ( recursoSuficiente(disponibleRecurso1, necesarioRecurso1) == false) {
            $("#" + nombreRol).find("#desplegableTrigo").css("opacity", 0.4);
        }
        if ( recursoSuficiente(disponibleRecurso2, necesarioRecurso2) == false) {
            $("#" + nombreRol).find("#desplegablePiedra").css("opacity", 0.4);
        }
        if ( recursoSuficiente(disponibleRecurso3, necesarioRecurso3) == false) {
            $("#" + nombreRol).find("#desplegableMadera").css("opacity", 0.4);
        }
        if ( recursoSuficiente(disponibleRecurso4, necesarioRecurso4) == false) {
            $("#" + nombreRol).find("#desplegableOro").css("opacity", 0.4);
        }
    }
}

function transparenciasRolesRecursos () {
    transparenciaRolRecurso ("faraon",$cantidadTrigo,necesarioFaraonTrigo,$cantidadPiedra,necesarioFaraonPiedra,$cantidadMadera,necesarioFaraonMadera,$cantidadOro,necesarioFaraonOro);

    transparenciaRolRecurso ("sacerdotes",$cantidadTrigo,necesarioSacerdotesTrigo,$cantidadPiedra,necesarioSacerdotesPiedra,$cantidadMadera,necesarioSacerdotesMadera,$cantidadOro,necesarioSacerdotesOro);

    transparenciaRolRecurso ("escribanos",$cantidadTrigo,necesarioEscribanosTrigo,$cantidadPiedra,necesarioEscribanosPiedra,$cantidadMadera,necesarioEscribanosMadera,$cantidadOro,necesarioEscribanosOro);

    transparenciaRolRecurso ("artesanos",$cantidadTrigo,necesarioArtesanosTrigo,$cantidadPiedra,necesarioArtesanosPiedra,$cantidadMadera,necesarioArtesanosMadera,$cantidadOro,necesarioArtesanosOro);

    transparenciaRolRecurso ("soldados",$cantidadTrigo,necesarioSoldadosTrigo,$cantidadPiedra,necesarioSoldadosPiedra,$cantidadMadera,necesarioSoldadosMadera,$cantidadOro,necesarioSoldadosOro);

    transparenciaRolRecurso ("campesinos",$cantidadTrigo,necesarioCampesinosTrigo,$cantidadPiedra,necesarioCampesinosPiedra,$cantidadMadera,necesarioCampesinosMadera,$cantidadOro,necesarioCampesinosOro);

    transparenciaRolRecurso ("esclavos",$cantidadTrigo,necesarioEsclavosTrigo,$cantidadPiedra,necesarioEsclavosPiedra,$cantidadMadera,necesarioEsclavosMadera,$cantidadOro,necesarioEsclavosOro);
}

function actualizarRecursos () {
    localStorage.setItem("cantidadTrigo", $cantidadTrigo);
    localStorage.setItem("cantidadPiedra", $cantidadPiedra);
    localStorage.setItem("cantidadOro", $cantidadOro);    
    localStorage.setItem("cantidadMadera", $cantidadMadera);

    $("#faraon").find("#cantidadTrigo").text(necesarioFaraonTrigo + "(" + $cantidadTrigo + ")");
    $("#faraon").find("#cantidadPiedra").text(necesarioFaraonPiedra + "(" + $cantidadPiedra + ")");
    $("#faraon").find("#cantidadMadera").text(necesarioFaraonMadera + "(" + $cantidadMadera + ")");
    $("#faraon").find("#cantidadOro").text(necesarioFaraonOro + "(" + $cantidadOro + ")");

    $("#sacerdotes").find("#cantidadTrigo").text(necesarioSacerdotesTrigo + "(" + $cantidadTrigo + ")");
    $("#sacerdotes").find("#cantidadPiedra").text(necesarioSacerdotesPiedra + "(" + $cantidadPiedra + ")");
    $("#sacerdotes").find("#cantidadMadera").text(necesarioSacerdotesMadera + "(" + $cantidadMadera + ")");
    $("#sacerdotes").find("#cantidadOro").text(necesarioSacerdotesOro + "(" + $cantidadOro + ")");

    $("#escribanos").find("#cantidadTrigo").text(necesarioEscribanosTrigo + "(" + $cantidadTrigo + ")");
    $("#escribanos").find("#cantidadPiedra").text(necesarioEscribanosPiedra + "(" + $cantidadPiedra + ")");
    $("#escribanos").find("#cantidadMadera").text(necesarioEscribanosMadera + "(" + $cantidadMadera + ")");
    $("#escribanos").find("#cantidadOro").text(necesarioEscribanosOro + "(" + $cantidadOro + ")");

    $("#artesanos").find("#cantidadTrigo").text(necesarioArtesanosTrigo + "(" + $cantidadTrigo + ")");
    $("#artesanos").find("#cantidadPiedra").text(necesarioArtesanosPiedra + "(" + $cantidadPiedra + ")");
    $("#artesanos").find("#cantidadMadera").text(necesarioArtesanosMadera + "(" + $cantidadMadera + ")");
    $("#artesanos").find("#cantidadOro").text(necesarioArtesanosOro + "(" + $cantidadOro + ")");

    $("#soldados").find("#cantidadTrigo").text(necesarioSoldadosTrigo + "(" + $cantidadTrigo + ")");
    $("#soldados").find("#cantidadPiedra").text(necesarioSoldadosPiedra + "(" + $cantidadPiedra + ")");
    $("#soldados").find("#cantidadMadera").text(necesarioSoldadosMadera + "(" + $cantidadMadera + ")");
    $("#soldados").find("#cantidadOro").text(necesarioSoldadosOro + "(" + $cantidadOro + ")");

    $("#campesinos").find("#cantidadTrigo").text(necesarioCampesinosTrigo + "(" + $cantidadTrigo + ")");
    $("#campesinos").find("#cantidadPiedra").text(necesarioCampesinosPiedra + "(" + $cantidadPiedra + ")");
    $("#campesinos").find("#cantidadMadera").text(necesarioCampesinosMadera + "(" + $cantidadMadera + ")");
    $("#campesinos").find("#cantidadOro").text(necesarioCampesinosOro + "(" + $cantidadOro + ")");

    $("#esclavos").find("#cantidadTrigo").text(necesarioEsclavosTrigo + "(" + $cantidadTrigo + ")");
    $("#esclavos").find("#cantidadPiedra").text(necesarioEsclavosPiedra + "(" + $cantidadPiedra + ")");
    $("#esclavos").find("#cantidadMadera").text(necesarioEsclavosMadera + "(" + $cantidadMadera + ")");
    $("#esclavos").find("#cantidadOro").text(necesarioEsclavosOro + "(" + $cantidadOro + ")");
}

/* FIn funciones */


// Obtener recursos disponibles

$cantidadTrigo = Number(localStorage.getItem("cantidadTrigo"));
$cantidadPiedra = Number(localStorage.getItem("cantidadPiedra"));
$cantidadMadera = Number(localStorage.getItem("cantidadMadera"));
$cantidadOro = Number(localStorage.getItem("cantidadOro"));

// Definir recursos necesarios

    var necesarioFaraonTrigo = 50;
    var necesarioFaraonPiedra = 50;
    var necesarioFaraonMadera = 50;
    var necesarioFaraonOro = 50;

    var necesarioSacerdotesTrigo = 15;
    var necesarioSacerdotesPiedra = 10;
    var necesarioSacerdotesMadera = 10;
    var necesarioSacerdotesOro = 10;

    var necesarioEscribanosTrigo = 10;
    var necesarioEscribanosPiedra = 5;
    var necesarioEscribanosMadera = 3;
    var necesarioEscribanosOro = 2;

    var necesarioArtesanosTrigo = 5;
    var necesarioArtesanosPiedra = 3;
    var necesarioArtesanosMadera = 2;
    var necesarioArtesanosOro = 0;

    var necesarioSoldadosTrigo = 3;
    var necesarioSoldadosPiedra = 1;
    var necesarioSoldadosMadera = 1;
    var necesarioSoldadosOro = 0;

    var necesarioCampesinosTrigo = 2;
    var necesarioCampesinosPiedra = 1;
    var necesarioCampesinosMadera = 0;
    var necesarioCampesinosOro = 0;

    var necesarioEsclavosTrigo = 1;
    var necesarioEsclavosPiedra = 0;
    var necesarioEsclavosMadera = 0;
    var necesarioEsclavosOro = 0;

// Convertir en transparentes los botones de aumentar recursos que no se puedan aumentar

    transparenciasRolesRecursos ();
    

// GESTIONAR CANTIDAD FARAONES

    var $cantidadFaraones = Number(localStorage.getItem("faraones"));
    $("#cantidadFaraones").text($cantidadFaraones);

    // Mostrar recursos disponibles y necesarios

    $("#faraon").find("#cantidadTrigo").text(necesarioFaraonTrigo + "(" + $cantidadTrigo + ")");
    $("#faraon").find("#cantidadPiedra").text(necesarioFaraonPiedra + "(" + $cantidadPiedra + ")");
    $("#faraon").find("#cantidadMadera").text(necesarioFaraonMadera + "(" + $cantidadMadera + ")");
    $("#faraon").find("#cantidadOro").text(necesarioFaraonOro + "(" + $cantidadOro + ")");

    // Mostrar botón disminuir rol con transparencia si no hay ningún rol

    if ($cantidadFaraones == 0) {
        $("#faraon").find("#disminuirFaraon").css({"opacity": '0.4', 'cursor': 'auto' });
    }

    // Aumentar roles
    
    $("#aumentarFaraon").on("click", function () {
        if (recursosSuficientes($cantidadTrigo,necesarioFaraonTrigo,$cantidadPiedra,necesarioFaraonPiedra,$cantidadMadera,necesarioFaraonMadera,$cantidadOro,necesarioFaraonOro)) {
            $cantidadFaraones += 1;
            $("#cantidadFaraones").text($cantidadFaraones);
            localStorage.setItem("faraones", $cantidadFaraones);

            // Actualizar recursos

            $cantidadTrigo -= necesarioFaraonTrigo;
            $cantidadPiedra -= necesarioFaraonPiedra;
            $cantidadMadera -= necesarioFaraonMadera;
            $cantidadOro -= necesarioFaraonOro;

            actualizarRecursos ();

            // Mostrar botón de aumentar rol y recurso responsable con transparencia si no se puede aumentar el rol de nuevo

            transparenciasRolesRecursos ();

            // Mostrar botón disminuir rol con transparencia si no hay ningún rol

            if ($cantidadFaraones == 0) {
                $("#faraon").find("#disminuirFaraon").css({"opacity": '0.4', 'cursor': 'auto' });
                $("#faraon").find("#disminuirFaraon").css({"opacity": '1', 'cursor': 'pointer' });
            }
        }

    });
    
    // Disminuir roles

    $("#disminuirFaraon").on("click", function () {
        if ($cantidadFaraones > 0) {
            $cantidadFaraones -= 1;
            $("#cantidadFaraones").text($cantidadFaraones);
            localStorage.setItem("faraones", $cantidadFaraones);

            // Mostrar botón disminuir rol con transparencia si no hay ningún rol

            if ($cantidadFaraones == 0) {
                $("#faraon").find("#disminuirFaraon").css({"opacity": '0.4', 'cursor': 'auto' });
            } else {
                $("#faraon").find("#disminuirFaraon").css({"opacity": '1', 'cursor': 'pointer' });
            }

        }
    });


// GESTIONAR CANTIDAD SACERDOTES

    var $cantidadSacerdotes = Number(localStorage.getItem("sacerdotes"));
    $("#cantidadSacerdotes").text($cantidadSacerdotes);

    // Mostrar recursos disponibles y necesarios

    $("#sacerdotes").find("#cantidadTrigo").text(necesarioSacerdotesTrigo + "(" + $cantidadTrigo + ")");
    $("#sacerdotes").find("#cantidadPiedra").text(necesarioSacerdotesPiedra + "(" + $cantidadPiedra + ")");
    $("#sacerdotes").find("#cantidadMadera").text(necesarioSacerdotesMadera + "(" + $cantidadMadera + ")");
    $("#sacerdotes").find("#cantidadOro").text(necesarioSacerdotesOro + "(" + $cantidadOro + ")");

    // Mostrar botón disminuir rol con transparencia si no hay ningún rol

    if ($cantidadSacerdotes == 0) {
        $("#sacerdotes").find("#disminuirSacerdotes").css({"opacity": '0.4', 'cursor': 'auto' });
    }

    // Aumentar roles
    
    $("#aumentarSacerdotes").on("click", function () {
        if (recursosSuficientes($cantidadTrigo,necesarioSacerdotesTrigo,$cantidadPiedra,necesarioSacerdotesPiedra,$cantidadMadera,necesarioSacerdotesMadera,$cantidadOro,necesarioSacerdotesOro)) {
            $cantidadSacerdotes += 1;
            $("#cantidadSacerdotes").text($cantidadSacerdotes);
            localStorage.setItem("sacerdotes", $cantidadSacerdotes);

            // Actualizar recursos

            $cantidadTrigo -= necesarioSacerdotesTrigo;
            $cantidadPiedra -= necesarioSacerdotesPiedra;
            $cantidadMadera -= necesarioSacerdotesMadera;
            $cantidadOro -= necesarioSacerdotesOro;

            actualizarRecursos ();

            // Mostrar botón de aumentar rol y recurso responsable con transparencia si no se puede aumentar el rol de nuevo

            transparenciasRolesRecursos ();

            // Mostrar botón disminuir rol con transparencia si no hay ningún rol

            if ($cantidadSacerdotes == 0) {
                $("#sacerdotes").find("#disminuirSacerdotes").css({"opacity": '0.4', 'cursor': 'auto' });
            } else {
                $("#sacerdotes").find("#disminuirSacerdotes").css({"opacity": '1', 'cursor': 'pointer' });
            }
        }

    });
    
    // Disminuir roles

    $("#disminuirSacerdotes").on("click", function () {
        if ($cantidadSacerdotes > 0) {
            $cantidadSacerdotes -= 1;
            $("#cantidadSacerdotes").text($cantidadSacerdotes);
            localStorage.setItem("sacerdotes", $cantidadSacerdotes);

            // Mostrar botón disminuir rol con transparencia si no hay ningún rol

            if ($cantidadSacerdotes == 0) {
                $("#sacerdotes").find("#disminuirSacerdotes").css({"opacity": '0.4', 'cursor': 'auto' });
            } else {
                $("#sacerdotes").find("#disminuirSacerdotes").css({"opacity": '1', 'cursor': 'pointer' });
            }

        }
    });


// GESTIONAR CANTIDAD ESCRIBANOS

    var $cantidadEscribanos = Number(localStorage.getItem("escribanos"));
    $("#cantidadEscribanos").text($cantidadEscribanos);

    // Mostrar recursos disponibles y necesarios

    $("#escribanos").find("#cantidadTrigo").text(necesarioEscribanosTrigo + "(" + $cantidadTrigo + ")");
    $("#escribanos").find("#cantidadPiedra").text(necesarioEscribanosPiedra + "(" + $cantidadPiedra + ")");
    $("#escribanos").find("#cantidadMadera").text(necesarioEscribanosMadera + "(" + $cantidadMadera + ")");
    $("#escribanos").find("#cantidadOro").text(necesarioEscribanosOro + "(" + $cantidadOro + ")");

    // Mostrar botón disminuir rol con transparencia si no hay ningún rol

    if ($cantidadEscribanos == 0) {
        $("#escribanos").find("#disminuirEscribanos").css({"opacity": '0.4', 'cursor': 'auto' });
    }

    // Aumentar roles
    
    $("#aumentarEscribanos").on("click", function () {
        if (recursosSuficientes($cantidadTrigo,necesarioEscribanosTrigo,$cantidadPiedra,necesarioEscribanosPiedra,$cantidadMadera,necesarioEscribanosMadera,$cantidadOro,necesarioEscribanosOro)) {
            $cantidadEscribanos += 1;
            $("#cantidadEscribanos").text($cantidadEscribanos);
            localStorage.setItem("escribanos", $cantidadEscribanos);

            // Actualizar recursos

            $cantidadTrigo -= necesarioEscribanosTrigo;
            $cantidadPiedra -= necesarioEscribanosPiedra;
            $cantidadMadera -= necesarioEscribanosMadera;
            $cantidadOro -= necesarioEscribanosOro;
     
            actualizarRecursos ();

            // Mostrar botón de aumentar rol y recurso responsable con transparencia si no se puede aumentar el rol de nuevo

            transparenciasRolesRecursos ();

            // Mostrar botón disminuir rol con transparencia si no hay ningún rol

            if ($cantidadEscribanos == 0) {
                $("#escribanos").find("#disminuirEscribanos").css({"opacity": '0.4', 'cursor': 'auto' });
            } else {
                $("#escribanos").find("#disminuirEscribanos").css({"opacity": '1', 'cursor': 'pointer' });
            }
        }

    });
    
    // Disminuir roles

    $("#disminuirEscribanos").on("click", function () {
        if ($cantidadEscribanos > 0) {
            $cantidadEscribanos -= 1;
            $("#cantidadEscribanos").text($cantidadEscribanos);
            localStorage.setItem("escribanos", $cantidadEscribanos);

            // Mostrar botón disminuir rol con transparencia si no hay ningún rol

            if ($cantidadEscribanos == 0) {
                $("#escribanos").find("#disminuirEscribanos").css({"opacity": '0.4', 'cursor': 'auto' });
            } else {
                $("#escribanos").find("#disminuirEscribanos").css({"opacity": '1', 'cursor': 'pointer' });
            }

        }
    });


// GESTIONAR CANTIDAD ARTESANOS

    var $cantidadArtesanos = Number(localStorage.getItem("artesanos"));
    $("#cantidadArtesanos").text($cantidadArtesanos);

    // Mostrar recursos disponibles y necesarios

    $("#artesanos").find("#cantidadTrigo").text(necesarioArtesanosTrigo + "(" + $cantidadTrigo + ")");
    $("#artesanos").find("#cantidadPiedra").text(necesarioArtesanosPiedra + "(" + $cantidadPiedra + ")");
    $("#artesanos").find("#cantidadMadera").text(necesarioArtesanosMadera + "(" + $cantidadMadera + ")");
    $("#artesanos").find("#cantidadOro").text(necesarioArtesanosOro + "(" + $cantidadOro + ")");

    // Mostrar botón disminuir rol con transparencia si no hay ningún rol

    if ($cantidadArtesanos == 0) {
        $("#artesanos").find("#disminuirArtesanos").css({"opacity": '0.4', 'cursor': 'auto' });
    }

    // Aumentar roles
    
    $("#aumentarArtesanos").on("click", function () {
        if (recursosSuficientes($cantidadTrigo,necesarioArtesanosTrigo,$cantidadPiedra,necesarioArtesanosPiedra,$cantidadMadera,necesarioArtesanosMadera,$cantidadOro,necesarioArtesanosOro)) {
            $cantidadArtesanos += 1;
            $("#cantidadArtesanos").text($cantidadArtesanos);
            localStorage.setItem("artesanos", $cantidadArtesanos);

            // Actualizar recursos

            $cantidadTrigo -= necesarioArtesanosTrigo;
            $cantidadPiedra -= necesarioArtesanosPiedra;
            $cantidadMadera -= necesarioArtesanosMadera;
            $cantidadOro -= necesarioArtesanosOro;
     
            actualizarRecursos ();

            // Mostrar botón de aumentar rol y recurso responsable con transparencia si no se puede aumentar el rol de nuevo

            transparenciasRolesRecursos ();

            // Mostrar botón disminuir rol con transparencia si no hay ningún rol

            if ($cantidadArtesanos == 0) {
                $("#artesanos").find("#disminuirArtesanos").css({"opacity": '0.4', 'cursor': 'auto' });
            } else {
                $("#artesanos").find("#disminuirArtesanos").css({"opacity": '1', 'cursor': 'pointer' });
            }
        }

    });
    
    // Disminuir roles

    $("#disminuirArtesanos").on("click", function () {
        if ($cantidadArtesanos > 0) {
            $cantidadArtesanos -= 1;
            $("#cantidadArtesanos").text($cantidadArtesanos);
            localStorage.setItem("artesanos", $cantidadArtesanos);

            // Mostrar botón disminuir rol con transparencia si no hay ningún rol

            if ($cantidadArtesanos == 0) {
                $("#artesanos").find("#disminuirArtesanos").css({"opacity": '0.4', 'cursor': 'auto' });
            } else {
                $("#artesanos").find("#disminuirArtesanos").css({"opacity": '1', 'cursor': 'pointer' });
            }

        }
    });


// GESTIONAR CANTIDAD SOLDADOS

    var $cantidadSoldados = Number(localStorage.getItem("soldados"));
    $("#cantidadSoldados").text($cantidadSoldados);

    // Mostrar recursos disponibles y necesarios

    $("#soldados").find("#cantidadTrigo").text(necesarioSoldadosTrigo + "(" + $cantidadTrigo + ")");
    $("#soldados").find("#cantidadPiedra").text(necesarioSoldadosPiedra + "(" + $cantidadPiedra + ")");
    $("#soldados").find("#cantidadMadera").text(necesarioSoldadosMadera + "(" + $cantidadMadera + ")");
    $("#soldados").find("#cantidadOro").text(necesarioSoldadosOro + "(" + $cantidadOro + ")");

    // Mostrar botón disminuir rol con transparencia si no hay ningún rol

    if ($cantidadSoldados == 0) {
        $("#soldados").find("#disminuirSoldados").css({"opacity": '0.4', 'cursor': 'auto' });
    }

    // Aumentar roles
    
    $("#aumentarSoldados").on("click", function () {
        if (recursosSuficientes($cantidadTrigo,necesarioSoldadosTrigo,$cantidadPiedra,necesarioSoldadosPiedra,$cantidadMadera,necesarioSoldadosMadera,$cantidadOro,necesarioSoldadosOro)) {
            $cantidadSoldados += 1;
            $("#cantidadSoldados").text($cantidadSoldados);
            localStorage.setItem("soldados", $cantidadSoldados);

            // Actualizar recursos

            $cantidadTrigo -= necesarioSoldadosTrigo;
            $cantidadPiedra -= necesarioSoldadosPiedra;
            $cantidadMadera -= necesarioSoldadosMadera;
            $cantidadOro -= necesarioSoldadosOro;
     
            actualizarRecursos ();

            // Mostrar botón de aumentar rol y recurso responsable con transparencia si no se puede aumentar el rol de nuevo

            transparenciasRolesRecursos ();

            // Mostrar botón disminuir rol con transparencia si no hay ningún rol

            if ($cantidadSoldados == 0) {
                $("#soldados").find("#disminuirSoldados").css({"opacity": '0.4', 'cursor': 'auto' });
            } else {
                $("#soldados").find("#disminuirSoldados").css({"opacity": '1', 'cursor': 'pointer' });
            }
        }

    });
    
    // Disminuir roles

    $("#disminuirSoldados").on("click", function () {
        if ($cantidadSoldados > 0) {
            $cantidadSoldados -= 1;
            $("#cantidadSoldados").text($cantidadSoldados);
            localStorage.setItem("soldados", $cantidadSoldados);

            // Mostrar botón disminuir rol con transparencia si no hay ningún rol

            if ($cantidadSoldados == 0) {
                $("#soldados").find("#disminuirSoldados").css({"opacity": '0.4', 'cursor': 'auto' });
            } else {
                $("#soldados").find("#disminuirSoldados").css({"opacity": '1', 'cursor': 'pointer' });
            }

        }
    });


// GESTIONAR CANTIDAD CAMPESINOS

    var $cantidadCampesinos = Number(localStorage.getItem("campesinos"));
    $("#cantidadCampesinos").text($cantidadCampesinos);

    // Mostrar recursos disponibles y necesarios

    $("#campesinos").find("#cantidadTrigo").text(necesarioCampesinosTrigo + "(" + $cantidadTrigo + ")");
    $("#campesinos").find("#cantidadPiedra").text(necesarioCampesinosPiedra + "(" + $cantidadPiedra + ")");
    $("#campesinos").find("#cantidadMadera").text(necesarioCampesinosMadera + "(" + $cantidadMadera + ")");
    $("#campesinos").find("#cantidadOro").text(necesarioCampesinosOro + "(" + $cantidadOro + ")");

    // Mostrar botón disminuir rol con transparencia si no hay ningún rol

    if ($cantidadCampesinos == 0) {
        $("#campesinos").find("#disminuirCampesinos").css({"opacity": '0.4', 'cursor': 'auto' });
    }

    // Aumentar roles
    
    $("#aumentarCampesinos").on("click", function () {
        if (recursosSuficientes($cantidadTrigo,necesarioCampesinosTrigo,$cantidadPiedra,necesarioCampesinosPiedra,$cantidadMadera,necesarioCampesinosMadera,$cantidadOro,necesarioCampesinosOro)) {
            $cantidadCampesinos += 1;
            $("#cantidadCampesinos").text($cantidadCampesinos);
            localStorage.setItem("campesinos", $cantidadCampesinos);

            // Actualizar recursos

            $cantidadTrigo -= necesarioCampesinosTrigo;
            $cantidadPiedra -= necesarioCampesinosPiedra;
            $cantidadMadera -= necesarioCampesinosMadera;
            $cantidadOro -= necesarioCampesinosOro;
     
            actualizarRecursos ();

            // Mostrar botón de aumentar rol y recurso responsable con transparencia si no se puede aumentar el rol de nuevo

            transparenciasRolesRecursos ();

            // Mostrar botón disminuir rol con transparencia si no hay ningún rol

            if ($cantidadCampesinos == 0) {
                $("#campesinos").find("#disminuirCampesinos").css({"opacity": '0.4', 'cursor': 'auto' });
            } else {
                $("#campesinos").find("#disminuirCampesinos").css({"opacity": '1', 'cursor': 'pointer' });
            }
        }

    });
    
    // Disminuir roles

    $("#disminuirCampesinos").on("click", function () {
        if ($cantidadCampesinos > 0) {
            $cantidadCampesinos -= 1;
            $("#cantidadCampesinos").text($cantidadCampesinos);
            localStorage.setItem("campesinos", $cantidadCampesinos);

            // Mostrar botón disminuir rol con transparencia si no hay ningún rol

            if ($cantidadCampesinos == 0) {
                $("#campesinos").find("#disminuirCampesinos").css({"opacity": '0.4', 'cursor': 'auto' });
            } else {
                $("#campesinos").find("#disminuirCampesinos").css({"opacity": '1', 'cursor': 'pointer' });
            }

        }
    });


// GESTIONAR CANTIDAD ESCLAVOS

    var $cantidadEsclavos = Number(localStorage.getItem("esclavos"));
    $("#cantidadEsclavos").text($cantidadEsclavos);

    // Mostrar recursos disponibles y necesarios

    $("#esclavos").find("#cantidadTrigo").text(necesarioEsclavosTrigo + "(" + $cantidadTrigo + ")");
    $("#esclavos").find("#cantidadPiedra").text(necesarioEsclavosPiedra + "(" + $cantidadPiedra + ")");
    $("#esclavos").find("#cantidadMadera").text(necesarioEsclavosMadera + "(" + $cantidadMadera + ")");
    $("#esclavos").find("#cantidadOro").text(necesarioEsclavosOro + "(" + $cantidadOro + ")");

    // Mostrar botón disminuir rol con transparencia si no hay ningún rol

    if ($cantidadEsclavos == 0) {
        $("#esclavos").find("#disminuirEsclavos").css({"opacity": '0.4', 'cursor': 'auto' });
    }

    // Aumentar roles
    
    $("#aumentarEsclavos").on("click", function () {
        if (recursosSuficientes($cantidadTrigo,necesarioEsclavosTrigo,$cantidadPiedra,necesarioEsclavosPiedra,$cantidadMadera,necesarioEsclavosMadera,$cantidadOro,necesarioEsclavosOro)) {
            $cantidadEsclavos += 1;
            $("#cantidadEsclavos").text($cantidadEsclavos);
            localStorage.setItem("esclavos", $cantidadEsclavos);

            // Actualizar recursos

            $cantidadTrigo -= necesarioEsclavosTrigo;
            $cantidadPiedra -= necesarioEsclavosPiedra;
            $cantidadMadera -= necesarioEsclavosMadera;
            $cantidadOro -= necesarioEsclavosOro;
     
            actualizarRecursos ();

            // Mostrar botón de aumentar rol y recurso responsable con transparencia si no se puede aumentar el rol de nuevo

            transparenciasRolesRecursos ();

            // Mostrar botón disminuir rol con transparencia si no hay ningún rol

            if ($cantidadEsclavos == 0) {
                $("#esclavos").find("#disminuirEsclavos").css({"opacity": '0.4', 'cursor': 'auto' });
            } else {
                $("#esclavos").find("#disminuirEsclavos").css({"opacity": '1', 'cursor': 'pointer' });
            }
        }
    });
    
    // Disminuir roles

    $("#disminuirEsclavos").on("click", function () {
        if ($cantidadEsclavos > 0) {
            $cantidadEsclavos -= 1;
            $("#cantidadEsclavos").text($cantidadEsclavos);
            localStorage.setItem("esclavos", $cantidadEsclavos);

            // Mostrar botón disminuir rol con transparencia si no hay ningún rol

            if ($cantidadEsclavos == 0) {
                $("#esclavos").find("#disminuirEsclavos").css({"opacity": '0.4', 'cursor': 'auto' });
            } else {
                $("#esclavos").find("#disminuirEsclavos").css({"opacity": '1', 'cursor': 'pointer' });
            }
        }
    });

});