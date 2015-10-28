/**
 * Created by aronthomas on 10/28/15.
 */
var random = require("./randomNumber");
var skills = ["Front End", "Back End", "Logic"];

function generateSkill(){
    var role = random(0,2);
    return skills[role];
}

module.exports = generateSkill;



