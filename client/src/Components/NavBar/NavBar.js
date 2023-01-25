import './NavBar.css';

function NavBar({ changeProduct }) {
  return (
  <div className="navbar">
    <button onClick={changeProduct}>Change Product!</button>
  </div>
  );
}

export default NavBar;