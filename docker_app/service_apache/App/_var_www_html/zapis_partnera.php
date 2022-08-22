<html>
<meta http-equiv="Refresh" Content="0; URL=zadaj_partnera.php">
<?php
require("funkcie.php");

$sql = "UPDATE partneri SET zobraz=1";
zisti($sql);

$sql = "SELECT * FROM partneri";
$vysledok = zisti($sql);
$pocet = mysqli_num_rows($vysledok);

for ($i=1;$i<=$pocet;$i++) {
  $row=mysqli_fetch_object($vysledok);
  eval("\$id$i = \$_POST['id$i'];");
  eval("\$id$i == \"\" ? \$tmp=1 : \$tmp=0;");
  if (!$tmp) {
    eval("\$ttmp = \$id$i;");
    $sql = "UPDATE partneri SET zobraz=0 WHERE id_par=$ttmp";
    zisti($sql);
  }
}

if ( $_POST['meno'] != "" ) {
  $_POST['zobraz'] == "" ? $zobraz = 1 : $zobraz = 0;
  $sql = "INSERT INTO partneri VALUES (NULL, '".$_POST['meno']."',".$_POST['skupina'].",".$zobraz.")";
  zisti($sql);
}
?>
</html>
