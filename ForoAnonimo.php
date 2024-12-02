<?php
include 'Conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['postContent'])) {
    $postContent = $_POST['postContent'];

    // Asegúrate de limpiar el contenido antes de insertarlo
    $postContent = $conexion->real_escape_string($postContent);

    // Insertar el contenido en la base de datos
    $sql = "INSERT INTO Posts (Content, Created_at) VALUES ('$postContent', NOW())";

    if ($conexion->query($sql) === TRUE) {
        echo "Publicación guardada con éxito.";
    } else {
        echo "Error al guardar la publicación: " . $conexion->error;
    }
}

$conexion->close();
?>
