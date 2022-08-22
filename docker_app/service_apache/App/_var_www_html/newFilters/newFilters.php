<html>
<title>Všetky úlohy</title>

<head>
    <link rel="stylesheet" href="../styles/newFilters.css">
    <link href='https://css.gg/menu-grid-r.css' rel='stylesheet'>

    <meta http-equiv="content-type" content="text/html; charset=utf-8">

    <title>Document</title>

    <script src="https://kit.fontawesome.com/acf2bbd9da.js" crossorigin="anonymous"></script>
    <script src="http://code.jquery.com/jquery-1.11.1.min.js" type="text/javascript"></script>
    <script>
        $(function() {
            $("i.gg-menu-grid-r").click(function() {
                $(".menu").toggleClass('menu--open');
            });
        });
    </script>
</head>

<body>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <?php
    require("../funkcie.php");
    require("newFilters_functions.php");
    ?>

    <!-- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx 
                    hlavne button a selektovanie filtrov
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx-->

    <?php
    $options_filter_select = prepare_options_from_DB("filtre", "id_fil", "meno");
    ?>

    <div id="consol">
        <i class="gg-menu-grid-r" data-test="main-icon"></i>
        <!--<ion-icon name="add-circle-outline"></ion-icon> https://ionic.io/ionicons/usage-->

        <form method="post" id="btn-select_filter">
            <select name='selected_filter' id='selected_filter' data-test="select-filters">
                <?php echo $options_filter_select; ?>
            </select>
        </form>
        <button type="button" name="change-table" id="change-table" data-test="button-apply">Apply</button>
    </div>

    <!--script na zmenu zoznamov parametrov po zmene vybraneho filtru-->
    <script src="actions/updatate_on_filter_selected.js"></script>

    <!-- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx 
                            side-slide menu
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx-->

    <?php
    $initial_query = "select * from ulohy,cast_dna,priority,partneri where ulohy.cast_dna=cast_dna.id_csd and ulohy.priorita=priority.id_pri and ulohy.partner=partneri.id_par and ulohy.vybavuje=12 ORDER BY partneri.meno,ulohy.priorita,ulohy.datum";
    $filter_parameters = "select * from ulohy,cast_dna,priority,partneri where ulohy.cast_dna=cast_dna.id_csd and ulohy.priorita=priority.id_pri and ulohy.partner=partneri.id_par and ulohy.partner=59 ";
    $options_ADDzamestnanec_select = prepare_options_from_DB("zamestnanci", "id_zam", "meno");
    $options_ADDpartnery_select = prepare_options_from_DB("partneri", "id_par", "meno");
    $options_ADDpriorita_select = prepare_options_from_DB("priority", "id_pri", "nazov");
    $options_ADDcast_dna_select = prepare_options_from_DB("cast_dna", "id_csd", "cast_dna");
    $options_ADDokruh_select = prepare_options_from_DB("okruhy", "id_okr", "nazov");

    ?>

    <navbar class='menu'>
        <div id='menu-contents'>
            <div id="console-vybavene">
                <select id='vybavene-select' data-test="select-vybavene">
                    <option value='1'>nevybavené</option>
                    <option value='0'>vybavené</option>
                    <option selected="selected" value='0;1'>všetky</option>
                </select>
                <button name='vybavene-button' id='vybavene-button' data-test="button-add-vybavene">Pridaj</button>
            </div>

            <div id="console-zamestnanci">
                <ul id='list-zamestnanci' data-test="list-zamestnanci">
                    <li>ALL</li>
                </ul>
                <select id='list-zamestnanci-select' data-test="select-zamestnanci">
                    <?php echo $options_ADDzamestnanec_select; ?>
                </select>
                <button name='list-zamestnanci-button' id='list-zamestnanci-button' data-test="button-add-zamestnanci">Pridaj</button>
                <button name='list-zamestnanci-button-updateDB' id='list-zamestnanci-button-updateDB' data-test="button-create-zamestnanci">Vytvor nový</button>
            </div>

            <div id="console-partneri">
                <ul id='list-partneri' data-test="list-partneri">
                    <li>ALL</li>
                </ul>
                <select id='list-partneri-select' data-test="select-partneri">
                    <?php echo $options_ADDpartnery_select; ?>
                </select>
                <button name='list-partneri-button' id='list-partneri-button' data-test="button-add-partneri">Pridaj</button>
                <button name='list-partneri-button-updateDB' id='list-partneri-button-updateDB' data-test="button-create-partneri">Vytvor nový</button>
            </div>

            <div id="console-okruhy">
                <ul id='list-okruhy' data-test="list-okruhy">
                    <li>ALL</li>
                </ul>
                <select id='list-okruhi-select' data-test="select-okruhy">
                    <?php echo $options_ADDokruh_select; ?>
                </select>
                <button name='list-okruhi-button' id='list-okruhi-button' data-test="button-add-okruhy">Pridaj</button>
                <button name='list-okruhy-button-updateDB' id='list-okruhy-button-updateDB' data-test="button-create-okruhy">Vytvor nový</button>
            </div>

            <div id="console-priority">
                <ul id='list-priority' data-test="list-priority">
                    <li>ALL</li>
                </ul>
                <select id='list-priority-select' data-test="select-priority">
                    <?php echo $options_ADDpriorita_select; ?>
                </select>
                <button name='list-priority-button' id='list-priority-button' data-test="button-add-priority">Pridaj</button>
                <button name='list-priority-button-updateDB' id='list-priority-button-updateDB' data-test="button-create-priority">Vytvor nový</button>
            </div>

            <div id="console-cast_dna">
                <ul id='list-cast_dna' data-test="list-cast_dna">
                    <li>ALL</li>
                </ul>
                <select id='list-cast_dna-select' data-test="select-cast_dna">
                    <?php echo $options_ADDcast_dna_select; ?>
                </select>
                <button name='list-cast_dna-button' id='list-cast_dna-button' data-test="button-add-cast_dna">Pridaj</button>
                <button name='list-cast_dna-button-updateDB' id='list-cast_dna-button-updateDB' data-test="button-create-cast_dna">Vytvor nový</button>
            </div>

            <div id="console-date">
                <span>Od:</span>
                <input type="date" id="date-OD" data-test="input-date-OD">
                <span>Do:</span>
                <input type="date" id="date-DO" data-test="input-date-DO">
                <br>
                <button name='date-button' id='date-button' data-test="button-date">Pridaj</button>
            </div>

            <button name='save-lists-to-DB' id='save-lists-to-DB' data-test="button-save-lists-to-DB">Ulož filter</button>
        
        </div>
    </navbar>

    <script src="actions/list_pridaj_buttons.js"></script>

    

    <!-- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx 
                        vykreslenie tabulky z databazy
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx-->

    <div id='theTable'>
        <?php newFilters_output_table($initial_query); ?>
    </div>;
    
    <script src="actions/apply_button.js"></script>

    <!-- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx 
                                    modaly
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx-->

    <div id="modal-setFilterName">
        <div id="modal-setFilterName-window">
            <input id="modal-setFilterName-input" type="text">
            <br>
            <div id="modal-setFilterName-window-buttons">
                <button id="modal-setFilterName-button-save">Ulož</button>
                <button id="modal-setFilterName-button-close">Zrušiť</button>
            </div>
            
        </div>
    </div>

    <script src="modal_handler/modal_save_filter.js"></script>


</body>

</html>