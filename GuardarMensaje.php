<?php
include 'Conexion.php'; // Asegúrate de que este archivo esté correctamente configurado

// Asegúrate de que se haya enviado el mensaje
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['messageContent'])) {
    // Obtener el contenido del mensaje y el id del usuario (debes obtener este id de alguna manera)
    $messageContent = $_POST['messageContent'];
    $userId = 1; // Aquí puedes obtener el id del usuario de la sesión, por ejemplo, $_SESSION['user_id']

    // Validación: Asegúrate de que el mensaje no esté vacío
    if (empty($messageContent)) {
        echo "El mensaje no puede estar vacío.";
        exit;
    }

    // Insertar el mensaje en la base de datos
    $sql = "INSERT INTO posts (user_id, message) VALUES (?, ?)";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("is", $userId, $messageContent);
    
    if ($stmt->execute()) {
        echo "Mensaje enviado con éxito.";
    } else {
        echo "Error al enviar el mensaje.";
    }
    
    // Cerrar la conexión
    $stmt->close();
    $conexion->close();
} else {
    echo "No se recibió ningún mensaje.";
}
?>
