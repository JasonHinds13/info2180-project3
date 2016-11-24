/* global $ */

$(document).ready(function(){
    
    $("#navbar").hide(); //hide nav bar if not logged in
    
    //login
    $("#logbtn").on('click', function(event){
        
        event.preventDefault();
        
        var name = $("#usname").val();
        var pass = $("#pass").val();
        
        var dat = "logname="+name+"&logpass="+pass;
        
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4){
                    if (this.status == 200) {
                        //make navbar visible if successful login
                        if (xmlhttp.responseText == "User Found"){
                            $("#navbar").show();
                            $("#main").load("home.html");
                            getmail();
                        }
                        else{
                            $("#status").text("User Info Not Found! Check Login Info!");
                        }
                    }
                    else{
                        $("#status").text("Some Unknown Error Occured");
                    }
            }
        };
        
        xmlhttp.open("POST", "cheapomail.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(dat);
    });
    
    //Nagivate using AJAX
    $("#navbar ul li a").on('click', function(event){
        
        var logout = function(){
            var xmlhttp = new XMLHttpRequest();
            
            var dat ="logout=true";
        
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4){
                    if (this.status == 200) {
                        window.location.href = "/";
                    }
                }
            };
        
            xmlhttp.open("POST", "cheapomail.php", true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send(dat);
        }
        
        event.preventDefault();
        var page = $(this).attr("href");
        
        if (page == "index.html"){
            logout();
        }
        else{
            $("#main").load(page);
        }
    });
    
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
    
    //Send Message
    $("#mailform").on('submit', function(event){
        event.preventDefault();
        
        var recp = $("#recipient").val();
        var subj = $("#subject").val();
        var body = $("#body").val();
        
        recp = recp.replace(" ",",");
        
        var dat = "recipients="+recp+"&subject="+subj+"&body="+body;
        
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function(){
            if (this.readyState == 4){
                if (this.status == 200) {
                    $("#status").text("Message Sent");
                }
                else{
                    $("#status").text("Some Unknown Error Occured");
                }
            }
        }
        
        xmlhttp.open("POST", "cheapomail.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(dat);
    });
    
    function getmail(){
        //handle getting mail
        var link = 'cheapomail.php?getmail=true';
        
        $.ajax(link,{
            method: 'GET' 
        }).done(function(res){
            $("#mail").html(res);
            $('.recv').hide();
        
            $('.showbutton').on('click', function(){
                console.log("Ive been clicked");
                $('.recv').show();
            });
            
        }).fail(function(){
            $("#mail").html("<p>Some Error Occured</p>");
        });
    }
});