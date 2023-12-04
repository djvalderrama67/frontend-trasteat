import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './styles/style.css'
import SearchAppBar from './search'
import { fetchCategories } from '../actions/Categories'
import Categories from './categories'
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import CustomButton from './recursivebutton'
import Objects from './objects'
import Vehicles from './vehicles'
import Warehouse from './warehouse'

export const CalculadoraMain = () => {

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.reduxCategories.categories);
    const [selectedCategoryNombre, setSelectedCategoryNombre] = React.useState(null);
    const [totalArticles, setTotalArticles] = useState(0);
    const [totalVolumen, setTotalVolumen] = useState(0);
    const [resetIndicator, setResetIndicator] = useState(false);
    const [countersSpecialObject, setCountersSpecialObject] = useState({});
    const [recommendedVehicle, setRecommendedVehicle] = useState(null);
    const [recommendedWarehouse, setRecommendedWarehouse] = useState(null);
    const [selectedObjects, setSelectedObjects] = useState([]);

    const handleVehicleChange = (vehicle) => {
        setRecommendedVehicle(vehicle);
    };

    const handleWarehouseChange = (warehouse) => {
        setRecommendedWarehouse(warehouse);
    };

    const handleObjectsChange = (objects) => {
        setSelectedObjects(objects); // Actualiza el estado con los nuevos objetos seleccionados
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategoryClick = (nombre) => {
        setSelectedCategoryNombre(nombre);
    };

    const resetSpecialObjectCounters = () => {
        setCountersSpecialObject({});
    }

    const resetTotals = () => {
        setTotalArticles(0);
        setTotalVolumen(0);
        setResetIndicator(prev => !prev);
        resetSpecialObjectCounters();

        setTimeout(() => {
            setResetIndicator(prev => !prev);
        }, 100);
    };

    const enviarInventarioAlBackend = async () => {
        try {
            // Construir el array de objetos con la estructura adecuada
            const arrayDeObjetos = [];  // Ajusta esto para incluir los datos necesarios
            // Ejemplo: Agregar el total de artículos al array de objetos
            // Agregar la cantidad total de artículos al array de objetos
            arrayDeObjetos.push({ nombre: 'Total de artículos', cantidad: totalArticles });
            // Agregar el volumen total al array de objetos
            arrayDeObjetos.push({ nombre: 'Volumen total', volumen: totalVolumen });
            // Obtener información del vehículo recomendado
            if (recommendedVehicle) {
                arrayDeObjetos.push({
                    nombre: 'Vehículo recomendado',
                    vehiculo: {
                        nombre: recommendedVehicle.nombre,
                        capacidad_min: recommendedVehicle.capacidad_min,
                        capacidad_max: recommendedVehicle.capacidad_max,
                    },
                });
            }

            if (recommendedWarehouse) {
                arrayDeObjetos.push({
                    nombre: 'Bodega recomendada',
                    bodega: {
                        nombre: recommendedWarehouse.nombre,
                        volumen: recommendedWarehouse.volumen,
                        area: recommendedWarehouse.area,
                    },
                });
            }

            if (selectedObjects.length > 0) {
                arrayDeObjetos.push({
                    nombre: 'Inventario de objetos seleccionados',
                    objetos: selectedObjects.map(objeto => ({
                        nombre: objeto.nombre,
                        cantidad: objeto.cantidad,
                        volumen: objeto.volumen,
                    })),
                });
            }
            // Realizar la solicitud al backend
            const response = await fetch('http://localhost:8000/generar_excel/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: arrayDeObjetos }),
            });

            // Manejar la respuesta del servidor
            if (response.ok) {
                // Manejar la respuesta del servidor y obtener el blob del archivo Excel
                const blob = await response.blob();

                // Crear un objeto URL para el blob
                const url = window.URL.createObjectURL(blob);

                // Crear un enlace temporal y hacer clic en él para iniciar la descarga
                const a = document.createElement('a');
                a.href = url;
                a.download = 'inventario.xlsx'; // Puedes cambiar el nombre del archivo si lo deseas
                document.body.appendChild(a);
                a.click();

                // Limpiar el enlace y liberar recursos
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } else {
                // Manejar el caso en el que algo salió mal en el servidor
                alert('Error al generar el archivo Excel', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar datos al backend:', error);
            // Manejar errores aquí
        }
    };

    return (
        <div className="container-main">
            <div className="container-title-calculadora">
                <h2>Calcula el volumen de tu mudanza</h2>
            </div>
            <div className="consejo-text">
                <p>Con nuestra calculadora, obtendrás estimaciones precisas para que puedas enfocarte en lo que realmente importa: dar el siguiente paso en tu nueva aventura.</p>
                <p>¡Comencemos a calcular el volumen y a hacer tu mudanza más fluida que nunca!</p>
            </div>
            <div className="container-calculadora">
                <div className="container-calculadora-head">
                    <div className="container-calculadora-search">
                        <SearchAppBar />
                    </div>
                    <div className="container-calculadora-title">
                        <h2>Selecciona una categoría</h2>
                    </div>
                </div>
                <div className="container-calculadora-componentes">
                    <div className="container-calculadora-categorias-items">
                        <div className="container-calculadora-categorias">
                            <Categories categories={categories} onCategoryClick={handleCategoryClick} />
                        </div>
                        <div className="container-calculadora-categorias-items">
                            {selectedCategoryNombre && (
                                <Objects selectedCategoryNombre={selectedCategoryNombre} totalArticles={totalArticles}
                                    setTotalArticles={setTotalArticles} totalVolumen={totalVolumen} setTotalVolumen={setTotalVolumen} resetIndicator={resetIndicator} countersSpecialObject={countersSpecialObject} setCountersSpecialObject={setCountersSpecialObject} onObjectsChange={handleObjectsChange} />
                            )}
                        </div>
                    </div>
                    <div className="container-calculadora-inventario">
                        <div className="container-calculadora-inventario-title">
                            <h4>Cantidad de artículos</h4>
                        </div>
                        <div className="container-calculadora-inventario-items-text">
                            <p>{totalArticles} artículos</p>
                        </div>
                        <div className="container-calculadora-inventario-title">
                            <h4>Volumen en metros cúbicos</h4>
                        </div>
                        <div className="container-calculadora-inventario-items-text">
                            <p>{totalVolumen} m&sup3;</p>
                        </div>
                        <div className="container-calculadora-inventario-title">
                            <h4>Vehículo recomendado</h4>
                        </div>
                        <div className="container-calculadora-inventario-items">
                            <Vehicles totalVolumen={totalVolumen} onVehicleChange={handleVehicleChange} />
                        </div>
                        <div className="container-calculadora-inventario-title">
                            <h4>Capacidad en m&sup3; y m&sup2; de la bodega recomendada</h4>
                        </div>
                        <div className="container-calculadora-inventario-items">
                            <Warehouse totalVolumen={totalVolumen} onWarehouseChange={handleWarehouseChange} />
                        </div>
                        <div className="container-calculadora-inventario-buttons">
                            <div className="repeat-button" onClick={resetTotals}>
                                <ReplayCircleFilledIcon style={{ fontSize: 100 }} />
                            </div>
                            <div className="recursive-button" onClick={enviarInventarioAlBackend} >
                                <CustomButton content="Descargar inventario" link="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
