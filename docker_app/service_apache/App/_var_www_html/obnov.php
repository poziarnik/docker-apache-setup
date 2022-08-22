<html>
<link rel="stylesheet" type="text/css" href="styly.css">
<?php
require ("funkcie.php");

$sql="SELECT slim FROM uzivatel WHERE ip_adresa=\"".$_SERVER['REMOTE_ADDR']."\"";
$vysledok=zisti($sql);
while($row=mysqli_fetch_object($vysledok)) $slim=$row->slim;


if (isset($_GET['obnov'])) {
    if ($slim==1) $sql="UPDATE uzivatel SET slim=0 WHERE ip_adresa=\"".$_SERVER['REMOTE_ADDR']."\"";
    else $sql="UPDATE uzivatel SET slim=1 WHERE ip_adresa=\"".$_SERVER['REMOTE_ADDR']."\"";
}

zisti($sql);

$sql2="SELECT last_url FROM uzivatel WHERE ip_adresa=\"".$_SERVER['REMOTE_ADDR']."\"";
$vysledok2=zisti($sql2);
while($row=mysqli_fetch_object($vysledok2)) $last_url=$row->last_url;
echo "<meta http-equiv=\"Refresh\" Content=\"0; URL=".$last_url.".php?obnov=1\">";
?>
<body name="stupid_body">
</body>
</html>


