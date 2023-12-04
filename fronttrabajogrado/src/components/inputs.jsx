import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ texto, onChange, value }) {
    return (
        <div className="container-Inputs">
            <Box component="form" nsx={{
                '& > :not(style)': { m: 1, width: '25ch', background: 'grey'},
            }}
            noValidate
            autoComplete="off">
                <TextField
                    id="outlined-basic"
                    label={texto}
                    variant="outlined"
                    sx={{ fontSize: '10px'}}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                />
            </Box>
        </div>
    );
}
