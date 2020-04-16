import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100%',
    textAlign: 'center',
  },
  description: {
    textAlign: 'justify',
    color: theme.palette.custom.brownRust,
    lineHeight: '1.5',
    margin: theme.spacing(3),
  },
  form: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'auto',
    gridGap: theme.spacing(2),
    padding: '0 50px',
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
}))
