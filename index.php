<?php
session_start();
require 'functions.php';
$productList = getProductList();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Flappy Bird</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div id='leftt' align="left">Таблица рекордов</div>
<header>
    <h1>Flappy Bird</h1>
    <div id="score-container">
        <div id="bestScore"></div>
        <div id="currentScore"></div>
    </div>
</header>

<canvas id="canvas" width="431" height="668"></canvas>
<script src="script.js"> </script>
</body>
</html>