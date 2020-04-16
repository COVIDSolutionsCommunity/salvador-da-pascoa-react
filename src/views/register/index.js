import React, { useMemo, useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { useFormik } from 'formik'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import InputMask from 'react-input-mask'
import Button from '@material-ui/core/Button'
import PublishIcon from '@material-ui/icons/Publish'
import { createSeller } from '../../modules/actions'
import axios from 'axios'
import humps from 'humps'

import useStyles from './styles'
import NewTextfield from './new-textfield'

const INITIAL_STATE = {
  user: 'seller',
  name: '',
  description: '',
  neighborhood: '',
  email: '',
  city: '',
  state: '',
  deliveryMeans: [],
  orderMeans: [],
  telephoneNumber: '',
  whatsappNumber: '',
  instagramProfile: '',
  ifoodUrl: '',
  uberEatsUrl: '',
  rappiUrl: '',
  siteUrl: '',
  referrals: '',
  productImages: '',
  coverImage: '',
}

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

const howToOrder = [
  'telephoneNumber',
  'instagramProfile',
  'whatsappNumber',
  'ifoodUrl',
  'uberEatsUrl',
  'rappiUrl',
  'siteUrl',
]

const translateValues = (value) => {
  switch (value) {
    case 'telephoneNumber':
      return 'Telefone'
    case 'instagramProfile':
      return 'Instagram'
    case 'whatsappNumber':
      return 'Whatsapp'
    case 'ifoodUrl':
      return 'Ifood'
    case 'uberEatsUrl':
      return 'Uberr eats'
    case 'rappiUrl':
      return 'Rappi'
    case 'dispatch':
      return 'Envio'
    case 'takeout':
      return 'Retirada'
    case 'delivery':
      return 'Delivery'
    default:
      return 'Site'
  }
}

const howToDeliver = ['dispatch', 'takeout', 'delivery']

const Register = () => {
  const styles = useStyles()

  const formik = useFormik({
    initialValues: INITIAL_STATE,
  })
  const { handleChange, values, touched, errors, setFieldValue } = formik
  console.log('Register -> values', values)

  const getFormData = useMemo(() => {
    const formData = new FormData()
    Object.keys(values.coverImage).forEach((key) =>
      formData.append(key, values.coverImage[key])
    )
    return formData
  }, [values.coverImage])

  const allProps = useMemo(
    () => ({
      fullWidth: true,
      className: styles.dropdown,
      InputProps: {
        classes: {
          input: styles.multilineColor,
        },
      },
    }),
    [styles.dropdown, styles.multilineColor]
  )

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()
      const payload = humps.decamelizeKeys({
        ...values,
        coverImage: getFormData,
      })
      console.log(
        'Register -> payload',
        payload,
        'Token 94ae8fff4016abd48cd3603b1286d7ac19d76e5b'
      )
      axios
        .post(
          'https://api-salvadordapascoa.herokuapp.com/api/v1/my-seller/',
          payload,
          {
            headers: {
              Authorization: 'Token 94ae8fff4016abd48cd3603b1286d7ac19d76e5b',
            },
          }
        )
        .then((response) => {
          console.log('createSeller -> response', response)
        })
    },
    [getFormData, values]
  )

  const setCheckboxValues = useCallback(
    (event) => {
      const { name, value } = event.target
      console.log('Register -> name, value', name, value)
      if (values[name].includes(value)) {
        setFieldValue(
          name,
          values[name].filter((item) => item !== value)
        )
        console.log(
          'Register -> values[name].filter(item !== value)',
          values[name].filter((item) => item !== value)
        )
      } else {
        setFieldValue(name, values[name].push(value))
        console.log('Register -> values[name].push(value)', values[name])
      }
    },
    [setFieldValue, values]
  )

  const setDescriptionText = useCallback(
    (name, text) =>
      (touched[name] && errors[name]) || (values[name].length === 0 && text),
    [errors, touched, values]
  )

  const props = {
    errors,
    touched,
    handleChange,
    values,
  }

  return (
    <Grid
      container
      className={styles.container}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid className={styles.header}>
        <Typography component="h1" color="secondary" variant="h1">
          Registre o seu coelhinho na nossa plataforma
        </Typography>
        <Typography component="p" variant="h3" color="secondary">
          Queremos ajudar a conectar quem produziu chocolates deliciosos nessa páscoa
          e quem não quer deixar essa data tão doce passar em branco, mesmo em épocas
          de quarentena. Aqui você, que está fazendo ovos, boombons, barras ou kits
          de chocolates nessa páscoa, pode cadastrar os seus produtos para que todos
          vejam e consigam entrar em contato para encomendas.
        </Typography>
      </Grid>
      <form className={styles.form} onSubmit={onSubmit}>
        <NewTextfield label="Nome do seu negócio" name="name" {...props} />
        <NewTextfield
          // helperText={setDescriptionText(
          //   'description',
          //   'Essa descrição vai ficar em sua página, para que as pessoas conheçam melhor seu trabalho. Se tiver algum comentários sobre os produtos, pode escrever aqui também!'
          // )}
          label="Descrição"
          name="description"
          multiline
          {...props}
        />
        <NewTextfield
          label="Email"
          name="email"
          // helperText={setDescriptionText(
          //   'email',
          //   'Não será exibido na página, usaremos somente para nos comunicarmos com você'
          // )}
          {...props}
        />
        <FormControl className={styles.formControl}>
          <InputLabel className={styles.label} htmlFor="state-native-simple">
            Estado
          </InputLabel>
          <Select
            value={values.state}
            onChange={handleChange}
            className={styles.dropdown}
            classes={{
              icon: styles.icon,
            }}
            placeholder="Selecione um estado"
            name="state"
          >
            {BRAZILIAN_STATES.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <NewTextfield label="Cidade" name="city" {...props} />
        <NewTextfield label="Bairro" name="neighborhood" {...props} />
        <FormControl component="fieldset" className={styles.formControl}>
          <FormLabel component="legend">Como pedir?</FormLabel>
          <FormGroup>
            {howToOrder.map((order) => {
              return (
                <Grid className={styles.checkbox}>
                  <FormControlLabel
                    key={order}
                    control={
                      <Checkbox
                        onChange={handleChange}
                        name="orderMeans"
                        value={order}
                        color="primary"
                      />
                    }
                    label={translateValues(order)}
                  />
                  {values.orderMeans.includes(order) && (
                    <NewTextfield
                      label={`Digite seu ${translateValues(order)}`}
                      name={order}
                      {...props}
                    />
                  )}
                </Grid>
              )
            })}
          </FormGroup>
        </FormControl>
        <InputMask
          label="Whatsapp"
          error={touched.whatsappNumber && !!errors.whatsappNumber}
          helperText={touched.whatsappNumber && errors.whatsappNumber}
          onChange={handleChange}
          value={values.whatsappNumber}
          name="whatsappNumber"
          mask="(99) 99999-9999"
          {...allProps}
        >
          {(inheritedProps) => <TextField {...inheritedProps} />}
        </InputMask>
        <FormControl component="fieldset" className={styles.formControl}>
          <FormLabel component="legend">Como posso receber?</FormLabel>
          <FormGroup>
            {howToDeliver.map((order) => (
              <FormControlLabel
                key={order}
                control={
                  <Checkbox
                    checked={values.deliveryMeans[order]}
                    onChange={handleChange}
                    name="deliveryMeans"
                    value={order}
                    color="primary"
                  />
                }
                label={translateValues(order)}
              />
            ))}
          </FormGroup>
        </FormControl>
        <>
          <input
            color="primary"
            accept="image/*"
            type="file"
            onChange={(event) => {
              setFieldValue('coverImage', event.currentTarget.files[0])
            }}
            id="icon-button-file"
            style={{ display: 'none' }}
          />
          <label htmlFor="icon-button-file">
            <Button
              variant="contained"
              component="span"
              size="large"
              color="primary"
            >
              upload
            </Button>
          </label>
        </>
        <>
          <input
            color="primary"
            accept="image/*"
            type="file"
            onChange={(event) => {
              setFieldValue('productImages', [
                ...values.productImages,
                event.currentTarget.files[0],
              ])
            }}
            id="icon-button-file-2"
            style={{ display: 'none' }}
          />
          <label htmlFor="icon-button-file-2">
            <FormControl component="fieldset">
              <FormLabel component="legend" className={styles.formControl}>
                Insira imagens da sua
              </FormLabel>
              <Button
                variant="contained"
                component="span"
                size="large"
                color="primary"
              >
                <PublishIcon color="secondary" />
                upload
              </Button>
            </FormControl>
          </label>
        </>
        <Button variant="contained" color="primary" type="submit">
          {' '}
          Hello
        </Button>
      </form>
    </Grid>
  )
}

export default React.memo(Register)
