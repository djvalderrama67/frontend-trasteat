import React from 'react';

const homeImages = require.context('../components/icons/Categorias', true);

const Categories = ({ categories, onCategoryClick }) => {
    return (
        <div className='container-categorias'>
            {categories.map((category) => (
                <button key={category.idCategoria} onClick={() => onCategoryClick(category.nombre)}>
                    <img src={homeImages(`./${category.nombre}.svg`)} alt={category.nombre} />
                    <div className='container-categorias-title'>
                        <h2>{category.nombre}</h2>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default Categories;
