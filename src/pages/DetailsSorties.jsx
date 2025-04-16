import Header from "../components/Header";
import Jeu from "../components/Jeu";
import { useParams } from "react-router-dom";
import data from "../evenements.json";

function DetailsSorties() {
  const { eventId } = useParams(); // Récupérer l'ID de l'événement depuis l'URL
  const evenements = data.evenements; // Accéder à l'objet des événements

  // Vérifier si l'événement existe
  const event = evenements[eventId];

  if (!event) {
    return <p>Événement non trouvé</p>;
  }

  return (
    <div>
      <Header>
        <h1 className="header__title">{event.titre}</h1>
      </Header>
      {/* Passer l'événement à Jeu pour l'afficher */}
      <Jeu date={eventId} />
    </div>
  );
}

export default DetailsSorties;
