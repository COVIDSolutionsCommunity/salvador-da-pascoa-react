export const validate = (values) => {
  const errors = {}
  const { name, email, password1, password2, password, isLogin } = values
  console.log('validate -> isLogin', isLogin)

  if (!isLogin) {
    if (!password) {
      errors.password = 'Campo obrigatório'
    }
  }

  if (!email) {
    errors.email = 'Campo obrigatório'
  }

  if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  ) {
    errors.email = 'E-mail inválido'
  }

  if (isLogin) {
    if (!name) {
      errors.name = 'Campo obrigatório'
    }
    if (!password1) {
      errors.password1 = 'Campo obrigatório'
    }
    if (!password2) {
      errors.password2 = 'Campo obrigatório'
    }
    if (password1 !== password2) {
      errors['password1'] = 'Senhas não são identicas'
      errors['password2'] = 'Senhas não são identicas'
    }
  }

  return errors
}
