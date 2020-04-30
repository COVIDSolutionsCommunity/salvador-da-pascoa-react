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
  checkbox: {
    display: 'grid',
    gridTemplateColumns: '120px auto',
    alignItems: 'center',
  },
  photo: {
    height: '64px',
    width: '64px',
    border: '2px solid #F79C84',
    borderRadius: 20,
    objectFit: 'cover',
  },
  uploadButton: {
    marginTop: theme.spacing(2),
    marginRight: 'auto',
  },
  logo: {
    textDecoration: 'none',
  },
  trash: {
    width: '25px',
    height: '25px',
    margin: 'auto',
    backgroundColor: 'rgba(239, 84, 84, 0.5)',
    zIndex: '1',
    position: 'relative',
  },
  button: {
    height: '74px',
    width: '74px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 20,
    },
  },
  fullWidth: {
    width: '100%',
  },
  errors: {
    color: 'red',
    fontSize: '12px',
    fontWeight: 'bold',
  },
}))
