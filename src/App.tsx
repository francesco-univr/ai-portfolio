import React from 'react';

function App() {
  console.log('App component rendering - basic test...');
  
  return (
    <div style={{ backgroundColor: 'green', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', margin: '20px 0' }}>✅ REACT WORKS!</h1>
        <p style={{ fontSize: '1.5rem' }}>If you see this green screen, React is working correctly</p>
        <p style={{ fontSize: '1rem', marginTop: '20px' }}>Check console for "App component rendering" message</p>
      </div>
    </div>
  );
}

export default App;
