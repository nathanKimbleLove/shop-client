import { GiMagnifyingGlass } from 'react-icons/gi';
import { MdDarkMode } from 'react-icons/md';
import { useCallback } from 'react';
import './NavBar.css';
import '../../Utils/Hooks/useLocalStorage.js';
import cx from '../../Utils/cx.js';
import useLocalStorage from '../../Utils/Hooks/useLocalStorage.js';

function NavBar({ changeProduct }) {
  const [darkModeState, setDarkModeState] = useLocalStorage('darkKey', 'dark');

  const handleDarkModeChange = useCallback(() => {
    if (darkModeState === 'dark') {
      setDarkModeState('light');
    } else {
      setDarkModeState('dark');
    }
  }, [darkModeState, setDarkModeState]);

  return (
    <div className={cx('navbar', 'secondaryTextColor', darkModeState === 'dark' && 'darkTest')}>

      <img
        className="spider"
        src="https://www.pngkit.com/png/full/5-51993_spider-black-widow-clip-art.png"
        alt="black widow"
      ></img>

      <div className="changeProduct borderColor" onClick={changeProduct}>
      
        <GiMagnifyingGlass /> Search for a product or brand
      </div>

      <button className="darkModeToggle" onClick={handleDarkModeChange}>
        <MdDarkMode size={50} />
      </button>
    </div>
  );
}

export default NavBar;
