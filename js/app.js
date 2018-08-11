$(document).ready(function () {

    var tempo = new Timer(0, 0);

    /*Cria a lista de cards */
    let cards = Array();
    for (i = 0; i < 16; i++) {
        cards.push({ name: "card" + i, html: "<li class='card' id='abacaxi'><i class='placeholder'></i></li>" });
    }

    var i = 0;
    for (card of cards) {
        var cardHtml = card.html;
        var x = function () {
            var classes = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
            var Asclass = classes[i];
            return Asclass;
        };
        y = x();
        var resultado = cardHtml.replace("placeholder", y);
        resultado = resultado.replace("abacaxi", card.name);
        card.html = resultado;
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

    function criarCards() {
        shuffle(cards);

        var todosOsCardsHtml = "";

        for (card of cards) {
            todosOsCardsHtml = todosOsCardsHtml + card.html;
        }

        var cartas = document.getElementById('cartas');
        cartas.innerHTML = todosOsCardsHtml;
    }

    criarCards();



    function mostrarAbrir(isso) {
        isso.addClass('open');
        isso.addClass('show');
    }

    function esconderFechar(isso) {
        isso.removeClass('open');
        isso.removeClass('show');
    }

    function IncrementaNumeroMovimentos() {
        movimentos++;
        $('.movimentos').html(movimentos);
    }

    let encontrou = 0;

    function IncrementaEncontrou() {
        encontrou++;
    }

    var listaDeAbrertos = [];

    function IncrementaAbertos(isso) {
        listaDeAbrertos.push(isso);
    }

    var movimentos = 0;

    //Função chamada quando ganha
    function ganhou() {
        var tempo = $('#timer').text();
        if (movimentos >= 20) {
            var estrelas = 1;
        } else if (movimentos >= 10) {
            var estrelas = 2;
        } else {
            var estrelas = 3;
        }
        $('.popup').html("Você ganhou com o número " + movimentos + " movimentos." + "<br> Com o tempo " + tempo + "<br> Com  " + estrelas + " estrela(s)! <br> Borá jogar novamente?" + "<button id='quero'>Sim</button>");
        $('.modal').css('display', 'block');
        $('#quero').on('click', function () { reiniciar(); });
        tempo.stopTimer();
    }
    // seta de reiniciar o jogo!
    function reiniciar() {
        movimentos = 0;
        $('.movimentos').html(movimentos);
        tempo.stopTimer();
        $('#timer').text("Tempo: 00:00 ");
        criarCards();
        $('#s1').show();
        $('#s2').show();
        $('#s3').show();
        addEventHandler();
    }

    $('.reiniciar').on('click', function () {
        reiniciar();
    })




    //Adiciona eventhandler para o evento on click na carta e chama os demais metódos

    let abrirCartas = [];
    let clickDisabled = false;
    function addEventHandler() {
        $(".card").on('click', function (event) {
            if (movimentos == 0) {
                tempo.startTimer();
            }
            if (clickDisabled == false) {
                if (abrirCartas[0] !== $(this).attr('id')) {
                    abrirCartas.push($(this).attr('id'));
                    Estrelas();
                    IncrementaNumeroMovimentos();
                    var isso = $(this);
                    mostrarAbrir(isso);
                    IncrementaAbertos(isso);
                    if (listaDeAbrertos.length > 1) {
                                    if (listaDeAbrertos[0].find(':first').attr('class') == listaDeAbrertos[1].find(':first').attr('class')) {
                                        console.log("oi");
                                        IncrementaEncontrou();
                                        if (encontrou == 8) {
                                            ganhou();
                                        }
                                        listaDeAbrertos = [];
                                        abrirCartas = [];
                                    }
                                    else {
                                        console.log(listaDeAbrertos[0]);
                                        console.log(listaDeAbrertos[1]);
                                        clickDisabled = true;
                                        window.setTimeout(function () {
                                            esconderFechar(listaDeAbrertos[0]);
                                            esconderFechar(listaDeAbrertos[1]);
                                            listaDeAbrertos = [];
                                            abrirCartas = [];
                                            clickDisabled = false;
                                        }, 1000);
                                    }
                     }else {
                        if (abrirCartas[0] == abrirCartas[1]) {
                            esconderFechar(listaDeAbrertos[0]);
                            esconderFechar(listaDeAbrertos[1]);

                        }
                        abrirCartas = [];
                    }
                }
            }
        });
    }

    //numero de estrelas
    function Estrelas() {
        if (movimentos >= 20) {
            $('#s2').hide();
        }
        if (movimentos >= 10) {
            $('#s3').hide();
        }
    }

    addEventHandler();

    //esconde o modal com o evento on click
    $('.modal').on('click', function () {
        $('.modal').css('display', 'none');

    })

});