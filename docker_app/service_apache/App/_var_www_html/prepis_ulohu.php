<?php
$odoslat=$_POST['odoslat'];
$uloha=$_POST['uloha'];
$datum=$_POST['datum'];
$partner=$_POST['partner'];
$zaznam=$_POST['zaznam'];
$riesenie=$_POST['riesenie'];
$plan_vybavenia=$_POST['plan_vybavenia'];
$datum_vybavenia=$_POST['datum_vybavenia'];
$vybavuje=$_POST['vybavuje'];
$zapisal=$_POST['zapisal'];
$cast_dna=$_POST['cast_dna'];
$cas=$_POST['cas'];
$priorita=$_POST['priorita'];
$zmaz=$_POST['zmaz'];
$iteracie=$_POST['iteracie'];

switch ($odoslat) {
  case "Ďalší okruh":
    echo "<meta http-equiv=\"Refresh\" Content=\"0; URL=uprav_ulohu.php?uloha=$uloha\">";

echo "<meta http-equiv=\"Page-Enter\" content=\"progid:DXImageTransform.Microsoft.Fade(Duration=0.2)\">";

    break;
  case "Ulož a zavri":
    echo "<meta http-equiv=\"Refresh\" Content=\"0; URL=obnov.php\">";
    break;
}

require("funkcie.php");



if ($zaznam!="") {
if ($zmaz!="1") {
$datum = chop($datum);
$datum = datumzapis($datum);

if ($riesenie!="") {
   $tmp = 1;
} else {
   $tmp = 0;
}

$riesenie = $tmp;

$plan_vybavenia=datumzapis($plan_vybavenia);
$datum_vybavenia=datumzapis($datum_vybavenia);

if ($cas=="") {
   $cas = "00:00";
} 

$sql = "UPDATE ulohy SET id_ulo=$uloha, datum='$datum', partner=$partner, zaznam='$zaznam', riesenie=$riesenie, plan_vybavenia='$plan_vybavenia', datum_vybavenia='$datum_vybavenia', vybavuje=$vybavuje, zapisal=$zapisal, cast_dna=$cast_dna, cas='$cas', priorita=$priorita WHERE id_ulo=$uloha";
$sql2 = "DELETE FROM okruhy_ulohy WHERE id_ulo=$uloha";
zisti($sql2);
$sqlm = "INSERT INTO okruhy_ulohy VALUES ";
++$iteracie;
for ($i = 1; $i <= $iteracie; ++$i) {
eval("\$okruh$i=\$_POST['okruh$i'];");
eval("\$sql2 = \"$sqlm (\$okruh$i,$uloha);\";");
zisti($sql2);
}

} elseif ($zmaz=="1") {
$sql = "DELETE FROM ulohy WHERE id_ulo=$uloha";
}
zisti($sql);
}

?>
