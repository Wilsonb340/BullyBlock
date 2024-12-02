<?php
include 'Conexion.php';

$sql = "SELECT * FROM Posts ORDER BY Created_at DESC";
$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<div class='post'>";
        echo "<p>" . nl2br(htmlspecialchars($row['Content'])) . "</p>"; // Mostrar contenido de la publicación
        echo "<small>Publicado el " . $row['Created_at'] . "</small>";
        echo "</div>";
    }
} else {
    echo "No hay publicaciones en el foro.";
}

$conexion->close();
?>
