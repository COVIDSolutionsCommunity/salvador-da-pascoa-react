import React, { useMemo, useContext, useCallback, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import InstagramIcon from '@material-ui/icons/Instagram'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import StorefrontIcon from '@material-ui/icons/Storefront'
import Link from '@material-ui/core/Link'
import PlaceIcon from '@material-ui/icons/Place'
import PhoneIcon from '@material-ui/icons/Phone'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import LanguageIcon from '@material-ui/icons/Language'
import CircularProgress from '@material-ui/core/CircularProgress'
import ReactGA from 'react-ga'

import ClientContext from '../../context'
import ifood from '../../assets/ifood.svg'
import uberEats from '../../assets/uberEats.svg'
import rappi from '../../assets/rappi.svg'
import placeholder from '../../assets/placeholder.jpeg'

import useStyles from './styles'

const Client = ({ companyName, location }) => {
  const styles = useStyles()
  const clients = useContext(ClientContext)
  const [isPictureLoading, setLoadingImage] = useState(true)

  const currentClient = useMemo(
    () => clients.find((client) => client.instagram === companyName),
    [clients, companyName]
  )

  const wayofAsking = useMemo(
    () => currentClient && currentClient.delivery.split(','),
    [currentClient]
  )

  const wayOfDelivery = useMemo(
    () => currentClient && currentClient.howToReceive.split(','),
    [currentClient]
  )

  const handleLoadingImage = useCallback((event) => {
    if (event.type === 'load') {
      setLoadingImage(false)
    }
  }, [])

  const loadLink = useCallback(
    (type) => () => {
      ReactGA.event({
        category: type,
        action: 'Clicou no botão',
      })
    },
    []
  )

  const setLinks = useCallback(
    (type) => {
      switch (type.trim()) {
        case 'Telefone':
          return (
            <Button
              color="primary"
              variant="outlined"
              size="small"
              className={styles.button}
              onClick={loadLink(type)}
              href={`tel:+55${currentClient.phoneNumber
                .replace('+55', '')
                .match(/[0-9]/g)
                .join('')}`}
            >
              <PhoneIcon className={styles.buttonIcon} />
              Telefone
            </Button>
          )
        case 'Whatsapp':
          return (
            <Button
              onClick={loadLink(type)}
              href={`https://wa.me/55${currentClient.whatsapp
                .match(/[0-9]/g)
                .join(
                  ''
                )}?text=Oi%20encontrei%20você%20no%20salvadordapascoa.com.br`}
              target="_blanck"
              rel="noreferer"
              color="primary"
              variant="outlined"
              size="small"
              component={Link}
              className={styles.button}
              key={`${currentClient.whatsapp} + 1`}
            >
              <WhatsAppIcon color="primary" className={styles.buttonIcon} />
              Whatsapp
            </Button>
          )
        case 'DM no Instagram':
          return (
            <Button
              onClick={loadLink(type)}
              href={`https://www.instagram.com/${currentClient.instagram
                .trim()
                .replace('@', '')}`}
              target="_blanck"
              rel="noreferer"
              color="primary"
              variant="outlined"
              size="small"
              component={Link}
              className={styles.button}
              key={currentClient.instagram}
            >
              <InstagramIcon className={styles.buttonIcon} />
              Instagram
            </Button>
          )
        case 'Ifood':
          return (
            currentClient[type.replace(' ', '')] && (
              <Button
                onClick={loadLink(type)}
                href={currentClient[type.replace(' ', '')]}
                target="_blanck"
                rel="noreferer"
                color="primary"
                variant="outlined"
                size="small"
                component={Link}
                className={styles.button}
                key={currentClient[type]}
              >
                <img alt="icone ifood" src={ifood} className={styles.buttonIcon} />
                Ifood
              </Button>
            )
          )
        case 'Uber Eats':
          return (
            currentClient[type.trim()] && (
              <Button
                onClick={loadLink(type)}
                href={currentClient[type.replace(' ', '')]}
                target="_blanck"
                rel="noreferer"
                color="primary"
                variant="outlined"
                size="small"
                component={Link}
                className={styles.button}
                key={currentClient[type]}
              >
                <img
                  alt="icone uber eats"
                  src={uberEats}
                  className={styles.buttonIcon}
                />
                Uber Eats
              </Button>
            )
          )
        case 'Rappi':
          return (
            currentClient[type.trim()] && (
              <Button
                onClick={loadLink(type)}
                href={currentClient[type.replace(' ', '')]}
                target="_blanck"
                rel="noreferer"
                color="primary"
                variant="outlined"
                size="small"
                component={Link}
                className={styles.button}
                key={currentClient[type]}
              >
                <img alt="icone rappi" src={rappi} className={styles.buttonIcon} />
                Rappi
              </Button>
            )
          )
        default:
          return (
            currentClient[type.replace(' ', '')] && (
              <Button
                onClick={loadLink(type)}
                href={currentClient[type.replace(' ', '')]}
                color="primary"
                variant="outlined"
                size="small"
                component={Link}
                target="_blanck"
                rel="noreferer"
                className={styles.button}
                key={currentClient[type]}
              >
                <LanguageIcon className={styles.buttonIcon} />

                {type}
              </Button>
            )
          )
      }
    },
    [currentClient, loadLink, styles.button, styles.buttonIcon]
  )

  return (
    <Grid className={styles.container}>
      {currentClient && (
        <Grid className={styles.content}>
          <Card className={styles.root}>
            <Grid className={styles.card}>
              {currentClient.photo[0] ? (
                <CardMedia
                  component="img"
                  image={currentClient.photo.split(',')[0].replace('open', 'uc')}
                  title={`Imagem principal ${currentClient.companyName}`}
                  className={styles.size}
                  onLoad={handleLoadingImage}
                />
              ) : (
                <img alt="Foto da marca" src={placeholder} className={styles.size} />
              )}
              {!!currentClient.photo[0] && isPictureLoading && (
                <CircularProgress className={styles.loading} />
              )}
              <Grid className={styles.info}>
                <Grid container spacing={1}>
                  <Grid
                    container
                    item
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <StorefrontIcon className={styles.mainIcon} />
                    <Typography color="primary" variant="h1" component="h1">
                      {currentClient.name}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <PlaceIcon className={styles.icon} />
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
                      justify="flex-start"
                      alignItems="center"
                    >
                      <AccountCircleIcon className={styles.icon} />
                      <Typography className={styles.description} component="p">
                        {currentClient.obs}
                      </Typography>
                    </Grid>
                  )}
                  <Grid
                    container
                    item
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <InstagramIcon className={styles.icon} />
                    <Link
                      onClick={loadLink('Instagram')}
                      href={`https://www.instagram.com/${currentClient.instagram
                        .replace('@', '')
                        .trim()}`}
                      className={styles.title}
                    >
                      {currentClient.instagram}
                    </Link>
                  </Grid>
                  <Grid
                    container
                    item
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <PhoneIcon className={styles.icon} />
                    <Link
                      onClick={loadLink('Telefone')}
                      className={styles.title}
                      href={`tel:${currentClient.phoneNumber
                        .match(/[0-9]/g)
                        .join('')
                        .trim()}`}
                    >
                      {currentClient.phoneNumber}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {wayofAsking.length > 0 && (
              <Card className={styles.delivery}>
                <Typography className={styles.type} variant="h5" component="h2">
                  Clique para pedir: <br />
                  {wayofAsking.map((delivery) => setLinks(delivery))}
                </Typography>
              </Card>
            )}
            <Card className={styles.delivery}>
              <Typography className={styles.type} variant="h5" component="h2">
                Formas de entrega:{' '}
              </Typography>
              <Typography className={styles.title} variant="h5" component="h2">
                {wayOfDelivery.map((delivery) => (
                  <Button
                    href={currentClient[delivery.replace(' ', '')]}
                    color="primary"
                    variant="outlined"
                    size="small"
                    key={delivery}
                    className={styles.newButton}
                  >
                    {delivery}
                  </Button>
                ))}
              </Typography>
            </Card>
            {currentClient.allPhotos && (
              <Card className={styles.photos}>
                <Typography className={styles.name}>Produtos:</Typography>
                <br />
                <Grid
                  container
                  justify="center"
                  direction="column"
                  alignItems="center"
                >
                  {currentClient.allPhotos.split(',').map((photo) => (
                    <>
                      <img
                        key={photo}
                        src={photo.replace('open', 'uc')}
                        alt="cardapio"
                        className={styles.image}
                      />
                      <br />
                    </>
                  ))}
                </Grid>
              </Card>
            )}
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default React.memo(Client)
