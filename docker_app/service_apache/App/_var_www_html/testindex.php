<?php
$db_link = mysqli_connect("db","Korbi","wyBCewKk28kammg");
if (!$db_link) {
	echo "bad luck";
	die('Could not connect: ' . mysqli_error());
}
else{
	echo "we are in";
}
 ?>
