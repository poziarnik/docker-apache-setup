<?php
require("../../funkcie.php");
require("../newFilters_functions.php");

$selected = $_POST['filter_name'];

$vybavene = json_decode($_POST["vybavene"]); 
$zakaznici_list = json_decode($_POST["zakaznici_list"]);
$partneri_list = json_decode($_POST["partneri_list"]);
$okruhy_list = json_decode($_POST["okruhy_list"]);
$priority_list = json_decode($_POST["priority_list"]);
$cast_dna_list = json_decode($_POST["cast_dna_list"]);
$date_OD = json_decode($_POST["date_OD"]);
$date_DO = json_decode($_POST["date_DO"]);

$zamestnanciIDs = get_IDSstring_from_STDobject($zakaznici_list);
$partneriIDs = get_IDSstring_from_STDobject($partneri_list);
$okruhyIDs = get_IDSstring_from_STDobject($okruhy_list);
$priorityIDs = get_IDSstring_from_STDobject($priority_list);
$cast_dnaIDs = get_IDSstring_from_STDobject($cast_dna_list);

$filterPart_array = array(
    $filter_vybavene = DB_to_filterSelectPart('riesenie', $vybavene),
    $filter_of_partners = DB_to_filterSelectPart('partner', $partneriIDs),
    $filter_of_employees = DB_to_filterSelectPart('vybavuje', $zamestnanciIDs),
    $filter_date = '',
    $filter_day_part = DB_to_filterSelectPart('cast_dna', $cast_dnaIDs),
    $filter_priority = DB_to_filterSelectPart('priorita', $priorityIDs),
    $date = DB_to_filterSelectPart_date($date_OD, $date_DO),
);

$filter_select = create_filter_select($filterPart_array);

newFilters_output_table($filter_select);
?>

