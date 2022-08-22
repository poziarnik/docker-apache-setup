<?php
$list_filterParts = json_decode($_POST["array_of_filterParts"]);
$list_html_id = $_POST['list_html_id'];

if(count($list_filterParts) != 0){
    foreach($list_filterParts as $element) {
        if($elemnt != "ALL"){
            echo "<li value=".$element[0]." onclick='this.remove()'>".$element[1]."</li>";
        }
    }
}
else{
    echo "<li value='ALL'>ALL</li>";
}


?>