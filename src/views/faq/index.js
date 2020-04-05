import React from 'react'
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
      justify="flex-start"
      alignItems="center"
    >
      <Typography component="h1" color="primary" variant="h1">
        Perguntas Frequentes
      </Typography>
      <Typography className={styles.description} component="p" color="primary">
        <Typography component="h2" variant="h2">
          Como posso incluir o meu negócio?
        </Typography>
        Você clica em cadastrar, responde o questionário e manda algumas fotos dos
        seus produtos.
        <Typography component="h2" variant="h2">
          Preciso pagar alguma coisa para expor meus produtos?
        </Typography>
        Não, essa é uma plataforma gratuita.
        <Typography component="h2" variant="h2">
          {' '}
          Vocês cuidam da entrega dos meus produtos?
        </Typography>
        Não, essa parte é de responsabilidade sua, nós apenas servimos como uma
        vitrine para que as pessoas consigam achar mais facilmente seus produtos.{' '}
        <Typography component="h2" variant="h2">
          Como posso pagar pelo meu pedido ?
        </Typography>
        Essa etapa sera combinada com o vendedor assim que a encomenda for feita, por
        meio do canal que ele disponibilizar na sua página.
        <Typography component="h2" variant="h2">
          Vocês dão algum tipo de garantia para o meu pedido?
        </Typography>
        Não, sugerimos que você dê uma olhadinha nos canais de cada loja para ficar
        mais seguro de sua escolha.
        <Typography component="h2" variant="h2">
          O projeto está disponível no Brasil inteiro?
        </Typography>
        Estamos aceitando cadastros de todas as cidades do Brasil.
        <Typography component="h2" variant="h2">
          Como posso ajudar?{' '}
        </Typography>
        Comprando produtos dos empreendedores listados aqui, e divulgando o nosso
        site.
        <Typography component="h2" variant="h2">
          De onde surgiu esse projeto?
        </Typography>
        Ele foi idealizado para ajudar empreendedores que estão enfrentando
        dificuldades para vender seus chocolates durante a páscoa atípica que estamos
        tendo esse ano.
      </Typography>
    </Grid>
  )
}

export default React.memo(Faq)
