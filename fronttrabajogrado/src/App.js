import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './views/home';
import { CalculadoraPage } from './views/calculator';
import { ConsejosPage } from './views/tips';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/calculadora" element={<CalculadoraPage />} />
                <Route path="/consejos" element={<ConsejosPage />} />
            </Routes>
        </Router>
    );
}

export default App;
