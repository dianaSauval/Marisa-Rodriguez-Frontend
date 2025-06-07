import React from "react";
import "../assets/styles/pages/About.css";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>Sobre mí | Marisa Rodríguez</title>
        <link
          rel="canonical"
          href="https://marisarodriguezterapiasholisticas.com/about"
        />
        <meta
          name="description"
          content="Con más de 15 años de experiencia, acompaño procesos de sanación y transformación desde el amor y las terapias holísticas. Conocé mi camino."
        />
      </Helmet>

      <section className="about-container">
        <div className="about-content">
          <div className="about-image-container">
            <img
              src="https://res.cloudinary.com/dkdhdy9e5/image/upload/v1746138015/Marisa%20Rodriguez/marisa_perfil_npkbsx.jpg"
              alt="Marisa Rodríguez"
              className="about-image"
            />
          </div>
          <div className="about-text">
            <h1 className="about-title">Sobre mí</h1>
            <p>
              Hace más de 15 años camino con amor y entrega el sendero de las
              terapias holísticas. A lo largo de este tiempo, he tenido el
              privilegio de acompañar a muchas personas en sus procesos de
              transformación y despertar espiritual.
            </p>
            <p>
              Soy Maestra de Reiki y canalizadora del Reiki del Amado Miguel
              Arcángel, un sistema que llegó a mí como una herramienta de luz
              para estos tiempos. También canalicé mi propio sistema de
              Registros Akáshicos Angélicos, desde donde imparto formación y
              guía a quienes desean conectar con su alma y su propósito.
            </p>
            <p>
              Dirijo mi Escuela de Tarot, donde dicto cursos de Tarot Evolutivo,
              Tarot Avanzado, Lenormand y Rider Waite, siempre con una mirada
              integradora, espiritual y transformadora.
            </p>
            <p>
              Trabajo con Radiestesia y Péndulo Hebreo, e imparto formaciones en
              Runas y Angeología, acompañando procesos de sanación energética,
              conexión espiritual y expansión de conciencia.
            </p>
            <p>
              Además, soy profesora de Yoga, y desde el camino del Chamanismo
              Andino y la tradición Munay Ki, acompaño rituales de conexión
              profunda con la Pachamama. Soy guardiana de la Tierra y sostengo
              espacios de sanación femenina a través del Rito del Útero, donde
              honramos el linaje, la memoria ancestral y el poder creador que
              habita en cada una.
            </p>
            <p>
              Todo lo que ofrezco lo hago con profundo respeto, humildad y amor.
            </p>
            <p className="about-closing">
              Espero que podamos encontrarnos pronto y compartir juntos este
              camino de luz.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
