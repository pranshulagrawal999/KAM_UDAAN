// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the updated import path
import App from './App';
import './styles.css'; // Ensure this path is correct
import './index.css'; 

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Create a root.

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
