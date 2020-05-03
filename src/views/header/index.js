import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import { Link as RouterLink, navigate } from '@reach/router'
import Tabletop from 'tabletop'
import classnames from 'classnames'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'

import logo from '../../assets/logo.png'
import redondo from '../../assets/redondo.png'

import ClientContext from '../../context'

import useStyles from './styles.js'

const mapStateToProps = (state) => {
  return {
    count: state,
  }
}

const Header = ({ children, location, count }) => {
  const styles = useStyles()
  const isLoggedIn = useSelector((state) => state.key)
  console.log('Header -> isLoggedIn', isLoggedIn)

  useEffect(() => {
    if (
      !(
        location.pathname.includes('@') ||
        location.pathname.includes('sobre') ||
        location.pathname.includes('faq') ||
        location.pathname.includes('registrar') ||
        location.pathname.includes('login') ||
        location.pathname === '/'
      )
    ) {
      navigate('/error')
    }
  }, [location.pathname])

  return (
    <>
      <AppBar color="primary" position="static" className={styles.padding}>
        <Toolbar>
          <Link
            className={styles.image}
            component={RouterLink}
            to="/"
            state={
              location.state && {
                state: location.state.state,
                city: location.state.city,
              }
            }
          >
            <ArrowBackIcon className={styles.icon} color="secondary" />
            <img alt="site logo" className={styles.img} src={logo} />
            <img alt="site logo" className={styles.imgMobile} src={redondo} />
          </Link>
          <Link
            color="primary"
            className={classnames(styles.link, {
              [styles.selected]: location.pathname === '/',
            })}
            component={RouterLink}
            to="/"
            state={
              location.state && {
                state: location.state.state,
                city: location.state.city,
              }
            }
          >
            HOME
          </Link>
          <Link
            color="primary"
            className={classnames(styles.link, {
              [styles.selected]: location.pathname === '/sobre',
            })}
            component={RouterLink}
            to="/sobre"
          >
            SOBRE
          </Link>
          <Link
            color="primary"
            className={classnames(styles.link, {
              [styles.selected]: location.pathname === '/faq',
            })}
            component={RouterLink}
            to="/faq"
          >
            FAQ
          </Link>
          {isLoggedIn ? (
            <Link
              color="primary"
              className={styles.link}
              component={RouterLink}
              to="/registrar"
            >
              EDITAR
            </Link>
          ) : (
            <Link
              color="primary"
              className={styles.link}
              component={RouterLink}
              to="/login"
            >
              CADASTRAR
            </Link>
          )}
          {isLoggedIn && (
            <Link
              color="primary"
              className={styles.link}
              component={RouterLink}
              to="/faq"
            >
              LOG OUT
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Grid container item xs={12} className={styles.children}>
        {children}
      </Grid>
    </>
  )
}

export default React.memo(connect(mapStateToProps)(Header))
