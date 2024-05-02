export const usuariosTestData = [
  {
    id_usuario: 1,
    nombre_usuario: 'Usuario1',
    apellido_usuario: 'Oirausu1',
    email: 'usuario1@correo.com',
    contrasena: 'hashdata1',
    tipo_usuario: 'estudiante',
    escuela_id: 1,
    foto_usuario: null
  },
  {
    id_usuario: 2,
    nombre_usuario: 'Usuario2',
    apellido_usuario: 'Oirausu2',
    email: 'usuario2@correo.com',
    contrasena: 'hashdata2',
    tipo_usuario: 'profesor',
    escuela_id: 1,
    foto_usuario: null
  },
  {
    id_usuario: 3,
    nombre_usuario: 'Usuario3',
    apellido_usuario: 'Oirausu3',
    email: 'usuario3@correo.com',
    contrasena: 'hashdata3',
    tipo_usuario: 'administrativo',
    escuela_id: 2,
    foto_usuario: null
  },
  {
    id_usuario: 4,
    nombre_usuario: 'Usuario4',
    apellido_usuario: 'Oirausu4',
    email: 'usuario4@correo.com',
    contrasena: 'hashdata4',
    tipo_usuario: 'estudiante',
    escuela_id: 2,
    foto_usuario: 'imagen.jpg'
  }
]

export const usuarioData = {
    nombre_usuario: 'John',
    apellido_usuario: 'Doe',
    email: 'john.doe@example.com',
    contrasena: 'password123',
    tipo_usuario: 'estudiante',
    escuela_id: 1,
    foto_usuario: null
}

export const setUserProps = (expected, original) => {
  expected.id_usuario = original.id_usuario
  expected.nombre_usuario = original.nombre_usuario
  expected.apellido_usuario = original.apellido_usuario
  expected.email = original.email
  expected.contrasena = original.contrasena
  expected.tipo_usuario = original.tipo_usuario
  expected.escuela_id = original.escuela_id
  expected.foto_usuario = original.foto_usuario
  return expected
}
