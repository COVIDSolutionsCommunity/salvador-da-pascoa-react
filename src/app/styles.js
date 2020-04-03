import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  container: {
    paddingTop: 16,
  },
  title: {
    textAlign: 'center',
  },
  select: {
    margin: '30px 0',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    maxWidth: 345,
  },
  cards: {
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'repeat(3, auto)',
    gridColumnGap: '16px',
    gridRowGap: '16px',
  },
}))
