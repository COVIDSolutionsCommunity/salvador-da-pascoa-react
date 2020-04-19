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
  if (!values.productImages) {
    errors.productImages = 'Campo obrigatório'
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

  return errors
}
