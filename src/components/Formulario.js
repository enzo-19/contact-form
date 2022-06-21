/*
Objeto initialForm: acá definimos los nombres de los inputs 

Función validations: dentro tiene un objeto 'errors' vacío, que se va llenando con los errores de los inputs

Componente Formulario: contiene el formulario. La lógica del formulario se maneja mediante el hook personalizado 'useForm'
*/

import React from 'react'
import { useForm } from '../hooks/useForm'
import Loader from './Loader'
import Mensaje from './Mensaje'

const initialForm = {
    nombre: '',
    correo: '',
    mensaje: ''
}

const validations = form => {
    let errors = {}

    // destructuración
    const {nombre, correo, mensaje} = form

    // expresiones regulares
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
    const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/

    // validaciones

    // validación nombre
    if (!nombre.trim()){
        errors.nombre = 'Enter your name'
    } else if (!regexName.test(nombre)) {
        errors.nombre = 'Only letters and spaces allowed'
    } else if (nombre.trim().length > 50) {
        errors.nombre = 'Name must be less than 50 characters'
    }

    // validación correo
    if (!correo.trim()){
        errors.correo = 'Enter your email'
    } else if (!regexEmail.test(correo)) {
        errors.correo = 'Enter a valid mail'
    }

    // validación mensaje
    if (!mensaje.trim()){
        errors.mensaje = 'Message cannot be empty'
    } else if (mensaje.trim().length > 255) {
        errors.mensaje = 'Max length is 255 characters'
    }

    return errors
}


const Formulario = () => {

  const { form, errors, loading, response, handleChange, handleSubmit } = useForm(initialForm, validations)


  return (
    <div className='form-container'>
        <h2>Contact us</h2>
        <form onSubmit={handleSubmit} autoComplete='off' noValidate>
            <div className='form-control'>
                <input  className='form-input' type='text' name='nombre' id='nombre' onChange={handleChange} value={form.nombre} placeholder=' '/>
                <label htmlFor='nombre'>Name
                </label>
                {errors.nombre && <p>{errors.nombre}</p>}

            </div>
            <div className='form-control'>
                <input className='form-input' type='email' name='correo' id='correo' onChange={handleChange} value={form.correo} placeholder=' '/>
                <label htmlFor='correo'>Email</label>
                {errors.correo && <p>{errors.correo}</p>}
            </div>
            <div className='form-control'>
                <textarea className='form-input' name='mensaje' id='mensaje' onChange={handleChange} value={form.mensaje} placeholder=' '/>
                <label htmlFor='mensaje'>Message</label>
                {errors.mensaje && <p>{errors.mensaje}</p>}
            </div>

            <button>Send</button>

        </form>
        {loading && <Loader/>}
        {response && <Mensaje msg={response.message}/>}

    </div>
  )
}

export default Formulario