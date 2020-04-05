import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from '@reach/router'
import Tabletop from 'tabletop'
import classnames from 'classnames'

import logo from '../../assets/logo.png'
import redondo from '../../assets/redondo.png'

import ClientContext from '../../context'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateRows: '80px 1fr 80px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  footer: {
    gridRow: '3',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    display: 'table-row',
    position: 'sticky',
    bottom: 0,
  },
  link: {
    fontFamily: 'Baloo Chettan',
    marginLeft: theme.spacing(3),
    fontWeight: '500',
    color: theme.palette.secondary.main,
  },
  selected: {
    color: theme.palette.custom.mandy,
  },
  children: {
    gridArea: 'children',
    marginBottom: '84px',
  },
  img: {
    height: '64px',
    [theme.breakpoints.down(600)]: {
      display: 'none',
    },
  },
  imgMobile: {
    height: '64px',
    [theme.breakpoints.up(601)]: {
      display: 'none',
    },
  },
  image: {
    marginRight: 'auto',
  },
}))

const Header = ({ children, location }) => {
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

  return (
    <ClientContext.Provider value={clients}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Link className={styles.image} component={RouterLink} to="/">
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

export default React.memo(Header)
