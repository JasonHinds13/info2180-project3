/* global $ */ //To prevent JSLint warnings on cloud9

$(document).ready(function(){
    
    //make navbar hidden before login
    if (window.location.pathname == "/"){
        $("#navbar").hide();
    }
    else{
        $("#navbar").show();
    }
    
    //login
    $("#logbtn").on('click', function(event){
        
        event.preventDefault();
        
        //make navbar visible if successful login
        $("#navbar").show();
        $("#main").load("home.html");
    });
    
    // Create User Form
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
    
    //Nagivate using AJAX
    $("#navbar ul li a").on('click', function(event){
        event.preventDefault();
        var page = $(this).attr("href");
    
        $("#main").load(page);
    });
    
});