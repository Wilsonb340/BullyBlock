<?php
include 'Conexion.php'; // Asegúrate de tener la conexión a tu base de datos configurada aquí

// Verifica que los datos sean enviados correctamente
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos enviados desde JavaScript
    $reason = $_POST['reason'];
    $description = $_POST['description'];
    $preference = $_POST['preference'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $fullName = $_POST['fullName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $career = $_POST['career'];

    // Validar que no haya campos vacíos
    if (empty($reason) || empty($description) || empty($preference) || empty($date) || empty($time) || empty($fullName) || empty($email) || empty($phone) || empty($career)) {
        echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios.']);
        exit();
    }

    // Preparar la consulta para insertar los datos en la base de datos
    $sql = "INSERT INTO citas (motivo, descripcion, preferencia, fecha, hora, nombre_completo, email, telefono, carrera)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssss", $reason, $description, $preference, $date, $time, $fullName, $email, $phone, $career);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Cita registrada correctamente.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al registrar la cita.']);
    }

    $stmt->close();
    $conn->close();
}
?>
