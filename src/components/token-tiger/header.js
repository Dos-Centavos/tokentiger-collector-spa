import React from 'react'

import headerStyles from './styles/header.module.scss'
import Theme from './theme'
// import logo from "./assets/logo.png";
// import {
//   Link
// } from 'react-router-dom'

export default function Header () {
  // const [isNavExpanded, setIsNavExpanded] = useState(false)
  const goToTokenTiger = () => {
    window.open(
      'https://tokentiger.com',
      '_blank'
    )
  }
  return (
    <div className={headerStyles.container}>
      {/* <img className={headerStyles.logo} src={logo} alt="token-tiger logo" /> */}
      <h1 onClick={goToTokenTiger} className={headerStyles.logoText}>TokenTiger <span className={headerStyles.tm}>&trade;</span></h1>
      <div className={headerStyles.bar}>
        <nav className={headerStyles.navigation}>
          {/* <button
            className={headerStyles.hamburger}
            onClick={() => {
              setIsNavExpanded(!isNavExpanded)
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='white'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </button> */}
        </nav>
        <Theme />
      </div>
    </div>
  )
}
