var numRamdon = function(){
	//el usuario pone el numero al ingresar el juego
	var numConvertido;

	//azar del array
	var ordenAleatorio = function(array) {
		for (var i = array.length-1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	//duplica los primeros cuatro elementos del array en otro
	var numAleatorio = function(array){
		var n_array = array.slice(0,4).join('');
		return n_array;
	}

	var convertNumero = function(){
		var digitos = ordenAleatorio([0,1,2,3,4,5,6,7,8,9]);
		var numMaquina = numAleatorio(digitos);
		return numMaquina;	
	}

	numConvertido = convertNumero();
	return numConvertido;
};

var numero;

function empezarJuego() { 
  numero = numRamdon();

  var printNumero = function(){
      console.log(numero);
  }

  printNumero();
}
empezarJuego();

var validarNumero = function(){
	var padre = $('#numero').parent();
	var numJugador = $('#numero').val();
	var caracteresRegex = /\D/;
	var numJugador = $('#numero').val();
	var arrayUsuarioCantidad = numJugador.split('');

	var limpieza = function(){
		padre.removeClass('has-error');
		$('.mensaje-de-error').removeClass('error').html('');
	}

	if (numJugador == '') {	
		padre.removeClass('has-error');
		$('.mensaje-de-error').removeClass('error');
		return false;
	}

	if (numJugador.match(caracteresRegex)) {
		limpieza();
		padre.addClass('has-error');
		$('.mensaje-de-error').addClass('error').html('Este campo solo puede contener números.');
		return false;
	}

	if (arrayUsuarioCantidad.length <= 3 || arrayUsuarioCantidad.length >= 5 ) {
		limpieza();
		padre.addClass('has-error');
		$('.mensaje-de-error').addClass('error').html('Este campo debe contener un número de máximo de cuatro (4) digitos');
		return false;
	}

	var numRepetidos = function(){
		var arrayUsuario = numJugador.split('');	
		var comprobacion = arrayUsuario.filter(function(elem, i, array) {
			return arrayUsuario.indexOf(elem) === i;
		}
		);
		var arrayValidacion = comprobacion;
		if (arrayValidacion.length < 4) {
			return false;
		} else {
			return true;
		}	
	};
	numRepetidos();
	if(numRepetidos() != true){
			//limpieza();
			$('.mensaje-de-error').addClass('error').html('El número no puede contener digitos repetidos');
			return false;
		} else{
			return true;
		}
	}


var evaluarNumero = function(){	

	calcularPicas();
	calcularFijas();
	var padre = $('#numero').parent();
	var numJugador = $('#numero').val();
	var picasResultado = calcularPicas();
	var fijasResultado = calcularFijas();
	if(validarNumero()){
		$('tbody').append('<tr><td>' + numJugador + '</td><td>' + picasResultado + '</td><td>' + fijasResultado + '</td></tr>');
		padre.removeClass('has-error');
		$('.mensaje-de-error').addClass('error').html('');
		var ganador = function(){
		if (fijasResultado == 4) {
			finJuego();
			}
		}
		ganador();
		return true;
	} else{
		console.log('error');
	}
	
}


var calcularPicas = function(){
	var numJugador = $('#numero').val();
	var arrayJuego = numero.split('');
	var arrayJugador = numJugador.split('');
	var picasAciertos = 0;
	for (var i = 0; i < 4; i++) {
		if (arrayJuego.indexOf(arrayJugador[i]) != -1 && arrayJuego[i] != arrayJugador[i]) {
				picasAciertos++;
		}
	}
	return picasAciertos;	
}

var calcularFijas = function(){
	var numJugador = $('#numero').val();
	var arrayJuego = numero.split('');
	var arrayJugador = numJugador.split('');
	var fijasAciertos = 0;
	for (var i = 0; i < 4; i++) {
		if (arrayJuego[i] == arrayJugador[i]) {
				fijasAciertos++;			
		}
	}
	return fijasAciertos;	
}
	
var finJuego = function(){
	$('body').prepend('<div class="ganadorContenedor"></div>');
	$('.ganadorContenedor').append('<p class="ganadorMensaje">Winner!!! (^ v ^)</p>');
	$('.ganadorContenedor').append('<button class="nuevo-juego">Juega de nuevo</button>');

	$('.ganadorContenedor').addClass('mostrar');
	$('.ganadorMensaje').addClass('mostrar');
	$('.nuevo-juego').addClass('mostrar');
}

var juegoNuevo = function(){
	$('#numero').val('');
	$('tbody').empty();
	empezarJuego();
}

$('body').keypress(function(e) {
    if(e.keyCode == 13) {
        validarNumero();
        evaluarNumero();
    }
});

$("#inicio").on("click", function(){
	empezarJuego();
});


$(document).on('click','.nuevo-juego', function() {
	$('.ganadorContenedor').removeClass('mostrar');
	$('.ganadorMensaje').removeClass('mostrar');
	$('.nuevo-juego').removeClass('mostrar');
	juegoNuevo();
	numRamdon();
});