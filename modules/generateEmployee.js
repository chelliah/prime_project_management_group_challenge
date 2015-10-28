/**
 * Created by aronthomas on 10/28/15.
 */
var random = require("./randomNumber");
var name = require("./generateName");
var skill = require("./generateSkill");


function generateEmployee(){
    this.name = name();
    this.skill = skill();
    this.scrum = random(1,9);
}

function createEmployee(){
    return new generateEmployee();
}

module.exports = createEmployee;