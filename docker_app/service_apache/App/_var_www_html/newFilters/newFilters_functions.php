<?php
function newFilters_output_table($sql)
{
    #vykreslenie tabulky do prehliadaca
    $sql2 = "SELECT slim FROM uzivatel WHERE ip_adresa=\"" . $_SERVER['REMOTE_ADDR'] . "\"";
    $vysledok2 = zisti($sql2);
    $slim = "";
    while ($row = mysqli_fetch_object($vysledok2)) $slim = $row->slim;

    echo "hii";
    echo "<div id='tables'>";
    tabulka_vybavene(zisti($sql), $slim);   
    echo "</div>";
}

function DB_to_filterSelectPart($keyword, $vybavuje)
{
    $array = explode(';', $vybavuje);
    $filter_of_employees = '';

    if ($array[0] == '') {
        $filter_of_employees = '';
    } else {
        $first_value = true;
        foreach ($array as $number_of_employee) {
            //if(!in_array($number_of_employee,['1','2','3','4','5','6','7','8','9','10','11','12'])){
            //    echo "<br>Error: chyba v databaze<br>";
            //    return false;
            //}TODO
            if ($first_value) {
                $filter_of_employees = '(' . $filter_of_employees . $keyword . '=' . $number_of_employee;
                $first_value = false;
            } else {
                $filter_of_employees = $filter_of_employees . ' OR ' . $keyword . '=' . $number_of_employee;
            }
        }
        $filter_of_employees = $filter_of_employees . ')';
    }

    return $filter_of_employees;
}

function get_IDSstring_from_STDobject($object){
    $string = '';
    $first = true;
    
    foreach($object as $element){
        if(strcmp($element->id,"ALL") != 0){
            if($first){
                $first = false;
                $string = $string.$element->id;
            }
            else{
                $string = $string.";".$element->id;
            }
        }
    }

    return $string;
}

function DB_to_filterSelectPart_date($datum_OD, $datum_DO)
{
    $filter_date = '';
    echo $datum_OD;
    echo $datum_DO;
    if (!empty($datum_OD) && !empty($datum_DO)) {
        $filter_date = " `plan_vybavenia` > STR_TO_DATE('".$datum_OD."', '%Y-%m-%d')"." AND plan_vybavenia < STR_TO_DATE('".$datum_DO."', '%Y-%m-%d')";
    } else if (!empty($datum_OD)) {
        $filter_date = " `plan_vybavenia` > "."STR_TO_DATE('".$datum_OD."', '%Y-%m-%d')"; //$datum_OD;
    } else if (!empty($datum_Do)) {
        $filter_date = ' `plan_vybavenia` < ' ."STR_TO_DATE('".$datum_DO."', '%Y-%m-%d')". ' ';
    }

    return $filter_date;
}

function create_filter_select($filterPart_array)
{
    $filter_select = 'SELECT * FROM ulohy,cast_dna,priority,partneri WHERE ulohy.cast_dna=cast_dna.id_csd AND ulohy.priorita=priority.id_pri AND ulohy.partner=partneri.id_par';
    
    foreach ($filterPart_array as $filter_part) {
        if (!empty($filter_part)) {
            $filter_select = $filter_select . ' AND ' . $filter_part;
        }
    }
    
    $filter_select = $filter_select . ' ORDER BY datum DESC,partneri.meno,ulohy.priorita';
    return $filter_select;
}



function DBids_to_readable($table, $IDs_string)
{
    $readable_array = array();
    $IDs_array = explode(';', $IDs_string);


    $db_link = mysqli_connect("localhost", "Korbi", "wyBCewKk28kammg");
    if (!$db_link) {
        //die('Could not connect: ' . mysqli_error());
    }

    mysqli_select_db($db_link, "Korbi");

    if ($table == "partneri") {
        arrayIDs_to_arrayReadable($db_link, $IDs_array, $readable_array, $table, "id_par", "meno");
    } else if ($table == "zamestnanci") {
        arrayIDs_to_arrayReadable($db_link, $IDs_array, $readable_array, $table, "id_zam", "meno");
    } else if ($table == "uzivatel") {
        arrayIDs_to_arrayReadable($db_link, $IDs_array, $readable_array, $table, "id_uziv", "meno");
    } else if ($table == "okruhy") {
        arrayIDs_to_arrayReadable($db_link, $IDs_array, $readable_array, $table, "id_okr", "nazov");
    } else if ($table == "priority") {
        arrayIDs_to_arrayReadable($db_link, $IDs_array, $readable_array, $table, "id_pri", "nazov");
    } else if ($table == "cast_dna") {
        arrayIDs_to_arrayReadable($db_link, $IDs_array, $readable_array, $table, "id_csd", "nazov");
    } else {
        echo "ERROR: zla tabulka v DBids_to_readable";
    }

    mysqli_close($db_link);

    return $readable_array;
}

function arrayIDs_to_arrayReadable($db_link, $IDs_array, &$readable_array, $table, $id_column_name, $wanted_column_name)
{
    foreach ($IDs_array as $ID) {
        if ($ID != '') {
            $select = "SELECT " . $wanted_column_name . " FROM " . $table . " WHERE " . $table . "." . $id_column_name . "=" . $ID;
            $readable_name = mysqli_fetch_assoc(mysqli_query($db_link, $select));
            array_push($readable_array, array($ID, $readable_name[$wanted_column_name]));
        }
    }
}

function DB_to_filter($row)
{

    $vybavene = $row[1]; //TODO
    $vybavuje = $row[2];
    $partnery = $row[3];
    $datum_OD = $row[4];
    $datum_DO = $row[5];
    $cast_dna = $row[6];
    $priorita = $row[7];
    $cas = $row[8];     //TODO

    $filterPart_array = array(
        $filter_of_employees = DB_to_filterSelectPart('vybavuje', $vybavuje),
        $filter_of_partners = DB_to_filterSelectPart('partner', $partnery),
        $filter_date = DB_to_filterSelectPart_date($datum_OD, $datum_DO),
        $filter_day_part = DB_to_filterSelectPart('cast_dna', $cast_dna),
        $filter_priority = DB_to_filterSelectPart('priorita', $priorita),
    );

    $filter_select = create_filter_select($filterPart_array);
    return $filter_select;
}

function array_to_html_list($list_id, $array)
{
    if ($array[0] != '') {
        echo "<ul id='".$list_id."'>";
        foreach ($array as $element) {
            echo "<li value='".$element[0]."'>".$element[1]."</li>"; //element[0]=ID element[1]=nazov
        }
        echo "</ul>";
    } else {
        echo "<ul id='".$list_id."'><li>ALL</li></ul>";
    }
}

function changeable_list($list_id, $array){
    echo "<form ><select id='list-select'><option>hi</option><option>hi</option></select>
    </form> <button name='list-button' id='list-button'></button>";
    array_to_html_list($list_id, $array);

}

function prepare_options_from_DB($table_name ,$ID_column_name, $name_column_name){

    $options = "<option value = none >-</option>";
    //$query = "SELECT id_fil,meno FROM filtre";
    $query = "SELECT ".$ID_column_name.",".$name_column_name." FROM ".$table_name;
    //echo $query;
    
    $result = zisti($query);
    while ($row = mysqli_fetch_array($result)) {
        $options = $options . "<option value = " . $row[0] . " >" . $row[1] . "</option>";
    }

    return $options;
}

?>