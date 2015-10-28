/**
 * Created by aronthomas on 10/28/15.
 */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
}

module.exports = randomNumber;