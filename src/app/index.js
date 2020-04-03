import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Tabletop from 'tabletop'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'

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

const INITIAL_STATE = [
  {
    id: 1,
    ddata: '03/04/2020 12:28:27',
    name: 'marirlandia',
    email: 'marinastavares6@gmail.com',
    state: 'SC',
    city: 'Florianópolis',
    neighborhood: 'cebtor',
    delivery: 'Telefone, Uber Eats',
    'phoneNumberr ': '+5548984140707',
    whatsapp: '5548984140707',
    site: 'chocolate.com',
    instagram: '@chocolate',
    ifood: '',
    uberEats: '',
    rappi: '',
    howToReceive: 'Delivery',
    photo: 'https://drive.google.com/uc?id=18ADNmJyMZARQhJZbFwSxHa9vIW7XIp9s',
    obs: 'Trabalho fazem anos com delivery',
  },
  {
    id: 2,
    ddata: '03/04/2020 12:28:27',
    name: 'marirlandia',
    email: 'marinastavares6@gmail.com',
    state: 'SC',
    city: 'Florianópolis',
    neighborhood: 'cebtor',
    delivery: 'Telefone, Uber Eats',
    'phoneNumberr ': '+5548984140707',
    whatsapp: '5548984140707',
    site: 'chocolate.com',
    instagram: '@chocolate',
    ifood: '',
    uberEats: '',
    rappi: '',
    howToReceive: 'Delivery',
    photo: 'https://drive.google.com/uc?id=18ADNmJyMZARQhJZbFwSxHa9vIW7XIp9s',
    obs: 'Trabalho fazem anos com delivery',
  },
  {
    id: 3,
    ddata: '03/04/2020 12:28:27',
    name: 'marirlandia',
    email: 'marinastavares6@gmail.com',
    state: 'SC',
    city: 'Florianópolis',
    neighborhood: 'cebtor',
    delivery: 'Telefone, Uber Eats',
    phoneNumber: '+5548984140707',
    whatsapp: '5548984140707',
    site: 'chocolate.com',
    instagram: '@chocolate',
    ifood: '',
    uberEats: '',
    rappi: '',
    howToReceive: 'Delivery',
    photo: 'https://drive.google.com/uc?id=18ADNmJyMZARQhJZbFwSxHa9vIW7XIp9s',
    obs: 'Trabalho fazem anos com delivery',
  },
  {
    id: 4,
    ddata: '03/04/2020 12:28:27',
    name: 'marirlandia',
    email: 'marinastavares6@gmail.com',
    state: 'SC',
    city: 'Florianópolis',
    neighborhood: 'cebtor',
    delivery: 'Telefone, Uber Eats',
    'phoneNumberr ': '+5548984140707',
    whatsapp: '5548984140707',
    site: 'chocolate.com',
    instagram: '@chocolate',
    ifood: '',
    uberEats: '',
    rappi: '',
    howToReceive: 'Delivery',
    photo: 'https://drive.google.com/uc?id=18ADNmJyMZARQhJZbFwSxHa9vIW7XIp9s',
    obs: 'Trabalho fazem anos com delivery',
  },
  {
    id: 5,
    ddata: '03/04/2020 12:28:27',
    name: 'marirlandia',
    email: 'marinastavares6@gmail.com',
    state: 'SC',
    city: 'Florianópolis',
    neighborhood: 'cebtor',
    delivery: 'Telefone, Uber Eats',
    'phoneNumberr ': '+5548984140707',
    whatsapp: '5548984140707',
    site: 'chocolate.com',
    instagram: '@chocolate',
    ifood: '',
    uberEats: '',
    rappi: '',
    howToReceive: 'Delivery',
    photo: 'https://drive.google.com/uc?id=18ADNmJyMZARQhJZbFwSxHa9vIW7XIp9s',
    obs: 'Trabalho fazem anos com delivery',
  },
  {
    id: 6,
    ddata: '03/04/2020 12:28:27',
    name: 'marirlandia',
    email: 'marinastavares6@gmail.com',
    state: 'SC',
    city: 'Chapecó',
    neighborhood: 'cebtor',
    delivery: 'Telefone, Uber Eats',
    'phoneNumberr ': '+5548984140707',
    whatsapp: '5548984140707',
    site: 'chocolate.com',
    instagram: '@chocolate',
    ifood: '',
    uberEats: '',
    rappi: '',
    howToReceive: 'Delivery',
    photo: 'https://drive.google.com/uc?id=18ADNmJyMZARQhJZbFwSxHa9vIW7XIp9s',
    obs: 'Trabalho fazem anos com delivery',
  },
]

// mudar o open para up da photo

const App = () => {
  const styles = useStyles()
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [clients, setClients] = useState(INITIAL_STATE)

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
  console.log('App -> stateCities', stateCities.length)

  // useEffect(() => {
  //   Tabletop.init({
  //     key: '1CYuCMQ35yXrPX6Pjjq_7CS6AXOjAN-2BbjMq8uWcP04',
  //     callback: (data, tabletop) => {
  //       console.log('App -> data', data)
  //       setClients(data)
  //     },
  //     simpleSheet: true,
  //   })
  // }, [])

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={styles.container}
    >
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
          color="#fff"
          variant="h2"
        >
          Procure o ovo mais perto de você
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
        {state !== '' && stateCities.length > 0 && (
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
      <Grid className={styles.cards}>
        {stateCities.length === 0 && (
          <Typography
            className={styles.title}
            component="h1"
            color="primary"
            variant="h2"
          >
            Salvador da Páscoa
          </Typography>
        )}
        {clients.map(
          (client) =>
            client.city === city && <MainCard key={client.id} client={client} />
        )}
      </Grid>
    </Grid>
  )
}

export default React.memo(App)
