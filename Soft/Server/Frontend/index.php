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
        if ($i != $argv[1]) {  // Generation du code HTML dans le cas d'une balise non selectionne
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
                <div class="indicator-container">
                    <div id="background-eau" class="indicator-background">
                        <div id="icon-eau">
                            <img id="img-eau" style="top: <?php echo 360 - $DATA[$balise_Selectionne]->eau * 3.6; ?>px;"
                                 src="https://www.bhp.com/-/media/images/2018-water-report/180828_wr2018cover.jpg?mh=844&h=844&w=1500&la=en&hash=16406F779CD04F31FE68780D8A645746DB1A5A0C"
                                 alt="">
                        </div>
                    </div>
                </div>
                <h2>
                    Eau
                    <?php
                    echo $DATA[$balise_Selectionne]->eau;
                    ?>
                    %
                </h2>
            </td>
            <td id="hum" class="eau/hum">
                <div class="indicator-container">
                    <div id="background-hum" class="indicator-background">
                        <div id="icon-hum">
                            <img id="img-hum"
                                 style="top: <?php echo 325 - $DATA[$balise_Selectionne]->eau * 3.25; ?>px;"
                                 src="https://cdn-images-1.medium.com/max/1200/1*d8DyNLUIa8xo5rGrO-2FSg.jpeg" alt="">
                        </div>
                    </div>
                </div>
                <h2>
                    Humidité
                    <?php
                    echo $DATA[$balise_Selectionne]->hum;
                    ?>
                    %
                </h2>
            </td>
            <td id="bat">
                <div class="indicator-container">
                    <div id="background-bat" class="indicator-background">
                        <div id="icon-bat">
                            <div id="img-bat"
                                 style="top: <?php echo 256 - $DATA[$balise_Selectionne]->bat * 2.56; ?>px; height: <?php echo $DATA[$balise_Selectionne]->bat * 2.56; ?>px;">
                            </div>
                        </div>
                    </div>
                </div>
                <h2>
                    Batterie
                    <?php
                    echo $DATA[$balise_Selectionne]->bat;
                    ?>
                    %
                </h2>
            </td>
        </tr>
    </table>
</div>
</body>
</html>