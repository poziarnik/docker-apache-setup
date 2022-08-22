function update_list_by_filter(list_html_id, array_of_filterParts) {
    list_selector = String("#").concat(list_html_id);
    var array = array_of_filterParts;

    $(list_selector).load("html_refresh/newFilters_load_filter.php", {
        array_of_filterParts: JSON.stringify(array_of_filterParts),
        list_html_id: list_html_id
    });
}

function update_date_by_filter(input_html_id, new_date){
    input_selector = String("#").concat(input_html_id);

    $(input_selector).val(new_date);
}

function load_filter_from_database() {
    var filter_id = $("#selected_filter").find(":selected").val();
    console.log(filter_id);

    const fetchable_filter_id = new FormData();
    fetchable_filter_id.set('filter_id', filter_id);

    fetch("database_accesses/newFilters_get_filterDATA.php", {
            method: "POST",
            body: fetchable_filter_id,
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            document.getElementById('vybavene-select').value = data["output_filter_parameters_vybavene"];
            update_list_by_filter("list-zamestnanci", data["output_filter_parameters_zamestnanci"]);
            update_list_by_filter("list-partneri", data["output_filter_parameters_partneri"]);
            update_list_by_filter("list-okruhy", data["output_filter_parameters_okruhy"]);
            update_list_by_filter("list-priority", data["output_filter_parameters_priority"]);
            update_list_by_filter("list-cast_dna", data["output_filter_parameters_cast_dna"]);
            update_date_by_filter("date-OD", data["output_filter_parameters_datum_OD"]);
            update_date_by_filter("date-DO", data["output_filter_parameters_datum_DO"]);
        });
        
}
$(document).ready(function() {
    $("#selected_filter").on("change", load_filter_from_database);
});
