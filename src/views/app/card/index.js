import React, { useState, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import StorefrontIcon from '@material-ui/icons/Storefront'
import Grid from '@material-ui/core/Grid'
import InstagramIcon from '@material-ui/icons/Instagram'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Link as RouterLink } from '@reach/router'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  icon: {
    height: 12,
    width: 12,
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  name: {
    color: theme.palette.custom.brownRust,
  },
  description: {
    color: theme.palette.custom.brownRust,
    fontWeight: '100',
  },
  loading: {
    position: 'absolute',
    top: 75,
    margin: 'auto 150px 0',
  },
}))

const MainCard = ({ client }) => {
  const styles = useStyles()
  const photos = client.photo.split(',')
  const [isPictureLoading, setLoadingImage] = useState(true)

  const handleLoadingImage = useCallback((event) => {
    if (event.type === 'load') {
      setLoadingImage(false)
    }
  }, [])

  return (
    <Card key={client.id} className={styles.root}>
      <CardActionArea component={RouterLink} to={`/${client.instagram}`}>
        <CardMedia
          component="img"
          alt="Foto da marca"
          height="140"
          image={photos[0].replace('open', 'uc')}
          onLoad={handleLoadingImage}
        />
        {isPictureLoading && <CircularProgress className={styles.loading} />}
        <CardContent>
          <Grid container spacing={1}>
            <Grid container item direction="row" justify="start" alignItems="center">
              <StorefrontIcon item className={styles.icon} />
              <Typography className={styles.name} variant="h5" component="h2">
                {client.name}
              </Typography>
            </Grid>
            <Grid container item direction="row" justify="start" alignItems="center">
              <InstagramIcon item className={styles.icon} />
              <Typography className={styles.name} variant="h5" component="h2">
                {client.instagram}
              </Typography>
            </Grid>
            {client.obs && (
              <Grid
                container
                item
                direction="row"
                justify="start"
                alignItems="center"
              >
                <AccountCircleIcon item className={styles.icon} />
                <Typography
                  className={styles.description}
                  variant="h5"
                  component="h2"
                >
                  {client.obs}
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          component={Link}
          href={`tel:${client.phoneNumber}`}
        >
          Entrar em contato
        </Button>
        <Button
          component={RouterLink}
          to={`/${client.instagram}`}
          size="small"
          color="primary"
        >
          Saber mais
        </Button>
      </CardActions>
    </Card>
  )
}

export default React.memo(MainCard)
