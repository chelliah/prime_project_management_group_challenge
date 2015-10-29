/**
 * Created by aronthomas on 10/28/15.
 */
var company;
//var companyName = require('random-word-generator');
var skills = ["Front End", "Back End", "Logic"];

function generateCompany(){
    this.name = randomCompany();
    this.frontEnd = randomNumber(10,60);
    this.backEnd = randomNumber(10,60);
    this.logic = randomNumber(10,60);
    //this.number = randomNumber(0,2);
    this.frontEndEmployees = [];
    this.backEndEmployees = [];
    this.logicEmployees = [];
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
}

function callEmployee(){
    $.ajax({
        type: "GET",
        url: "/employee",
        success: function(data){
            //company.employees.push(data);
            sortEmployee(data);
            while(!isAssigned()){ //function checks whether all positions have assigned employee
                callEmployee();
                return;
            }
            calculateSprintTime();
            appendToDom();
            return;

        }
    });

}

//Function evaluates sprint time for projects by totalling skill points for each category and returning the maximum requiredTime/totalSkill
function calculateSprintTime(){
    company.frontEndSkill=0;
    company.backEndSkill=0;
    company.logicSkill = 0;

    for(var index in company.frontEndEmployees){
        var employee = company.frontEndEmployees[index];
        //console.log(employee);
        company.frontEndSkill += employee.scrum;
    }
    for(var index in company.backEndEmployees){
        var employee = company.backEndEmployees[index];
        company.backEndSkill += employee.scrum;
    }
    for(var index in company.logicEmployees){
        var employee = company.logicEmployees[index];
        company.logicSkill += employee.scrum;
    }

    company.frontEndTime = Math.ceil(company.frontEnd/company.frontEndSkill);
    //console.log("here is front end time," , frontEndTime);

    company.backEndTime = Math.ceil(company.backEnd/company.backEndSkill);
    //console.log("here is back end time," , backEndTime);

    company.logicTime = Math.ceil(company.logic/company.logicSkill);
    //console.log("here is logic time," , logicTime);

    company['sprintTime'] = Math.max(company.frontEndTime,company.backEndTime,company.logicTime);

}

//sorts employee by skill into one of three arrays in the compnay object
function sortEmployee(data) {
    switch (data.skill) {
        case skills[0]:
            company.frontEndEmployees.push(data);
            break;
        case skills[1]:
            company.backEndEmployees.push(data);
            break;
        case skills[2]:
            company.logicEmployees.push(data);
            break;
    }
}

function initializeDom(){
    var $el = $("#company");
    $el.empty().hide();
    $el.append("<div><h1>" + company.name + "</h1></div>");
    $el.append("<div class ='btn btn-success lead center-block' id='assignEmployees'>Assign Employees</div>");
    $el.append("<div>"+
        "<div class='col-md-4 well'>Front End Requirement:  <mark class='constant lead'>"+ company.frontEnd +"</mark></div>" +
        "<div class='col-md-4 well'>Back End Requirement:  <mark class='constant lead'>"+ company.backEnd +"</mark></div>" +
        "<div class='col-md-4 well'>Logic Requirement:  <mark class='constant lead'>"+ company.logic +"</mark></div>" +
        "</div>");
    $el.append("<div id='employeeInfo'></div>")
    $el.fadeIn().show();
}

function appendToDom(){
    var $el = $("#company").children().last();
    $el.empty();
    $el.append("<h3>Project completion time: <mark class='time lead'>" + company.sprintTime + "</mark> weeks with <mark class='time lead'>" +
        (company.frontEndEmployees.length+company.backEndEmployees.length+company.logicEmployees.length) + "</mark> employees.</h3>").fadeIn();
    $el.append("<div>"+
        "<div class='col-md-4 well'>"+
            "<p>Number of Front End Employees: <mark class='flux lead'>" + company.frontEndEmployees.length + "</mark></p>" +
            "<p>Skill Total: <mark class='flux lead'>" + company.frontEndSkill + "</mark></p>" +
        "</div>" +
        "<div class='col-md-4 well'>"+
            "<p>Number of Back End Employees: <mark class='flux lead'>" + company.backEndEmployees.length + "</mark></p>" +
            "<p>Skill Total: <mark class='flux lead'>" + company.backEndSkill + "</mark></p>" +
        "</div>" +
        "<div class='col-md-4 well'>"+
            "<p>Number of Logic Employees: <mark class='flux lead'>" + company.logicEmployees.length + "</mark></p>" +
            "<p>Skill Total: <mark class='flux lead'>" + company.logicSkill + "</mark></p>" +
        "</div>" +
        "</div>");
    //$el.append("<div class ='btn btn-default lead' id='addEmployee'>Add New Employee</div>");
}

function isAssigned(){ //async bug in function
    if(company.frontEndEmployees.length<1||company.backEndEmployees.length<1||company.logicEmployees.length<1){
        return false;
    }else{
        return true;
    }
}

$(document).ready(function(){
    //inside click listener for generate company

    //some code to generate initial employees
    //some code to calculate scrum time

    $("#generateCompany").on('click',function(){
        company = new generateCompany();
        console.log(company);
        initializeDom();

    });

    //click listener to add one new employee
    //inside is code to add one new employee.
    //code to recalculate scrum time.

    $("#company").on('click', '#assignEmployees', function(){
        callEmployee();
        $(this).text("Add New Employee");
    });


});