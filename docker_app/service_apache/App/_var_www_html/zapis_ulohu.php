<html>

<?php
$odoslat = $_POST['odoslat'];
$uloha = $_POST['uloha'];
$datum = $_POST['datum'];
$partner = $_POST['partner'];
$zaznam = $_POST['zaznam'];
$riesenie = $_POST['riesenie'];
$plan_vybavenia = $_POST['plan_vybavenia'];
$datum_vybavenia = $_POST['datum_vybavenia'];
$vybavuje = $_POST['vybavuje'];
$zapisal = $_POST['zapisal'];
$cast_dna = $_POST['cast_dna'];
$cas = $_POST['cas'];
$priorita = $_POST['priorita'];
$zmaz = $_POST['zmaz'];
$iteracie = $_POST['iteracie'];

require("funkcie.php");

if ($zaznam != "" or $partner != "") {
   $datum = chop($datum);
   $datum = datumzapis($datum);

   if ($riesenie == "on") {
      $tmp = 1;
   } else {
      $tmp = 0;
   }
   $riesenie = $tmp;

   $plan_vybavenia = datumzapis($plan_vybavenia);
   $datum_vybavenia = datumzapis($datum_vybavenia);

   if ($cas == "") {
      $cas = "00:00";
   }

   if ($zaznam == "") {
      $zaznam = "Nezadaná úloha";
   }

   $sql = "INSERT INTO ulohy VALUES (NULL,'$datum',$partner,'$zaznam',$riesenie,'$plan_vybavenia','$datum_vybavenia',$vybavuje,$zapisal,$cast_dna,'$cas',$priorita)";
   zisti($sql);
   switch ($odoslat) {
      case "Pridať okruh":
         echo "<meta http-equiv=\"Refresh\" Content=\"0; URL=uprav_ulohu.php?uloha=$zapisane_id\">";
         break;
      case "Ulož a zavri":
         echo "<meta http-equiv=\"Refresh\" Content=\"0; URL=obnov.php\">";
         break;
   }
}

?>

</html>