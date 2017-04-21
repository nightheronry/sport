<?php
/*
    designed by po-fang hsu in 2015 NCHU Awin Lab
    http://github.com/nightheronry
*/
header('Content-Type: application/json; charset=utf-8');
$servername = "awin.cs.nchu.edu.tw";
$port = "3306";
$username = "root";
$password = "awin";
$dbname = "social_video";

$label1 = $_POST["name"];
$label2 = $_POST["vedio"];
$label3 = $_POST["approach"];
$label4 = $_POST["score"];
$label5 = $_POST["sparktable"];
$label6 = $_POST["ordertable"];
$label7 = $_POST["idcg"];

//echo $label4;
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection
if ($conn->connect_error) {
     echo "bad connection";
     die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8");

$query = "INSERT INTO sparktable (name, vedio, approach , score, sparktable, ordertable, idcg) VALUES ('" . $label1."','" . $label2."','" . $label3."','" . $label4."','" . $label5."','" . $label6."','" . $label7."')";

if ( $conn->query($query) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $query . "<br>" . $conn->error;
}

$conn->close();

?>
