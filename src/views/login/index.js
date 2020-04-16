import React, { useState, useCallback, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useFormik } from 'formik'
import Button from '@material-ui/core/Button'
import { createUser, login } from '../../modules/actions'
import { useDispatch, useSelector } from 'react-redux'
import Link from '@material-ui/core/Link'
import { Link as RouterLink, navigate } from '@reach/router'
import CircularProgress from '@material-ui/core/CircularProgress'

import useStyles from './styles'
import NewTextfield from './new-textfield'
import redondo from '../../assets/redondo.png'
import { validate } from './validate'
import { usePrevious } from '../../utils/hooks'

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  password1: '',
  password2: '',
  isLogin: false,
}

const Login = () => {
  const styles = useStyles()
  const dispatch = useDispatch()
  const [isLogin, setLogin] = useState(false)
  const error = useSelector((state) => state.error)
  const isLoading = useSelector((state) => state.loading)
  const wasLoading = usePrevious(isLoading)

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validate: validate,
    onSubmit: () => {
      console.log('cheguei')
      if (!isLogin) {
        dispatch(login(values))
        return
      }
      dispatch(
        createUser({
          ...values,
          firstName: values.name.split(' ')[0],
          lastName: values.name.split(' ').slice(1).join(' '),
        })
      )
    },
  })
  const {
    handleChange,
    values,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
  } = formik

  const onClick = useCallback(() => {
    setLogin((prevState) => !prevState)
    setFieldValue('isLogin', values.isLogin)
  }, [setFieldValue, values.isLogin])

  const props = {
    errors,
    touched,
    handleChange,
    values,
  }

  useEffect(() => {
    if (!isLoading && wasLoading) {
      navigate('/registrar')
    }
  }, [isLoading, wasLoading])

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
        <Typography component="h2" variant="h2" color="primary">
          {isLogin
            ? 'Registre o seu coelhinho na nossa plataforma'
            : 'Bem vindo de volta!'}
        </Typography>
        <Typography component="p" variant="h3">
          Queremos ajudar a conectar quem produziu chocolates deliciosos nessa páscoa
          e quem não quer deixar essa data tão doce passar em branco, mesmo em épocas
          de quarentena. Aqui você, que está fazendo ovos, bombons, barras ou kits de
          chocolates nessa páscoa, pode cadastrar os seus produtos para que todos
          vejam e consigam entrar em contato para encomendas.
          <br />
          {!isLogin &&
            'Para essa primeira etapa, você criará um perfil de administrador, na próxima etapa você adicionará os dados referentes ao seu comércio.'}
        </Typography>
        {!isLogin ? (
          <>
            <NewTextfield label="Email" name="email" {...props} />
            <NewTextfield
              label="Digite sua senha"
              name="password"
              type="password"
              {...props}
            />
            <Typography component="p" className={styles.error}>
              {error}
            </Typography>
          </>
        ) : (
          <>
            <NewTextfield label="Nome" name="name" {...props} />
            <NewTextfield label="Email" name="email" {...props} />
            <NewTextfield
              label="Crie uma senha"
              name="password1"
              type="password"
              {...props}
            />
            <NewTextfield
              label="Repita essa senha"
              name="password2"
              type="password"
              {...props}
            />
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="primary" /> : 'ENTRAR'}
        </Button>
        <Typography className={styles.obs}>
          {' '}
          Caso {isLogin ? 'não' : 'já'} tenha um usuário, clique{' '}
          <Link
            className={styles.link}
            component="button"
            type="button"
            color="primary"
            onClick={onClick}
          >
            aqui para realizar o {isLogin ? 'registro' : 'login'}
          </Link>
        </Typography>
      </form>
    </Grid>
  )
}

export default React.memo(Login)
