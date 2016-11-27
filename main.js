/* global $ */

$(document).ready(function(){
    
    $("#navbar").hide(); //hide nav bar if not logged in
    
    //login
    $("#logbtn").on('click', function(event){
        
        event.preventDefault();
        
        var name = $("#usname").val();
        var pass = $("#pass").val();
        
        var dat = "logname="+name+"&logpass="+pass;
        
        var lxmlhttp = new XMLHttpRequest();
        
        lxmlhttp.onreadystatechange = function() {
            if (this.readyState == 4){
                    if (this.status == 200) {
                        //make navbar visible if successful login
                        if (lxmlhttp.responseText == "User Found"){
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
        
        lxmlhttp.open("POST", "cheapomail.php", true);
        lxmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        lxmlhttp.send(dat);
    });
    
    //Nagivate using AJAX
    $("#navbar ul li a").on('click', function(event){
        
        var logout = function(){
            var xxmlhttp = new XMLHttpRequest();
            
            var dat ="logout=true";
        
            xxmlhttp.onreadystatechange = function() {
                if (this.readyState == 4){
                    if (this.status == 200) {
                        window.location.href = "/";
                    }
                }
            };
        
            xxmlhttp.open("POST", "cheapomail.php", true);
            xxmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xxmlhttp.send(dat);
        }
        
        event.preventDefault();
        var page = $(this).attr("href");
        
        if (page == "index.html"){
            logout();
        }
        
        else if(page == "home.html"){
            $("#main").load(page);
            getmail();
        }
        else{
            $("#main").load(page);
        }
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
                $(this).prev().slideToggle(400);
                readMail($(this).parent());
            });
            
        }).fail(function(){
            $("#mail").html("<p>Some Error Occured</p>");
        });
    }
    
    function readMail(div){
        //handle reading message here
        $(div).attr('class', 'mail read');
    }
});