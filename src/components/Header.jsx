import "../styles/components/header.css";
import logo from "../assets/logonodemat.webP";

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="logo de noDemat"
      />
    </header>
  );
}

export default Header;
