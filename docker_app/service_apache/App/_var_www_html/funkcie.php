<?php
$MYSQL_HOST = "db";						//docker
$MYSQL_USER = "Korbi";
$MYSQL_PASSWORD = "wyBCewKk28kammg";

//$MYSQL_HOST = "localhost";			//xampp
//$MYSQL_USER = "Korbi";
//$MYSQL_PASSWORD = "wyBCewKk28kammg";

function datumddmmyy($vstup) {
  if ($vstup == "0000-00-00") {
    $tmp = "";
  } else {
    $tmp = explode("-",$vstup);
    return $tmp[2].".".$tmp[1].".".$tmp[0];
  }
}

function datumzapis($datum) {
  if ($datum=="") {
    $datum = "0000-00-00";
  } elseif (strlen($datum)!=6) {
    $tmp = explode(".",$datum);
    if (strlen($tmp[2])==2) {
      $tmp[2] = "20".$tmp[2];
    }
    $datum = $tmp[2]."-".$tmp[1]."-".$tmp[0];
  } else {
    $datum = "20".substr($datum,-2)."-".substr($datum,2,2)."-".substr($datum,0,2);
  }
  return $datum;
}

function nahrad($cislo,$tabulka,$stlpec,$id) {
	#$tmp = mysql_db_query("ulohy","select $stlpec from $tabulka where $id=$cislo");
   $sql = "select $stlpec from $tabulka where $id=$cislo";
   $table = zisti($sql);
   $tmp1 = mysqli_fetch_object($table);
   return $tmp1->$stlpec;
}

function hodiny($cas) {
   if ($cas=="00:00:00") {
     $cas="";
   }
   return substr($cas,0,strrpos($cas,":"));
}

function zoznam($dbf,$ciel,$stlpec,$id,$zorad,$predvolene) {
	#$vysledok=mysql_db_query("ulohy","SELECT * FROM $dbf ORDER BY $zorad");
	$sql="SELECT * FROM $dbf ORDER BY $zorad";
	$vysledok=zisti($sql);


	echo "<SELECT NAME=\"$ciel\">";
	echo $vysledok;
	$i=1;
	while($row=mysqli_fetch_object($vysledok)) {
		echo "<OPTION VALUE=\"".$row->$id."\" ";
		if ($predvolene>0) {
		  if ($row->$id==$predvolene) {
		    echo "SELECTED";
		  }
		} elseif ($i==1) {
		    echo "SELECTED";
		}
		echo ">".$row->$stlpec."</OPTION>";
		$i++;
	}
	echo "</SELECT><BR>";
}

function zoznam2($dbf,$ciel,$stlpec,$id,$zorad) {
#$vysledok=mysql_db_query("ulohy","SELECT * FROM $dbf ORDER BY $zorad");
$sql="SELECT * FROM $dbf ORDER BY $zorad";
$vysledok=zisti($sql);


echo "<SELECT NAME=\"$ciel\">";
echo "<OPTION VALUE=\"\"></OPTION>";

$i=1;
while($row=mysqli_fetch_object($vysledok)) {
	echo "<OPTION VALUE=\"".$row->$id."\">".$row->$stlpec."</OPTION>";
	$i++;
}
echo "</SELECT><BR>";
}

function zoznam3($dbf,$ciel,$stlpec,$id,$zorad,$predvolene) {

	#$vysledok=mysql_db_query("ulohy","SELECT * FROM $dbf WHERE $dbf.zobraz=1 ORDER BY $zorad");

	$sql="SELECT * FROM $dbf WHERE $dbf.zobraz=1 ORDER BY $zorad";
	$vysledok=zisti($sql);


	echo "<SELECT NAME=\"$ciel\">";
	echo "<OPTION VALUE=\"\"";
	if ($predvolene==0) {
	echo "SELECTED";
	}
	echo "></OPTION>";
	while($row=mysqli_fetch_object($vysledok)) {
	  echo "<OPTION VALUE=\"".$row->$id."\" ";
	    if ($row->$id==$predvolene) {echo "SELECTED";}
	    echo ">".$row->$stlpec."</OPTION>";
	}
	echo "</SELECT><BR>";
}

