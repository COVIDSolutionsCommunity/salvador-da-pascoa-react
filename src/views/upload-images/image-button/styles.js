import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  photo: {
    height: '64px',
    width: '64px',
    border: '2px solid #F79C84',
    borderRadius: 20,
    objectFit: 'cover',
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
}))
