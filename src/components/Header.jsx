import "../styles/components/header.css";
import logo from "../assets/logonodemat.webP";

function Header({ children }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo de noDemat" />
      {children}
    </header>
  );
}

export default Header;