function zoznam4($dbf,$ciel,$stlpec,$id,$zorad) {
	#$vysledok=mysql_db_query("ulohy","SELECT * FROM $dbf WHERE $dbf.zobraz=1 ORDER BY $zorad");

	$sql="SELECT * FROM $dbf WHERE $dbf.zobraz=1 ORDER BY $zorad";
	$vysledok=zisti($sql);


	echo "<SELECT NAME=\"$ciel\">";
	$i=0;
	while($row=mysqli_fetch_object($vysledok)) {
	  $i++;
	  echo "<OPTION VALUE=\"".$row->$id."\" ";
	    if ($i==1) {echo "SELECTED";}
	    echo ">".$row->$stlpec."</OPTION>";
	}
	echo "</SELECT><BR>";
}

function zoznam5($dbf,$ciel,$stlpec,$id,$zorad) {
	#$vysledok=mysql_db_query("ulohy","SELECT * FROM $dbf WHERE $dbf.zobraz=1 ORDER BY $zorad");

	$sql="SELECT * FROM $dbf WHERE $dbf.zobraz=1 ORDER BY $zorad";
	$vysledok=zisti($sql);


	echo "<SELECT NAME=\"$ciel\">";
	echo "<OPTION VALUE=\"\"></OPTION>";

	$i=1;
	while($row=mysqli_fetch_object($vysledok)) {
		echo "<OPTION VALUE=\"".$row->$id."\">".$row->$stlpec."</OPTION>";
		$i++;
	}
	echo "</SELECT><BR>";
}

function zoznam6($dbf,$ciel,$stlpec,$id,$zorad,$predvolene) {
	#$vysledok=mysql_db_query("ulohy","SELECT * FROM $dbf WHERE $dbf.zobraz=1 ORDER BY $zorad");

	$sql="SELECT * FROM $dbf WHERE $dbf.zobraz=1 ORDER BY $zorad";
	$vysledok=zisti($sql);


	echo "<SELECT NAME=\"$ciel\">";

	$i=1;
	while($row=mysqli_fetch_object($vysledok)) {
		echo "<OPTION VALUE=\"".$row->$id."\" ";
		if ($predvolene>0) {
		  if ($row->$id==$predvolene) {
		    echo "SELECTED";
		  }
		} elseif ($i==1) {
		    echo "SELECTED";
		}
		echo ">".$row->$stlpec."</OPTION>";
		$i++;
	}
	echo "</SELECT><BR>";
}

function zoznam7($dbf,$ciel,$stlpec,$id,$zorad) {
	#$vysledok=mysql_db_query("ulohy","SELECT * FROM $dbf ORDER BY $zorad");
	$sql="SELECT * FROM $dbf ORDER BY $zorad";
	$vysledok=zisti($sql);

	echo "<SELECT SIZE=5 NAME=\"".$ciel."[]\" MULTIPLE=\"MULTIPLE\">";

	$i=1;

	while($row=mysqli_fetch_object($vysledok)) {
		echo "<OPTION VALUE=\"".$row->$id."\">".$row->$stlpec."</OPTION>";
		$i++;
	    }
	echo "</SELECT><BR>";
}

function tabulka_vybavene($vysledok,$slim) {
	echo "Počet záznamov: ".mysqli_num_rows($vysledok)."<BR>\n";
	echo "<table width=\"100%\" data-test=\"table-tasks\">";
	echo "<th><a href=\"vybavene.php?zorad=datum\">Dátum</a></th>
	<th><a href=\"vybavene.php?zorad=partneri.meno\">Partner</a></th>
	<th>Úloha</th>
	<th><a href=\"vybavene.php?zorad=plan_vybavenia\">Plán<BR>vybavenia</a></th>
	<th><a href=\"vybavene.php?zorad=datum_vybavenia\">Dátum<BR>vybavenia</a></th>
	<th><a href=\"vybavene.php?zorad=vybavuje\">Vybavil</a></th>
	<th><a href=\"vybavene.php?zorad=cast_dna\">Časť dňa</a></th>
	<th><a href=\"vybavene.php?zorad=cas\">Čas</a></th>";

	while($row = mysqli_fetch_object($vysledok)) {
		
		echo "<tr valign=\"top\" bgcolor=".$row->farba_rgb.">";
		echo "<td width=\"70\">".datumddmmyy($row->datum)."</td>";
		if ($slim == 1) {
		    echo "<td width=\"120\"><a href=\"vybavene.php?filter=partner&ktory=".$row->partner."\" title=\"".$row->meno."\">".substr($row->meno,0,15)."</a></td>";
		    echo "<td><a href=\"uprav_ulohu.php?uloha=".$row->id_ulo."\" title=\"".$row->zaznam."\">".substr(strtok($row->zaznam,"\n"),0,80)."</a></td>";
		} 
		else {
		    echo "<td width=\"70\"><a href=\"vybavene.php?filter=partner&ktory=".$row->partner."\">".$row->meno."</a></td>";
		    echo "<td><a href=\"uprav_ulohu.php?uloha=".$row->id_ulo."\">".nl2br($row->zaznam)."</a></td>";
		}
		echo "<td width=\"15\">".datumddmmyy($row->plan_vybavenia)."</td>";
		echo "<td width=\"15\">".datumddmmyy($row->datum_vybavenia)."</td>";
		//echo "<td width=\"100\"><a href=\"vybavene.php?filter=vybavuje&ktory=".$row->vybavuje."\">".nahrad($row->vybavuje,"zamestnanci",$row->meno,$row->id_zam)."</a></td>";
		
		echo "<td width=\"70\">".$row->cast_dna."</td>";
		echo "<td width=\"15\">".hodiny($row->cas)."</td>";
	}
	echo "</table><BR>";
}

