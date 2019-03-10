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
    $ROOT = dirname(__DIR__);
    $JSON_File = fopen($ROOT . "/Backend\Database.json", "r");
    $JSON = fread($JSON_File, filesize($ROOT . "/Backend/Database.json"));
    fclose($JSON_File);
    $DATA = json_decode(substr($JSON, 3));
    $i = 0;
    foreach ($DATA as $balise) {
        if (!$argv[1] == $i) {
            echo "<div class='container'>";
            echo "<a id='balise" . $i . "' href='/?balise=" . $i . "'>" . $balise->name . "</a>";
            echo "</div>";
        } else {
            echo "<div class='container selectionne'>";
            echo "<a id='balise" . $i . "' class='selectionne' href='/?balise=" . $i . "'>" . $balise->name . "</a>";
            echo "</div>";
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
            </td>
            <td id="hum" class="eau/hum">
                humidité
            </td>
            <td id="bat">
                batterie
            </td>
        </tr>
    </table>
</div>
</body>
</html>