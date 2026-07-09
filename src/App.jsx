import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Gf from './components/gf'; // Aapki file ka sahi naam 'gf'
import Weather from './components/Weather';
import Todo from './components/Todo';
if (typeof document !== 'undefined') {
  document.body.style.backgroundColor = '#0f172a';
  document.body.style.color = '#ffffff';
  document.documentElement.style.scrollBehavior = 'smooth';
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Nested Routes */}
          <Route path="github" element={<Gf />} /> {/* Rasta 'github' rahega, component 'Gf' load hoga */}
          <Route path="weather" element={<Weather />} />
          <Route path="todo" element={<Todo />} />
        </Route>
        
        {/* Default route */}
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;