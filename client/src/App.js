import { Home } from "./pages/Home";
import { Leftbar } from "./components/Leftbar";
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";
import { Login } from "./pages/Login";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [dark, setDark] = useState(false)
  const darkTheme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
    },
  });

  const [auth, setAuth] = useState(null)
  useEffect(() => {
    if (localStorage.getItem('authuser') !== null || localStorage.getItem('authuser') !== undefined) {
      setAuth(JSON.parse(localStorage.getItem('authuser')))
    }
    if (!localStorage.getItem('dark')) return
    localStorage.getItem('dark') === 'true' ? setDark(true) : setDark(false)
  }, [])

  function handleDark() {
    setDark(prevState => {
      return !prevState
    })
    localStorage.setItem('dark', `${!dark}`)
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <Routes>
            <Route path="/*" element={<div className="App">
              {
                (auth) ?
                  (<><Navbar photo={auth.photoURL} setAuth={setAuth} handleDark={handleDark} />
                    <div className="app" style={{ display: 'flex', flexDirection: 'row' }}>
                      <Leftbar />
                      <Home auth={auth} />
                    </div></>) : <Login setAuth={setAuth} />
              }
            </div>
            } />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
