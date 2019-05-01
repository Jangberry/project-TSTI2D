<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr">
<head>
    <title>
        Balise d'arrosage connecté
    </title>
    <link href="css/Index.css" rel="stylesheet">
    <link href="css/Main.css" rel="stylesheet">
</head>
<body>
<div id="menu">
    <?php
    $ROOT = dirname(__DIR__);   // Preparation de la variable pour transformation de chemin relatif a absolu
    $JSON_File = fopen($ROOT . "/Backend/Database.json", "r");  // Ouverture de la database
    $JSON = fread($JSON_File, filesize($ROOT . "/Backend/Database.json"));  // Lecture de la database
    fclose($JSON_File); // Fermeture de la database
    $DATA = json_decode($JSON); // Transformation de chaine de caractere a Tableau d'objets PHP
    $balise_Selectionne = 0;
    $i = 0;
    foreach ($DATA as $balise) {    // Exploration du Tableau
        if (!$argv[1] == $i) {  // Generation du code HTML dans le cas d'une balise non selectionne
            echo "<div class='container'>";
            echo "<a id='balise" . $i . "' href='/?balise=" . $i . "'>" . $balise->name . "</a>";
            echo "</div>";
        } else {    // Generation du code HTML dans le cas d'une balise selsctionne
            echo "<div class='container selectionne'>";
            echo "<a id='balise" . $i . "' class='selectionne' href='/?balise=" . $i . "'>" . $balise->name . "</a>";
            echo "</div>";
            $balise_Selectionne = $i;   // Enregistre la balise selctionne pour la coherence dans la suite de la page
        }
        $i += 1;
    }
    ?>
</div>
<div id="main">
    <table>
        <tr>
            <td id="eau" class="eau/hum">
                eau
                <?php
                    echo $DATA[$balise_Selectionne]->eau;
                ?>
            </td>
            <td id="hum" class="eau/hum">
                humidité
                <?php
                    echo $DATA[$balise_Selectionne]->hum;
                ?>
            </td>
            <td id="bat">
                batterie
                <?php
                    echo $DATA[$balise_Selectionne]->bat;
                ?>
                %
            </td>
        </tr>
    </table>
</div>
</body>
</html>