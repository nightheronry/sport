<?php
/*
    designed by po-fang hsu in 2015 NCHU Awin Lab
    http://github.com/nightheronry
*/
$servername = "awin.cs.nchu.edu.tw";
$port = "3306";
$username = "root";
$password = "awin";
$dbname = "social_video";
$label1 = $_POST["hits"];
$label2 = $_POST["mt"];
//printf("%sn",$label1);
//printf("%sn",$label2);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8");

$query = "SELECT semantic_tag, timeserial, timeshift FROM vedio_info WHERE vedio = '" . $label1."';";
$query .= "SELECT semantic_tag, timeserial,  timeshift FROM vedio_info WHERE vedio = '" . $label2."'";

if ($conn->multi_query($query)) {
    $key = "hits";
    do {
        /* store first result set */
        if ($result = $conn->store_result()) {
            while ($row = $result->fetch_row()) {
                $arr[$key] = $row[0];
                $arr[$key. "timeserial"] = $row[1];
                $arr[$key. "timeshift"] = $row[2];
                //printf("%s\n", $row[0]);
            }
            $result->free();
        }
        /* print divider */
        if ($conn->more_results()) {
            $key = "mt";
        }
    } while ($conn->next_result());
}else {
     echo "0 results";
}

$conn->close();
$myfile = fopen($label1, "w") or die("Unable to open file!");
fwrite($myfile, json_encode($arr, JSON_UNESCAPED_UNICODE));
fclose($myfile);
printf("%s", json_encode($arr, JSON_UNESCAPED_UNICODE));
?>
