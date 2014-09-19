// misc functions **************************************

//'use strict';

var rand = (function () {
    var rng = new MersenneTwister(5557); // TODO fixed seed to test
    return function () {
        return rng.nextFloat();
    };
}());

Array.prototype.shuffle = function () {
    var i, ind, temp;
    for (i = this.length - 1; i > 0; i -= 1) {
        ind = Math.floor(rand() * (i + 1));
        temp = this[i];
        this[i] = this[ind];
        this[ind] = temp;
    }
    return this;
};


// game properties **************************************

var gameSizes = {
    5: [3, 2],
    6: [4, 2],
    7: [4, 3],
    8: [5, 3],
    9: [6, 3],
    10: [6, 4]
};

// TODOSOMEDAY combine these two
var descriptions = {
    'good': 'You are GOOD.',
    'evil': 'You are EVIL.<br><br>You see:<br>',
    'merlin': 'You are MERLIN (GOOD).<br><br>You see:<br>',
    'pervical': 'You are PERCIVAL (GOOD).<br><br>You see:<br>',
    'morgana': 'You are MORGANA (EVIL).<br><br>You see:<br>',
    'oberon': 'You are OBERON (EVIL).',
    'mordred': 'You are MORDRED (EVIL).<br><br>You see:<br>'
};

var sides = {
    'good': 'good',
    'evil': 'evil',
    'merlin': 'good',
    'percival': 'good',
    'morgana': 'evil',
    'oberon': 'evil',
    'mordred': 'evil'
};


// grab info from the web page ************************

function getPlayers() {
    return $('.player').map(function (idx, el) {
        return $(this).text();
    }).toArray();
}

function getSpecials() {
    return $(':checked').parent().map(function (idx, el) {
        return $(this).text().toLowerCase();
    }).toArray();
}

function generate() {
    var players = getPlayers();
    var specials = getSpecials();

    // fill in sides appropriately
    var gameSize = gameSizes[players.length],
        goods = [],
        evils = [];

    // TODO distinguish the assassin?
    var i, spec;
    for (i = 0; i < specials.length; i += 1) {
        spec = specials[i];
        if (sides[spec] === 'good') {
            goods.push(spec);
        } else {
            evils.push(spec);
        }
    }

    while (goods.length < gameSize[0]) {
        goods.push('good');
    }
    while (evils.length < gameSize[1]) {
        evils.push('evil');
    }

    // shuffle and assign
    var characters = [].concat(goods, evils);
    characters.shuffle();

    var assignments = { };
    for (i = 0; i < players.length; i += 1) {
        assignments[players[i]] = characters[i];
    }

    console.log(assignments);
    return assignments;
}


// TODO deactivate when game is in "generated" state
$('#name-input').keypress(function (ev) {
    if (ev.which === 13 && $(this).val().length > 0) {
        var name = $(this).val();
        // TODO padding between buttons
        $('#players').append('<br><button type="button" class="btn btn-default player" disabled>' + name + '</button>');
        $(this).val('');
    }
});
