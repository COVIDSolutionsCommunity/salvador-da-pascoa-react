import React, { useMemo, useCallback, useState, useEffect } from 'react'
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
import Checkbox from '@material-ui/core/Checkbox'
import InputMask from 'react-input-mask'
import Button from '@material-ui/core/Button'
import PublishIcon from '@material-ui/icons/Publish'
import { createSeller, editSeller, getCurrentSellers } from '../../modules/actions'
import { Link as RouterLink, navigate } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import useStyles from './styles'
import NewTextfield from './new-textfield'
import ImageButton from './image-button'
import redondo from '../../assets/redondo.png'
import { validate } from './validate'
import { usePrevious } from '../../utils/hooks'

const INITIAL_STATE = {
  name: '',
  description: '',
  neighborhood: '',
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
  'telephone',
  'rappi',
  'whatsapp',
  'uber_eats',
  'ifood',
  'instagram',
  'facebook',
  'website',
]

const translateValues = (value) => {
  switch (value) {
    case 'telephone':
      return 'Telefone'
    case 'instagram':
      return 'Instagram'
    case 'whatsapp':
      return 'Whatsapp'
    case 'ifood':
      return 'Ifood'
    case 'uber_eats':
      return 'Uber Eats'
    case 'rappi':
      return 'Rappi'
    case 'dispatch':
      return 'Envio'
    case 'takeout':
      return 'Retirada'
    case 'delivery':
      return 'Delivery'
    case 'facebook':
      return 'Facebook'
    default:
      return 'Site'
  }
}

const selectOrder = {
  whatsapp: 'whatsappNumber',
  ifood: 'ifoodUrl',
  uberEats: 'uberEatsUrl',
  rappi: 'rappiUrl',
  website: 'siteUrl',
}

const howToDeliver = ['dispatch', 'takeout', 'delivery']

const Register = () => {
  const styles = useStyles()
  const [coverImagePreview, setCoverImagePreview] = useState('')
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  const isUser = useSelector((state) => state.currentSeller)
  const wasLoading = usePrevious(isLoading)

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validate,
    onSubmit: () => {
      const payload = {
        ...values,
        coverImage: coverImagePreview.id,
      }
      if (!!isUser?.name) {
        console.log('aqui')
        dispatch(editSeller(payload))
        return
      }
      dispatch(createSeller(payload))
    },
  })
  const {
    handleChange,
    values,
    touched,
    errors,
    setFieldValue,
    handleSubmit,
    setValues,
  } = formik

  const props = {
    errors,
    touched,
    handleChange,
    values,
  }

  const onChangeCoverImage = useCallback(
    (event) => {
      const file = event.currentTarget.files[0]
      setFieldValue('coverImage', file)
      setCoverImagePreview({
        url: URL.createObjectURL(event.target.files[0]),
        id: file,
      })
    },
    [setFieldValue]
  )

  const onDeleteClick = useCallback(
    (event) => {
      setFieldValue('coverImage', [])
      setCoverImagePreview('')
    },
    [setFieldValue]
  )

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

  useEffect(() => {
    dispatch(getCurrentSellers())
  }, [dispatch])

  useEffect(() => {
    if (!isLoading && wasLoading && !error) {
      navigate('/imagens')
    }
  }, [error, isLoading, wasLoading])

  useEffect(() => {
    if (!!isUser?.name) {
      const initialValue = Object.keys(INITIAL_STATE).reduce(
        (obj, item) => Object.assign(obj, { [item]: isUser[item] }),
        {}
      )
      setValues(initialValue)
    }
  }, [isUser, setValues])

  return (
    <Grid
      container
      className={styles.container}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <RouterLink to="/" className={styles.logo}>
          <Grid container alignItems="center" justify="center">
            <img alt="Logo" src={redondo} className={styles.bunny} />
            <Typography component="h2" variant="h2" color="primary">
              salvador da páscoa
            </Typography>
          </Grid>
        </RouterLink>
        <Typography component="h2" color="primary" variant="h2">
          Adicione as informações do seu negócio
        </Typography>
        <Typography component="p" variant="h3">
          Queremos ajudar a conectar quem produziu chocolates deliciosos nessa páscoa
          e quem não quer deixar essa data tão doce passar em branco, mesmo em épocas
          de quarentena. Aqui você, que está fazendo ovos, boombons, barras ou kits
          de chocolates nessa páscoa, pode cadastrar os seus produtos para que todos
          vejam e consigam entrar em contato para encomendas.
        </Typography>
        <NewTextfield label="Nome do seu negócio" name="name" {...props} />
        <NewTextfield label="Descrição" name="description" multiline {...props} />
        <NewTextfield label="@ do instagram" name="instagramProfile" {...props} />
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
            fullWidth
            error={touched.state && !!errors.state}
            helperText={touched.name && errors.state}
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
        <InputMask
          label="Telefone"
          error={touched.telephoneNumber && !!errors.telephoneNumber}
          helperText={touched.telephoneNumber && errors.telephoneNumber}
          onChange={handleChange}
          value={values.telephoneNumber}
          name="telephoneNumber"
          mask="(99) 99999-9999"
          {...allProps}
        >
          {(inheritedProps) => <TextField {...inheritedProps} />}
        </InputMask>
        <FormControl component="fieldset" className={styles.formControl}>
          <FormLabel component="legend">Como é realizado o pedido?</FormLabel>
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
                  {values.orderMeans.includes(order) &&
                    order !== 'telephone' &&
                    order !== 'instagram' && (
                      <NewTextfield
                        label={`Digite seu ${translateValues(order)}`}
                        name={selectOrder[order]}
                        {...props}
                      />
                    )}
                </Grid>
              )
            })}
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" className={styles.formControl}>
          <FormLabel component="legend">Como é realizada a entrega?</FormLabel>
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
        <FormControl component="fieldset">
          <FormLabel component="legend" className={styles.formControl}>
            Insira uma imagem que represente a sua marca
          </FormLabel>
          <input
            accept="image/*"
            type="file"
            onChange={onChangeCoverImage}
            id="icon-button-file"
            style={{ display: 'none' }}
          />
          <label htmlFor="icon-button-file" className={styles.fullWidth}>
            <Button
              className={styles.uploadButton}
              variant="outlined"
              component="span"
              size="large"
              color="primary"
              fullWidth
            >
              <PublishIcon color="primary" />
              IMAGEM DE CAPA
            </Button>
            <Typography component="p" className={styles.errors}>
              {errors.coverImage}
            </Typography>
          </label>
        </FormControl>
        {coverImagePreview && (
          <ImageButton
            onDeleteClick={onDeleteClick}
            picture={coverImagePreview.url}
            value="coverImage"
          />
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'REGISTRAR'}
        </Button>
        <Typography component="p" className={styles.errors}>
          {error}
        </Typography>
      </form>
    </Grid>
  )
}

export default React.memo(Register)
