<html>
<title>Filter</title>
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Fade(Duration=0.2)">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta http-equiv="cache-control" content="no-cache">
<link rel="stylesheet" href="styly.css">
<style>
table, tr, td { border: 0}
</style>

<body>
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
<FORM NAME='Rozsireny_filter' METHOD=post ACTION="rozsirene.php">

<?php
require ("funkcie.php");

$sirka="15%";
$sirka2="5%";
echo "<table width=\"100%\">";
echo "<tr><td>Stav úlohy</td><td>";
echo "<SELECT NAME=\"stav\">";
echo "<OPTION VALUE=\"\"></OPTION>";
echo "<OPTION VALUE=\"nevybavene\" SELECTED>nevybavené</OPTION>";
echo "<OPTION VALUE=\"vybavene\">vybavené</OPTION>";
echo "</SELECT></td></tr>";
//echo "<tr><td width=\"$sirka\">Dátum</td><td><INPUT NAME=\"datum\" TYPE=\"text\" SIZE=\"10\"><img src=\"imgs/cal.gif\" height=\"17\" width=\"17\" border=0 onClick='PopCalendarSK.show(document.all.datum,\"dd.mm.yyyy\");'></td></tr>";
echo "<tr><td width=\"$sirka\">Dátum</td><td width=\"$sirka2\">od:<INPUT NAME=\"datum_od\" TYPE=\"text\" SIZE=\"10\"><img src=\"imgs/cal.gif\" height=\"17\" width=\"17\" border=0 onClick='PopCalendarSK.show(document.all.datum_od,\"dd.mm.yyyy\");'></td><td>do:<INPUT NAME=\"datum_do\" TYPE=\"text\" SIZE=\"10\"><img src=\"imgs/cal.gif\" height=\"17\" width=\"17\" border=0 onClick='PopCalendarSK.show(document.all.datum_do,\"dd.mm.yyyy\");'></td></tr>";

echo "<tr><td width=\"$sirka\">Partner</td><td>";
zoznam2(partneri,partner,meno,id_par,meno);
echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Riešenie</td><td><INPUT NAME=\"riesenie\" TYPE=\"checkbox\" DEFAULT=\"0\"></td></tr>";

echo "<tr><td width=\"$sirka\">Plán vybavenia</td><td width=\"$sirka2\">od:<INPUT NAME=\"plan_vybavenia_od\" TYPE=\"text\" SIZE=\"10\"><img src=\"imgs/cal.gif\" height=\"17\" width=\"17\" border=0 onClick='PopCalendarSK.show(document.all.plan_vybavenia_od,\"dd.mm.yyyy\");'></td><td>do:<INPUT NAME=\"plan_vybavenia_do\" TYPE=\"text\" SIZE=\"10\"><img src=\"imgs/cal.gif\" height=\"17\" width=\"17\" border=0 onClick='PopCalendarSK.show(document.all.plan_vybavenia_do,\"dd.mm.yyyy\");'></td></tr>";
echo "<tr><td width=\"$sirka\">Dátum vybavenia</td><td width=\"$sirka2\">od:<INPUT NAME=\"datum_vybavenia_od\" TYPE=\"text\" SIZE=\"10\"><img src=\"imgs/cal.gif\" height=\"17\" width=\"17\" border=0 onClick='PopCalendarSK.show(document.all.datum_vybavenia_od,\"dd.mm.yyyy\");'></td><td>do:<INPUT NAME=\"datum_vybavenia_do\" TYPE=\"text\" SIZE=\"10\"><img src=\"imgs/cal.gif\" height=\"17\" width=\"17\" border=0 onClick='PopCalendarSK.show(document.all.datum_vybavenia_do,\"dd.mm.yyyy\");'></td></tr>";

echo "<tr><td width=\"$sirka\">Vybavuje</td><td>";
zoznam2(zamestnanci,vybavuje,meno,id_zam,meno);
echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Zapísal</td><td>";
zoznam2(zamestnanci,zapisal,meno,id_zam,meno);
echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Časť dňa</td><td>";
zoznam(cast_dna,cast_dna,cast_dna,id_csd,id_csd,0);
echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Priorita</td><td>";
zoznam7(priority,priorita,nazov,id_pri,id_pri);
echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Čas</td><td><INPUT NAME=\"cas\" TYPE=\"text\" SIZE=\"5\"></td></tr>";
echo "<tr><td width=\"$sirka\">Okruh</td><td>";
zoznam2(okruhy,okruh,nazov,id_okr,nazov);
echo "</td></tr>";

echo "</table>";
?>
<INPUT NAME="odoslat" TYPE="submit" VALUE="Odoslať">
</FORM>
</body>
</html>
