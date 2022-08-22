<html>
<title>Vybavené úlohy</title>
<link rel="stylesheet" type="text/css" href="styly.css">
<link rel="stylesheet" type="text/css" href="styly_tlac.css" media=print>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<body>
<?php
require ("funkcie.php");

$filter=$_GET['filter'];
$ktory=$_GET['ktory'];
if (isset($_GET['filter'])) {
    if ($filter=="vybavuje" and ($ktory==3 or $ktory==1) ) {
      $podmienka = "($filter=$ktory or vybavuje=9) and";
    } else {
      $podmienka = "$filter=$ktory and";
    }
}

$podmienka = "$podmienka datum_vybavenia>\"0000-00-00\"";

if(isset($zorad)) {
$sql = "select * from ulohy,cast_dna,priority,partneri where $podmienka and ulohy.cast_dna=cast_dna.id_csd and ulohy.priorita=priority.id_pri and ulohy.partner=partneri.id_par ORDER BY $zorad, datum DESC,partneri.meno,ulohy.priorita";
} else {
$sql = "select * from ulohy,cast_dna,priority,partneri where $podmienka and ulohy.cast_dna=cast_dna.id_csd and ulohy.priorita=priority.id_pri and ulohy.partner=partneri.id_par ORDER BY datum DESC, partneri.meno,ulohy.priorita";
}

$sql2="SELECT slim FROM uzivatel WHERE ip_adresa=\"".$_SERVER['REMOTE_ADDR']."\"";
$vysledok2=zisti($sql2);
while($row=mysqli_fetch_object($vysledok2)) $slim=$row->slim;

if (isset($_GET['obnov'])) {
    $sql2="SELECT last_sql FROM uzivatel WHERE ip_adresa=\"".$_SERVER['REMOTE_ADDR']."\"";
    $vysledok2=zisti($sql2);
    while($row=mysqli_fetch_object($vysledok2)) $sql=$row->last_sql;
}

last_sql($sql);
last_url("vybavene");
tabulka_vybavene(zisti($sql),$slim);

?>
</body>
</html>
