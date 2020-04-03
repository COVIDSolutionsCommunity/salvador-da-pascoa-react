import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    fontFamily: 'Indie Flower',
    fontSize: '32px',
  },
  select: {
    marginBottom: '30px',
    backgroundColor: '#EFCEC5',
    padding: '30px',
    width: '100vw',
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
  total: { fontFamily: 'Indie Flower' },
  cards: {
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'repeat(3, auto)',
    gridColumnGap: '16px',
    gridRowGap: '16px',
    margin: theme.spacing(2),

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, auto)',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, auto)',
    },
  },
  icon: {
    color: 'white',
  },
}))
