<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr">
<head>
    <title>
        Balise d'arrosage connecté
    </title>
    <link href="css/Accueil.css" rel="stylesheet">
    <link href="css/Main.css" rel="stylesheet">
</head>
<body>
<h1>
    Balise d'arosage connecté
</h1>
<div id="logWindow">
    <h3>
        Veuillez vous identifier
    </h3>
    <form action="login.php" method="post">
        <table style="width: 100%;">
            <tr>
                <td>
                    <label for="log">Login :</label>
                </td>
                <td>
                    <input class="entree" id="log" type="text" name="log" placeholder="Votre identifiant">
                </td>
            </tr>
            <tr>
                <td>
                    <label for="pass">Mot de passe :</label>
                </td>
                <td>
                    <input class="entree" id="pass" type="password" name="pass" placeholder="Votre mot de passe">
                </td>
            </tr>
        </table>
        <div style="text-align: center; color: darkred">
            <?php
            if ($argv[1] == "false") {
                echo "Authentification échouée, verifiez vos identifiants";
            }
            ?>
        </div>
        <br>
        <input type="submit" value="Se connecter">
    </form>
</div>
</body>
</html>