<HTML>
<TITLE>Zadaj okruh</TITLE>
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Fade(Duration=0.2)">
<META HTTP-EQUIV="content-type" CONTENT="text/html; charset=utf-8">
<meta http-equiv="cache-control" content="no-cache">
<link rel="stylesheet" href="styly.css">
<style>
table, tr, td { border: 0}
</style>

<BODY>
<FORM NAME='formular' METHOD=post ACTION="zapis_okruh.php">
<TABLE WIDTH="100%" VALIGN="top">
<TR>
  <TD></TD>
  <TD>Nezobrazovať</TD>
</TR>
<TR>
  <TD WIDTH="150"><INPUT NAME="nazov" TYPE="text" SIZE="15" MAXLENGTH="25"></TD>
  <TD><INPUT NAME="zobraz" TYPE="checkbox" VALUE="1"></TD>
</TR>
</TABLE>
<INPUT NAME="odoslat" TYPE="submit" VALUE="Odoslať">
<TABLE WIDTH="100%" VALIGN="top">
<TR>
  <TD></TD>
  <TD>Nezobrazovať</TD>
</TR>
<?PHP
require("funkcie.php");
$sirka="150";
$sql="SELECT * FROM okruhy ORDER BY nazov";
$vysledok=zisti($sql);
$i = 1;
while($row=mysqli_fetch_object($vysledok)) {
  echo "<TR><TD WIDTH=\"$sirka\">".$row->nazov."</TD><TD><INPUT NAME=\"id$i\" TYPE=\"checkbox\" VALUE=\"".$row->id_okr."\"";
  if (!$row->zobraz) {
    echo " CHECKED></TD><TR>";
  } else {
    echo "></TD><TR>";
  }
  $i++;
}

?>
</TABLE>

</FORM>
</BODY>
</HTML>
