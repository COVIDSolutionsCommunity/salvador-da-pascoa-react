import React, { useCallback, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import PublishIcon from '@material-ui/icons/Publish'
import { postImage, getCurrentPhoto, deletePhoto } from '../../modules/actions'
import { Link as RouterLink, navigate } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import useStyles from './styles'
import ImageButton from './image-button'
import redondo from '../../assets/redondo.png'
import { usePrevious } from '../../utils/hooks'

const UploadImage = () => {
  const styles = useStyles()
  const [productImagesPreview, setProductImagesPreview] = useState([])
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  const photos = useSelector((state) => state.currentSeller.result)
  const wasLoading = usePrevious(isLoading)

  const onChangeCoverImage = useCallback((event) => {
    const file = event.currentTarget.files[0]
    console.log('onChangeCoverImage -> file', file)
    setProductImagesPreview((prevState) => [
      ...prevState,
      {
        url: URL.createObjectURL(event.target.files[0]),
        id: file,
      },
    ])
  }, [])

  const onDeleteClick = useCallback((event) => {
    setProductImagesPreview((prevState) =>
      prevState.filter((picture) => picture.url !== event.currentTarget.name)
    )
  }, [])

  const onRemoveClick = useCallback(
    (event) => {
      dispatch(deletePhoto(event.currentTarget.id))
    },
    [dispatch]
  )

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      productImagesPreview.map((image, index) =>
        dispatch(
          postImage({
            order: 0 + index,
            image: image.id,
          })
        )
      )
    },
    [dispatch, productImagesPreview]
  )

  useEffect(() => {
    if (!isLoading && wasLoading && !error) {
      navigate('/obrigada')
    }
  }, [error, isLoading, wasLoading])

  useEffect(() => {
    dispatch(getCurrentPhoto())
  }, [dispatch])

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
          Adicione imagens dos produtos do seu negócio
        </Typography>
        <Typography component="p" variant="h3">
          Queremos ajudar a conectar quem produziu chocolates deliciosos nessa páscoa
          e quem não quer deixar essa data tão doce passar em branco, mesmo em épocas
          de quarentena. Aqui você, que está fazendo ovos, boombons, barras ou kits
          de chocolates nessa páscoa, pode cadastrar os seus produtos para que todos
          vejam e consigam entrar em contato para encomendas.
        </Typography>
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
              Imagens dos produtos
            </Button>
            {/* <Typography component="p" className={styles.errors}>
              {errors.coverImage}
            </Typography> */}
          </label>
        </FormControl>
        <Grid container>
          {photos?.map(
            (image) =>
              console.log('image', image) || (
                <ImageButton
                  key={image.order}
                  onDeleteClick={onRemoveClick}
                  picture={image.image}
                  id={image.id}
                />
              )
          )}
          {productImagesPreview?.map((image) => (
            <ImageButton
              key={image.url}
              onDeleteClick={onDeleteClick}
              picture={image.url}
              value="coverImage"
            />
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading || productImagesPreview.length === 0}
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

export default React.memo(UploadImage)