function tlac_vybavene($vysledok) {
	echo "<table border width=\"100%\">";
	echo "<th><a href=\"tlacv.php?zorad=datum\">Dátum</a></th>
	<th><a href=\"tlacv.php?zorad=partneri.meno\">Partner</a></th>
	<th>Úloha</th>
	<th><a href=\"tlacv.php?zorad=plan_vybavenia\">Plán<BR>vybavenia</a></th>
	<th><a href=\"tlacv.php?zorad=datum_vybavenia\">Dátum<BR>vybavenia</a></th>
	<th><a href=\"tlacv.php?zorad=vybavuje\">Vybavil</a></th>
	<th><a href=\"tlacv.php?zorad=cast_dna\">Časť dňa</a></th>
	<th><a href=\"tlacv.php?zorad=cas\">Čas</a></th>";
	
	while($row = mysqli_fetch_object($vysledok)) {
		echo "<tr valign=\"top\">";
		echo "<td width=\"70\">".datumddmmyy($row->datum)."</td>";
		echo "<td width=\"70\"><a href=\"tlacv.php?filter=partner&ktory=".$row->partner."\" title=\"".$row->meno."\">".substr($row->meno,0,15).">".$row->meno."</a></td>";
		echo "<td>".nl2br($row->zaznam)."</td>";
		echo "<td width=\"15\">".datumddmmyy($row->plan_vybavenia)."</td>";
		echo "<td width=\"15\">".datumddmmyy($row->datum_vybavenia)."</td>";
		echo "<td width=\"100\"><a href=\"tlacv.php?filter=vybavuje&ktory=".$row->vybavuje."\">".nahrad($row->vybavuje,zamestnanci,meno,id_zam)."</a></td>";
		echo "<td width=\"15\">".$row->cast_dna."</td>";
		echo "<td width=\"15\">".hodiny($row->cas)."</td>";
	}
	echo "</table><BR>";
}

function tabulka_nevybavene($vysledok,$slim) {
	echo "Počet záznamov: ".mysqli_num_rows($vysledok)."<BR>\n";
	echo "<table width=\"100%\">";
	echo "<th><a href=\"nevybavene.php?zorad=datum\">Dátum</a></th>
	<th><a href=\"nevybavene.php?zorad=partneri.meno\">Partner</a></th>
	<th>Úloha</th>
	<th><a href=\"nevybavene.php?zorad=plan_vybavenia\">Plán<BR>vybavenia</a></th>
	<th><a href=\"nevybavene.php?zorad=vybavuje\">Vybavuje</a></th>
	<th><a href=\"nevybavene.php?zorad=cast_dna\">Časť dňa</a></th>
	<th><a href=\"nevybavene.php?zorad=cas\">Čas</a></th>";
	while($row=mysqli_fetch_object($vysledok)) {
		echo "<tr valign=\"top\" bgcolor=".$row->farba_rgb.">";
		echo "<td width=\"70\">".datumddmmyy($row->datum)."</td>";
		if ($slim==1) {
		    echo "<td width=\"120\"><a href=\"nevybavene.php?filter=partner&ktory=".$row->partner."\" title=\"".$row->meno."\">".substr($row->meno,0,15)."</a></td>";
		    echo "<td><a href=\"uprav_ulohu.php?uloha=".$row->id_ulo."\" title=\"".$row->zaznam."\">".substr(strtok($row->zaznam,"\n"),0,80)."</a></td>";
		} else {
		    echo "<td width=\"70\"><a href=\"nevybavene.php?filter=partner&ktory=".$row->partner."\">".$row->meno."</a></td>";
		    echo "<td><a href=\"uprav_ulohu.php?uloha=".$row->id_ulo."\">".nl2br($row->zaznam)."</a></td>";
		}    
		echo "<td width=\"15\">".datumddmmyy($row->plan_vybavenia)."</td>";
		echo "<td width=\"100\"><a href=\"nevybavene.php?filter=vybavuje&ktory=".$row->vybavuje."\">".nahrad($row->vybavuje,zamestnanci,meno,id_zam)."</a></td>";
		echo "<td width=\"70\">".$row->cast_dna."</td>";
		echo "<td width=\"15\">".hodiny($row->cas)."</td>";
	}
	echo "</table><BR>";
}

