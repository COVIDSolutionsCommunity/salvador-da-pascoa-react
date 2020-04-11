import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import useStyles from './styles'

const Register = () => {
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
        Registre o seu coelhinho na nossa plataforma
      </Typography>
      <Typography component="p" variant="h3">
        Queremos ajudar a conectar quem produziu chocolates deliciosos nessa páscoa e
        quem não quer deixar essa data tão doce passar em branco, mesmo em épocas de
        quarentena. Aqui você, que está fazendo ovos, boombons, barras ou kits de
        chocolates nessa páscoa, pode cadastrar os seus produtos para que todos vejam
        e consigam entrar em contato para encomendas.
      </Typography>
      <form className={styles.form}>
        <TextField
          fullWidth
          className={styles.dropdown}
          label="Nome do seu negócio"
        />
      </form>
    </Grid>
  )
}

export default React.memo(Register)
