import React, { useMemo, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import ClientContext from '../../context'

import useStyles from './styles'

const Client = ({ companyName }) => {
  const styles = useStyles()
  const clients = useContext(ClientContext)

  const currentClient = useMemo(
    () => clients.find((client) => client.instagram === companyName),
    [clients, companyName]
  )
  console.log('Client -> currentClient', currentClient)

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
          {currentClient.name}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default React.memo(Client)
