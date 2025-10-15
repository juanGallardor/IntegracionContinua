import { useState } from 'react';

const NAMES = [
  'Ana García',
  'Carlos Rodríguez',
  'María López',
  'Juan Martínez',
  'Laura Sánchez',
  'Pedro Hernández',
  'Sofía González',
  'Diego Pérez',
  'Valentina Ramírez',
  'Andrés Torres'
];

const SearchList = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredNames = NAMES.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{ 
        color: '#646cff', 
        marginBottom: '2rem',
        fontSize: '1.5rem'
      }}>
        🔍 Buscador en Lista
      </h2>
      
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar nombre..."
        data-testid="search-input"
        style={{
          padding: '0.8em 1.2em',
          fontSize: '1em',
          borderRadius: '8px',
          border: '1px solid #646cff',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          width: '100%',
          marginBottom: '2rem'
        }}
      />
      
      {filteredNames.length > 0 ? (
        <ul 
          data-testid="names-list"
          style={{
            listStyle: 'none',
            padding: 0,
            textAlign: 'left'
          }}
        >
          {filteredNames.map((name, index) => (
            <li
              key={index}
              style={{
                padding: '1em',
                marginBottom: '0.5rem',
                backgroundColor: '#1a1a1a',
                border: '1px solid #646cff',
                borderRadius: '8px',
                color: '#fff',
                transition: 'all 0.2s ease'
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      ) : (
        <p 
          data-testid="no-results"
          style={{ 
            color: '#888', 
            fontSize: '1.2rem',
            marginTop: '2rem'
          }}
        >
          ❌ No se encontraron resultados
        </p>
      )}
      
      <p style={{ 
        marginTop: '2rem', 
        color: '#888',
        fontSize: '0.9rem'
      }}>
        Mostrando {filteredNames.length} de {NAMES.length} resultados
      </p>
    </div>
  );
};

export default SearchList;