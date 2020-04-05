import React, { useState, useCallback, useMemo, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import MainCard from './card'
import ClientContext from '../../context'

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

const App = () => {
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
    return array.filter((item, pos) => array.indexOf(item) === pos)
  }, [state, clients])

  const selectedState = useMemo(
    () =>
      state === '' ? clients : clients.filter((client) => client.state === state),
    [state, clients]
  )

  const selectedCity = useMemo(
    () => selectedState.filter((client) => client.city === city),
    [city, selectedState]
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
          {state !== '' && stateCities[0] !== null && (
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
      {selectedCity.length > 1 && (
        <Typography
          className={styles.total}
          component="h1"
          color="primary"
          variant="h2"
        >
          Total de {selectedCity.length} Coelhinhos encontrados
        </Typography>
      )}
      {clients.length === 0 && (
        <Typography
          className={styles.total}
          component="h1"
          color="primary"
          variant="h2"
        >
          Ainda não temos nenhum coelinho registrado na nossa plataforma :(
        </Typography>
      )}
      {state !== '' && stateCities[0] === null && (
        <Grid className={styles.null}>
          <Typography
            className={styles.title}
            component="h2"
            color="primary"
            variant="h2"
          >
            Infelizmente não temos nenhum coelhinho registrado perto de você <br />{' '}
            :(
          </Typography>
        </Grid>
      )}
      <Grid className={styles.cards}>
        {selectedCity.length > 1
          ? selectedCity.map((client) => (
              <MainCard key={client.id} client={client} />
            ))
          : selectedState.map((client) => (
              <MainCard key={client.id} client={client} />
            ))}
      </Grid>
      <Typography className={styles.obs}>
        O Salvador da Pascoa é uma plataforma sem fins lucrativos para pequenos
        produtores e comércios exporem seus chocolates. Não somos responsáveis pelas
        encomendas, pagamentos, entregas e produtos, que devem ser combinadas com
        cada vendedor.
      </Typography>
    </Grid>
  )
}

export default React.memo(App)
