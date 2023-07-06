import { useTheme } from '@emotion/react'
import { Box, IconButton } from '@mui/material'
import React from 'react'
import { ColorModeContext } from '../App'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

interface ThemeProps {
  palette: {
    mode: string
  }
}

const DarkModeComponent: React.FC = () => {
  const theme = useTheme() as ThemeProps
  const colorMode = React.useContext(ColorModeContext)

  return (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 1
              }}
            >
              {theme.palette.mode} mode
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
  )
}

export default DarkModeComponent
