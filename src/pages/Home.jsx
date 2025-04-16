import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Accueil from "../components/Accueil";

function Home() {
  return (
    <div>
      <Header>
        <nav className="header__nav">
          <NavLink to="/Calendrier" className="header__list">
            Calendrier des sorties
          </NavLink>
        </nav>
      </Header>
      <Accueil />
      <Footer />
    </div>
  );
}

export default Home;
