import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllObjects } from '../actions/Objects';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CustomButton from './recursivebutton'
import InputText from './inputs'

const homeImages = require.context('../components/icons', true);

const Objects = ({ selectedCategoryNombre, totalArticles, setTotalArticles, totalVolumen, setTotalVolumen, resetIndicator, onObjectsChange, }) => {
    const dispatch = useDispatch();
    const objects = useSelector((state) => state.reduxObjects.objects);
    const [showSpecialObjectForm, setShowSpecialObjectForm] = useState(false);
    const [specialObjectCounter, setSpecialObjectCounter] = useState(1);
    const [countersSpecialObject, setCountersSpecialObject] = useState({ 0: 1 });
    const [selectedSpecialObject, setSelectedSpecialObject] = useState(null);



    const handleCancel = () => {
        setSpecialObjectValues({
            nombre: '',
            ancho: '',
            largo: '',
            alto: '',
        });
    };


    useEffect(() => {
        if (selectedCategoryNombre) {
            dispatch(fetchAllObjects(selectedCategoryNombre));
        }
    }, [selectedCategoryNombre, dispatch]);

    const filteredObjects = selectedCategoryNombre
        ? objects.filter(object => object.categoria === selectedCategoryNombre)
        : objects;

    const [counters, setCounters] = useState({});
    const [categoryCounters, setCategoryCounters] = useState({});
    const [specialObjectValues, setSpecialObjectValues] = useState({
        nombre: '',
        ancho: '',
        largo: '',
        alto: '',
    });
    const [speciallySavedObjects, setSpeciallySavedObjects] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const handleIncrement = (index) => {
        setCounters((prevCounters) => ({
            ...prevCounters,
            [index]: (prevCounters[index] || 0) + 1,
        }));

        setCategoryCounters((prevCategoryCounters) => ({
            ...prevCategoryCounters,
            [selectedCategoryNombre]: {
                ...prevCategoryCounters[selectedCategoryNombre],
                [index]: (prevCategoryCounters[selectedCategoryNombre]?.[index] || 0) + 1,
            },
        }));

        setTotalArticles((prevTotal) => prevTotal + 1);

        setTotalVolumen((prevTotalVolumen) => {
            const object = filteredObjects[index];
            if (object && object.volumen) {
                const newTotalVolumen = prevTotalVolumen + object.volumen;
                return parseFloat(newTotalVolumen.toFixed(2));
            }
            return prevTotalVolumen;
        });

        // Crear el objeto del artículo seleccionado
        const selectedObject = filteredObjects[index];
        const existingItemIndex = selectedItems.findIndex(
            (item) => item.nombre === selectedObject.nombre
        );

        if (existingItemIndex !== -1) {
            // Si el objeto ya está en la lista, actualizar la cantidad
            const updatedItems = [...selectedItems];
            updatedItems[existingItemIndex].cantidad += 1;

            // Eliminar el objeto si la cantidad llega a cero después de incrementar
            if (updatedItems[existingItemIndex].cantidad === 0) {
                updatedItems.splice(existingItemIndex, 1);
            }

            setSelectedItems(updatedItems);
        } else {
            // Si el objeto no está en la lista, agregarlo con cantidad 1
            const newSelectedItem = {
                nombre: selectedObject.nombre,
                ancho: selectedObject.ancho,
                largo: selectedObject.largo,
                alto: selectedObject.alto,
                categoria: selectedObject.categoria,
                volumen: selectedObject.volumen,
                cantidad: counters[index] || 1,
            };

            // Actualizar el estado de los artículos seleccionados
            setSelectedItems((prevItems) => [...prevItems, newSelectedItem]);
        }
    };

    const handleDecrement = (index) => {
        if (counters[index] > 0) {
            setCounters((prevCounters) => ({
                ...prevCounters,
                [index]: prevCounters[index] - 1,
            }));

            setCategoryCounters((prevCategoryCounters) => ({
                ...prevCategoryCounters,
                [selectedCategoryNombre]: {
                    ...prevCategoryCounters[selectedCategoryNombre],
                    [index]: (prevCategoryCounters[selectedCategoryNombre]?.[index] || 0) - 1,
                },
            }));

            setTotalArticles((prevTotal) => prevTotal - 1);

            setTotalVolumen((prevTotalVolumen) => {
                const object = filteredObjects[index];
                if (object && object.volumen) {
                    const newTotalVolumen = prevTotalVolumen - object.volumen;
                    return parseFloat(newTotalVolumen.toFixed(2));
                }
                return prevTotalVolumen;
            });

            // Reducir la cantidad del objeto en la lista
            const existingItemIndex = selectedItems.findIndex(
                (item) => item.nombre === filteredObjects[index].nombre
            );

            if (existingItemIndex !== -1) {
                const updatedItems = [...selectedItems];
                updatedItems[existingItemIndex].cantidad -= 1;

                // Eliminar el objeto si la cantidad llega a cero
                if (updatedItems[existingItemIndex].cantidad < 1) {
                    updatedItems.splice(existingItemIndex, 1);
                }

                setSelectedItems(updatedItems);
            }
        }
    };

    const removeObjectFromArray = (index) => {
        if (selectedCategoryNombre === "Objeto especial") {
            // Eliminar el objeto especial del array
            const updatedObjects = [...speciallySavedObjects];
            updatedObjects.splice(index, 1);
            setSpeciallySavedObjects(updatedObjects);

            // Actualizar el contador especial si es mayor a 0
            if (countersSpecialObject[index] > 0) {
                setSpecialObjectCounter((prevCounter) => prevCounter - 1);
            }
        } else {
            // Eliminar el objeto del array
            const updatedItems = [...selectedItems];
            updatedItems.splice(index, 1);
            setSelectedItems(updatedItems);

            // Actualizar el contador normal si es mayor a 0
            if (counters[index] > 0) {
                setTotalArticles((prevTotal) => prevTotal - 1);
            }
        }
    };

    useEffect(() => {
        if (resetIndicator) {
            setCounters({});
            setCategoryCounters({});
            removeObjectFromArray(0);

        } else if (selectedCategoryNombre && categoryCounters[selectedCategoryNombre]) {
            setCounters(categoryCounters[selectedCategoryNombre]);
        } else {
            setCounters({});
        }
        onObjectsChange(selectedItems);
    }, [resetIndicator, selectedCategoryNombre, categoryCounters, selectedItems, onObjectsChange]);

    const handleInputChange = (field, value) => {
        setSpecialObjectValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    };

    const handleSaveSpecialObject = () => {

        const { nombre, ancho, largo, alto } = specialObjectValues;
        if (!nombre || !ancho || !largo || !alto) {
            return;
        }

        const newSpecialObject = {
            categoria: 'Objeto especial',
            nombre,
            ancho,
            largo,
            alto,
            volumen: parseFloat((ancho * largo * alto).toFixed(2)),
        };

        setSpeciallySavedObjects((prevObjects) => [...prevObjects, newSpecialObject]);

        // Obtener el índice del nuevo objeto especial
        const index = speciallySavedObjects.length;

        setSpecialObjectCounter((prevCounter) => prevCounter + 1);

        setCountersSpecialObject((prevCounters) => ({
            ...prevCounters,
            [index]: 1, // Inicializar el contador en 1 para el nuevo objeto
        }));

        setTotalArticles((prevTotal) => prevTotal + 1);

        setTotalVolumen((prevTotalVolumen) => {
            const newTotalVolumen = prevTotalVolumen + newSpecialObject.volumen;
            return parseFloat(newTotalVolumen.toFixed(2));
        });

        // Crear el objeto del artículo especial seleccionado
        const newSelectedSpecialObject = {
            nombre,
            ancho,
            largo,
            alto,
            cantidad: 1, // Inicializar la cantidad en 1 para el nuevo objeto
        };

        setSelectedSpecialObject(newSelectedSpecialObject);

        setSpecialObjectValues({
            nombre: '',
            ancho: '',
            largo: '',
            alto: '',
        });

        setShowSpecialObjectForm(false);
        setSelectedItems((prevItems) => [...prevItems, newSelectedSpecialObject]);
    };

    const handleSpecialIncrement = (index) => {
        setSpecialObjectCounter((prevCounter) => prevCounter + 1);

        setCountersSpecialObject((prevCounters) => ({
            ...prevCounters,
            [index]: (prevCounters[index] || 0) + 1,
        }));

        setTotalArticles((prevTotal) => prevTotal + 1);

        setTotalVolumen((prevTotalVolumen) => {
            const object = speciallySavedObjects[index];
            if (object && object.volumen) {
                const newTotalVolumen = prevTotalVolumen + object.volumen;
                return parseFloat(newTotalVolumen.toFixed(2));
            }
            return prevTotalVolumen;
        });

        if (!selectedSpecialObject) {
            // Crear el objeto del artículo especial seleccionado
            const newSelectedSpecialObject = {
                nombre: specialObjectValues.nombre,
                ancho: specialObjectValues.ancho,
                largo: specialObjectValues.largo,
                alto: specialObjectValues.alto,
                cantidad: countersSpecialObject[index] || 1,
            };

            setSelectedSpecialObject(newSelectedSpecialObject);
        } else {
            // Actualizar la cantidad del objeto especial seleccionado
            setSelectedSpecialObject((prevSelectedSpecialObject) => ({
                ...prevSelectedSpecialObject,
            }));
        }

        // Actualizar solo la cantidad del objeto especial en selectedItems
        setSelectedItems((prevItems) => {
            const updatedItems = [...prevItems];
            const specialObjectIndex = updatedItems.findIndex(
                (item) => item.nombre === selectedSpecialObject.nombre
            );

            if (specialObjectIndex !== -1) {
                // Si el objeto especial ya está en la lista, actualizar la cantidad
                updatedItems[specialObjectIndex].cantidad = specialObjectCounter;
            } else {
                // Si el objeto especial no está en la lista, agregarlo con cantidad 1
                updatedItems.push(selectedSpecialObject);
            }

            return updatedItems;
        });
    };

    const handleSpecialDecrement = (index) => {
        setSpecialObjectCounter((prevCounter) => prevCounter - 1);

        setCountersSpecialObject((prevCounters) => ({
            ...prevCounters,
            [index]: prevCounters[index] - 1,
        }));

        setTotalArticles((prevTotal) => prevTotal - 1);

        setTotalVolumen((prevTotalVolumen) => {
            const object = speciallySavedObjects[index];
            if (object && object.volumen) {
                const newTotalVolumen = prevTotalVolumen - object.volumen;
                return parseFloat(newTotalVolumen.toFixed(2));
            }
            return prevTotalVolumen;
        });

        if (countersSpecialObject[index] > 1) {

            const existingItemIndex = selectedItems.findIndex(
                (item) => item.nombre === speciallySavedObjects[index].nombre
            );

            if (existingItemIndex !== -1) {
                const updatedItems = [...selectedItems];
                updatedItems[existingItemIndex].cantidad -= 1;

                if (updatedItems[existingItemIndex].cantidad < 1) {
                    // Eliminar el objeto especial del array
                    const updatedObjects = [...speciallySavedObjects];
                    updatedObjects.splice(index, 1);
                    setSpeciallySavedObjects(updatedObjects);

                    // Eliminar el objeto si la cantidad llega a cero
                    updatedItems.splice(existingItemIndex, 1);
                }

                setSelectedItems(updatedItems);
            }
        } else {
            // Si el contador es 0, eliminar el objeto directamente
            const updatedObjects = [...speciallySavedObjects];
            updatedObjects.splice(index, 1);
            setSpeciallySavedObjects(updatedObjects);
        }
    };

    return (
        <div className='container-objects'>
            {selectedCategoryNombre === "Objeto especial" ? (
                (speciallySavedObjects.length === 0 || showSpecialObjectForm) ? (
                    <div className='container-object-special-form'>
                        <div className='container-object-special-form-info'>
                            <div className='container-object-special-image'>
                                <img src={homeImages(`./${selectedCategoryNombre}/Objeto especial.svg`)} alt={selectedCategoryNombre} />
                            </div>
                            <div className='container-object-special-title'>
                                <h2>{selectedCategoryNombre}</h2>
                            </div>
                            <div className='container-object-special-info'>
                                <p>Por favor, ingresa el nombre y las medidas del objeto que desees agregar a tu listado, asegurándote que las medidas sean en metros (m).</p>
                            </div>
                        </div>
                        <div className='container-object-special-form-inputs'>
                            <div className='container-object-special-form-inputs-name'>
                                <h4>Nombre</h4>
                                <InputText texto='Nombre del artículo' onChange={(value) => handleInputChange('nombre', value)} value={specialObjectValues.nombre} />
                                <h4>Ancho</h4>
                                <InputText texto='Ancho en metros' onChange={(value) => handleInputChange('ancho', value)} value={specialObjectValues.ancho} />
                                <h4>Largo</h4>
                                <InputText texto='Largo en metros' onChange={(value) => handleInputChange('largo', value)} value={specialObjectValues.largo} />
                                <h4>Alto</h4>
                                <InputText texto='Alto en metros' onChange={(value) => handleInputChange('alto', value)} value={specialObjectValues.alto} />
                                <div className='container-object-special-form-inputs-buttons'>
                                    <CustomButton content='Cancelar' onClick={() => { handleCancel(); }} />
                                    <CustomButton content='Guardar' onClick={handleSaveSpecialObject} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {speciallySavedObjects.map((savedObject, index) => (
                            <div key={index} className='object-item'>
                                <div className='container-objects-image'>
                                    <img src={homeImages(`./${selectedCategoryNombre}/Objeto especial.svg`)} alt={selectedCategoryNombre} />
                                </div>
                                <div className='container-objects-title'>
                                    <h2>{savedObject.nombre}</h2>
                                    <p>({savedObject.largo} X {savedObject.ancho} X {savedObject.alto})</p>
                                </div>
                                <div className='container-objects-buttons'>
                                    <button onClick={() => handleSpecialDecrement(index)}>
                                        <RemoveIcon style={{ fontSize: '15px' }} />
                                    </button>
                                    {countersSpecialObject[index] > 0 && <div className='container-objects-count'><span>{countersSpecialObject[index]}</span></div>}
                                    <button onClick={() => handleSpecialIncrement(index)}>
                                        <AddIcon style={{ fontSize: '15px' }} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className='container-object-special-button'>
                            <CustomButton content='Crear otro objeto' onClick={() => setShowSpecialObjectForm(true)} />
                        </div>
                    </>
                )
            ) : (
                filteredObjects.length === 0 ? (
                    <div className='container-objects-empty'>
                        <h2>¡No hay objetos en esta categoría!</h2>
                    </div>
                ) : (
                    filteredObjects.map((object, index) => (
                        <div key={index} className='object-item'>
                            <div className='container-objects-image'>
                                <img src={homeImages(`./${selectedCategoryNombre}/${object.nombre}.svg`)} alt={object.nombre} />
                            </div>
                            <div className='container-objects-title'>
                                <h2>{object.nombre}</h2>
                                <p>({object.largo} X {object.ancho} X {object.alto})</p>
                            </div>
                            <div className='container-objects-buttons'>
                                <button onClick={() => handleDecrement(index)}>
                                    <RemoveIcon style={{ fontSize: '15px' }} />
                                </button>
                                {counters[index] > 0 && <div className='container-objects-count'><span>{counters[index]}</span></div>}
                                <button onClick={() => handleIncrement(index)}>
                                    <AddIcon style={{ fontSize: '15px' }} />
                                </button>
                            </div>
                        </div>
                    ))
                )
            )}
        </div>
    );
}

export default Objects;
