import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Tabletop from 'tabletop'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MainCard from './card'

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

// const INITIAL_STATE = [
//   {
//     id: 1,
//     ddata: '03/04/2020 12:28:27',
//     name: 'marirlandia',
//     email: 'marinastavares6@gmail.com',
//     state: 'SC',
//     city: 'Florianópolis',
//     neighborhood: 'cebtor',
//     delivery: 'Telefone, Uber Eats',
//     'phoneNumberr ': '+5548984140707',
//     whatsapp: '5548984140707',
//     site: 'chocolate.com',
//     instagram: '@chocolate',
//     ifood: '',
//     uberEats: '',
//     rappi: '',
//     howToReceive: 'Delivery',
//     photo: 'https://drive.google.com/uc?id=18ADNmJyMZARQhJZbFwSxHa9vIW7XIp9s',
//     obs: 'Trabalho fazem anos com delivery',
//   },
//   {
//     id: 2,
//     ddata: '03/04/2020 12:28:27',
//     name: 'marirlandia',
//     email: 'marinastavares6@gmail.com',
//     state: 'SC',
//     city: 'Florianópolis',
//     neighborhood: 'cebtor',
//     delivery: 'Telefone, Uber Eats',
//     'phoneNumberr ': '+5548984140707',
//     whatsapp: '5548984140707',
//     site: 'chocolate.com',
//     instagram: '@chocolate',
//     ifood: '',
//     uberEats: '',
//     rappi: '',
//     howToReceive: 'Delivery',
//     photo: 'https://drive.google.com/uc?id=18ADNmJyMZARQhJZbFwSxHa9vIW7XIp9s',
//     obs: 'Trabalho fazem anos com delivery',
//   },
//   {
//     id: 3,
//     ddata: '03/04/2020 12:28:27',
//     name: 'marirlandia',
//     email: 'marinastavares6@gmail.com',
//     state: 'SC',
//     city: 'Florianópolis',
//     neighborhood: 'cebtor',
//     delivery: 'Telefone, Uber Eats',
//     phoneNumber: '+5548984140707',
//     whatsapp: '5548984140707',
//     site: 'chocolate.com',
//     instagram: '@chocolate',
//     ifood: '',
//     uberEats: '',
//     rappi: '',
//     howToReceive: 'Delivery',
//     photo: 'https://drive.google.com/uc?id=18ADNmJyMZARQhJZbFwSxHa9vIW7XIp9s',
//     obs: 'Trabalho fazem anos com delivery',
//   },
//   {
//     id: 4,
//     ddata: '03/04/2020 12:28:27',
//     name: 'marirlandia',
//     email: 'marinastavares6@gmail.com',
//     state: 'SC',
//     city: 'Florianópolis',
//     neighborhood: 'cebtor',
//     delivery: 'Telefone, Uber Eats',
//     'phoneNumberr ': '+5548984140707',
//     whatsapp: '5548984140707',
//     site: 'chocolate.com',
//     instagram: '@chocolate',
//     ifood: '',
//     uberEats: '',
//     rappi: '',
//     howToReceive: 'Delivery',
//     photo: 'https://drive.google.com/uc?id=18ADNmJyMZARQhJZbFwSxHa9vIW7XIp9s',
//     obs: 'Trabalho fazem anos com delivery',
//   },
//   {
//     id: 5,
//     ddata: '03/04/2020 12:28:27',
//     name: 'marirlandia',
//     email: 'marinastavares6@gmail.com',
//     state: 'SC',
//     city: 'Florianópolis',
//     neighborhood: 'cebtor',
//     delivery: 'Telefone, Uber Eats',
//     'phoneNumberr ': '+5548984140707',
//     whatsapp: '5548984140707',
//     site: 'chocolate.com',
//     instagram: '@chocolate',
//     ifood: '',
//     uberEats: '',
//     rappi: '',
//     howToReceive: 'Delivery',
//     photo: 'https://drive.google.com/uc?id=18ADNmJyMZARQhJZbFwSxHa9vIW7XIp9s',
//     obs: 'Trabalho fazem anos com delivery',
//   },
//   {
//     id: 6,
//     ddata: '03/04/2020 12:28:27',
//     name: 'marirlandia',
//     email: 'marinastavares6@gmail.com',
//     state: 'SC',
//     city: 'Chapecó',
//     neighborhood: 'cebtor',
//     delivery: 'Telefone, Uber Eats',
//     'phoneNumberr ': '+5548984140707',
//     whatsapp: '5548984140707',
//     site: 'chocolate.com',
//     instagram: '@chocolate',
//     ifood: '',
//     uberEats: '',
//     rappi: '',
//     howToReceive: 'Delivery',
//     photo: 'https://drive.google.com/uc?id=18ADNmJyMZARQhJZbFwSxHa9vIW7XIp9s',
//     obs: 'Trabalho fazem anos com delivery',
//     approved: 'FALSE',
//   },
// ]

// mudar o open para up da photo

const App = () => {
  const styles = useStyles()
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [clients, setClients] = useState([])

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

  const hasSelected = useMemo(
    () => stateCities.find((selected) => selected === city),
    [stateCities, city]
  )
  console.log('App -> hasSelected', hasSelected)

  useEffect(() => {
    Tabletop.init({
      key: '1CYuCMQ35yXrPX6Pjjq_7CS6AXOjAN-2BbjMq8uWcP04',
      callback: (data, tabletop) => {
        setClients(data.filter((info) => info.accepted === 'TRUE'))
      },
      simpleSheet: true,
    })
  }, [])

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
      {state !== '' &&
        stateCities[0] !== null &&
        stateCities.find((selected) => selected === city) && (
          <Typography
            className={styles.total}
            component="h1"
            color="primary"
            variant="h2"
          >
            Total de{' '}
            {stateCities.find((selected) => selected === city) &&
              clients.map((client) => client.city === city).length}{' '}
            Coelhinhos encontrados
          </Typography>
        )}
      {state !== '' && stateCities[0] === null && (
        <Grid className={styles.null}>
          <Typography
            className={styles.title}
            component="h1"
            color="primary"
            variant="h2"
          >
            Infelizmente não temos nenhum coelhinho registrado perto de você : (
          </Typography>
        </Grid>
      )}
      <Grid className={styles.cards}>
        {hasSelected === undefined &&
          state === '' &&
          clients.map((client) => <MainCard key={client.id} client={client} />)}

        {stateCities.find((selected) => selected === city) &&
          clients.map(
            (client) =>
              client.city === city && <MainCard key={client.id} client={client} />
          )}
      </Grid>
    </Grid>
  )
}

export default React.memo(App)
