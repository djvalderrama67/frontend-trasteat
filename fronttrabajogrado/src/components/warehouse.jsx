import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWarehouses } from '../actions/WareHouse';

const homeImages = require.context('../components/icons/Bodega', true);
const limitImage = require.context('../components/icons/Carga_limite', true);

const Vehicles = ({ totalVolumen, onWarehouseChange }) => {
    const dispatch = useDispatch();
    const warehouses = useSelector((state) => state.reduxWareHouse.warehouses);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    useEffect(() => {
        dispatch(fetchWarehouses());
    }, [dispatch]);

    useEffect(() => {
        const filteredWarehouses = warehouses.filter(warehouse => totalVolumen > 0 && totalVolumen <= warehouse.volumen);
        if (filteredWarehouses.length > 0) {
            setSelectedWarehouse(filteredWarehouses[0]);
            onWarehouseChange(filteredWarehouses[0]); // Llama a la función del componente padre
        } else {
            setSelectedWarehouse(null);
        }
    }, [totalVolumen, warehouses, onWarehouseChange]);

    const filteredWarehouses = warehouses.filter(warehouse => totalVolumen > 0 && totalVolumen <= warehouse.volumen);

    return (
        <div className="container-vehiculos">
            {totalVolumen === 0 ? (
                <p>No hay ningun objeto seleccionado</p>
            ) : (
                filteredWarehouses.length > 0 ? (
                    <div className='container-vehiculos-info'>
                        <div className='container-vehiculos-info-items'>
                            <div key={filteredWarehouses[0].idBodega} className='container-vehiculos-item'>
                                <img src={homeImages(`./Bodega.svg`)} alt="Bodega" />
                            </div>
                            <div className='container-vehiculos-info-text'>
                                <p>Volumen:<br /> {filteredWarehouses[0].volumen} m3</p>
                                <p>Area:<br /> {filteredWarehouses[0].area} m2</p>
                            </div>
                        </div>
                        <div className='container-vehiculos-name'>
                            <p>{filteredWarehouses[0].nombre}</p>
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
