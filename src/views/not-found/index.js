import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import sadBunny from '../../assets/sadBunny.png'

import useStyles from './styles'

const NotFound = () => {
  const styles = useStyles()
  return (
    <Grid
      container
      className={styles.container}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography component="h1" color="primary" variant="h1">
        Página não encontrada
      </Typography>
      <img alt="Coelhinho triste" src={sadBunny} className={styles.bunny} />
    </Grid>
  )
}

export default React.memo(NotFound)
