<html>
<title>Zadaj úlohu</title>
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
<FORM NAME='Zadaj_Ulohu' METHOD=post ACTION="zapis_ulohu.php">
<table width="100%" valign="top">
<?php
$sirka="15%";
echo "<tr><td width=\"$sirka\">Dátum</td><td><INPUT NAME=\"datum\" TYPE=\"text\" SIZE=\"10\" VALUE=\"";
$dnes = getdate();
echo $dnes["mday"].".".$dnes["mon"].".".$dnes["year"]."\">&nbsp;<img src=\"imgs/cal.gif\" height=\"17\" width=\"17\" border=0 onClick='PopCalendarSK.show(document.all.datum,\"dd.mm.yyyy\");'></td></tr>\n";


require ("funkcie.php");

$pripojenie = mysqli_connect("localhost","Korbi","wyBCewKk28kammg");
echo "<tr><td width=\"$sirka\">Partner</td><td>";
zoznam5("partneri","partner","meno","id_par","meno",0);
echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Úloha</td><td><TEXTAREA NAME=\"zaznam\" ROWS=\"8\" COLS=\"".(100-$sirka)."\"></TEXTAREA></td></tr>\n";
echo "<tr><td width=\"$sirka\">Riešenie</td><td><INPUT NAME=\"riesenie\" TYPE=\"checkbox\" DEFAULT=\"0\"></td></tr>\n";
echo "<tr><td width=\"$sirka\">Zapisal</td><td>";
switch ($_SERVER['REMOTE_ADDR']) {
  case "192.168.77.2":
    $who=2;
    break;
  case "192.168.77.6":
    $who=10;
    break;
  case "192.168.77.5":
    $who=3;
    break;
  case "192.168.77.3":
    $who=1;
    break;
  case "192.168.77.9":
    $who=4;
    break;
  default:
    $who=2;
}
zoznam6("zamestnanci","zapisal","meno","id_zam","meno",$who);
echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Vybavuje</td><td>";
zoznam6("zamestnanci","vybavuje","meno","id_zam","meno",9);
echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Priorita</td><td>";
zoznam("priority","priorita","nazov","id_pri","id_pri",0);
echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Plán vybavenia</td><td><INPUT NAME=\"plan_vybavenia\" TYPE=\"text\" SIZE=\"10\">&nbsp;<img src=\"imgs/cal.gif\" height=\"17\" width=\"17\" border=0 onClick='PopCalendarSK.show(document.all.plan_vybavenia,\"dd.mm.yyyy\");'></td></tr>\n";
echo "<tr><td width=\"$sirka\">Čas</td><td><INPUT NAME=\"cas\" TYPE=\"text\" SIZE=\"5\"></td></tr>";
echo "<tr><td width=\"$sirka\">Časť dňa</td><td>";
zoznam("cast_dna","cast_dna","cast_dna","id_csd","id_csd",0);
echo "</td></tr>";
echo "<tr><td width=\"$sirka\">Dátum vybavenia</td><td><INPUT NAME=\"datum_vybavenia\" TYPE=\"text\" SIZE=\"10\">&nbsp;<img src=\"imgs/cal.gif\" height=\"17\" width=\"17\" border=0 onClick='PopCalendarSK.show(document.all.datum_vybavenia,\"dd.mm.yyyy\");'></td></tr>\n";

echo "</table>";
mysqli_close($pripojenie);

?>

<INPUT NAME="odoslat" TYPE="submit" VALUE="Pridať okruh">
<INPUT NAME="odoslat" TYPE="submit" VALUE="Ulož a zavri">
</FORM>
</body>
</html>
