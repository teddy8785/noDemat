import Header from "../components/Header";
import { useParams } from "react-router-dom";
import data from "../data.json";

function DetailsSorties() {
  const { eventId } = useParams(); // Récupérer l'ID de l'événement depuis l'URL
  const calendrier = data[0];

  const event = calendrier.événements[eventId]; // Trouver l'événement correspondant à l'ID

  if (!event) {
    return <p>Événement non trouvé</p>;
  }

  return (
   
      <Header>
         <h1 className="header__title">{event.titre}</h1>
      </Header>
  );
}

export default DetailsSorties;
