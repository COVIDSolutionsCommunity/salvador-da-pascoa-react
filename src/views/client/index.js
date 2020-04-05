import React, { useMemo, useContext, useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import InstagramIcon from '@material-ui/icons/Instagram'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import StorefrontIcon from '@material-ui/icons/Storefront'
import Link from '@material-ui/core/Link'
import PlaceIcon from '@material-ui/icons/Place'
import PhoneIcon from '@material-ui/icons/Phone'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'

import ClientContext from '../../context'

import Loading from './loading'

import useStyles from './styles'

const Client = ({ companyName }) => {
  const styles = useStyles()
  const clients = useContext(ClientContext)

  const currentClient = useMemo(
    () => clients.find((client) => client.instagram === companyName),
    [clients, companyName]
  )
  console.log('Client -> currentClient', currentClient)

  const wayofAsking = useMemo(
    () => currentClient && currentClient.delivery.split(','),
    [currentClient]
  )

  const wayOfDelivery = useMemo(
    () => currentClient && currentClient.howToReceive.split(','),
    [currentClient]
  )

  const setLinks = useCallback(
    (type) => {
      switch (type) {
        case 'Telefone':
          return (
            <Link href={`tel:${currentClient.phoneNumber}`} className={styles.title}>
              {' '}
              Telefone
            </Link>
          )
        case 'Whatsapp':
          return (
            <Link
              href={`whatsapp:${currentClient.phoneNumber}`}
              target="_blanck"
              rel="noreferer"
              className={styles.title}
            >
              {' '}
              Whatsapp
            </Link>
          )
        case ' DM no Instagram':
          return (
            <Link
              href={`https://www.instagram.com/${currentClient.instagram.replace(
                '@',
                ''
              )}`}
              target="_blanck"
              rel="noreferer"
              className={styles.title}
            >
              {' '}
              Instagram
            </Link>
          )
        default:
          return (
            <Link
              href={currentClient[type.replace(' ', '')]}
              className={styles.title}
              target="_blanck"
              rel="noreferer"
            >
              {' '}
              {type}
            </Link>
          )
      }
    },
    [currentClient, styles.title]
  )

  return (
    <Grid className={styles.container}>
      {/* <Loading /> */}
      {currentClient && (
        <Grid className={styles.content}>
          <Card className={styles.root}>
            <Grid className={styles.card}>
              <CardMedia
                component="img"
                image={currentClient.photo.split(',')[0].replace('open', 'uc')}
                title="Contemplative Reptile"
                className={styles.size}
                // width="100%"
              />
              <Grid className={styles.info}>
                <Grid container spacing={1}>
                  <Grid
                    container
                    item
                    direction="row"
                    justify="start"
                    alignItems="center"
                  >
                    <StorefrontIcon item className={styles.mainIcon} />
                    <Typography color="primary" variant="h1" component="h1">
                      {currentClient.name}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    direction="row"
                    justify="start"
                    alignItems="center"
                  >
                    <PlaceIcon item className={styles.icon} />
                    <Typography className={styles.title}>
                      {currentClient.city} - {currentClient.neighborhood},
                      {currentClient.state}
                    </Typography>
                  </Grid>
                  {currentClient.obs && (
                    <Grid
                      container
                      item
                      direction="row"
                      justify="start"
                      alignItems="center"
                    >
                      <AccountCircleIcon item className={styles.icon} />
                      <Typography className={styles.description} component="p">
                        {currentClient.obs}
                      </Typography>
                    </Grid>
                  )}
                  <Grid
                    container
                    item
                    direction="row"
                    justify="start"
                    alignItems="center"
                  >
                    <InstagramIcon item className={styles.icon} />
                    <Link
                      href={`https://www.instagram.com/${currentClient.instagram.replace(
                        '@',
                        ''
                      )}`}
                      className={styles.title}
                    >
                      {currentClient.instagram}
                    </Link>
                  </Grid>
                  <Grid
                    container
                    item
                    direction="row"
                    justify="start"
                    alignItems="center"
                  >
                    <WhatsAppIcon item className={styles.icon} />
                    <Link
                      className={styles.title}
                      href={`whatsapp:${currentClient.phoneNumber}`}
                    >
                      {currentClient.phoneNumber}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Card className={styles.delivery}>
              <Typography className={styles.type} variant="h5" component="h2">
                Como pedir: {wayofAsking.map((delivery) => setLinks(delivery))}
              </Typography>
            </Card>
            <Card className={styles.delivery}>
              <Typography className={styles.type} variant="h5" component="h2">
                Formas de entrega:{' '}
              </Typography>
              <Typography className={styles.title} variant="h5" component="h2">
                {wayOfDelivery.map((delivery, index) =>
                  console.log(index, wayOfDelivery.length) ||
                  index + 1 === wayOfDelivery.length
                    ? delivery + '.'
                    : delivery + ', '
                )}
              </Typography>
            </Card>
            <Card className={styles.delivery}>
              <Typography className={styles.name}>Cardápio:</Typography>
              {currentClient.allPhotos.split(',').map((photo) => (
                <img
                  key={photo}
                  src={photo}
                  alt="cardapio"
                  className={styles.image}
                />
              ))}
            </Card>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default React.memo(Client)
