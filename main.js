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
});