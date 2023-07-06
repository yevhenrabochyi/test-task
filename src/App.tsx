import React from 'react'
import MainPage from './pages/MainPage'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } })

function App (): JSX.Element {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  )

  return (
    <div className="App m-2">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <MainPage />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  )
}

export default App
