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
