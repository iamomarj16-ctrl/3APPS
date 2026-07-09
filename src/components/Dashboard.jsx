import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      {/* Navbar ka code direct yahan daal diya taaki import ka error khatam ho jaye */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        padding: '15px', 
        background: '#333',
        color: '#fff' 
      }}>
        <Link to="/dashboard/github"><button style={{ padding: '8px 15px', cursor: 'pointer' }}>Github Finder</button></Link>
        <Link to="/dashboard/weather"><button style={{ padding: '8px 15px', cursor: 'pointer' }}>Weather App</button></Link>
        <Link to="/dashboard/todo"><button style={{ padding: '8px 15px', cursor: 'pointer' }}>Todo App</button></Link>
      </nav>
      
      {/* Is area ke andar aapke teeno apps render honge */}
      <div style={{ padding: '20px', marginTop: '20px' }}>
        <Outlet /> 
      </div>
    </div>
  );
}

export default Dashboard;