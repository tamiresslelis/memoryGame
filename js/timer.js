
function Timer(minutos, segundos) {
    this.minutos = minutos;
    this.segundos = segundos;
    var interval;
}

Timer.prototype.startTimer = function () {
    var minutos = this.minutos;
    var segundos = this.segundos;

    interval = setInterval(function () {
        if (segundos == 60) {
            minutos++;
            segundos = 0;
        }

        fminutos = minutos < 10 ? "0" + minutos : minutos;
        fsegundos = segundos < 10 ? "0" + segundos : segundos;

        $('#timer').text("Tempo: " + fminutos + ":" + fsegundos);
        segundos++;

    }, 1000);
}

Timer.prototype.stopTimer = function () {
    clearInterval(interval);
}


