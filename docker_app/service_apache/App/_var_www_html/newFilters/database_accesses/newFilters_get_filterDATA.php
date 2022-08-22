<?php
    require("../../funkcie.php");
    require("../newFilters_functions.php");

    $selected = $_POST['filter_id'];
    $select_filter_parameters = "SELECT sql_dotaz,vybavene,vybavuje,partnery,datum_OD,datum_DO,cast_dna,priorita,cas FROM filtre WHERE id_fil='$selected'";
    $filter_parameters = zisti($select_filter_parameters);
    $array = Array($selected);

    while ($row = mysqli_fetch_array($filter_parameters)) {
        //todo bez while, cyklus sa spusti aj tak len raz

        //$worse_filter = $row[0];
        //$better_filter = DB_to_filter($row);
        $array["output_filter_parameters_vybavene"] = $row[1];
        $array["output_filter_parameters_zamestnanci"] = DBids_to_readable("zamestnanci", $row[2]);
        $array["output_filter_parameters_partneri"] = DBids_to_readable("partneri", $row[3]);
        $array["output_filter_parameters_okruhy"] = DBids_to_readable("okruhy", $row[4]);
        $array["output_filter_parameters_priority"] = DBids_to_readable("priority", $row[7]);
        $array["output_filter_parameters_cast_dna"] = DBids_to_readable("cast_dna", $row[6]);
        $array["output_filter_parameters_datum_OD"] = $row[4];
        $array["output_filter_parameters_datum_DO"] = $row[5];
    }

    echo json_encode($array);
?>