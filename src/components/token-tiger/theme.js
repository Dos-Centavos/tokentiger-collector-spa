import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
// import { getAppMode, setAppMode } from '../services/auth'

import themeStyles from './styles/theme.module.scss'

export default function Theme () {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Set the last mode stored in cache
  //   useEffect(() => {
  //     const appMode = getAppMode()
  //     if (!appMode || appMode === 'Dark') {
  //       setAppMode('Dark')
  //       setIsDarkMode(true)
  //     } else if (appMode === 'Light') {
  //       setIsDarkMode(false)
  //     }
  //   }, [])
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.setProperty('--primary-color', 'rgb(0, 0, 0)')
      document.documentElement.style.setProperty('--secondary-color', '#fff')
      document.documentElement.style.setProperty('--tertiary-color', '#3b9f6fb2')
      document.documentElement.style.setProperty('--quaternary-color', 'rgba(255, 255, 255, 0.4)')
      document.documentElement.style.setProperty('--quinary-color', 'rgb(8, 26, 17)')
    //   setAppMode('Dark')
    } else {
      document.documentElement.style.setProperty('--primary-color', 'rgb(247, 244, 244)')
      document.documentElement.style.setProperty('--secondary-color', 'rgb(26, 24, 24)')
      document.documentElement.style.setProperty('--tertiary-color', '#3b9f6fe7')
      document.documentElement.style.setProperty('--quaternary-color', '#333')
      document.documentElement.style.setProperty('--quinary-color', 'rgb(247, 244, 244)')
    //   setAppMode('Light')
    }
  }, [isDarkMode])

  return (
    <div className={themeStyles.container}>

      <p onClick={toggleDarkMode}>
        <FontAwesomeIcon
          className={themeStyles.themeBtn}
          icon={isDarkMode ? faSun : faMoon}
        />
      </p>
    </div>
  )
}
