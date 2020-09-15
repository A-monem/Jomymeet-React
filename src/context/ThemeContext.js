import React, {Component, createContext} from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'

export const ThemeContext = createContext()

export default class ThemeContextProvider extends Component{
    state = {
        darkMode: false
    }

    toggleTheme = () => {
        this.setState({
            darkMode: !this.state.darkMode
        })
    }

    render() {
        const theme = createMuiTheme({
            palette: {
              primary: purple,
              secondary: {
                light: '#95c5c7',
                main: '#6ebfc2',
                dark: '#23b5ba',
                contrastText: '#000',
              },
              type: this.state.darkMode ? 'dark' : 'light'
            }
        })

        return (
        <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={{ toggleTheme: this.toggleTheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        </ThemeProvider>
        )
      }
}