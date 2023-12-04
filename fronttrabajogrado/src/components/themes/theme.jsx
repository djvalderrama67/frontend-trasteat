import { createTheme } from '@mui/material/styles';

//en esta parte crearemos el tema personalizado del color que queremos en el navbar y la tipografia
const theme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    fontFamily: 'Fredoka',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '10px 10px',
                    width: '100%',
                    fontFamily: 'Fredoka',
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#FFFFFF',
                        color: '#000000',
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'Fredoka',
                },
            },
        },
    },
});

export default theme;

