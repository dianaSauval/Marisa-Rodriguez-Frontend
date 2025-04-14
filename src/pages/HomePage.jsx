import React from 'react';
import cursos from '../data/cursos.json'; // o usá una constante si aún no tenés JSON
import '../assets/styles/pages/HomePage.css';
import cardsData from "../data/cardsData.json";
import { Grid } from '@mui/material';
import RotatingCard from '../components/RotatingCard';
import RotatingCardFront from '../components/RotatingCard/RotatingCardFront';
import RotatingCardBack from '../components/RotatingCard/RotatingCardBack';
import { useTheme } from "@mui/material/styles";




function HomePage() {
    const theme = useTheme();
console.log(theme.functions.linearGradient); // ✅ Debería dar una función
  return (
    <div className="homepage">
      <h1 className="titulo-principal">Marisa Rodríguez</h1>
      <p className="subtituloHome">Explorá tu camino interior ✨</p>

      {/* <div className="cursos-grid">
        {cursos.map((curso) => (
          <div key={curso.id} className="card-curso">
            <img src={curso.imagen} alt={curso.titulo} className="curso-imagen" />
            <h2>{curso.titulo}</h2>
            <p>{curso.descripcion}</p>
            <p className="precio">${curso.precio}</p>
          </div>
        ))}
      </div> */}
      <div>
        
      {<Grid container spacing={3} justifyContent="center" alignItems="center">
          {cardsData.map((card, index) => (
            <Grid
              item
              xs={12} // 1 tarjeta en pantallas muy pequeñas
              sm={6} // 2 tarjetas en pantallas pequeñas
              md={4} // 3 tarjetas en pantallas medianas
              lg={3} // 5 tarjetas en pantallas grandes
              key={index}
            >
              <RotatingCard flipped={false}>
                <RotatingCardFront
                  image={card.front.image}
                  icon=""
                  title={card.front.title}
                  description={card.front.description}
                  sx={{
                    backgroundPosition: "center top",
                  }}
                />
                <RotatingCardBack
                  image={card.back.image}
                  title={card.back.title}
                  description={card.back.description}
                  description2={card.back.description2}
                  action={card.back.action}
                  extraInfo={card.back.extraInfo}
                />
              </RotatingCard>
            </Grid>
          ))}
        </Grid>}
      </div>
    </div>
  );
}

export default HomePage;
