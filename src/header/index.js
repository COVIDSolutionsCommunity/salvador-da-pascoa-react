import React from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from '@reach/router'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateRows: '80px 1fr 80px',
  },
  header: {},
  root: {},
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
    marginRight: theme.spacing(2),
  },
  children: {
    gridArea: 'children',
    marginBottom: '84px',
  },
}))

const Header = ({ children, location }) => {
  const styles = useStyles()

  return (
    <Grid container>
      <AppBar className={styles.header} color="secondary" position="static">
        <Toolbar>
          {location.pathname !== '/' && (
            <IconButton
              edge="start"
              className={styles.menuButton}
              color="inherit"
              aria-label="menu"
              component={RouterLink}
              to="/"
            >
              <ArrowBack color="primary" />
            </IconButton>
          )}
          <Typography color="primary" variant="h6" className={styles.title}>
            Salvador da Páscoa
          </Typography>
          <Link
            color="primary"
            className={styles.link}
            component={RouterLink}
            to="/sobre-nos"
          >
            SOBRE NÓS
          </Link>
          <Link
            color="primary"
            className={styles.link}
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
          >
            REGISTRAR
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container item xs={12} className={styles.children}>
        {children}
      </Grid>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={styles.footer}
        item
        xs={12}
      >
        <Typography color="secondary" variant="h6" className={styles.title}>
          #vaiterpascoasim
        </Typography>
        <Link
          href="https://instagram.com/salvadordapascoa"
          el="noreferrer"
          target="_blank"
          color="secondary"
        >
          @salvadordapascoa
        </Link>
      </Grid>
    </Grid>
  )
}

export default React.memo(Header)
