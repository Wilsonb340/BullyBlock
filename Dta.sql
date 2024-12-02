CREATE DATABASE BullyBlock;
USE BullyBlock;

-- Tabla Usuarios
CREATE TABLE Usuarios (
    Usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_usuario VARCHAR(100),
    Correo_usuario VARCHAR(100),
    Contrasena_usuario VARCHAR(100),
    Fecha_nacimiento DATE,
    Tipo_usuario ENUM('Paciente', 'Psicologo', 'Administrador')
);

-- Tabla Psicologos
CREATE TABLE Psicologos (
    Psicologo_id INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario_id INT,
    Especialidad VARCHAR(100),
    FOREIGN KEY (fk_usuario_id) REFERENCES Usuarios (Usuario_id)
);

-- Tabla Denuncias
CREATE TABLE Denuncias (
    Denuncia_id INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario_id INT,
    Descripcion_denuncia TEXT,
    Fecha_denuncia DATE,
    Estado_denuncia ENUM('Abierta', 'Cerrada'),
    FOREIGN KEY (fk_usuario_id) REFERENCES Usuarios (Usuario_id)
);

-- Tabla SeguimientoDenuncias
CREATE TABLE Seguimiento_denuncias (
    Seguimiento_id INT AUTO_INCREMENT PRIMARY KEY,
    fk_denuncia_id INT,
    fk_gestor_id INT,
    Descripcion_seguimiento TEXT,
    Fecha_seguimiento DATE,
    FOREIGN KEY (fk_denuncia_id) REFERENCES Denuncias (Denuncia_id),
    FOREIGN KEY (fk_gestor_id) REFERENCES Usuarios (Usuario_id)
);

-- Tabla Pacientes
CREATE TABLE Pacientes (
    Paciente_id INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario_id INT,
    Diagnostico VARCHAR(255),
    FOREIGN KEY (fk_usuario_id) REFERENCES Usuarios (Usuario_id)
);

-- Tabla Terapias
CREATE TABLE Terapias (
    Terapia_id INT AUTO_INCREMENT PRIMARY KEY,
    fk_psicologo_id INT,
    fk_paciente_id INT,
    Fecha_inicio DATE,
    Fecha_fin DATE,
    Estado_terapia ENUM('En curso', 'Finalizada'),
    FOREIGN KEY (fk_psicologo_id) REFERENCES Psicologos (Psicologo_id),
    FOREIGN KEY (fk_paciente_id) REFERENCES Pacientes (Paciente_id)
);

-- Tabla Citas
CREATE TABLE Citas (
    Cita_id INT AUTO_INCREMENT PRIMARY KEY,
    fk_paciente_id INT,
    fk_psicologo_id INT,
    Fecha_cita DATE,
    Hora_cita TIME,
    Estado_cita ENUM('Pendiente', 'Completada', 'Cancelada'),
    FOREIGN KEY (fk_paciente_id) REFERENCES Pacientes (Paciente_id),
    FOREIGN KEY (fk_psicologo_id) REFERENCES Psicologos (Psicologo_id)
);

-- Tabla Notificaciones
CREATE TABLE Notificaciones (
    Notificacion_id INT AUTO_INCREMENT PRIMARY KEY,
    fk_usuario_id INT,
    Mensaje TEXT,
    Fecha_notificacion DATE,
    Estado_notificacion ENUM('Leida', 'No leida'),
    FOREIGN KEY (fk_usuario_id) REFERENCES Usuarios (Usuario_id)
);
ALTER TABLE Citas
ADD COLUMN Motivo_cita VARCHAR(255) NULL;
ALTER TABLE Citas
ADD COLUMN Notas_adicionales TEXT NULL;
ALTER TABLE Citas
ADD COLUMN Fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Citas
ADD COLUMN Tipo_atencion ENUM('Presencial', 'En línea') NULL;
-- Crear tabla Posts (publicaciones) para el foro anónimo
CREATE TABLE Posts (
    Post_id INT AUTO_INCREMENT PRIMARY KEY,    -- Identificador único de la publicación
    Content TEXT NOT NULL,                     -- El contenido de la publicación
    User_id INT,                               -- ID del usuario que hace la publicación
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora de la creación
    FOREIGN KEY (User_id) REFERENCES Usuarios (Usuario_id) -- Relacionado con la tabla Usuarios
);
