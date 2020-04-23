import React, { useCallback, useState, useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { getSeller } from '../../modules/actions'

import ifood from '../../assets/ifood.svg'
import uberEats from '../../assets/uberEats.svg'
import rappi from '../../assets/rappi.svg'
import placeholder from '../../assets/placeholder.jpeg'

import useStyles from './styles'

const Client = ({ companyName, location }) => {
  const styles = useStyles()
  const [isPictureLoading, setLoadingImage] = useState(true)
  const dispatch = useDispatch()
  const { currentSeller } = useSelector((state) => state)

  useEffect(() => {
    if (!currentSeller.instagramProfile) {
      dispatch(getSeller({ instagramProfile: companyName }))
    }
  }, [companyName, currentSeller, dispatch])

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
              href={`tel:+55${currentSeller.telephoneNumber
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
              href={`https://wa.me/55${currentSeller.whatsappNumber
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
              key={`${currentSeller.whatsappNumber} + 1`}
            >
              <WhatsAppIcon color="primary" className={styles.buttonIcon} />
              Whatsapp
            </Button>
          )
        case 'DM no Instagram':
          return (
            <Button
              onClick={loadLink(type)}
              href={`https://www.instagram.com/${currentSeller.instagramProfile
                .trim()
                .replace('@', '')}`}
              target="_blanck"
              rel="noreferer"
              color="primary"
              variant="outlined"
              size="small"
              component={Link}
              className={styles.button}
              key={currentSeller.instagramProfile}
            >
              <InstagramIcon className={styles.buttonIcon} />
              Instagram
            </Button>
          )
        case 'Ifood':
          return (
            currentSeller.ifoodUrl && (
              <Button
                onClick={loadLink(type)}
                href={currentSeller.ifoodUrl}
                target="_blanck"
                rel="noreferer"
                color="primary"
                variant="outlined"
                size="small"
                component={Link}
                className={styles.button}
                key={currentSeller.ifoodUrl}
              >
                <img alt="icone ifood" src={ifood} className={styles.buttonIcon} />
                Ifood
              </Button>
            )
          )
        case 'Uber Eats':
          return (
            currentSeller.uberEatsUrl && (
              <Button
                onClick={loadLink(type)}
                href={currentSeller.uberEatsUrl}
                target="_blanck"
                rel="noreferer"
                color="primary"
                variant="outlined"
                size="small"
                component={Link}
                className={styles.button}
                key={currentSeller[type]}
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
            currentSeller.rappiUrl && (
              <Button
                onClick={loadLink(type)}
                href={currentSeller.rappiUrl}
                target="_blanck"
                rel="noreferer"
                color="primary"
                variant="outlined"
                size="small"
                component={Link}
                className={styles.button}
                key={currentSeller.rappiUrl}
              >
                <img alt="icone rappi" src={rappi} className={styles.buttonIcon} />
                Rappi
              </Button>
            )
          )
        default:
          return (
            currentSeller.siteUrl && (
              <Button
                onClick={loadLink(type)}
                href={currentSeller.siteUrl}
                color="primary"
                variant="outlined"
                size="small"
                component={Link}
                target="_blanck"
                rel="noreferer"
                className={styles.button}
                key={currentSeller.siteUrl}
              >
                <LanguageIcon className={styles.buttonIcon} />
                {type}
              </Button>
            )
          )
      }
    },
    [currentSeller, loadLink, styles.button, styles.buttonIcon]
  )

  if (!currentSeller.instagramProfile) {
    return (
      <Grid container justify="center" alignItems="center" className={styles.width}>
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <Grid className={styles.container}>
      {currentSeller.instagramProfile && (
        <Grid className={styles.content}>
          <Card className={styles.root}>
            <Grid className={styles.card}>
              {currentSeller.coverImage ? (
                <CardMedia
                  component="img"
                  image={currentSeller.coverImage.replace('open', 'uc')}
                  title={`Imagem principal ${currentSeller.name}`}
                  className={styles.size}
                  onLoad={handleLoadingImage}
                />
              ) : (
                <img alt="Foto da marca" src={placeholder} className={styles.size} />
              )}
              {!!currentSeller.coverImage && isPictureLoading && (
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
                      {currentSeller.name}
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
                      {currentSeller.city} - {currentSeller.neighborhood},
                      {currentSeller.state}
                    </Typography>
                  </Grid>
                  {currentSeller.description && (
                    <Grid
                      container
                      item
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <AccountCircleIcon className={styles.icon} />
                      <Typography className={styles.description} component="p">
                        {currentSeller.description}
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
                      href={`https://www.instagram.com/${currentSeller.instagramProfile
                        .replace('@', '')
                        .trim()}`}
                      className={styles.title}
                    >
                      {currentSeller.instagramProfile}
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
                      href={`tel:${currentSeller.telephoneNumber
                        .match(/[0-9]/g)
                        .join('')
                        .trim()}`}
                    >
                      {currentSeller.telephoneNumber}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {currentSeller.orderMeans.length > 0 && (
              <Card className={styles.delivery}>
                <Typography className={styles.type} variant="h5" component="h2">
                  Clique para pedir: <br />
                  {currentSeller.orderMeans.map((delivery) => setLinks(delivery))}
                </Typography>
              </Card>
            )}
            <Card className={styles.delivery}>
              <Typography className={styles.type} variant="h5" component="h2">
                Formas de entrega:{' '}
              </Typography>
              <Typography className={styles.title} variant="h5" component="h2">
                {currentSeller.deliveryMeans.map((delivery) => (
                  <Button
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
            {currentSeller.productImages && (
              <Card className={styles.photos}>
                <Typography className={styles.name}>Produtos:</Typography>
                <br />
                <Grid
                  container
                  justify="center"
                  direction="column"
                  alignItems="center"
                >
                  {currentSeller.productImages.map((photo) => (
                    <>
                      <img
                        key={photo.id}
                        src={photo.image.replace('open', 'uc')}
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
