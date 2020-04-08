import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ReactGA from 'react-ga'

import useStyles from './styles'

const Faq = () => {
  const styles = useStyles()

  useEffect(() => {
    const trackingId = 'UA-162871245-1'
    ReactGA.initialize(trackingId)
    ReactGA.pageview('/faq')
  }, [])

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
      <Grid className={styles.description} color="primary">
        <Typography component="p" variant="h2">
          Como posso incluir o meu negócio?
        </Typography>
        Você clica em cadastrar, responde o questionário e manda algumas fotos dos
        seus produtos.
        <Typography component="p" variant="h2">
          Preciso pagar alguma coisa para expor meus produtos?
        </Typography>
        Não, essa é uma plataforma gratuita.
        <Typography component="p" variant="h2">
          {' '}
          Vocês cuidam da entrega dos meus produtos?
        </Typography>
        Não, essa parte é de responsabilidade sua, nós apenas servimos como uma
        vitrine para que as pessoas consigam achar mais facilmente seus produtos.{' '}
        <Typography component="p" variant="h2">
          Como posso pagar pelo meu pedido ?
        </Typography>
        Essa etapa sera combinada com o vendedor assim que a encomenda for feita, por
        meio do canal que ele disponibilizar na sua página.
        <Typography component="p" variant="h2">
          Vocês dão algum tipo de garantia para o meu pedido?
        </Typography>
        Não, sugerimos que você dê uma olhadinha nos canais de cada loja para ficar
        mais seguro de sua escolha.
        <Typography component="p" variant="h2">
          O projeto está disponível no Brasil inteiro?
        </Typography>
        Estamos aceitando cadastros de todas as cidades do Brasil.
        <Typography component="p" variant="h2">
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
        <Typography component="h2" variant="h2">
          Vocês ganham alguma coisa com o site?
        </Typography>
        Não, essa é uma plataforma sem fins lucrativos que foi idealizada para ajudar
        a minimizar os efeitos da crise
        <Typography component="h2" variant="h2">
          Posso alterar o meu cadastro depois que ele já estiver no site?
        </Typography>
        Infelizmente não, seus dados vão direto para a página. Se quiser fazer alguma
        alteração você terá que preencher um novo cadastro e nos avisar no campo de
        observações
        <Typography component="h2" variant="h2">
          Minha loja não está na página principal, como posso achá-la?
        </Typography>
        A página principal só mostra 12 lojas por vez e cada vez que você atualiza o
        site, as opções são diferentes. Você consegue achar a sua página preenchendo
        o campo do estado e cidade onde ela está cadastrada!
      </Grid>
    </Grid>
  )
}

export default React.memo(Faq)
