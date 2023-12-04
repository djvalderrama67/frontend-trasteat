import React from 'react'
import './styles/style.css'
import ButtonManual from './button'

const homeImages = require.context('./images', true)

export const InicioHome = () => {
    return (
        <div className="container-main">
            <div className="container-title">
                <h2>¡Bienvenido a nuestra calculadora de volumen para mudanzas!</h2>
            </div>
            <div className="container-logo">
                <img src={homeImages("./Logo_TrasteaTHome.png")} alt="Logo TrasteaT" />
            </div>
            <h3>¿Qué es TrasteaT?</h3>
            <div className="container-text">
                <p>TrasteaT es una herramienta web que transformará por completo tu experiencia de mudanza. Diseñada para brindarte una planificación precisa y sin complicaciones, TrasteaT te permite calcular el volumen de tus objetos de manera rápida y eficiente, garantizando que cada paso de tu mudanza esté cuidadosamente organizado.<br />
                    <br />Olvídate de las conjeturas y el estrés relacionado con el espacio en el vehículo o en la bodega; con TrasteaT, recibirás estimaciones precisas y recomendaciones personalizadas para optimizar tu planificación. Con su interfaz intuitiva, podrás agregar objetos, visualizar un resumen completo de tu selección y recibir consejos prácticos para empacar de manera eficiente. Simplifica tu mudanza, toma el control y disfruta de un proceso sin complicaciones con TrasteaT a tu lado.</p>
            </div>
            <div className="container-instructivo">
                <h3>¿Cómo usar TrasteaT?</h3>
                <div className="container-text-img">
                    <div>
                        <img src={homeImages("./Instructivo_1.png")} alt="Instructivo Uno" />
                    </div>
                    <div className="container-text-instructivo">
                        <h4>Selecciona una Categoría</h4>
                        <p>Haz clic en la categoría que mejor describa el tipo de objeto que deseas calcular</p>
                        <h4><b>Agregar o eliminar objetos</b></h4>
                        <p>Una vez hayas seleccionado una categoría, verás una lista de objetos típicos en esa categoría. Haz clic en los simbolos “+” o “-” para agregar o eliminar los objetos que planeas llevar contigo en tu mudanza</p>
                        <div className='instructivo-button'>
                            <ButtonManual />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-text-img">
                <div>
                    <img src={homeImages("./Instructivo_2.png")} alt="Instructivo Dos" />
                </div>
                <div className="container-text-instructivo">
                    <h4><b>¿No encuentras un objeto?</b></h4>
                    <p> Si no encuentras un objeto en el listado, puedes hacer uso de la barra de navegación “Buscar” escribiendo el nombre del objeto, si no muestra ningún resultado, puedo añadirlo manualmente.<br />
                        <br />Si no encuentras un objeto específico, podras navegar dentro de la categoria “Otros” o buscar “Objeto especial” para agregarlo manualmente en la opción "Crear objeto".</p>
                    <div className='instructivo-button'>
                        <ButtonManual />
                    </div>
                </div>
            </div>
            <div className="container-text-img">
                <div>
                    <img src={homeImages("./Instructivo_3.png")} alt="Instructivo Tres" />
                </div>
                <div className="container-text-instructivo">
                    <h4><b>Crear un Objeto</b></h4>
                    <p>Eventualmente podrás observar los campos para completar:<br />
                        <br />- Nombre del artículo.
                        <br />- Ancho en metros.
                        <br />- Largo en metros.
                        <br />- Alto en metros.<br />
                        <br />Una vez completado los campos, haz clic en “Guardar” para  añadir el objeto especial a tu inventario.</p>
                    <div className='instructivo-button'>
                        <ButtonManual />
                    </div>
                </div>
            </div>
            <div className="container-text-img">
                <div>
                    <img src={homeImages("./Instructivo_4.png")} alt="Instructivo Cuatro" />
                </div>
                <div className="container-text-instructivo">
                    <h4><b>Revisa y Ajusta</b></h4>
                    <p>Eventualmente podrás observar los campos para completar:<br />
                        <br />- Nombre del artículo.
                        <br />- Ancho en metros.
                        <br />- Largo en metros.
                        <br />- Alto en metros.<br />
                        <br />Una vez completado los campos, haz clic en “Guardar” para  añadir el objeto especial a tu inventario.</p>
                    <div className='instructivo-button'>
                        <ButtonManual />
                    </div>
                </div>
            </div>
            <div className="container-text-img">
                <div>
                    <img src={homeImages("./Instructivo_5.png")} alt="Instructivo Cinco" />
                </div>
                <div className="container-text-instructivo">
                    <h4><b>Reiniciar el Cálculo</b></h4>
                    <p>Podras hacer uso del boton “Reset” para borrar toda la informacion y empezar un nuevo cálculo.</p>
                    <h4><b>Descar Listado</b></h4>
                    <p>Cuando hayas finalizado tu seleccion de objetos, podras exportar tu inventario a una hoja de calculo de Excel</p>
                    <div className='instructivo-button'>
                        <ButtonManual />
                    </div>
                </div>
            </div>
        </div>
    )
}
