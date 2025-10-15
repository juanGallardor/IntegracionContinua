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

  // Calcular ángulos para las manecillas
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondAngle = seconds * 6; // 360/60 = 6 grados por segundo
  const minuteAngle = minutes * 6 + seconds * 0.1; // 6 grados por minuto + ajuste por segundos
  const hourAngle = hours * 30 + minutes * 0.5; // 30 grados por hora + ajuste por minutos

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Fondo animado con la hora gigante */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(8rem, 20vw, 15rem)',
        fontWeight: 'bold',
        color: 'rgba(100, 108, 255, 0.03)',
        fontFamily: 'monospace',
        pointerEvents: 'none',
        zIndex: 0,
        whiteSpace: 'nowrap'
      }}>
        {formatTime(time)}
      </div>

      {/* Contenido principal */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Título */}
        <h2 style={{ 
          color: '#646cff', 
          marginBottom: '2rem',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          Reloj Digital
        </h2>

        {/* Hora digital grande */}
        <div 
          data-testid="time-display"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            color: '#646cff',
            textShadow: '0 0 20px rgba(100, 108, 255, 0.5), 0 0 40px rgba(100, 108, 255, 0.3)',
            letterSpacing: '0.1em',
            marginBottom: '3rem'
          }}
        >
          {formatTime(time)}
        </div>

        {/* Reloj analógico */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          marginTop: '2rem'
        }}>
          <div style={{ 
            position: 'relative',
            width: '350px',
            height: '350px'
          }}>
            {/* Resplandor de fondo */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(100, 108, 255, 0.3) 0%, transparent 70%)',
              filter: 'blur(40px)',
              animation: 'pulse 2s ease-in-out infinite'
            }} />

            {/* Cara del reloj */}
            <img 
              src="/images/clock-face-clean.png" 
              alt="Clock Face"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 20px rgba(100, 108, 255, 0.6))',
                zIndex: 1
              }}
            />

            {/* Manecilla de horas */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '8px',
                height: '25%',
                marginLeft: '-4px',
                marginTop: '-25%',
                transformOrigin: 'bottom center',
                transform: `rotate(${hourAngle}deg)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
                zIndex: 20
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to top, #646cff, #818cf8, #a5b4fc)',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(100, 108, 255, 0.8), 0 0 20px rgba(100, 108, 255, 0.4)'
              }} />
            </div>

            {/* Manecilla de minutos */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '6px',
                height: '35%',
                marginLeft: '-3px',
                marginTop: '-35%',
                transformOrigin: 'bottom center',
                transform: `rotate(${minuteAngle}deg)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
                zIndex: 25
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to top, #646cff, #818cf8, #c7d2fe)',
                borderRadius: '3px',
                boxShadow: '0 0 10px rgba(100, 108, 255, 0.8), 0 0 20px rgba(100, 108, 255, 0.4)'
              }} />
            </div>

            {/* Manecilla de segundos */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '3px',
                height: '40%',
                marginLeft: '-1.5px',
                marginTop: '-40%',
                transformOrigin: 'bottom center',
                transform: `rotate(${secondAngle}deg)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
                zIndex: 30
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to top, #ef4444, #f87171, #fca5a5)',
                borderRadius: '2px',
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.8), 0 0 16px rgba(239, 68, 68, 0.4)'
              }} />
            </div>

            {/* Centro del reloj */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '14px',
              height: '14px',
              backgroundColor: '#646cff',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 10px rgba(100, 108, 255, 1), 0 0 20px rgba(100, 108, 255, 0.6)',
              zIndex: 40
            }} />
          </div>
        </div>
      </div>

      {/* Estilos para la animación de pulso */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default DigitalClock;