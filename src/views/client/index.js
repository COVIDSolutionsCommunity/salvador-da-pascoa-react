import React, {
   useMemo, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import ClientContext from '../../context'

import useStyles from './styles'

const Client = ({ instagram }) => {
  const styles = useStyles()
  const clients = useContext(ClientContext)

  const stateCities = useMemo(() => {
    const array = clients.map((client) =>
      client.state === state ? client.city : null
    )
    return array.filter((item, pos) => array.indexOf(item) === pos)
  }, [state, clients])

  )

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid
        className={styles.select}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography
          className={styles.title}
          component="h1"
          color="secondary"
          variant="h2"
        >
          Procure o chocolate mais perto de você
        </Typography>
      </Grid>
    </Grid>
  )
}

export default React.memo(Client)
