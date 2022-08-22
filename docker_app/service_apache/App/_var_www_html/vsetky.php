<html>
<title>Všetky úlohy</title>
<link rel="stylesheet" type="text/css" href="styly.css">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<body>
<?php
require ("funkcie.php");

$sql = "select * from ulohy,cast_dna,priority,partneri where ulohy.cast_dna=cast_dna.id_csd and ulohy.priorita=priority.id_pri and ulohy.partner=partneri.id_par ORDER BY partneri.meno,ulohy.priorita,ulohy.datum";


$sql2="SELECT slim FROM uzivatel WHERE ip_adresa=\"".$_SERVER['REMOTE_ADDR']."\"";
$vysledok2=zisti($sql2);
while($row = mysqli_fetch_object($vysledok2)) $slim=$row->slim;

tabulka_vybavene(zisti($sql),$slim);
?>
</body>
</html>
