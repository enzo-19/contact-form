/*
la variable de estado 'form' se inicializa con el objeto 'initialForm'
'handleChange' simplemente me permite que el form sea controlado

*/


import { useState } from "react"

export const useForm = (initialForm, validations) => {

    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)

    const handleChange = e => {
        const {name, value} = e.target
        setForm({
            ...form, 
            [name]: value
        })
    }

    const handleSubmit = async e => {
        // prevent default
        e.preventDefault()

        // buscamos errores en la info ingresada por el cliente en el formulario, en caso de haberlos, la variable de estado 'errors' va permitirnos mostrar los mensajes de error
        const err = validations(form)
        setErrors(err)

        // si hay errores no vamos a continuar con la lógica del submit
        if (Object.keys(err).length !== 0) return false

        // no hay errores, vamos a mostrar un loader en pantalla que indica que se está procesando el envío del formulario
        setLoading(true)

        try {
            const abortCtrl = new AbortController()
            const options = {
                method: "POST",
                body: JSON.stringify(form),
                headers: {"Content-Type": "application/json"},
                signal: abortCtrl.signal
            }
            let timer = setTimeout(() => {
                abortCtrl.abort()
            }, 10000)

            const res = await fetch("https://formsubmit.co/ajax/25c46cd1ac3e12c839b695aeabe54c94", options)
            if(!res.ok) throw new Error()
            clearTimeout(timer)
            const data = await res.json()
            // formsubmit devuelve un objeto cuya propiedad 'success' es "true" o "false", dependiendo de si se envió o no el formulario
            if(data.success !== 'true' ) throw new Error()
            setResponse(data)

        } catch (error) {
            setResponse({
                success: 'false',
                message: "Couldn't send message, please try again later"
            })
        }

        // Reiniciamos el formulario
        setLoading(false)
        setForm(initialForm)
        // Para que el mensaje de respuesta desaparezca después de unos momentos de la UI
        setTimeout(() => {
            setResponse(null)
        }, 5000)
    }

    return { form, errors, loading, response, handleChange, handleSubmit }
}