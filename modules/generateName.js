/**
 * Created by aronthomas on 10/28/15.
 */
var chance = require('chance');

function generateName(){
    aChance = new chance();
    return aChance.name();
    //return 'steve';
}

module.exports = generateName;