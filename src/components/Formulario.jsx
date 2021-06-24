import React, { Fragment, useState } from 'react'
import {v4 as uuid} from "uuid"; 
import PropTypes from 'prop-types'

const Formulario = ({crearCita}) => {
    
    // Crear state de citas
    const [cita,actualizarCita]= useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:'',
        id:''
    });
    const [error, actualizarError] = useState(false)
    // Funcion que se ejecuta cuando el usuario esta escribiendo input
    const handleChange = (evento) => {
        //console.log('Con que letra escribe: ',evento.nativeEvent.data, 'en donde estoy parada: ', evento.target.name, 'Este me muestra la cadena compelta: ', evento.target.value); 
        actualizarCita({
            ...cita,
            [evento.target.name]:evento.target.value
        })
    };

    // Cuando el usuario presiona agregar cita
    const submitCita = (evento)=>{
        evento.preventDefault();
        // validar el .trim es para que borre los espacios en blanco q pueda colocar el usuario
        if(mascota.trim()===''|| propietario.trim()===''||fecha.trim()===''||
        hora.trim()===''||sintomas.trim()===''){
            actualizarError(true)
            return; ///Cuando hay un error debes colocar un return para que se detenga y no continue ejecutando el codigo
        }
        // Eliminar el mensaje previo
           actualizarError(false)  

        // Asignar ID 
        let citaId = {
            ...cita,
            id: uuid() 
        }
        actualizarCita(citaId)
            
        // Crear lista
        crearCita(citaId)

        // Reiniciar el form 
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:'',
            id:''
        })
    }
    
    // Extraer los valores
    const{ mascota,propietario,fecha,hora,sintomas } = cita;

    return (
        <Fragment>
            <h2>
                Crear citas
            </h2>
            { error ? <p className="alerta-error">Todos los campos son obligatorios</p>:null }
            <form 
                onSubmit={submitCita} 
            >
                <label>
                    Nombre Mascota
                </label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width" ///Esto hace que el tome todo el el espacio disponible
                    placeholder="Nombre Mascota"
                    onChange={handleChange}
                    value={mascota}
                />
                <label>
                    Nombre Dueno
                </label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueno de la Mascota"
                    onChange={handleChange}
                    value={propietario}
                />
                <label>
                    Fecha
                </label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />
                <label>
                    Hora
                </label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />
                <label>
                    Sintomas
                </label>
                <textarea
                    name= "sintomas"
                    className="u-full-width"
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>
                <button 
                    type="submit"
                    className="u-full-width button-primary customButtom"                
                >
                    Agregar Cita
                </button>
            </form>
        </Fragment>
    );
}
Formulario.propTypes={
    crearCita: PropTypes.func.isRequired
}
//  CON MINUSCULA EL prototype
export default Formulario;


// Ejemplos de Keller
// let objeto = {
//     nombre: 'KELLER',
//     apellido: 'Raul',
//     edad: '30'
// }
// let objeto = {
//     [var1]: var2,
// }

// console.log(objeto.nombre)
// console.log(objeto['nombre'])
// console.log(objeto.apellido)
// console.log(objeto['apellido'])

// objeto['nombre'] = 'johana'

// console.log(objeto)



