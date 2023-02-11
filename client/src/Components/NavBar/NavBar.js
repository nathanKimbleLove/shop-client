import { GiMagnifyingGlass } from 'react-icons/gi';
import { MdDarkMode } from 'react-icons/md';
import { useCallback, useEffect } from 'react';
import './NavBar.scss';
import '../../Utils/Hooks/useLocalStorage.js';
import cx from '../../Utils/cx.js';
import useLocalStorage from '../../Utils/Hooks/useLocalStorage.js';

function NavBar({ changeProduct }) {
  const [darkModeState, setDarkModeState] = useLocalStorage('darkKey', 'dark');

  const handleDarkModeChange = useCallback(() => {
    if (darkModeState === 'dark') {
      // console.log('dark is current')
      setDarkModeState('light');
      // document.body.classList.remove('dark');
    } else {
      // console.log('light is current')
      setDarkModeState('dark');
      // document.body.classList.add('dark');
    }
  }, [darkModeState, setDarkModeState]);

  useEffect(() => {
    console.log('dark mode state:', darkModeState);
    if (darkModeState === 'dark') document.body.classList.add('dark');
    else if (darkModeState === 'light') document.body.classList.remove('dark');
  }, [darkModeState])

  return (
    <div className="navbar">

      <img
        className="spider"
        src="https://www.pngkit.com/png/full/5-51993_spider-black-widow-clip-art.png"
        alt="black widow"
      ></img>

      <div className="changeProduct" onClick={changeProduct}>
        <GiMagnifyingGlass /> Search for a product or brand
      </div>
      <button className="darkModeToggle" onClick={handleDarkModeChange}>
        <MdDarkMode size={50} />
      </button>
    </div>
  );
}

export default NavBar;

<div className="ratings">...</div>
