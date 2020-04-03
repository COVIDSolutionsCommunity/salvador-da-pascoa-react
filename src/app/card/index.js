import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'

import useStyles from './styles'

// mudar o open para up da photo

const MainCard = ({ client }) => {
  const styles = useStyles()

  return (
    <Card key={client.id} className={styles.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={client.photo}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {client.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {client.obs}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Entrar em contato
        </Button>
        <Button size="small" color="primary">
          Saber mais
        </Button>
      </CardActions>
    </Card>
  )
}

export default React.memo(MainCard)
