import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'

import paula from '../../assets/paula.png'
import Martina from '../../assets/Martina.png'
import matheus from '../../assets/matheus.png'
import marina from '../../assets/marina.png'
import maurici from '../../assets/maurici.png'

import useStyles from './styles'

const group = [
  {
    id: 1,
    name: 'Paula Fortkamp Frigo',
    description: 'Gastrônoma e Food Designer.',
    linkedin: 'https://www.linkedin.com/in/paula-fortkamp-frigo/',
    photo: paula,
  },
  {
    id: 2,
    name: 'Martina Hotzel',
    description: 'Designer',
    linkedin: 'https://www.linkedin.com/in/martinahotzel',
    photo: Martina,
  },
  {
    id: 3,
    name: 'Matheus Ribak',
    description: 'Programador',
    linkedin: 'https://www.linkedin.com/in/matheusribak/',
    github: 'https://www.github.com/matheusribak/',
    photo: matheus,
  },
  {
    id: 4,
    name: 'Marina Silva Tavares',
    description: 'Frontend dev',
    linkedin: 'https://www.linkedin.com/in/marinastavares/',
    github: 'https://www.github.com/marinastavares',
    photo: marina,
  },
  {
    id: 5,
    name: 'Maurici Meneghetti de Souza',
    description: 'Programador apaixonado',
    linkedin: 'http://linkedin.com/in/maurici-meneghetti-de-souza-2a73ab161',
    photo: maurici,
  },
]

const AboutUs = () => {
  const styles = useStyles()

  return (
    <Grid
      container
      className={styles.container}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography component="h1" color="primary" variant="h1">
        Sobre nós
      </Typography>
      <Typography component="h2" variant="h2">
        #vaiterpáscoasim
      </Typography>
      <Typography className={styles.description} component="p" color="primary">
        Fizemos esse projeto pensando em dar uma ajuda para todos confeiteiros,
        pequenos comércios e empreendedores que conseguem uma renda extra nessa época
        do ano e estão tendo dificuldades para anunciar e vender seus produtos por
        causa da crise atual.
        <br /> Ao mesmo tempo, queremos trazer o espirito de união para as famílias e
        amigos que passarão essa páscoa distante, mas não querem deixar de mandar uma
        lembrança doce mesmo de longe. <br /> O salvador da páscoa foi idealizado por
        um grupo de voluntários que se juntaram através da plataforma{' '}
        <Link
          target="_blanck"
          rel="noreferer"
          color="primary"
          href="https://www.covidsolutions.com.br"
        >
          covidsolutions.com.br
        </Link>
        , que une pessoas para resolver problemas que estão surgindo em decorrência
        da pandemia.
        <br />O grupo é formado por:
      </Typography>
      <Grid container justify="center" spacing={1}>
        {group.map((person) => (
          <Grid key={person.id} className={styles.contact}>
            <img alt="Perfil" className={styles.img} src={person.photo} />
            <Typography className={styles.name} color="primary">
              {person.name}
            </Typography>
            <Typography className={styles.about}>{person.description}</Typography>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Link
                target="_blanck"
                rel="noreferer"
                color="primary"
                href={person.linkedin}
              >
                <LinkedInIcon className={styles.icon} />
              </Link>
              {person.github && (
                <Link
                  target="_blanck"
                  rel="noreferer"
                  color="primary"
                  href={person.github}
                >
                  <GitHubIcon className={styles.icon} />
                </Link>
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default React.memo(AboutUs)
