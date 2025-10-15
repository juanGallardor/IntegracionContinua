import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [inputSeconds, setInputSeconds] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleStart = () => {
    const seconds = parseInt(inputSeconds);
    if (!isNaN(seconds) && seconds > 0) {
      setTimeLeft(seconds);
      setIsActive(true);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
    setInputSeconds('');
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
        ⏱️ Contador Regresivo
      </h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="number"
          value={inputSeconds}
          onChange={(e) => setInputSeconds(e.target.value)}
          placeholder="Ingresa segundos"
          disabled={isActive}
          data-testid="seconds-input"
          style={{
            padding: '0.8em 1.2em',
            fontSize: '1em',
            borderRadius: '8px',
            border: '1px solid #646cff',
            backgroundColor: isActive ? '#2a2a2a' : '#1a1a1a',
            color: '#fff',
            marginRight: '0.5rem',
            width: '150px'
          }}
        />
        <button 
          onClick={handleStart} 
          disabled={isActive} 
          data-testid="start-button"
          style={{ marginRight: '0.5rem' }}
        >
          Iniciar
        </button>
        <button 
          onClick={handleReset} 
          data-testid="reset-button"
        >
          Reiniciar
        </button>
      </div>
      
      <div 
        data-testid="timer-display"
        style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          color: timeLeft === 0 ? '#888' : '#646cff',
          textShadow: timeLeft > 0 ? '0 0 20px rgba(100, 108, 255, 0.5)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        {timeLeft} <span style={{ fontSize: '2rem' }}>seg</span>
      </div>
    </div>
  );
};

export default CountdownTimer;