import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BehaviorSubject } from 'rxjs'

import { Navbar } from './components/bespoke/navbar'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { useSelector } from 'react-redux'
import { getMode } from './data/selectors'
import stylesImport from './components/scaffolding/layout/global.scss'
import { classNameBuilder } from './utils/build-class-name'
import { EModes } from './data/types'

const styles = classNameBuilder(stylesImport)
const bodyClasses = new BehaviorSubject(document.body.className)

const App: React.FC = () => {
  const mode = useSelector(getMode)
  const darkMode = mode === EModes.Dark
  let darkModeActive = false
  for (let i = 0; i < document.body.classList.length; i++) {
    if (document.body.classList[i] === 'dark-mode') {
      darkModeActive = true
    }
  }
  if ((darkMode && !darkModeActive) || (!darkMode && darkModeActive)) {
    document.body.classList.toggle('dark-mode')
    bodyClasses.next(document.body.className)
  }
  return (
    <BrowserRouter>
      <Navbar />
      <div className={styles('container')}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
