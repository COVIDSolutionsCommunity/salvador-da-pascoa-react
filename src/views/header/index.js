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
  const [clients, setClients] = useState([])

  useEffect(() => {
    Tabletop.init({
      key: '1tpn6dgeXt2NvAj37Z5PHVEsEV7D6LBd3HuRLDNk0u94',
      callback: (data, tabletop) => {
        setClients(data.filter((info) => info.accepted === 'TRUE'))
      },
      simpleSheet: true,
    })
  }, [])

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
    <ClientContext.Provider value={clients}>
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
          <Link
            href="https://forms.gle/G3KSh6u2WEtRzDwf9"
            el="noreferrer"
            target="_blank"
            color="primary"
            className={styles.link}
          >
            CADASTRAR
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container item xs={12} className={styles.children}>
        {children}
      </Grid>
    </ClientContext.Provider>
  )
}

export default React.memo(connect(mapStateToProps)(Header))
