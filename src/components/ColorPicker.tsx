import { useState, useEffect } from 'react';

const ColorPicker = () => {
  const [color, setColor] = useState<string>('#ffffff');

  // Cargar color desde localStorage al montar
  useEffect(() => {
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
      setColor(savedColor);
    }
  }, []);

  // Guardar color en localStorage cuando cambie
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem('selectedColor', newColor);
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <h2 style={{ 
        color: '#646cff', 
        marginBottom: '2rem',
        fontSize: '1.5rem'
      }}>
        🎨 Selector de Colores
      </h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="color"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          data-testid="color-input"
          style={{
            width: '200px',
            height: '60px',
            border: '2px solid #646cff',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        />
      </div>
      
      <div
        data-testid="color-display"
        style={{
          backgroundColor: color,
          width: '300px',
          height: '200px',
          margin: '0 auto',
          borderRadius: '12px',
          border: '2px solid #646cff',
          boxShadow: `0 0 30px ${color}`,
          transition: 'all 0.3s ease'
        }}
      />
      
      <p style={{ 
        marginTop: '1.5rem', 
        color: '#888',
        fontSize: '1.2rem',
        fontFamily: 'monospace'
      }}>
        Color seleccionado: <strong style={{ color: '#646cff' }}>{color.toUpperCase()}</strong>
      </p>
    </div>
  );
};

export default ColorPicker;