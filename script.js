var courses = [];

var addButton = document.querySelector('button');
var courseTable = document.querySelector('.course-details-list');
var gpaDisplay = document.getElementById('calculated-gpa');

addButton.onclick = function(event){
    event.preventDefault();

    var courseCode = document.getElementById('course-code').value;
    var credits = document.getElementById('course-credits').value;
    var grade = document.getElementById('course-grade').value;

    if (courseCode && credits && grade){
        courses.push({
            code:courseCode, credits:Number(credits), grade:Number(grade)
    });

    showCourses();
    calculateGPA();

    document.getElementById('course-code').value ="";
    document.getElementById('course-credits').value ="";
    document.getElementById('course-grade').value="";

   
}else{
    alert("Please fill in all field!");
    return;
}
};


function showCourses(){
    courseTable.innerHTML='';


    for (var i = 0; i< courses.length; i++){
        var course = courses[i];

        var newRow = '<tr>';
        newRow += '<td>' + course.code + '</td>';
        newRow += '<td>' + course.credits + '</td>';
        newRow += '<td>' + getGradeLetter(course.grade) + '</td>';
        newRow += '<td><button class="delete-btn" onclick="removeCourse(' + i + ')">Remove</button></td>';
        newRow += '</tr>';


        courseTable.innerHTML += newRow;
    }
}

function getGradeLetter(gradeNumber){
    if (gradeNumber == 4.00) return 'A+';
    if (gradeNumber == 4.00) return 'A';
    if (gradeNumber == 3.70) return 'A-';
    if (gradeNumber == 3.30) return 'B+';
    if (gradeNumber == 3.00) return 'B';
    if (gradeNumber == 2.70) return 'B-';
    if (gradeNumber == 2.30) return 'C+';
    if (gradeNumber == 2.00) return 'C';
    if (gradeNumber == 1.70) return 'C-';
    if (gradeNumber == 1.30) return 'D+';
    if (gradeNumber == 1.00) return 'D';
    if (gradeNumber == 0.00) return 'E';
    return gradeNumber;
}

function removeCourse(index){
    courses.splice(index, 1);
    showCourses();
    calculateGPA();
}


function calculateGPA(){
    if (courses.length == 0){
        gpaDisplay.innerHTML = '0.00';
        return;
    }
    
    var totalPoints = 0;
    var totalCredits = 0;

    for (var i = 0; i <courses.length; i++){
        var course = courses[i];
        totalPoints += course.credits * course.grade;
        totalCredits += course.credits;

    }

    var gpa = totalPoints / totalCredits;
    gpaDisplay.innerHTML = gpa.toFixed(2);
}
