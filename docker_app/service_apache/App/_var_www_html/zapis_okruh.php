<html>
<link rel="stylesheet" type="text/css" href="styly.css">
<meta http-equiv="Refresh" Content="0; URL=zadaj_okruh.php">
<body>
<?php
require("funkcie.php");

$sql = "UPDATE okruhy SET zobraz=1";
zisti($sql);

$sql = "SELECT * FROM okruhy";
$vysledok = zisti($sql);
$pocet = mysqli_num_rows($vysledok);
for ($i=1;$i<=$pocet;$i++) {
  eval("\$id$i = \$_POST['id$i'];");
  eval("\$id$i' == \$'\$' ? \$tmp=1 : \$tmp=0;");
  if (!$tmp) {
    eval("\$ttmp = \$id$i;");
    $sql = "UPDATE okruhy SET zobraz=0 WHERE id_okr=$ttmp";
    zisti($sql);
  }

}

if ($_POST['nazov'] != "") {
  $_POST['zobraz'] == 1 ? $zobraz=0 : $zobraz=1;
  $sql="INSERT INTO okruhy VALUES (NULL, '".$_POST['nazov']."',$zobraz)";
  zisti($sql);
}
?>
</body>
</html>
