import './NavBar.css';

function NavBar({ changeProduct }) {
  return (
  <div>I am the NavBar.
    <button onClick={changeProduct}></button>
  </div>
  );
}

export default NavBar;