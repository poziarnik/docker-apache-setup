<?php
require("../../funkcie.php");
require("../newFilters_functions.php");

$name = json_decode($_POST['name']);
$vybavene = json_decode($_POST['vybavene']);
$zamestnanci_list = json_decode($_POST['zamestnanci_list']);
$partneri_list = json_decode($_POST['partneri_list']);
$okruhy_list = json_decode($_POST['okruhy_list']);
$priority_list = json_decode($_POST['priority_list']);
$cast_dna_list = json_decode($_POST['cast_dna_list']);
$date_OD = json_decode($_POST['date_OD']);
$date_DO = json_decode($_POST['date_DO']);

$zamestnanci_filterArray = list_ID_to_filterArray($zamestnanci_list);
$partneri_filterArray = list_ID_to_filterArray($partneri_list);
$okruhy_filterArray = list_ID_to_filterArray($okruhy_list);
$priority_filterArray = list_ID_to_filterArray($priority_list);
$cast_dna_filterArray = list_ID_to_filterArray($cast_dna_list);

$sql = "INSERT INTO `filtre`(`meno`, `sql_dotaz`, `vybavene`, `vybavuje`, `partnery`, `datum_OD`, `datum_DO`, `cast_dna`, `priorita`, `cas`)
VALUES ('".$name."','select','".$vybavene."','".$zamestnanci_filterArray."','".$partneri_filterArray."',STR_TO_DATE('".$date_OD."','%Y-%m-%d'),STR_TO_DATE('".$date_DO."','%Y-%m-%d'),'".$cast_dna_filterArray."','".$priority_filterArray."','')";
zisti($sql);

$generated_id = zisti("SELECT MAX( id_fil ) FROM filtre");
$output_array =Array();
while ($row = mysqli_fetch_array($generated_id)) {
    $output_array["new_id"] = $row[0];
}

echo json_encode($output_array);

function list_ID_to_filterArray($list){
    $first = true;
    $filterArray = '';
    
    if($list[0]->id != 'ALL'){
        foreach ($list as $element){
            if($first){
                $filterArray = $element->id;
                $first = false;
            }
            else{
                $filterArray = $filterArray.';'.$element->id;
            }
        }
    }

    return $filterArray;
}

?>