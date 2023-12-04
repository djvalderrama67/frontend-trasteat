import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrucks } from '../actions/Truck';

const homeImages = require.context('../components/icons/Vehiculos', true);
const limitImage = require.context('../components/icons/Carga_limite', true);

const Vehicles = ({ totalVolumen, onVehicleChange }) => {
    const dispatch = useDispatch();
    const trucks = useSelector((state) => state.reduxTrucks.trucks);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    useEffect(() => {
        dispatch(fetchTrucks());
    }, [dispatch]);

    useEffect(() => {
        const filteredTrucks = trucks.filter(truck => totalVolumen > 0 && totalVolumen <= truck.volumen_carga_max);
        if (filteredTrucks.length > 0) {
            setSelectedVehicle(filteredTrucks[0]);
            onVehicleChange(filteredTrucks[0]); // Llama a la función del componente padre
        } else {
            setSelectedVehicle(null);
        }
    }, [totalVolumen, trucks, onVehicleChange]);

    const filteredTrucks = trucks.filter(truck => totalVolumen > 0 && totalVolumen <= truck.volumen_carga_max);

    return (
        <div className="container-vehiculos">
            {totalVolumen === 0 ? (
                <p>No hay ningun objeto seleccionado</p>
            ) : (
                filteredTrucks.length > 0 ? (
                    <div className='container-vehiculos-info'>
                        <div className='container-vehiculos-info-items'>
                            <div key={filteredTrucks[0].idVehiculo} className='container-vehiculos-item'>
                                <img src={homeImages(`./${filteredTrucks[0].nombre}.svg`)} alt={filteredTrucks[0].nombre} />
                            </div>
                            <div className='container-vehiculos-info-text'>
                                <img src={limitImage(`./Peso Vehiculo.svg`)} alt="Peso vehiculo" />
                                <p>{filteredTrucks[0].capacidad_min} T - {filteredTrucks[0].capacidad_max} T</p>
                            </div>
                        </div>
                        <div className='container-vehiculos-name'>
                            <p>{filteredTrucks[0].nombre}</p>
                        </div>
                    </div>
                ) : (
                    <div className='container-vehiculos-item'>
                        <img src={limitImage(`./Carga límite.svg`)} alt="Carga limite" />
                    </div>
                )
            )}
        </div>
    )
}

export default Vehicles;
