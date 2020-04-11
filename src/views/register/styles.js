import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  container: {
    padding: '20px 250px',
    width: '100vw',
    height: '100%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '20px 20px',
    },
  },
  description: {
    textAlign: 'justify',
    color: theme.palette.custom.brownRust,
    lineHeight: '1.5',
    margin: theme.spacing(3),
  },
  bunny: {
    margin: '0 auto',
    height: '64px',
  },
  form: {
    height: '300px',
  },
  dropdown: {
    color: '#F79C84',
    '&:before': {
      borderColor: '#F79C84',
    },
    '&:after': {
      borderColor: '#F79C84',
    },
  },
}))
