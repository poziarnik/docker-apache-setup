<?php
$new_element_id = $_POST['new_element_id'];
$new_element_value = $_POST['new_element_value'];
$list_filterParts = json_decode($_POST["oldListArray"]);
$list_html_id = $_POST['list_html_id'];

echo "<ul id='".$list_html_id."'>";
    
    foreach($list_filterParts as $element) {
        if(strcmp($element->name, "ALL") != 0){
            echo "<li value=".$element->id." onclick='this.remove()'>".$element->name."</li>";
        }
    }
    
    

echo "<li value=".$new_element_id." onclick='this.remove()' >".$new_element_value."</li>";
echo "</ul>";
?>

<script>
function add_removability(element_id){
        console.log(element_id);
        const element = document.getElementById(element_id);
        console.log(element.value);
        
        element.addEventListener('click', function handleClick(event) {
        
          event.target.remove();
        });
    }
</script>
