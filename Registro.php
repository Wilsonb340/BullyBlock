<?php
include "Conexion.php";

// Inicializar variable para el mensaje de error
$error_message = "";

// Obtener datos del formulario
$usuario = $_POST["usuario"];
$correo = $_POST["correo"];
$contraseña = $_POST["contrasena"];
$confir_contraseña = $_POST["confirmar_contrasena"];

// Validar que las contraseñas coincidan
if ($contraseña !== $confir_contraseña) {
    $error_message = "Las contraseñas no coinciden.";
}

// Validar si los campos están vacíos
if (empty($usuario) || empty($correo) || empty($contraseña)) {
    $error_message = "Por favor, complete todos los campos.";
}

// Si hay algún error, mostrarlo y no continuar con el registro
if (!empty($error_message)) {
    // Mostrar el mensaje de error
    echo "<script> 
            alert('$error_message'); 
            window.history.back(); 
          </script>";
    exit(); // Detener el script
}

// Cifrar la contraseña antes de almacenarla
$contraseña_hash = password_hash($contraseña, PASSWORD_DEFAULT);

// Crear la consulta SQL para insertar en la base de datos
$query = "INSERT INTO Usuarios (Nombre_usuario, Correo_usuario, Contrasena_usuario) VALUES ('$usuario', '$correo', '$contraseña_hash')";

// Ejecutar la consulta
if (mysqli_query($conexion, $query)) {
    // Si el registro es exitoso, redirigir a otra página
    header("Location: ../Index/4.1MenuInicio.html");  // Cambia '4.1MenuInicio.html' por la página a la que deseas redirigir
    exit(); // Asegurarse de que no se ejecute más código después de la redirección
} else {
    // Si hay un error al registrar
    echo "Error al registrar: " . mysqli_error($conexion);
    exit();
}
?>
