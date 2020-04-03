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
  const [age, setAge] = useState('SC')
  const [city, setCity] = useState('')
  const [clients, setClients] = useState(INITIAL_STATE)

  const handleChange = useCallback((event) => {
    setAge(event.target.value)
  }, [])

  const handleChange2 = useCallback((event) => {
    setCity(event.target.value)
  }, [])

  const stateCities = useMemo(() => clients.find((client) => client.state === age), [
    age,
    clients,
  ])
  console.log('App -> stateCities', stateCities)

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
      <Typography
        className={styles.title}
        component="h1"
        color="primary"
        variant="h2"
      >
        Salvador da Páscoa
      </Typography>
      <Grid container className={styles.select} justify="center" alignItems="center">
        <FormControl className={styles.formControl}>
          <InputLabel htmlFor="age-native-simple">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
          >
            {BRAZILIAN_STATES.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={styles.formControl}>
          <InputLabel htmlFor="age-native-simple">Cidade</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            onChange={handleChange2}
          >
            {clients.map(
              (client) =>
                client.state === age && (
                  <MenuItem key={client.id} value={client.city}>
                    {client.city}
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid className={styles.cards}>
        {clients.map(
          (client) =>
            client.city === city && <MainCard key={client.id} client={client} />
        )}
      </Grid>
    </Grid>
  )
}

export default React.memo(App)
