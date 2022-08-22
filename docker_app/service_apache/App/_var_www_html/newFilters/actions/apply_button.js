$(document).ready(function() {
    $("#change-table").click(function() {
        var filter_name = $("#selected_filter").find(":selected").text();
        var array_zamestnanci = [];
        var array_partneri = [];
        var array_okruhy = [];
        var array_priority = [];
        var array_cast_dna = [];

        //precitanie sucastnych zoznamov a vlozenie do poli
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
        
        var vybavene = JSON.stringify(document.getElementById('vybavene-select').value);
        var zakaznici_list = JSON.stringify(array_zamestnanci);
        var partneri_list = JSON.stringify(array_partneri);
        var okruhy_list = JSON.stringify(array_okruhy);
        var priority_list = JSON.stringify(array_priority);
        var cast_dna_list = JSON.stringify(array_cast_dna);
        var date_OD = JSON.stringify(document.getElementById("date-OD").value);
        var date_DO = JSON.stringify(document.getElementById("date-DO").value);

        //zmena tabulky
        $("#theTable").load("html_refresh/newFilters_change_table.php", {
            vybavene,
            filter_name: filter_name,
            zakaznici_list: zakaznici_list,
            partneri_list: partneri_list,
            okruhy_list: okruhy_list,
            priority_list: priority_list,
            cast_dna_list: cast_dna_list,
            date_OD,
            date_DO,
        });
    });

});