<html>
<title>Rozšírený filter</title>
<link rel="stylesheet" href="styly.css">
<link rel="stylesheet" href="styly_tlac.css" media="print">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Fade(Duration=0.2)">
<meta http-equiv="cache-control" content="no-cache">
<!--
<style>
table, tr, td { border: 0}
</style>
-->

<body>
<?php
$stav=$_POST['stav'];
$uloha=$_POST['uloha'];
$datum_od=$_POST['datum_od'];
$datum_do=$_POST['datum_do'];
$partner=$_POST['partner'];
$zaznam=$_POST['zaznam'];
$riesenie=$_POST['riesenie'];
$plan_vybavenia_od=$_POST['plan_vybavenia_od'];
$datum_vybavenia_od=$_POST['datum_vybavenia_od'];
$plan_vybavenia_do=$_POST['plan_vybavenia_do'];
$datum_vybavenia_do=$_POST['datum_vybavenia_do'];
$vybavuje=$_POST['vybavuje'];
$zapisal=$_POST['zapisal'];
$cast_dna=$_POST['cast_dna'];
$cas=$_POST['cas'];
$priorita=$_POST['priorita'];
$okruh=$_POST['okruh'];

require("funkcie.php");

if (isset($cast_dna) && ($cast_dna!="")) {
  $podmienka = $podmienka." and ulohy.cast_dna=$cast_dna";
}

if (isset($stav) && ($stav!="")) {
switch ($stav) {
  case "nevybavene":
    $podmienka = " and datum_vybavenia=\"0000-00-00\"";
    break;
  case "vybavene":
    $podmienka = " and datum_vybavenia>\"0000-00-00\"";
    break;
  }
}

if ((isset($_POST['datum_od']) && ($datum_od!="")) || (isset($_POST['datum_do']) && ($datum_do!=""))) {
  if (empty($datum_od)) {
     $datum_od = "01.01.1980";
  }
  if (empty($datum_do)) {
     $datum_do = date("d.m.y");
  }
  $podmienka = $podmienka." and ulohy.datum>=\"".datumzapis($datum_od)."\" and ulohy.datum<=\"".datumzapis($datum_do)."\"";
}

/*

if (isset($datum) && ($datum!="")) {
  $podmienka = $podmienka." and ulohy.datum=\"".datumzapis($datum)."\"";
}
*/


if (isset($partner) && ($partner!="")) {
  $podmienka = $podmienka." and ulohy.partner=$partner";
}

if (isset($riesenie)) {
  $podmienka = $podmienka." and ulohy.riesenie=1 ";
}

if ((isset($_POST['plan_vybavenia_od']) && ($plan_vybavenia_od!="")) || (isset($_POST['plan_vybavenia_do']) && ($plan_vybavenia_do!=""))) {
  if (empty($plan_vybavenia_od)) {
     $plan_vybavenia_od = "01.01.1980";
  }
  if (empty($plan_vybavenia_do)) {
     $plan_vybavenia_do = date("d.m.y");
  }
  $podmienka = $podmienka." and ulohy.plan_vybavenia>=\"".datumzapis($plan_vybavenia_od)."\" and ulohy.plan_vybavenia<=\"".datumzapis($plan_vybavenia_do)."\"";
}

if ((isset($_POST['datum_vybavenia_od']) && ($datum_vybavenia_od!="")) || (isset($_POST['datum_vybavenia_do']) && ($datum_vybavenia_do!=""))) {
  if (empty($datum_vybavenia_od)) {
     $datum_vybavenia_od = "01.01.1980";
  }
  if (empty($datum_vybavenia_do)) {
     $datum_vybavenia_do = date("d.m.y");
  }
  $podmienka = $podmienka." and ulohy.datum_vybavenia>=\"".datumzapis($datum_vybavenia_od)."\" and ulohy.datum_vybavenia<=\"".datumzapis($datum_vybavenia_do)."\"";
}

if (isset($vybavuje) && ($vybavuje!="")) {
  $podmienka = $podmienka." and ulohy.vybavuje=$vybavuje";
}

if (isset($zapisal) && ($zapisal!="")) {
  $podmienka = $podmienka." and ulohy.zapisal=$zapisal";
}

if (isset($priorita) && ($priorita!="")) {
  $i=1;
  foreach ($priorita as $prio) {
    if ($i==1) $podmienka = $podmienka." and (ulohy.priorita=$prio";
    else $podmienka = $podmienka." or ulohy.priorita=$prio";
    $i++;
  }
  $podmienka = $podmienka.")";
}

if (isset($okruh) && ($okruh!="")) {
  $podmienka = $podmienka." and okruhy_ulohy.id_okr=$okruh";
  $sql = "SELECT * FROM ulohy,cast_dna,priority,partneri,okruhy_ulohy WHERE ulohy.cast_dna=cast_dna.id_csd and ulohy.priorita=priority.id_pri and ulohy.partner=partneri.id_par and okruhy_ulohy.id_ulo=ulohy.id_ulo $podmienka ORDER BY ulohy.datum DESC, partneri.meno, ulohy.priorita";
} else {
  $sql = "SELECT * FROM ulohy,cast_dna,priority,partneri WHERE ulohy.cast_dna=cast_dna.id_csd and ulohy.priorita=priority.id_pri and ulohy.partner=partneri.id_par $podmienka ORDER BY ulohy.datum DESC, partneri.meno, ulohy.priorita";
}

$sql2="SELECT slim FROM uzivatel WHERE ip_adresa=\"".$_SERVER['REMOTE_ADDR']."\"";
$vysledok2=zisti($sql2);
while($row=mysqli_fetch_object($vysledok2)) $slim=$row->slim;

last_sql($sql);

switch ($stav) {
  case "nevybavene":
    tabulka_nevybavene(zisti($sql),$slim);
    break;
  default:
    tabulka_vybavene(zisti($sql),$slim);
}
?>
</body>
</html>
