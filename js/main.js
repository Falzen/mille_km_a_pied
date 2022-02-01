
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
        name: 'fifty',
        dist: 50,
        src: 'img/fifty.png',
        qte: 10,
        type: 'km'
    },
    {
        name: 'hundred',
        dist: 100,
        src: 'img/hundred.png',
        qte: 12,
        type: 'km'
    },
    {
        name: 'seventy_five',
        dist: 75,
        src: 'img/seventy_five.png',
        qte: 10,
        type: 'km'
    },
    {
        name: 'two_hundred',
        dist: 200,
        src: 'img/two_hundred.png',
        qte: 4,
        type: 'km'
    },
    {
        name: 'twenty_five',
        dist: 25,
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
var cardIdCpt = 0;
class Card {

    constructor(data) {
    	this.id = ++cardIdCpt;
		this.name = data.name;
		this.src = data.name;
		this.type = data.type;
		this.dist = data.dist;
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


function drawCard(player) {
	let drawnCard = deck.pop();
	player.hand.push(drawnCard);
	refreshHand(player);
}


function refreshHand(player) {
	let handDom = '';
	for (var i = 0; i < player.hand.length; i++) {
		let oneCard = player.hand[i];
		handDom += createCardDom(oneCard, player);
	}
	$(player.domElements.hand).html(handDom);
}

// todo mieux avec https://jerome-malenfant.com/more/turnableCardsEffect/
function createCardDom(cardData, player) {
	let output = 	'<div class="card" id="' + cardData.id + '"';
		output += ' data-pnickname="' + player.nickname + '"';
		output += ' data-cname="' + cardData.src + '"';
		output += ' data-ctype="' + cardData.type + '"';
		if(cardData.type == 'km') {
			output += ' data-dist="' + cardData.dist + '"';
		}
	output += '>';
		// + '<span class="rotateCard" onclick="rotateCard(this)"></span>'
		output += '<img src="img/' + cardData.src + '.png" alt="' + cardData.name + '" />'
	output += '</div>';
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
var currentCardDom = null;

$(document).ready(function() {
	whoseTurn = p1;
	init();
});



function init() {
	deck = createDeck();
	drawCard(p1); drawCard(p1); drawCard(p1); drawCard(p1); drawCard(p1);
	drawCard(p2); drawCard(p2); drawCard(p2); drawCard(p2); drawCard(p2);

	refreshHand(p1);
	refreshHand(p2);

	setEventListeners();
}

function setEventListeners() {
	$('body').on('click', '.distance', function(ev) {
	 })
	.on('click', '.hand .card', function(ev) {
		unhighlightAll();
		selectCard($(ev.target).parent('.card'));
	})
	.on('click', '.distance-drop', function(ev) {
		// not a km card
		if(currentCardDom == null || currentCardDom.dataset.ctype != 'km') { 
			unhighlightAll();
			$('.card').removeClass('is-selected');
			return; 
		}
		let clickedDistance = ev.target.dataset.distvalue;
		// wrong km clicked
		// TODO si speed limit en cours alors must be <= 50
		if(clickedDistance != currentCardDom.dataset.dist) {
			unhighlightAll();
			$('.card').removeClass('is-selected');
			return;
		}

		addDistance(ev.target);
	})
	.on('click', '.trafficlight-drop', function(ev) {
		// TODO si feu rouge en cours alors must be feu vert
		// si limit vitesse alors must be fin limit
		if(
			currentCardDom != null 
			&& currentCardDom.dataset.ctype == 'save'
			&& currentCardDom.dataset.cname == 'feux_vert'
		) {
			addToOwnStack(ev.target);
			//addToTrafficlight(ev.target);
		} else {
			unhighlightAll();
			$('.card').removeClass('is-selected');
			return; 
		}
	})
	.on('click', '.specials-drop', function(ev) {
		if(
			currentCardDom != null 
			&& currentCardDom.dataset.ctype == 'special'
		) {
			// TODO si accident qui correspond au special en cours, bonus points
			addToOwnStack(ev.target);
			//addToSpecials(ev.target);	
		}
		else {
			unhighlightAll();
			$('.card').removeClass('is-selected');
			return; 
		}
		
	})
	.on('click', '.main-stack-drop', function(ev) {
		// TODO si accident correspondant en cours seulement
		if(
			currentCardDom != null 
			&& currentCardDom.dataset.ctype == 'save'
		) {
			addToOwnStack(ev.target);
			//addToMainStack(ev.target);
		} else {
			unhighlightAll();
			$('.card').removeClass('is-selected');
			return; 
		}
		
	})
	.on('click', '#pioche-content', function(ev) {
		drawCard(p1);
	})
	.on('click', '#discard-content', function(ev) {
		discardSelectedCard();
		
	});
	
	
}

function discardSelectedCard() {
	$('#discard-content').append(currentCardDom);
	p1.hand = p1.hand.filter(function (el) {
		return el.id != currentCardDom.id
	});
	refreshHand(p1);
}


function addToOwnStack(target) {
	$(target).parent('.card-shape').append(currentCardDom);
	p1.hand = p1.hand.filter(function (el) {
		return el.id != currentCardDom.id
	});

	$('.card').removeClass('is-selected');
	currentCardDom = null;
}
/*
function addToTrafficlight(target) {
	$(target).parent('.card-shape').append(currentCardDom);
	$('.card').removeClass('is-selected');
	currentCardDom = null;
}
function addToSpecials(target) {
	$(target).parent('.card-shape').append(currentCardDom);
	$('.card').removeClass('is-selected');
	currentCardDom = null;
}
function addToMainStack(target) {
	$(target).parent('.card-shape').append(currentCardDom);
	$('.card').removeClass('is-selected');
	currentCardDom = null;
}
*/
function addDistance(target) {
	let value = 1*(currentCardDom.dataset.dist);
	$(target).parent('.card-shape').append(currentCardDom);
	p1.hand = p1.hand.filter(function (el) {
		return el.id != currentCardDom.id
	});
	$('.card').removeClass('is-selected');
	p1.distance += value;
	$('#p1-distance').text(p1.distance);
	currentCardDom = null;
}

function selectCard(el) {
	if(el.length == 0) {
		return;
	}
	currentCardDom = el = el[0];
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
			if(el.dataset.cname == 'feux_vert') {
				highlightTrafficlight()	
			}
		break;
	}
	if(p1.hand.length >= 6) {
		highlightDiscard()
	}
}

function highlightDiscard() {
	$('#discard-content').addClass('is-possible-drop');
}

function highlightTrafficlight() {
	$('#discard-content').addClass('is-possible-drop');
	$('.player-side *').removeClass('is-possible-drop');
	$('#' + whoseTurn.nickname + '-story .trafficlight').addClass('is-possible-drop');
}

function unhighlightAll() {
	$('#discard-content').addClass('is-possible-drop');
	$('.player-side *').removeClass('is-possible-drop');
}

function highlightDistance(name) {
	$('#discard-content').addClass('is-possible-drop');
	$('.player-side *').removeClass('is-possible-drop');
	$('#' + whoseTurn.nickname + '-kilometers .' + name + ':not(.is-full)').addClass('is-possible-drop');
}