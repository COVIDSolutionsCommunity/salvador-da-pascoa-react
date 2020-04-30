import React, { useCallback, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import useStyles from './styles'
import trash from '../../../assets/trash.png'

const ImageButton = ({ picture, onDeleteClick, value }) => {
  const styles = useStyles()
  const [mouse, setMouse] = useState(false)
  const [isPictureLoading, setLoadingImage] = useState(true)

  const handleLoadingImage = useCallback((event) => {
    if (event.type === 'load') {
      setLoadingImage(false)
    }
  }, [])

  const onMouse = useCallback(
    (bool) => () => {
      setMouse(bool)
    },
    []
  )

  return (
    <button
      type="button"
      onMouseOver={onMouse(true)}
      onMouseLeave={onMouse(false)}
      onClick={onDeleteClick}
      onLoad={handleLoadingImage}
      className={styles.button}
      name={picture}
      value={value}
    >
      {isPictureLoading && <CircularProgress color="primary" />}
      {mouse ? (
        <img
          src={trash}
          alt="Foto do item"
          aria-label="Foto do item"
          className={styles.trash}
        />
      ) : (
        <img
          src={picture}
          alt="Foto do item"
          aria-label="Foto do item"
          className={styles.photo}
        />
      )}
    </button>
  )
}

export default React.memo(ImageButton)
