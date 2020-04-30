const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
const regex = new RegExp(expression)

export const validate = (values) => {
  const errors = {}
  const { name } = values

  if (!name) {
    errors.name = 'Campo obrigatório'
  }
  if (!values.description) {
    errors.description = 'Campo obrigatório'
  }
  if (!values.coverImage) {
    errors.coverImage = 'Campo obrigatório'
  }
  if (!values.city) {
    errors.city = 'Campo obrigatório'
  }
  if (!values.state) {
    errors.state = 'Campo obrigatório'
  }
  if (!values.instagramProfile) {
    errors.instagramProfile = 'Campo obrigatório'
  }
  if (!values.telephoneNumber) {
    errors.telephoneNumber = 'Campo obrigatório'
  }
  if (!values.instagramProfile.includes('@')) {
    errors.instagramProfile = 'Insira seu user com o @'
  }

  Object.keys(values).map((value) => {
    console.log('validate -> regex.test(values[value])', regex.test(values[value]))
    if (value.includes('Url') && values[value].length && regex.test(values[value])) {
      return (errors[value] = 'Insira uma url válida')
    }
    return errors
  })

  return errors
}
