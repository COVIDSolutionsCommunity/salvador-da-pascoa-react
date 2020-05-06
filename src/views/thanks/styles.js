import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    backgroundColor: theme.palette.custom.mandy,
    padding: 10,
    height: '100vh',
  },
  bunny: {
    height: '30px',
    width: '30px',
    borderRadius: '50%',
    marginRight: '8px',
  },
  description: {
    textAlign: 'justify',
    color: theme.palette.custom.brownRust,
    lineHeight: '1.5',
    margin: theme.spacing(3),
  },
  logo: {
    textDecoration: 'none',
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
  multilineColor: {
    color: '#F79C84',
  },
  header: {
    marginBottom: '30px',
    backgroundColor: theme.palette.custom.mandy,
    padding: '30px',
    width: '100vw',
  },
  formControl: {
    fontSize: '14px',
    textAlign: 'left',
  },
}))
