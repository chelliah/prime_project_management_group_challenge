/**
 * Created by aronthomas on 10/28/15.
 */
var company;
var skills = ["Front End", "Back End", "Logic"];

function generateCompany(){
    this.name = "A Company";
    this.frontEnd = randomNumber(10,60);
    this.backEnd = randomNumber(10,60);
    this.Logic = randomNumber(10,60);
    this.number = randomNumber(0,2);
    this.employees = [];
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
}

function callEmployee(){
    $.ajax({
        type: "GET",
        url: "/employee",
        success: function(data){
            company.employees.push(data);
            console.log(data);
        }
    });
}


//function assignStaff(){ //async bug in function
//    var checkOffSkills = skills;
//    while(checkOffSkills.length>0){
//        callEmployee();
//        var employee = company.employees[company.employees.length-1];
//        console.log(employee);
//        for(var i = 0; i<checkOffSkills.length; i++){
//            if (employee.skill==checkOffSkills[i]){
//                checkOffSkills.splice(i,1);
//            }
//        }
//    }
//
//}

$(document).ready(function(){
    company = new generateCompany();
    //assignStaff();
    console.log(company);

});