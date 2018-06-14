$(document).ready(function () {
    
    $('#reanudarPartida').click(function () {

        /* Direccionar a la primera pantalla del juego */

        window.location.href = 'almacen.html';

    });
    
    $('#nuevaPartida').click(function () {

        /* Setear a cero todas las variables del juego */

        localStorage.setItem("cantidadTrigo", 0);
        localStorage.setItem("cantidadPiedra", 0);
        localStorage.setItem("cantidadMadera", 0);
        localStorage.setItem("cantidadOro", 0);

        localStorage.setItem("faraones", 0);
        localStorage.setItem("sacerdotes", 0);
        localStorage.setItem("escribanos", 0);
        localStorage.setItem("artesanos", 0);
        localStorage.setItem("soldados", 0);
        localStorage.setItem("campesinos", 1);
        localStorage.setItem("esclavos", 1);

        localStorage.setItem("mascara", false);
        localStorage.setItem("cruz", false);
        localStorage.setItem("ojo", false);
        localStorage.setItem("testamento", false);
        localStorage.setItem("papiro", false);
        localStorage.setItem("lapida", false);
        localStorage.setItem("anfora", false);
        localStorage.setItem("flor", false);
        localStorage.setItem("alfombra", false);
        localStorage.setItem("varas", false);

        /* Direccionar a la primera pantalla del juego */

        window.location.href = 'almacen.html';

    });

});