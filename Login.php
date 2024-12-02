<?php
include "Conexion.php"; // Asegúrate de que la conexión esté configurada correctamente

// Inicializar variable para el mensaje de error
$error_message = "";

// Obtener los datos del formulario de login
$usuario = $_POST["usuario"];
$contraseña = $_POST["contrasena"];

// Validar que los campos no estén vacíos
if (empty($usuario) || empty($contraseña)) {
    $error_message = "Por favor, complete ambos campos.";
}

// Si hay algún error, mostrarlo y no continuar con la validación
if (!empty($error_message)) {
    echo "<script> 
            alert('$error_message'); 
            window.history.back(); 
          </script>";
    exit(); // Detener el script
}

// Consulta SQL para buscar al usuario en la base de datos (usando sentencia preparada)
$query = "SELECT * FROM Usuarios WHERE Usuario_id = ?";

// Preparar la consulta
$stmt = mysqli_prepare($conexion, $query);



// Comprobar si la preparación fue exitosa
if (!$stmt) {
    echo "Error en la preparación de la consulta: " . mysqli_error($conexion);
    exit();
}

// Enlazar el parámetro (usuario)
mysqli_stmt_bind_param($stmt, "s", $usuario); // "s" indica que es un string

// Ejecutar la consulta
mysqli_stmt_execute($stmt);

// Obtener el resultado
$resultado = mysqli_stmt_get_result($stmt);

// Verificar si se encontró el usuario
if (mysqli_num_rows($resultado) > 0) {
    $usuarioEncontrado = mysqli_fetch_assoc($resultado);
    
    // Verificar la contraseña
    if (password_verify($contraseña, $usuarioEncontrado['contrasena'])) {
        // Contraseña correcta
        echo "Inicio de sesión exitoso.";
        // Aquí puedes redirigir a otra página o mostrar un mensaje de éxito
        header("Location: ../Index/4.1MenuInicio.html");  // Redirige a la página de inicio o a otra de tu elección
        exit();
    } else {
        // Contraseña incorrecta o usuario incorrecto
        $error_message = "Usuario o contraseña incorrectos.";
    }
} else {
    // Usuario no encontrado o contraseña incorrecta
    $error_message = "Usuario o contraseña incorrectos.";
}

// Si hubo un error, mostrar el mensaje y mantener los valores
if (!empty($error_message)) {
    echo "<script>
            alert('$error_message');
            window.history.back();
          </script>";
    exit(); // Detener el script
}

// Cerrar la consulta y la conexión
mysqli_stmt_close($stmt);
mysqli_close($conexion);
?>
