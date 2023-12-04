import * as React from 'react';
import Button from '@mui/material/Button';
import BlackColor from './themes/theme';
import { Link } from 'react-router-dom';

export default function BasicButtons() {
    return (
        <Link to="/calculadora">
            <Button theme={BlackColor} variant="contained" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                ¿Quieres calcular tu mudanza?
            </Button>
        </Link>
    );
}
