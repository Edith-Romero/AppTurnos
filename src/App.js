import React, { Fragment,useState,useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App(){

  
// Citas en el local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas,guardarCitas]= useState(citasIniciales);

  //Funcion que toma las citas actuales y agrege las nuevas
  //useEffecct para realizar ciertas operaciones cundo el state cambia
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (citasIniciales) {
        localStorage.setItem('citas', JSON.stringify(citas))
    } else {
        localStorage.setItem('citas',JSON.stringify([]));
    } 
  }, [citas] ); 
  // se le pasa un arreglo vacio para que no se cicle se le llaman, dependencias

  //Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    
    guardarCitas([
      ...citas,
      cita
    ]);   
    console.log(citas);
  }
  // Funcion que elimina la cita
  const eliminarCita =id =>{
    const nuevasCitas = citas.filter(cita=> cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //mensaje condicional
  const titulo = citas.length === 0 ?"No hay citas" : "Administrar Citas";
  return (
  <Fragment>
    <h1>Administracion de Pacientes</h1>
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <Formulario
            crearCita={crearCita}
          />
        </div>
        <div className="one-half column">
            <h2>{titulo}</h2> 
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                
                eliminarCita={eliminarCita}
              />
            ))}     
        </div>
      </div>
    </div>
  </Fragment>
  );
}

export default App;

// notas en la linea en el el mensaje condicional sirve para mostrar 
// menu si la persona no esta logueada pero despues que se logueada
// lo mostramos onstorage.