function tlac_nevybavene($vysledok) {
	echo "<table border=1 rules=groups frame=hsides width=\"100%\">";
	echo "<thead><th><a href=\"tlacn.php?zorad=datum\">Dátum</a></th>
	<th><a href=\"tlacn.php?zorad=partneri.meno\">Partner</a></th>
	<th>Úloha</th>
	<th><a href=\"tlacn.php?zorad=plan_vybavenia\">Plán<BR>vybavenia</a></th>
	<th><a href=\"tlacn.php?zorad=vybavuje\">Vybavuje</a></th>
	<th><a href=\"tlacn.php?zorad=cast_dna\">Časť dňa</a></th>
	<th><a href=\"tlacn.php?zorad=cas\">Čas</a></th></thead>";
	while($row=mysqli_fetch_object($vysledok)) {
		echo "<tr valign=\"top\">";
		echo "<td width=\"50\">".datumddmmyy($row->datum)."</td>";
		echo "<td width=\"100\"><a href=\"tlacn.php?filter=partner&ktory=".$row->partner."\">".$row->meno."</a></td>";
		echo "<td>".nl2br($row->zaznam)."</td>";
		echo "<td width=\"15\">".datumddmmyy($row->plan_vybavenia)."</td>";
		echo "<td width=\"100\"><a href=\"tlacn.php?filter=vybavuje&ktory=".$row->vybavuje."\">".nahrad($row->vybavuje,zamestnanci,meno,id_zam)."</a></td>";
		echo "<td width=\"15\">".$row->cast_dna."</td>";
		echo "<td width=\"15\">".hodiny($row->cas)."</td>";
	}
	echo "</table><BR>";
}

function zisti($sql) {
	global $MYSQL_HOST, $MYSQL_USER, $MYSQL_PASSWORD;
	
	$db_link = mysqli_connect($MYSQL_HOST, $MYSQL_USER, $MYSQL_PASSWORD);
	if (!$db_link) {
		die('Could not connect: ' . mysqli_error());
	}	
	mysqli_select_db($db_link, "Korbi");
	
	$vysledok = mysqli_query($db_link, $sql);
	
	if(!$vysledok){
		
		echo "Database error";
	}
	
	global $zapisane_id;
	$zapisane_id = mysqli_insert_id($db_link);
	mysqli_close($db_link);
	
	return $vysledok;
}

function last_sql($last_sql) {
	$sql="UPDATE uzivatel SET last_sql=\"".addslashes($last_sql)."\" WHERE ip_adresa=\"".$_SERVER['REMOTE_ADDR']."\"";
	zisti($sql);
}

function last_url($last_url) {
	$sql="UPDATE uzivatel SET last_url=\"".$last_url."\" WHERE ip_adresa=\"".$_SERVER['REMOTE_ADDR']."\"";
	zisti($sql);
}



function kontrolapriority() {
	$dnes = getdate();

	if (checkdate($dnes["mon"],$dnes["mday"]+2,$dnes["year"])) {
	    $tmp = $dnes["year"]."-".$dnes["mon"]."-".($dnes["mday"]+2);
	} elseif (checkdate($dnes["mon"],$dnes["mday"]+1,$dnes["year"])) {
	  if ($dnes["mon"]<12) {
	    $tmp = $dnes["year"]."-".($dnes["mon"]+1)."-1";
	  } else {
	    $tmp = ($dnes["year"]+1)."-1-1";
	  }
	} else {
	  if ($dnes["mon"]<12) {
	    $tmp = $dnes["year"]."-".($dnes["mon"]+1)."-2";
	  } else {
	    $tmp = ($dnes["year"]+1)."-1-2";
	  }
	}

	$sql = "UPDATE ulohy SET priorita=1 WHERE to_days(plan_vybavenia) <= to_days('$tmp') and plan_vybavenia!=\"0000-00-00\" and datum_vybavenia=\"0000-00-00\"";

	zisti($sql);
}

?>
