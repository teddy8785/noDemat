import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import calendrierData from "../calendrier.json";
import evenementsData from "../evenements.json";
import "../styles/components/main.css";

function Main() {
  const [années, setAnnées] = useState(2025);
  const [moisIndex, setMoisIndex] = useState(0);
  const navigate = useNavigate();

  // Utiliser useEffect pour initialiser l'état du mois et de l'année depuis localStorage
  useEffect(() => {
    const storedYear = localStorage.getItem("selectedYear");
    const storedMonth = localStorage.getItem("selectedMonth");

    if (storedYear) setAnnées(parseInt(storedYear));
    if (storedMonth) setMoisIndex(parseInt(storedMonth));
  }, []);

  const isBissextile = (année) => {
    return (année % 4 === 0 && année % 100 !== 0) || année % 400 === 0;
  };

  const getJours = (moisIndex) => {
    const moisJours = [
      31,
      isBissextile(années) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    return moisJours[moisIndex];
  };

  const getFirstDayOfMonth = (moisIndex) => {
    const date = new Date(années, moisIndex, 1);
    return date.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  };

  const nextMonth = () => {
    if (moisIndex < calendrierData.mois.length - 1) {
      const newMonth = moisIndex + 1;
      setMoisIndex(newMonth);
      localStorage.setItem("selectedMonth", newMonth); // Sauvegarder le mois sélectionné
    }
  };

  const prevMonth = () => {
    if (moisIndex > 0) {
      const newMonth = moisIndex - 1;
      setMoisIndex(newMonth);
      localStorage.setItem("selectedMonth", newMonth); // Sauvegarder le mois sélectionné
    }
  };

  const totalJours = getJours(moisIndex);
  const firstDay = getFirstDayOfMonth(moisIndex);
  const daysArray = Array.from({ length: totalJours }, (_, i) => i + 1);

  const rearrangedDays = [
    ...calendrierData.jours.slice(1), // Jours après lundi
    calendrierData.jours[0], // Dimanche à la fin
  ];

  const adjustedFirstDay = (firstDay + 6) % 7;

  const hasEvent = (jour) => {
    const dateKey = `${années}-${String(moisIndex + 1).padStart(
      2,
      "0"
    )}-${String(jour).padStart(2, "0")}`;
    return evenementsData.evenements.hasOwnProperty(dateKey);
  };

  const handleDateClick = (jour) => {
    const dateKey = `${années}-${String(moisIndex + 1).padStart(
      2,
      "0"
    )}-${String(jour).padStart(2, "0")}`;
    const event = evenementsData.evenements[dateKey];

    if (event) {
      // Rediriger vers la page de détails de l'événement
      navigate(`/event/${dateKey}`);
    }
  };

  // Sauvegarder l'année sélectionnée lorsque l'année change
  const setAnnée = (nouvelleAnnée) => {
    setAnnées(nouvelleAnnée);
    localStorage.setItem("selectedYear", nouvelleAnnée); // Sauvegarder l'année sélectionnée
  };

  return (
    <main className="main">
      <div className="main__années">
        {années > 2025 && (
          <button onClick={() => setAnnée(années - 1)}>
            <i
              className="fa-solid fa-arrow-left"
              style={{ color: " #000000" }}
            ></i>
          </button>
        )}
        <div className="main__années-title">
          <h2>{années}</h2>
        </div>
        <button onClick={() => setAnnée(années + 1)}>
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
          <h3>{calendrierData.mois[moisIndex]}</h3>
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

      <div className="main__jours">
        {rearrangedDays.map((jour, index) => (
          <div key={index} className="main__jour-item">
            <p>{jour}</p>
          </div>
        ))}
      </div>

      <div className="main__dates">
        <div className="main__dates-grid">
          {Array.from({ length: adjustedFirstDay }).map((_, index) => (
            <div key={index} className="main__jour-item empty"></div>
          ))}
          {daysArray.map((jour) => (
            <div
              key={jour}
              className={`main__jour-item ${hasEvent(jour) ? "has-event" : ""}`}
              onClick={() => handleDateClick(jour)}
              style={{ cursor: "pointer" }}
            >
              <p>{jour}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Main;
