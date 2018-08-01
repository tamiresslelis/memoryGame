/*
 * Create a list that holds all of your cards
 */
$(document).ready(function () {

    let tempo = new Timer(0, 0);
    let i = 0;
    let cards = []; //array
    const tamanho = 16;
    for (i = 0; i < 16; i++) {
        cards.push({ name: "card" + i, html: "<li class='card' id='abacaxi'><i class='placeholder'></i></li>" });
    }


    //enxuto
    for (card of cards) {
        let cardHtml = card.html;
        let x = function () {
            let asClasses = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
            let todasAsClasses = asClasses[i];
            return todasAsClasses;
        };
        y = x();
        let result = cardHtml.replace("placeholder", y);
        result = result.replace("abacaxi", card.name);
        card.html = result;
        i++;
    }


    /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function criaOsCards() {
        shuffle(cards);

        let todosCardsHtml = "";

        for (card of cards) {
            todosCardsHtml = todosCardsHtml + card.html;
        }

        var cartas = document.getElementById('cartas');
        cartas.innerHTML = todosCardsHtml;
    }

    criaOsCards();
    function Fechar(isto) {
        isto.removeClass('open');
        isto.removeClass('show');
    }

    function Abrir(isto) {
        isto.addClass('open');
        isto.addClass('show');
    }


    function movimentos() {
        numeroDeMovimentos++;
        $('.moves').html(numeroDeMovimentos);
    }

    let iguais = 0;

    function Identicos() {
        iguais++;
    }

    let listAbrir = [];

    function Abrindo(e) {
        listAbrir.push(e);
    }

    let numeroDeMovimentos = 0;

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

    function vencer() {
        let tempo = $('#timer').text();
        if (numeroDeMovimentos >= 20) {
            let estrelas = 1;
        } else if (numeroDeMovimentos >= 10) {
            var estrelas = 2;
        } else {
            var estrelas = 3;
        }
        $('.popup').html("Parabéns você ganhou com a quantidade de " + numeroDeMovimentos+ " movimentos." + "<br>" + tempo + "<br> Com o número de  " + estrelas + " estrela(s)! <br> Deseja jogar novamente? Boráaa" + "<button id='quero'>Sim</button>");
        $('.modal-container').css('display', 'block');
        $('#confirm').on('click', function () { reset(); });
        relogio.stopTimer();
    }


    function reiniciar() {
        numeroDeMovimentos = 0;
        $('.moves').html(numeroDeMovimentos);
        tempo.stopTimer();
        $('#timer').text("Tempo: 00:00 ");
        criaOsCards();
        $('#star1').show();
        $('#star2').show();
        $('#star3').show();
        addEventHandler();
    }

    $('.restart').on('click', function () {
        reiniciar();
    })

   
    let AbrirCards = [];
    let clickDisabled = false;
    function addEventHandler() {
        $(".card").on('click', function (event) {
            if (numeroDeMovimentos == 0) {
                tempo.startTimer();
            }
            if (clickDisabled == false) {
                if (AbrirCards[0] !== $(this).attr('id')) {
                    AbrirCards.push($(this).attr('id'));
                    estrelas();
                    console.log(AbrirCards[0]);
                    console.log(AbrirCards[1]);
                    movimentos();
                    let isso = $(this);
                    Abrir(isso);
                    Abrindo(isso);
                    if (listAbrir[0].find(':first').attr('class') == listAbrir[1].find(':first').attr('class')) {
                        Identicos();
                        if (iguais == 8) {
                            vencer();
                        }
                        listAbrir = [];
                        AbrirCards = [];
                    }
                    else {
                        console.log(abrir[0]);
                        console.log(abrir[1]);
                        clickDisabled = true;
                        window.setTimeout(function () {
                            Fechar(listAbrir[0]);
                            Fechar(listAbrir[1]);
                            listAbrir = [];
                            AbrirCards = [];
                            clickDisabled = false;
                        }, 1000);
                    }
                    if (AbrirCards[0] == AbrirCards[1]) {
                        Fechar(listAbrir[0]);
                        Fechar(listAbrir[1]);
                        
                    }
                    AbrirCards = [];
                }
            }
        });
    }

    function estrelas() {
        if (numeroDeMovimentos >= 20) {
            $('#star2').hide();
        }
        if (numeroDeMovimentos >= 10) {
            $('#star3').hide();
        }
    }

    addEventHandler();

    
    /*$('.modal-container').on('click', function () {
        $('.modal-container').css('display', 'none');

    })*/

});





function Timer(minutes, seconds) {
    this.minutes = minutes;
    this.seconds = seconds;
    var interval;
}

Timer.prototype.startTimer = function () {
    var minutes = this.minutes;
    var seconds = this.seconds;

    interval = setInterval(function () {
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }

        fminutes = minutes < 10 ? "0" + minutes : minutes;
        fseconds = seconds < 10 ? "0" + seconds : seconds;

        $('#timer').text("Tempo: " + fminutes + ":" + fseconds);
        seconds++;

    }, 1000);
}

Timer.prototype.stopTimer = function () {
    clearInterval(interval);
}