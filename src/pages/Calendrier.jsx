import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

function Calendrier() {
  return (
    <div>
      <Header>
        <h1 className="header__title">Calendrier des sorties</h1>
      </Header>
      <Main />
      <Footer />
    </div>
  );
}

export default Calendrier;
