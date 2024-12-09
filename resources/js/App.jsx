import { useState } from 'react';
import api from './api/axios'; // Esto importa la configuración de Axios


function App() {
  // Estado para la información del hotel
  const [hotelInfo, setHotelInfo] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    nit: '',
    numHabitaciones: ''
  });

  // Estado para la asignación de habitaciones
  const [tipoHabitacion, setTipoHabitacion] = useState('');
  const [acomodacion, setAcomodacion] = useState('');
  const [cantidad, setCantidad] = useState('');

  // Estado para almacenar las asignaciones realizadas
  const [asignaciones, setAsignaciones] = useState([]);

  // Opciones de tipo de habitación
  const tipos = ['Estándar', 'Junior', 'Suite'];

  // Determinar acomodaciones según el tipo de habitación
  const getAcomodaciones = () => {
    switch (tipoHabitacion) {
      case 'Estándar':
        return ['Sencilla', 'Doble'];
      case 'Junior':
        return ['Triple', 'Cuádruple'];
      case 'Suite':
        return ['Sencilla', 'Doble', 'Triple'];
      default:
        return [];
    }
  };

  const acomodacionesDisponibles = getAcomodaciones();

  // Manejar cambios en datos del hotel
  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotelInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Agregar una asignación de habitaciones
  const handleAddAsignacion = () => {
    if (!tipoHabitacion || !acomodacion || !cantidad) return;
    if (parseInt(cantidad) > parseInt(hotelInfo.numHabitaciones)) {
      alert("La cantidad excede el número total de habitaciones del hotel.");
      return;
    }

    const existe = asignaciones.find(
      (a) => a.tipoHabitacion === tipoHabitacion && a.acomodacion === acomodacion
    );
    if (existe) {
      alert("Ya existe una asignación para este tipo y acomodación.");
      return;
    }

    setAsignaciones((prev) => [
      ...prev,
      { tipoHabitacion, acomodacion, cantidad: parseInt(cantidad) }
    ]);

    // Limpiar campos
    setTipoHabitacion('');
    setAcomodacion('');
    setCantidad('');
  };

  // Guardar datos del hotel (por ahora simulado)
  const handleGuardarHotel = () => {
    if (!hotelInfo.nombre || !hotelInfo.direccion || !hotelInfo.ciudad || !hotelInfo.nit || !hotelInfo.numHabitaciones) {
      alert("Por favor completa todos los datos del hotel.");
      return;
    }

    if (asignaciones.length === 0) {
      alert("Agrega al menos una asignación de habitación antes de guardar.");
      return;
    }

    const payload = {
      hotel: hotelInfo,
      asignaciones,
    };

    // Enviar datos al backend
    api.post('/guardarHotel', payload)
      .then((response) => {
        alert("Hotel guardado con éxito: " + response.data.message);
        console.log(response.data);
        // Limpiar los datos del formulario si deseas
        setHotelInfo({
          nombre: '',
          direccion: '',
          ciudad: '',
          nit: '',
          numHabitaciones: '',
        });
        setAsignaciones([]);
      })
      .catch((error) => {
        console.error(error);
        alert("Ocurrió un error al guardar el hotel.");
      });
  };

  document.body.classList.add('mi-clase');

  return (
    <div className="container mt-4">
      <div className="container-fluid py-1 d-flex align-items-end flex-column pl-3">
        <img src="/images/DCameron.png"></img>
      </div>
      <h1 className="text-center mb-4">Gestión de Hoteles</h1>
      <p className="lead mb-4 text-center">Ingresa los datos básicos del hotel y asigna las habitaciones con sus acomodaciones.</p>
      <div className='container-fluid'>
        <section className="hotel-form mb-5 row">
          <hr />
          <h2 className="mb-3">Datos del Hotel</h2>
          <div className="col-md-4">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={hotelInfo.nombre}
              onChange={handleHotelChange}
              className="form-control"
              placeholder="Nombre del hotel"
            />
          </div>
          <div className="col-md-5">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={hotelInfo.direccion}
              onChange={handleHotelChange}
              className="form-control"
              placeholder="Dirección del hotel"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Ciudad</label>
            <input
              type="text"
              name="ciudad"
              value={hotelInfo.ciudad}
              onChange={handleHotelChange}
              className="form-control"
              placeholder="Ciudad donde se ubica el hotel"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Nit</label>
            <input
              type="text"
              name="nit"
              value={hotelInfo.nit}
              onChange={handleHotelChange}
              className="form-control"
              placeholder="NIT del hotel"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Número de habitaciones</label>
            <input
              type="number"
              name="numHabitaciones"
              value={hotelInfo.numHabitaciones}
              onChange={handleHotelChange}
              className="form-control"
              placeholder="Cantidad total de habitaciones"
            />
          </div>
        </section>
      </div>
      <hr />
      <section className="asignacion-form mb-5 row">
        <h2 className="mb-3">Asignación de Habitaciones</h2>
        <div className="col-md-4">
          <label className="form-label">Tipo de Habitación:</label>
          <select
            value={tipoHabitacion}
            onChange={(e) => setTipoHabitacion(e.target.value)}
            className="form-select"
          >
            <option value="">-- Selecciona Tipo --</option>
            {tipos.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {tipoHabitacion && (
          <div className="col-md-4">
            <label className="form-label">Acomodación:</label>
            <select
              value={acomodacion}
              onChange={(e) => setAcomodacion(e.target.value)}
              className="form-select"
            >
              <option value="">-- Selecciona Acomodación --</option>
              {acomodacionesDisponibles.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        )}

        {acomodacion && (
          <div className="col-md-3">
            <label className="form-label">Cantidad de habitaciones asignadas:</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="form-control"
              placeholder="Número de habitaciones"
            />
          </div>
        )}

        <div className='col-md-12'><hr /></div>

        <div className='col-md-4'>
          <button onClick={handleAddAsignacion} className="btn btn-success">Agregar Asignación</button>
        </div>

      </section>

      {asignaciones.length > 0 && (
        <section className="asignaciones-list mb-5">
          <h2 className="mb-3">Resumen de Asignaciones</h2>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Tipo Habitación</th>
                <th>Acomodación</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {asignaciones.map((asig, i) => (
                <tr key={i}>
                  <td>{asig.tipoHabitacion}</td>
                  <td>{asig.acomodacion}</td>
                  <td>{asig.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      <div className='form-group col-12 d-flex align-items-end flex-column'>
        <button className="btn btn-primary" onClick={handleGuardarHotel}>Guardar Datos del Hotel</button>
        <br /><br />
      </div>
    </div>
  );
}

export default App;
