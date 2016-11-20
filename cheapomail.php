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

// user id to recieve mail
$rcvr = $_GET["id"];


// functions to be called

function createUser(){
    $stmt = $conn->execute("INSERT INTO users(firstname, lastname, username, password) VALUES($fname, $lname, $uname, $pword)");
}

function getMail(){
    $stmt = $conn->query("SELECT * FROM messages WHERE recipient_id = $rcvr");
    $res = $stmt->fetchAll(PDO::ASSOC);
    
    foreach($res as $mail){
        echo $mail["user_id"] . " " . $mail["subject"] . " " . $mail["body"];
    }
}

function sendMail(){
    
    //get ids of sender and recipients
    $stmt = $conn->query("SELECT id FROM users WHERE username = $senr");
    $m = $stmt->fetch();
    $sid = $m["id"];
    
    //insert message for each recipient
    foreach($recps as $recp){
    
        $stmt2 = $conn->query("SELECT id FROM users WHERE username = $recp");
        $s = $stmt2->fetch()
        $rid = $s["id"];
    
        // query to be sent
        $q = "INSERT INTO messages(recipient_id, user_id, subject, body) VALUES($sid, $rid,$subj, $body)";
    
        $stmt3 = $conn->quer($q);
    }
}