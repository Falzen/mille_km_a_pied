
let cardsData = [
    {
        name: 'accident',
        src: 'img/accident.png',
        qte: 3,
        type: 'attack'
    },
    {
        name: 'vehicule_prioritaire',
        src: 'img/vehicule_prioritaire.png',
        qte: 1,
        type: 'special'
    },
    {
        name: 'as_volant',
        src: 'img/as_volant.png',
        qte: 1,
        type: 'special'
    },
    {
        name: 'creve',
        src: 'img/creve.png',
        qte: 3,
        type: 'attack'
    },
    {
        name: 'citerne',
        src: 'img/citerne.png',
        qte: 1,
        type: 'special'
    },
    {
        name: 'essence',
        src: 'img/essence.png',
        qte: 6,
        type: 'save'
    },
    {
        name: 'feux_rouge',
        src: 'img/feux_rouge.png',
        qte: 5,
        type: 'attack'
    },
    {
        name: 'default',
        src: 'img/default.png',
        qte: 0,
        type: 'back'
    },
    {
        name: 'feux_vert',
        src: 'img/feux_vert.png',
        qte: 14,
        type: 'save'
    },
    {
        name: 'fin_vitesse',
        src: 'img/fin_vitesse.png',
        qte: 6,
        type: 'nolimit'
    },
    {
        name: 'fifty',
        src: 'img/fifty.png',
        qte: 10,
        type: 'km'
    },
    {
        name: 'hundred',
        src: 'img/hundred.png',
        qte: 12,
        type: 'km'
    },
    {
        name: 'limite_vitesse',
        src: 'img/limite_vitesse.png',
        qte: 4,
        type: 'limit'
    },
    {
        name: 'panne_essence',
        src: 'img/panne_essence.png',
        qte: 3,
        type: 'attack'
    },
    {
        name: 'reparation',
        src: 'img/reparation.png',
        qte: 6,
        type: 'save'
    },
    {
        name: 'roue_secours',
        src: 'img/roue_secours.png',
        qte: 6,
        type: 'save'
    },
    {
        name: 'increvable',
        src: 'img/increvable.png',
        qte: 1,
        type: 'special'
    },
    {
        name: 'seventy_five',
        src: 'img/seventy_five.png',
        qte: 10,
        type: 'km'
    },
    {
        name: 'two_hundred',
        src: 'img/two_hundred.png',
        qte: 4,
        type: 'km'
    },
    {
        name: 'twenty_five',
        src: 'img/twenty_five.png',
        qte: 10,
        type: 'km'
    }
];

var p1 = {
	nickname: 'p1',
	name: 'player 1',
	hand: [],
	domElements: {
		story: $('#p1-story'),
		kilometers: $('#p1-kilometers'),
		hand: $('#p1-hand')
	},
	story: [],
	distance: 0,
	road: {
		km200: 0,
		km100: 0,
		km75: 0,
		km50: 0,
		km25: 0
	},
	specials: {
		has_vehicule_prioritaire: false,
		has_as_volant: false,
		has_citerne: false,
		has_increvable: false
	}
}

var p2 = {
	nickname: 'p2',
	name: 'player 2',
	hand: [],
	domElements: {
		story: $('#p2-story'),
		kilometers: $('#p2-kilometers'),
		hand: $('#p2-hand')
	},
	story: [],
	distance: 0,
	road: {
		km200: 0,
		km100: 0,
		km75: 0,
		km50: 0,
		km25: 0
	},
	specials: {
		has_vehicule_prioritaire: false,
		has_as_volant: false,
		has_citerne: false,
		has_increvable: false
	}
}

class Card {
    constructor(data) {
		this.name = data.name;
		this.src = data.name;
		this.type = data.type;
	}
}

function createDeck() {
	let result = [];
	for(let i=0; i<cardsData.length; i++) {
		let oneCardData = cardsData[i];
		for(let j=0; j<oneCardData.qte; j++) {
			result.push(new Card(oneCardData));
		}
	}
	result.sort(() => (Math.random() > .6) ? 1 : -1);
	result.sort(() => (Math.random() > .4) ? 1 : -1);
	result.sort(() => (Math.random() > .5) ? 1 : -1);
	return result;
}


function drawCard(hand) {
	let drawnCard = deck.pop();
	hand.push(drawnCard);
}


function refreshHand(player) {
	let handDom = '';
	for (var i = 0; i < player.hand.length; i++) {
		let oneCard = player.hand[i];
		handDom += createCardDom(oneCard);
	}
	$(player.domElements.hand).html(handDom);
}

// todo mieux avec https://jerome-malenfant.com/more/turnableCardsEffect/
function createCardDom(cardData) {
	let output = 	'<div class="card" data-cname="' + cardData.src + '" data-ctype="' + cardData.type + '">'
						// + '<span class="rotateCard" onclick="rotateCard(this)"></span>'
						+ '<img src="img/' + cardData.src + '.png" alt="' + cardData.name + '" />'
					+'</div>';
	return output;
}

function rotateCard(el) {
	$(el).parent('.card').toggleClass('is-rotated');
}








/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var deck = null;
var whoseTurn = null;

$(document).ready(function() {
	whoseTurn = p1;
	init();
});



function init() {
	deck = createDeck();
	console.log('deck.length : ', deck.length );
	drawCard(p1.hand);
	drawCard(p1.hand);
	drawCard(p1.hand);
	drawCard(p1.hand);
	drawCard(p1.hand);
	console.log('p1.hand', p1.hand);
	console.log('deck.length : ', deck.length );

	drawCard(p2.hand);
	drawCard(p2.hand);
	drawCard(p2.hand);
	drawCard(p2.hand);
	drawCard(p2.hand);
	console.log('p2.hand', p2.hand);
	console.log('deck.length : ', deck.length );

	refreshHand(p1);
	refreshHand(p2);

	setEventListeners()
}

function setEventListeners() {
	$('body').on('click', '.card', function(ev) {
		unhighlightAll();
		selectCard($(ev.target).parent('.card'));
	});
}

function selectCard(el) {
	if(el.length == 0) {
		return;
	}
	el = el[0];
	if(!$(el).hasClass('is-selected')) {
		$('.card').removeClass('is-selected');
		$(el).addClass('is-selected');
		highlightPossibleDrops(el);
	} else {
		$('.card').removeClass('is-selected');
		return;	
	}
}

/*
type: 
	'back'
	'limit'
	'nolimit'
	'special'
	'km'
	'attack'
	'save'
		if(save) : feux_vert ?
*/
function highlightPossibleDrops(el) {
	let type = el.dataset.ctype;
	switch(type) {
		case 'back':
		break;

		case 'limit':
		break;

		case 'nolimit':
		break;

		case 'special':
		break;

		case 'km':
			highlightDistance(el.dataset.cname)
		break;

		case 'attack':
		break;

		case 'save':
		break;

	}
}

function unhighlightAll() {
	$('.player-side *').removeClass('is-possible-drop');
}

function highlightDistance(name) {
	$('.player-side *').removeClass('is-possible-drop');
	$('#' + whoseTurn.nickname + '-kilometers .' + name + ':not(.is-full)').addClass('is-possible-drop');
}