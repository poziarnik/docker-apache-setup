<?php
    require("../../funkcie.php");
    require("../newFilters_functions.php");

    $selected = $_POST['filter_id'];
    $select_filter_parameters = "SELECT sql_dotaz,vybavene,vybavuje,partnery,datum_OD,datum_DO,cast_dna,priorita,cas FROM filtre WHERE id_fil='$selected'";
    $filter_parameters = zisti($select_filter_parameters);

    while ($row = mysqli_fetch_array($filter_parameters)) {
        //todo bez while, cyklus sa spusti aj tak len raz

        $worse_filter = $row[0];
        $better_filter = DB_to_filter($row);
        $output_filter_parameters_zamestnanci = DBids_to_readable("zamestnanci", $row[2]);
        $output_filter_parameters_partneri = DBids_to_readable("partneri", $row[3]);
        $output_filter_parameters_okruhy = DBids_to_readable("okruhy", $row[4]);
        $output_filter_parameters_priority = DBids_to_readable("priority", $row[7]);
        $output_filter_parameters_cast_dna = DBids_to_readable("cast_dna", $row[6]);
    }
    
    array_to_html_list("list-zamestnanci", $output_filter_parameters_zamestnanci);
    array_to_html_list("list-partneri", $output_filter_parameters_partneri);
    array_to_html_list("list-okruhy", $output_filter_parameters_okruhy);
    array_to_html_list("list-priority", $output_filter_parameters_priority);
    array_to_html_list("list-cast_dna", $output_filter_parameters_cast_dna);
?>    