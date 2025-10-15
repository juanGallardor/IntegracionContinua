import { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem',
      position: 'relative',
      minHeight: '200px'
    }}>
      {/* Fondo animado con la hora gigante */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '8rem',
        fontWeight: 'bold',
        color: 'rgba(100, 108, 255, 0.05)',
        fontFamily: 'monospace',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {formatTime(time)}
      </div>

      {/* Reloj principal */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ 
          color: '#646cff', 
          marginBottom: '1rem',
          fontSize: '1.5rem'
        }}>
        Reloj Digital
        </h2>
        <div 
          data-testid="time-display"
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            color: '#646cff',
            textShadow: '0 0 20px rgba(100, 108, 255, 0.5)',
            letterSpacing: '0.1em'
          }}
        >
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;