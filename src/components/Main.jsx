import { useState } from "react";
import data from "../data.json";
import "../styles/components/main.css";

function Main() {
  const [années, setAnnées] = useState(2025);
  const [moisIndex, setMoisIndex] = useState(0);

  const calendrier = data[0];

  // Fonction pour vérifier si l'année est bissextile
  const isBissextile = (année) => {
    return (année % 4 === 0 && année % 100 !== 0) || année % 400 === 0;
  };

  // Fonction pour obtenir les jours de chaque mois en fonction de l'année
  const getJours = (moisIndex) => {
    const moisJours = [
      31,
      isBissextile(années) ? 29 : 28,
      31,
      30,
      31,
      30, // Janvier - Juin
      31,
      31,
      30,
      31,
      30,
      31, // Juillet - Décembre
    ];
    return moisJours[moisIndex];
  };

  // Fonction pour obtenir le jour de la semaine du 1er jour du mois
  const getFirstDayOfMonth = (moisIndex) => {
    const date = new Date(années, moisIndex, 1);
    return date.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  };

  const addAnnée = () => {
    setAnnées(années + 1);
  };

  const removeAnnée = () => {
    if (années > 2025) {
      setAnnées(années - 1);
    }
  };

  const nextMonth = () => {
    if (moisIndex < calendrier.mois.length - 1) {
      setMoisIndex(moisIndex + 1);
    }
  };

  const prevMonth = () => {
    if (moisIndex > 0) {
      setMoisIndex(moisIndex - 1);
    }
  };

  // Calculer les jours à afficher pour le mois courant
  const totalJours = getJours(moisIndex);
  const firstDay = getFirstDayOfMonth(moisIndex); // Jour de la semaine du 1er jour du mois
  const daysArray = Array.from({ length: totalJours }, (_, i) => i + 1); // Crée un tableau avec les dates du mois

  // Réorganiser les jours pour que l'affichage commence par Lundi
  const rearrangedDays = [
    ...calendrier.jours.slice(1),  // Jours après lundi
    calendrier.jours[0]            // Dimanche à la fin
  ];

  // Le premier jour (premier jour du mois dans notre logique) devient un "mercredi" (2)
  const adjustedFirstDay = (firstDay + 6) % 7;  // Pour déplacer le dimanche à la fin et commencer par lundi

  return (
    <main>
      <h1>Calendrier des sorties</h1>
      <div className="main__années">
        {années > 2025 && (
          <button onClick={removeAnnée}>
            <i
              className="fa-solid fa-arrow-left"
              style={{ color: " #000000" }}
            ></i>
          </button>
        )}
        <div className="main__années-title">
          <h2>{années}</h2>
        </div>
        <button onClick={addAnnée}>
          <i
            className="fa-solid fa-arrow-right"
            style={{ color: " #000000" }}
          ></i>
        </button>
      </div>

      <div className="main__mois">
        {moisIndex > 0 && (
          <button onClick={prevMonth}>
            <i
              className="fa-solid fa-arrow-left"
              style={{ color: " #000000" }}
            ></i>
          </button>
        )}
        <div className="main__mois-title">
          <h3>{calendrier.mois[moisIndex]}</h3>
        </div>
        {moisIndex !== 11 && (
          <button onClick={nextMonth}>
            <i
              className="fa-solid fa-arrow-right"
              style={{ color: " #000000" }}
            ></i>
          </button>
        )}
      </div>

      {/* Affichage des jours de la semaine */}
      <div className="main__jours">
        {rearrangedDays.map((jour, index) => (
          <div key={index} className="main__jour-item">
            <p>{jour}</p>
          </div>
        ))}
      </div>

      {/* Affichage des dates du mois */}
      <div className="main__dates">
        <div className="main__dates-grid">
          {/* Remplir les premiers jours vides pour aligner avec le bon jour de la semaine */}
          {Array.from({ length: adjustedFirstDay }).map((_, index) => (
            <div key={index} className="main__jour-item empty"></div>
          ))}
          {/* Afficher les dates du mois */}
          {daysArray.map((jour, index) => (
            <div key={index} className="main__jour-item">
              <p>{jour}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Main;