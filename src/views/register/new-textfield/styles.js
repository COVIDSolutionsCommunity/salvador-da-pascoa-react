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
  form: {
    width: '300px',
    display: 'grid',
    gridTemplateRows: 'auto',
    gridGap: theme.spacing(2),
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
  multilineColor: {
    color: '#F79C84',
  },
}))
