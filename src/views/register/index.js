import React, { useMemo, useCallback, useState } from 'react'
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
import { createSeller } from '../../modules/actions'
import axios from 'axios'
import { Link as RouterLink, navigate } from '@reach/router'
import loadImage from 'blueimp-load-image'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'
import NewTextfield from './new-textfield'
import ImageButton from './image-button'
import redondo from '../../assets/redondo.png'
import { validate } from './validate'

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
      return 'Uber Eats'
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
  const [coverImagePreview, setCoverImagePreview] = useState('')
  const [productImagesPreview, setProductImagesPreview] = useState([])
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    // validate,
    onSubmit: () => {
      const productImages = productImagesPreview.map((image, index) => image.id)
      const payload = {
        ...values,
        coverImage: coverImagePreview.id,
        productImages,
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
      loadImage(
        file,
        (canvas) =>
          canvas.toBlob((blob) =>
            setCoverImagePreview({
              url: URL.createObjectURL(
                new File([blob], file.name, { type: file.type })
              ),
              id: file,
            })
          ),
        { orientation: true }
      )
    },
    [setFieldValue]
  )
  const onChangeProductImages = useCallback(
    (event) => {
      const file = event.currentTarget.files[0]
      setFieldValue('productImages', [...values.productImages, file])
      loadImage(
        file,
        (canvas) =>
          canvas.toBlob((blob) =>
            setProductImagesPreview((prevState) => [
              ...prevState,
              {
                url: URL.createObjectURL(
                  new File([blob], file.name, { type: file.type })
                ),
                id: file,
              },
            ])
          ),
        { orientation: true }
      )
    },
    [setFieldValue, values.productImages]
  )

  const onDeleteClick = useCallback(
    (event) => {
      if (event.currentTarget.value === 'coverImage') {
        setFieldValue('coverImage', [])
        setCoverImagePreview('')
        return
      }
      const findPicture = productImagesPreview.find(
        (image) => image.url === event.currentTarget.name
      )
      setProductImagesPreview((prevState) =>
        prevState.filter((picture) => picture.url !== event.currentTarget.name)
      )
      setFieldValue(
        'productImages',
        values.productImages.filter((image) => image.name !== findPicture.id.name)
      )
    },
    [productImagesPreview, setFieldValue, values.productImages]
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
                    order !== 'telephoneNumber' &&
                    order !== 'instagramProfile' && (
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
        <>
          <input
            accept="image/*"
            type="file"
            onChange={onChangeProductImages}
            id="icon-button-file-2"
            style={{ display: 'none' }}
          />

          <FormControl component="fieldset">
            <FormLabel component="legend" className={styles.formControl}>
              Insira imagens dos seus produtos
            </FormLabel>
            <label
              name="coverImage"
              htmlFor="icon-button-file-2"
              className={styles.fullWidth}
            >
              <Button
                className={styles.uploadButton}
                variant="outlined"
                component="span"
                size="large"
                color="primary"
                name="coverImage"
                fullWidth
              >
                <PublishIcon color="primary" />
                IMAGENS DOS PRODUTOS
              </Button>
            </label>
            <Typography component="p" className={styles.errors}>
              {errors.productImages}
            </Typography>
          </FormControl>
        </>
        <Grid container>
          {productImagesPreview &&
            productImagesPreview.map((picture) => (
              <ImageButton
                key={picture.url}
                onDeleteClick={onDeleteClick}
                picture={picture.url}
              />
            ))}
        </Grid>

        <Button variant="contained" color="primary" type="submit">
          REGISTRAR
        </Button>
      </form>
    </Grid>
  )
}

export default React.memo(Register)
