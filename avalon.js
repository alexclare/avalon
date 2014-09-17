// misc functions **************************************

//'use strict';

var rand = (function () {
    var rng = new MersenneTwister(5557); // TODO fixed seed to test
    return function () {
        return rng.nextFloat();
    };
}());

function shuffle(arr) {
    var i, ind, temp;
    for (i = arr.length - 1; i > 0; i -= 1) {
        ind = Math.floor(rand() * (i + 1));
        temp = arr[i];
        arr[i] = arr[ind];
        arr[ind] = temp;
    }
    return arr; // shuffle in place, not necessary
}


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
    'pervical': 'good',
    'morgana': 'evil',
    'oberon': 'evil',
    'mordred': 'evil'
};


function generate() {
    // input from the web form
    var names = $('.player').map(function (idx, el) {
        return $(this).text();
    }).toArray();

    var specials = $(':checked').parent().map(function (idx, el) {
        return $(this).text().toLowerCase();
    }).toArray();

    // fill in sides appropriately
    var gameSize = gameSizes[names.length],
        goods = [],
        evils = [];

    var i;
    for (i = 0; i < specials.length; (i++)) {
        var spec = specials[i];
        if (sides[spec] === 'good') {
            goods.push(spec);
        } else {
            evils.push(spec);
        }
    }

    while (goods.length < gameSize[0]) {
        goods.push("good");
    }
    while (evils.length < gameSize[1]) {
        evils.push("evil");
    }

    // shuffle and assign
    var characters = [].concat(goods, evils);
    shuffle(characters);

    var assignments = { };
    for (i = 0; i < names.length; i += 1) {
        assignments[names[i]] = characters[i];
    }

    console.log(assignments);
}
