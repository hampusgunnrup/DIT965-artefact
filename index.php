<!DOCTYPE HTML>
<html>
    <head>
        <title>Game</title>
        
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        
        <!-- The core classes/files. They build a type of framework for the game. -->
        <script type="text/javascript" src="js/core/graphics/Graphics.js"></script>
        <script type="text/javascript" src="js/core/graphics/Canvas.js"></script>
        <script type="text/javascript" src="js/core/input/Input.js"></script>
        <script type="text/javascript" src="js/core/object/Object.js"></script>
        <script type="text/javascript" src="js/core/object/Actor.js"></script>
        <script type="text/javascript" src="js/core/screen/Screen.js"></script>
        <script type="text/javascript" src="js/core/Game.js"></script>
        
        <!-- Specific classes/files for this particular game. They use the core files. -->
        <script type="text/javascript" src="js/GameScreen.js"></script>
        <script type="text/javascript" src="js/MainCharacter.js"></script>
        <script type="text/javascript" src="js/entities/Cap.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
    </head>
    <body>
        <!-- The main game board -->
        <canvas id="platform" width="1000" height="600"></canvas>
    </body>
</html>
