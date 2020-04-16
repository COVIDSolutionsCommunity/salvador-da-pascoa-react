import React, { useMemo } from 'react'
import TextField from '@material-ui/core/TextField'

import useStyles from './styles'

const NewTextfield = ({
  touched,
  errors,
  values,
  name,
  handleChange,
  label,
  multiline,
}) => {
  const styles = useStyles()

  const allProps = useMemo(
    () => ({
      fullWidth: true,
      className: styles.dropdown,
      InputProps: {
        classes: {
          input: styles.multilineColor,
        },
      },
    }),
    [styles.dropdown, styles.multilineColor]
  )

  return (
    <TextField
      label={label}
      error={touched[name] && !!errors[name]}
      helperText={touched.name && errors[name]}
      onChange={handleChange}
      value={values[name]}
      name={name}
      multiline={multiline}
      {...allProps}
    />
  )
}

export default React.memo(NewTextfield)
