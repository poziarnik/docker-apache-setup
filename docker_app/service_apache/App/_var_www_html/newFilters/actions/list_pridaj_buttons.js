function update_list_by_select(event) {
    list_selector = String("#").concat(event.data.list_html_id);
    select_selector = String("#").concat(event.data.select_id);
    var new_element_id = $(select_selector).find(":selected").val();
    var new_element_value = $(select_selector).find(":selected").text();
    var array = [];
    document.querySelectorAll(list_selector.concat(" li")).forEach(elem => array.push({
        name: elem.textContent,
        id: elem.getAttribute("value"),
    }));
    var oldListArray = JSON.stringify(array); //citatelna array pre php

    $(list_selector).load("html_refresh/newFilters_load_select.php", {
        new_element_id: new_element_id,
        new_element_value: new_element_value,
        list_html_id: event.data.list_html_id,
        oldListArray: oldListArray
    });
}


$(document).ready(function() {
    $("#list-zamestnanci-button").click({
        list_html_id: "list-zamestnanci",
        select_id: "list-zamestnanci-select"
    }, update_list_by_select)

    $("#list-partneri-button").click({
        list_html_id: "list-partneri",
        select_id: "list-partneri-select"
    }, update_list_by_select)

    $("#list-okruhi-button").click({
        list_html_id: "list-okruhy",
        select_id: "list-okruhy-select"
    }, update_list_by_select)

    $("#list-priority-button").click({
        list_html_id: "list-priority",
        select_id: "list-priority-select"
    }, update_list_by_select)

    $("#list-cast_dna-button").click({
        list_html_id: "list-cast_dna",
        select_id: "list-cast_dna-select"
    }, update_list_by_select)
});