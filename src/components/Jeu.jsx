import "../styles/components/jeu.css";
import evenementsData from "../evenements.json";

function Jeu({ date }) {
  const event = evenementsData.evenements[date]; // Accéder à l'événement pour une date donnée

  return (
    <div>
      {event.jeux.map((jeu) => (
        <div key={jeu.id} className="jeu">
          <h3 className="jeu__title">{jeu.titre}</h3>

          {jeu.description && (
            <p className="jeu__description">{jeu.description}</p>
          )}

          <p className="jeu__plateforme">{jeu.plateformes.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}

export default Jeu;
