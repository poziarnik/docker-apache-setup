<?php
mysqli_connect('127.0.0.1','shsystem') or die (mysqli_error());
echo "Connected to MySQL server";

mysqli_select_db("ulohy") or die (mysqli_error());
echo "Connected to Database";

$tmp=mysqli_connect("127.0.0.1");
if (!$tmp) {
   die('Could not connect: ' . mysqli_error($tmp));
}
echo "Vsetko v poriadku";
?>