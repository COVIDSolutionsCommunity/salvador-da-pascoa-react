import React from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Header = ({ children, location }) => {
  const styles = useStyles()

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={styles.container}
    >
      <AppBar color="secondary" position="static">
        <Toolbar>
          {location.pathname !== '/' && (
            <IconButton
              edge="start"
              className={styles.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography color="primary" variant="h6" className={styles.title}>
            Salvador da Páscoa
          </Typography>
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
      {children}
    </Grid>
  )
}

export default React.memo(Header)
