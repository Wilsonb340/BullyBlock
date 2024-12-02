<?php
// Incluir archivo de conexión
include "Conexion.php";

// Validación de los campos del formulario
$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar campos obligatorios
    $incidentType = isset($_POST['incidentType']) ? trim($_POST['incidentType']) : '';
    $date = isset($_POST['date']) ? $_POST['date'] : '';
    $location = isset($_POST['location']) ? trim($_POST['location']) : '';
    $description = isset($_POST['description']) ? trim($_POST['description']) : '';
    $fullName = isset($_POST['fullName']) ? trim($_POST['fullName']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';

    // Verificar que los campos no estén vacíos
    if (empty($incidentType)) $errors[] = "Tipo de incidente es obligatorio.";
    if (empty($date)) $errors[] = "Fecha del incidente es obligatoria.";
    if (empty($location)) $errors[] = "Lugar del incidente es obligatorio.";
    if (empty($description)) $errors[] = "Descripción del incidente es obligatoria.";
    if (empty($fullName)) $errors[] = "Nombre completo es obligatorio.";
    if (empty($email)) $errors[] = "Correo electrónico es obligatorio.";
    if (empty($phone)) $errors[] = "Teléfono es obligatorio.";

    // Verificar formato de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "El correo electrónico no es válido.";
    }

    // Verificar si hay errores antes de guardar
    if (empty($errors)) {
        // Subir evidencia si existe
        $evidencePath = "";
        if (isset($_FILES['evidence']) && $_FILES['evidence']['error'] == 0) {
            $evidencePath = 'uploads/' . basename($_FILES['evidence']['name']);
            move_uploaded_file($_FILES['evidence']['tmp_name'], $evidencePath);
        }

        // Insertar los datos en la base de datos
        $query = "INSERT INTO Denuncias (incident_type, date, location, description, witnesses, evidence, full_name, email, phone, notes)
                  VALUES ('$incidentType', '$date', '$location', '$description', '$witnesses', '$evidencePath', '$fullName', '$email', '$phone', '$notes')";
        
        if (mysqli_query($conn, $query)) {
            echo "Denuncia registrada correctamente.";
        } else {
            echo "Error al registrar la denuncia: " . mysqli_error($conn);
        }
    } else {
        // Mostrar errores
        foreach ($errors as $error) {
            echo "<p>Error: $error</p>";
        }
    }
}

mysqli_close($conn);
?>
