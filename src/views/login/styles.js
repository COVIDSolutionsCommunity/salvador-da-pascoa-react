import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: theme.palette.custom.mandy,
    padding: 10,
  },
  description: {
    textAlign: 'justify',
    color: theme.palette.custom.brownRust,
    lineHeight: '1.5',
    margin: theme.spacing(3),
  },
  form: {
    maxWidth: '500px',
    display: 'grid',
    gridTemplateRows: 'auto',
    gridGap: theme.spacing(2),
    padding: '20px 40px 20px',
    margin: 30,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 20,
  },
  bunny: {
    height: '30px',
    width: '30px',
    borderRadius: '50%',
    marginRight: '8px',
  },
  button: {
    marginTop: '8px',
  },
  obs: {
    fontSize: '10px',
    color: theme.palette.primary.main,
  },
  link: {
    marginBottom: '4px',
  },
  error: {
    color: 'red',
    fontSize: '10px',
    fontWeight: 'bold',
  },
  logo: {
    textDecoration: 'none',
  },
}))
