import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import useStyles from './styles'

const Faq = () => {
  const styles = useStyles()

  return (
    <Grid
      container
      className={styles.container}
      direction="column"
      justify="start"
      alignItems="center"
    >
      <Typography
        className={styles.title}
        component="h1"
        color="primary"
        variant="h2"
      >
        FAQ
      </Typography>
    </Grid>
  )
}

export default React.memo(Faq)
