import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink } from '@reach/router'
import Typography from '@material-ui/core/Typography'

import useStyles from './styles'
import redondo from '../../assets/redondo.png'

const Thanks = () => {
  const styles = useStyles()

  return (
    <Grid
      container
      className={styles.container}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid className={styles.form}>
        <RouterLink to="/" className={styles.logo}>
          <Grid container alignItems="center" justify="center">
            <img alt="Logo" src={redondo} className={styles.bunny} />
            <Typography component="h2" variant="h2" color="primary">
              salvador da páscoa
            </Typography>
          </Grid>
        </RouterLink>
        <Typography component="h2" color="primary" variant="h2">
          Obrigada por se registrar
        </Typography>
        <Typography component="p" variant="h3">
          Agora iremos analisar a sua lojinha! Logo entraremos em contato :)
        </Typography>
      </Grid>
    </Grid>
  )
}

export default React.memo(Thanks)
