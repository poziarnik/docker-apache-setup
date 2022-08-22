<html>
<title>Zadaj úlohu</title>
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Fade(Duration=0.2)">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta http-equiv="cache-control" content="no-cache">
<link rel="stylesheet" href="styly.css">
<style>
table, tr, td { border: 0}
</style>

<body bgcolor="#f4f2be">
<script language='javascript' src='datepicker/popcalendar.js'></script>
<SCRIPT LANGUAGE="javascript">
   PopCalendarSK = PopCalendar.newCalendar()
   PopCalendarSK.language = 3 // 0 - Spanish; 1 - English; 2 - German; 3 - Slovak
   PopCalendarSK.addCarnival = 0 // 0 - don't Add; 1- Add to Holiday (Tuesday of Carnival)
   PopCalendarSK.showWeekNumber = 0 // 0 - don't show; 1 - show
   PopCalendarSK.fade = .5 // 0 - don't fade; .1 to 1 - fade (Only IE) 
   PopCalendarSK.shadow = 1 // 0  - don't shadow, 1 - shadow
   PopCalendarSK.move = 1 // 0  - don't move, 1 - move (Only IE)
   PopCalendarSK.saveMovePos = 1  // 0  - don't save, 1 - save
   PopCalendarSK.keepInside = 0 // 0 - don't keep inside, 1 - keep inside (Only IE)
   PopCalendarSK.initCalendar()
</SCRIPT>
<FORM NAME='Prepis_Ulohu' METHOD=post ACTION="prepis_ulohu.php">

<?php
require ("funkcie.php");
$uloha=$_GET["uloha"];
$sql="SELECT * FROM ulohy WHERE id_ulo=$uloha";
$vysledok = zisti($sql);
$row = mysqli_fetch_object($vysledok);

$sirka="15%";
echo "<table width=\"100%\">";
echo "<tr><td width=\"$sirka\">Dátum</td><td><INPUT NAME=\"datum\" TYPE=\"text\" SIZE=\"10\" VALUE=\"".datumddmmyy($row->datum)."\"><img src=\"imgs/cal.gif\" height=\"17\" width=\"17\" border=0 onClick='PopCalendarSK.show(document.all.datum,\"dd.mm.yyyy\");'>";

echo "<tr><td width=\"$sirka\">Partner</td><td>";
zoznam(partneri,partner,meno,id_par,meno,$row->partner);

echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Úloha</td><td><TEXTAREA NAME=\"zaznam\" ROWS=\"8\" COLS=\"".(100-$sirka)."\">".$row->zaznam."</TEXTAREA></td></tr>";
echo "<tr><td width=\"$sirka\">Riešenie</td><td><INPUT NAME=\"riesenie\" TYPE=\"checkbox\" DEFAULT=\"1\" VALUE=\"".$row->riesenie."\"";
if ($row->riesenie == "1"){
echo " CHECKED";
}
echo "></td></tr>";
echo "<tr><td width=\"$sirka\">Zapisal</td><td>";
zoznam(zamestnanci,zapisal,meno,id_zam,meno,$row->zapisal);
echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Vybavuje</td><td>";
zoznam6(zamestnanci,vybavuje,meno,id_zam,meno,$row->vybavuje);
echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Priorita</td><td>";
zoznam(priority,priorita,nazov,id_pri,id_pri,$row->priorita);
echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Plán vybavenia</td><td><INPUT NAME=\"plan_vybavenia\" TYPE=\"text\" SIZE=\"10\" VALUE=\"".datumddmmyy($row->plan_vybavenia)."\"><img src=\"imgs/cal.gif\" height=\"17\" width=\"17\" border=0 onClick='PopCalendarSK.show(document.all.plan_vybavenia,\"dd.mm.yyyy\");'></td></tr>";
echo "<tr><td width=\"$sirka\">Čas</td><td><INPUT NAME=\"cas\" TYPE=\"text\" SIZE=\"5\" VALUE=\"".hodiny($row->cas)."\"></td></tr>";
echo "<tr><td width=\"$sirka\">Časť dňa</td><td>";
zoznam(cast_dna,cast_dna,cast_dna,id_csd,id_csd,$row->cast_dna);
echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Dátum vybavenia</td><td><INPUT NAME=\"datum_vybavenia\" TYPE=\"text\" SIZE=\"10\"
VALUE=\"".datumddmmyy($row->datum_vybavenia)."\"><img src=\"imgs/cal.gif\" height=\"17\" width=\"17\" border=0 onClick='PopCalendarSK.show(document.all.datum_vybavenia,\"dd.mm.yyyy\");'></td></tr>";

echo "<INPUT NAME=\"uloha\" TYPE=\"hidden\" VALUE=\"$uloha\">";
echo "<td width=\"$sirka\"><b>Zmazať záznam</b></td><td><INPUT NAME=\"zmaz\" TYPE=\"checkbox\"   VALUE=\"1\"></td></tr>";

$vysledok = zisti("SELECT * FROM okruhy_ulohy WHERE id_ulo=$uloha");
$iteracie = mysqli_num_rows($vysledok);
echo "<INPUT NAME=\"iteracie\" TYPE=\"hidden\" VALUE=\"$iteracie\">";
for ($i = 0; $i <= $iteracie; ++$i) {
$row=mysqli_fetch_object($vysledok);
echo "<tr><td width=\"$sirka\">Okruh ".($i+1)."</td><td>";
if ($i == $iteracie) {
  zoznam3(okruhy,"okruh".($i+1),nazov,id_okr,nazov,0);
} else {
  zoznam3(okruhy,"okruh".($i+1),nazov,id_okr,nazov,$row->id_okr);
}
echo "</td></tr>";
}
echo "</table>";
?>
<INPUT NAME="odoslat" TYPE="submit" VALUE="Ďalší okruh">
<INPUT NAME="odoslat" TYPE="submit" VALUE="Ulož a zavri">
</FORM>
</body>
</html>
