/* global $ */

$(document).ready(function(){

    // Create User Form Submission
    $("#signupform").on('submit', function(event){
        
        event.preventDefault();
        
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var uname = $("#uname").val();
        var pword = $("#pword").val();
        
        var params = 'firstname='+fname+'&lastname='+lname+'&username='+uname+'&password='+pword;
        
        var link = 'cheapomail.php';
        
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4){
                    if (this.status == 200) {
                        $("#status").text("Successfully Added");
                    }
                    else{
                        $("#status").text("Some Unknown Error Occured");
                    }
            }
        };
        
        xmlhttp.open("POST", link, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(params);
    });
    
});