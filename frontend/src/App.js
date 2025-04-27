import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import ElectricalSafety from './components/ElectricalSafety/ElectricalSafety';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/electrical-safety/*" element={<ElectricalSafety />} />
            </Routes>
            <Outlet />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;