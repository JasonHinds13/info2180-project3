<?php

$host = getenv('IP');
$username = getenv('C9_USER');
$password = '';
$dbname = 'cheapomail';

$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

// user to be added
$fname = $_POST["firstname"];
$lname = $_POST["lastname"];
$uname = $_POST["username"];
$pword = $_POST["password"];

// mail to be sent
$senr = $_POST["sender"];
$subj = $_POST["subject"];
$recps = $_POST["recipients"];
$body = $_POST["body"];

// user name to recieve mail
$rcvr = $_GET["receiver"];

function createUser(){
    $stmt = $conn->query("INSERT INTO users(firstname, lastname, username, password) VALUES($fname, $lname, $uname, $pword)");
}

function sendMail(){
    
    //get ids of sender and recipients
    $stmt = $conn->query("SELECT id FROM users WHERE username = $senr");
    $sid = $stmt->fetch(PDO::FETCH);
    
    //insert message for each recipient
    foreach($recps as $recp){
    
        $stmt2 = $conn->query("SELECT id FROM users WHERE username = $recp");
        $rid = $stmt2->fetch(PDO::FETCH);
    
        // query to be sent
        $q = "INSERT INTO messages(recipient_id, user_id, subject, body) VALUES($sid, $rid,$subj, $body)";
    
        $stmt3 = $conn->query($q);
        //$stmt3->execute();
    }
}