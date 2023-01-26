import './NavBar.css';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { MdDarkMode } from 'react-icons/md';

function NavBar({ changeProduct }) {
  return (
    <div className="navbar secondaryTextColor">
      
      <img
        className="spider"
        src="https://www.pngkit.com/png/full/5-51993_spider-black-widow-clip-art.png"
        alt="black widow"
      ></img>

      <div className="changeProduct borderColor" onClick={changeProduct}>
        {" "}
        <GiMagnifyingGlass /> Search for a product or brand
      </div>

      <button className="darkModeToggle">
        {" "}
        <MdDarkMode size={50} />{" "}
      </button>
    </div>
  );
}

export default NavBar;