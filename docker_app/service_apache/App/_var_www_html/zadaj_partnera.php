<html>
<title>Zadaj partnera</title>
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Fade(Duration=0.2)">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta http-equiv="cache-control" content="no-cache">
<link rel="stylesheet" href="styly.css">
<style>
table, tr, td { border: 0}
</style>

</html>
<body>
<FORM NAME='Zadaj_Partnera' METHOD=post ACTION="zapis_partnera.php">
<table width="100%" valign="top">
<tr>
  <td width="25%"></td><td width="10%"></td>
  <td>Nezobrazovať</td>
</tr>
<tr>
  <td>Zadajte meno partnera:</td>
  <td><INPUT NAME='meno' TYPE='text'></td><td><INPUT NAME="zobraz" TYPE="checkbox" VALUE="1"></td>
</tr>
<tr>
  <td>Zadajte oblasť, do ktorej partner patrí:</td>
  <td><SELECT NAME="skupina">
<?php
require("funkcie.php");

$sql="SELECT * FROM skupiny";
$vysledok=zisti($sql);
$i = 1;

while($row=mysqli_fetch_object($vysledok)) {
	echo "<OPTION VALUE=\"".$i."\">".$row->oblast."</OPTION>".\n;
	$i++;
}
?>
</SELECT>
</td>
</tr>
</table>
<INPUT NAME="odoslat" TYPE="submit" VALUE="Odoslať"><BR>
<table width="270" valign="top">

<?php


$sirka="170";
echo "<tr><td width=\"$sirka\"></td><td>Nezobrazovať</td></tr>";
$sql="SELECT * FROM partneri ORDER BY meno";
$vysledok=zisti($sql);
$i = 1;
while($row=mysqli_fetch_object($vysledok)) {
  echo "<tr><td width=\"$sirka\">".$row->meno."</td>\n<td><INPUT NAME=\"id$i\" TYPE=\"checkbox\" VALUE=\"".$row->id_par."\"";
  if (!$row->zobraz) {
    echo " CHECKED></td></tr>\n";
  } else {
    echo "></td></tr>\n";
  }
  $i++;
}

/*while($row=mysql_fetch_object($vysledok)) {
	echo "<OPTION VALUE=\"".$i."\">".$row->meno."</OPTION>";
	echo ;
	$i++;
}
*/

?>

</table>
</FORM>
</body>
</html>
