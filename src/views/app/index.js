import React, { useState, useCallback, useMemo, useContext, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link'
import ReactGA from 'react-ga'

import MainCard from './card'
import ClientContext from '../../context'
import sadBunny from '../../assets/sadBunny.png'

import useStyles from './styles'

const BRAZILIAN_STATES = [
  'AC',
  'AL',
  'AM',
  'AP',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RO',
  'RS',
  'RR',
  'SC',
  'SE',
  'SP',
  'TO',
]

const App = ({ location }) => {
  const styles = useStyles()
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const clients = useContext(ClientContext)

  const handleChange = useCallback((event) => {
    setState(event.target.value)
  }, [])

  const handleCityChange = useCallback((event) => {
    setCity(event.target.value)
  }, [])

  const stateCities = useMemo(() => {
    const array = clients.map((client) =>
      client.state === state ? client.city : null
    )
    return array
      .filter((item, pos) => array.indexOf(item) === pos)
      .filter((item) => item !== null)
      .sort((a, b) => {
        if (a > b) {
          return 1
        }
        if (b > a) {
          return -1
        }
        return 0
      })
  }, [state, clients])

  const selectedState = useMemo(
    () => clients.filter((client) => client.state === state),
    [state, clients]
  )

  const selectedCity = useMemo(
    () => selectedState.filter((client) => client.city === city),
    [city, selectedState]
  )

  useEffect(() => {
    const trackingId = 'UA-162871245-1'
    ReactGA.initialize(trackingId)
    ReactGA.pageview('/homepage')
  }, [])

  const randomNumbers = useMemo(
    () =>
      Array.from({ length: 12 }, () => Math.floor(Math.random() * clients.length)),
    [clients.length]
  )

  const randomClients = useMemo(() => randomNumbers.map((item) => clients[item]), [
    clients,
    randomNumbers,
  ])

  useEffect(() => {
    if (location.state && location.state.state !== undefined) {
      setState(location.state.state)
      setCity(location.state.city)
    }
  }, [location.state])

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
        <Grid container justify="center">
          <FormControl className={styles.formControl}>
            <InputLabel className={styles.label} htmlFor="state-native-simple">
              Selecione o seu estado
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state}
              onChange={handleChange}
              className={styles.dropdown}
              classes={{
                icon: styles.icon,
              }}
              placeholder="Selecione um estado"
            >
              {BRAZILIAN_STATES.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {state !== '' && selectedState.length > 1 && (
            <FormControl className={styles.formControl}>
              <InputLabel className={styles.label} htmlFor="state-native-simple">
                Selecione a sua Cidade
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={city}
                onChange={handleCityChange}
                className={styles.dropdown}
                classes={{
                  icon: styles.icon,
                }}
                placeholder="Selecione um estado"
              >
                {stateCities.map((client) => (
                  <MenuItem key={client} value={client}>
                    {client}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>
      </Grid>
      {selectedCity.length > 0 && (
        <Typography
          className={styles.total}
          component="h1"
          color="primary"
          variant="h2"
        >
          Total de {selectedCity.length} Coelhinho{selectedCity.length > 1 && 's'}{' '}
          encontrados
        </Typography>
      )}
      {clients.length === 0 && <CircularProgress />}
      {randomNumbers[0] !== 0 && selectedState.length === 0 && state !== '' && (
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          direction="column"
          className={styles.null}
        >
          <Typography
            className={styles.title}
            component="h2"
            color="primary"
            variant="h2"
          >
            Infelizmente não temos nenhum coelhinho registrado perto de você <br />{' '}
          </Typography>
          <img alt="Coelhinho triste" src={sadBunny} className={styles.bunny} />
        </Grid>
      )}
      {clients && (
        <Grid className={styles.cards}>
          {selectedCity.length > 0 &&
            selectedCity.map((client) => (
              <MainCard key={client.id} client={client} />
            ))}
          {selectedCity.length === 0 &&
            selectedState.map((client) => (
              <MainCard key={client.id} client={client} />
            ))}
          {randomNumbers[0] !== 0 &&
            state === '' &&
            city === '' &&
            randomClients.map((client) => (
              <MainCard key={client.id} client={client} />
            ))}
        </Grid>
      )}
      <Typography className={styles.obs}>
        O Salvador da Páscoa é uma plataforma sem fins lucrativos para pequenos
        produtores e comércios exporem seus chocolates. Não somos responsáveis pelas
        encomendas, pagamentos, entregas e produtos, que devem ser combinadas com
        cada vendedor.
        <br />
        <Link href="https://www.instagram.com/salvadordapascoa">
          Acesse nosso instagram @salvadordapascoa <br />
        </Link>
        <Link href="mailto:salvadordapascoa2020@gmail.com">
          salvadordapascoa2020@gmail.com
        </Link>
      </Typography>
    </Grid>
  )
}

export default React.memo(App)
