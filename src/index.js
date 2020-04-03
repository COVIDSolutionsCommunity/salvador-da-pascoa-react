import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'
import * as serviceWorker from './serviceWorker'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#EFCEC5',
    },
    secondary: {
      main: '#fff',
    },
    custom: {
      warmGrey: '#909090',
      greyishBrown: '#525252',
      fadedGreen: '#72b26c',
      dustyTeal: '#4d878e',
      midBlue2: '#2e64aa',
      warmGrey2: '#8f8f8f',
      wildSand: '#f5f5f5',
      cobalt: '#204d99',
      darkIndo: '#0f2450',
      dustyGrey: '#969696',
      fern: '#72B26C',
      smalt: '#4D878E',
      azure: '#2E64AA',
      fadedRed: '#dd485b',
      paleGrey: '#ecf3f5',
      greyish: '#b8b8b8',
      midBlue: '#265bb2',
      red: '#ff0000',
    },
    background: {
      default: 'white',
    },
  },
  typography: {
    h1: {
      fontSize: '4.8px',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '16px',
      fontWeight: 'bold',
      lineHeight: '1.5',
    },
    h4: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
    h5: {
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: '1.33',
    },
    subtitle1: {
      fontSize: '16px',
      lineHeight: '1.5',
    },
  },
  root: {
    backgroundColor: 'white',
    button: {
      textTransform: 'capitalize',
    },
    input: {
      fontSize: '16px',
      appearance: 'none',
    },
  },
  overrides: {
    MuiDialogTitle: {
      root: {
        fontSize: '2px',
      },
    },
    MuiSvgIcon: {
      root: {
        height: '20px',
        width: '20px',
      },
    },
    MuiTypography: {
      body1: {
        fontSize: '16px',
        lineHeight: '1.5',
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: '16px',
      },
    },
    MuiInputBase: {
      input: {
        fontSize: '16px',
        lineHeight: 'normal',
      },
    },
    MuiButton: {
      containedPrimary: {
        color: 'white',
      },
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
