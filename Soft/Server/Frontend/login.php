<?php
/*
 * $argv[1] = log
 * $argv[2] = pass
 */
$login = $argv[1];
$pass = $argv[2];

if ($login == "admin" && $pass == "admin") {
    echo "success";
}


// TODO : meilleur systeme d'authentification