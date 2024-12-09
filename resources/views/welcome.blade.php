<!DOCTYPE html>
<html lang="en">

<meta name="csrf-token" content="{{ csrf_token() }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplicación de Gestión de Hoteles</title>
    @viteReactRefresh
    @vite('resources/js/index.jsx')
</head>
<body>
    <div id="app"></div>
</body>
</html>
