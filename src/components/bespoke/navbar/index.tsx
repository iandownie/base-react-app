import React from 'react'
import { NavLink } from 'react-router-dom'
import { FunctionalBtn } from '../../common/atoms/buttons/functional-btn'
import { useSelector, useDispatch } from 'react-redux'
import { actions, selectors } from '../../../data'
import stylesImport from './navbar.scss'
import { classNameBuilder } from '../../../utils/build-class-name'

const styles = classNameBuilder(stylesImport)

export const Navbar: React.FC = () => {
  const mode = useSelector(selectors.getMode)
  const dispatch = useDispatch()
  return (
    <nav className={styles('wrapper')}>
      <NavLink to="/" className={styles('logo')}>
        Redux + TypeScript
      </NavLink>
      <ul className={styles('right')}>
        <li cy-data="home-nav-link">
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <FunctionalBtn
            onClick={() => dispatch({ type: actions.TOGGLE_MODE })}
            id="mode-switcher"
          >
            {mode}
          </FunctionalBtn>
        </li>
      </ul>
    </nav>
  )
}
Navbar.displayName = 'Navbar'
