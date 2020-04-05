import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import coelho from '../../../assets/coelho.png'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles.css'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
  },
  img: {
    height: '48px',
    // width: '100%',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    padding: theme.spacing(1),
    animation: 'spin 2s linear infinite',
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}))

const Loading = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.container}>
      <img className={classes.img} alt="loading" src={coelho} />
    </Grid>
  )
}

export default React.memo(Loading)
