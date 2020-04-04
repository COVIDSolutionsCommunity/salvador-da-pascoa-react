import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    margin: '0 auto',
    fontFamily: 'Baloo Chettan',
    fontSize: '32px',
  },
  select: {
    marginBottom: '30px',
    backgroundColor: theme.palette.custom.mandy,
    padding: '30px',
    width: '100vw',
  },
  null: {
    height: '100vh',
  },
  dropdown: {
    color: '#fff',
    '&:before': {
      borderColor: '#fff',
    },
    '&:after': {
      borderColor: '#fff',
    },
  },
  label: {
    color: 'white',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 320,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    maxWidth: 345,
  },
  total: { fontFamily: 'Baloo Chettan' },
  cards: {
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridColumnGap: '16px',
    gridRowGap: '16px',
    margin: theme.spacing(2),

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  icon: {
    color: 'white',
  },
}))
