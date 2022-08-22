modal = document.getElementById("modal-setFilterName");
modal_window = document.getElementById("modal-setFilterName-window");
open_button = document.getElementById("save-lists-to-DB");
save_button = document.getElementById("modal-setFilterName-button-save");
close_button = document.getElementById("modal-setFilterName-button-close");
filter_name = document.getElementById("modal-setFilterName-input");

open_button.onclick = function(){
    modal.style.display = "block";
    modal_window.style.display = "block";
}

save_button.onclick = function() {
    modal.style.display = "none";
    modal_window.style.display = "none";
    save_filter_to_database(filter_name.value);
}

close_button.onclick = function(){
    modal.style.display = "none";
    modal_window.style.display = "none";
}

function update_select_options(select_id, new_option_value, new_option_text){
    document.getElementById(select_id).options.add(new Option(new_option_text, new_option_value));
}

function save_filter_to_database(name) {
    var filter_name = $("#selected_filter").find(":selected").text();
    var array_zamestnanci = [];
    var array_partneri = [];
    var array_okruhy = [];
    var array_priority = [];
    var array_cast_dna = [];
   
    document.querySelectorAll('#list-zamestnanci li').forEach(elem => array_zamestnanci.push({
        name: elem.textContent,
        id: elem.getAttribute("value"),
    }));
    document.querySelectorAll('#list-partneri li').forEach(elem => array_partneri.push({
        name: elem.textContent,
        id: elem.getAttribute("value"),
    }));
    document.querySelectorAll('#list-okruhy li').forEach(elem => array_okruhy.push({
        name: elem.textContent,
        id: elem.getAttribute("value"),
    }));
    document.querySelectorAll('#list-priority li').forEach(elem => array_priority.push({
        name: elem.textContent,
        id: elem.getAttribute("value"),
    }));
    document.querySelectorAll('#list-cast_dna li').forEach(elem => array_cast_dna.push({
        name: elem.textContent,
        id: elem.getAttribute("value"),
    }));

    const input = new FormData();
    
    input.append('name', JSON.stringify(name));
    input.append('zamestnanci_list', JSON.stringify(array_zamestnanci));
    input.append('partneri_list', JSON.stringify(array_partneri));
    input.append('okruhy_list', JSON.stringify(array_okruhy));
    input.append('priority_list', JSON.stringify(array_priority));
    input.append('cast_dna_list', JSON.stringify(array_cast_dna));
    input.append('date_OD', JSON.stringify(document.getElementById("date-OD").value));
    input.append('date_DO', JSON.stringify(document.getElementById("date-DO").value));
    input.append('vybavene', JSON.stringify(document.getElementById('vybavene-select').value));
    
    fetch("database_accesses/newFilters_save_filter.php", {
            method: "POST",
            body: input
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data["sql"]);
            update_select_options('selected_filter', data["new_id"], name)
        });

}