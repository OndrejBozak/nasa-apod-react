import { useState, useEffect } from 'react'
import './App.css'

// Hlavní komponenta aplikace pro zobrazení astronomického obrázku dne od NASA
function App() {

  // Stav pro uložení dat z API
  const [data, setData] = useState(null);

  // Stav pro indikaci načítání
  const [loading, setLoading] = useState(true);

const API_KEY = import.meta.env.VITE_NASA_API_KEY; 
const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  // Spustí se po načtení komponenty pro načtení dat z API
  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(apiData => {
        setData(apiData);
        setLoading(false);
      })
      .catch(error => console.error("Chyba při načítání:", error));
  }, []);

  // Jednoduchý loading
  if (loading) return <div className="loader">Načítám vesmír...</div>;

  // Hlavní obsah
  return (
    <div className="container">
      <h1>Astronomický obrázek dne</h1>
      <p className="nasa-credit"> Tento snímek dne a doprovodný článek poskytuje NASA v rámci projektu Astronomy Picture of the Day (APOD).</p>
      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg" alt="NASA Logo" className="nasa-logo" />
      
      {data && (
        <div className="card">
          <h2>{data.title}</h2>
          <p className="date">{data.date}</p>
          
          {/* Podmíněné vykreslení obrázku nebo videa podle typu média */}
          {data.media_type === "image" ? (
            <img src={data.url} alt={data.title} className="nasa-img" />
          ) : (
            <iframe src={data.url} title={data.title} className="nasa-video" />
          )}
          {/* Popis obrázku nebo videa */}
          <div className="description">
            <p>{data.explanation}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App