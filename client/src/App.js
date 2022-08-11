import { Home } from "./pages/Home";
import { Leftbar } from "./components/Leftbar";
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";
import { Login } from "./components/Login";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const [auth, setAuth] = useState(null)
  useEffect(() => {
    if (localStorage.getItem('authuser') !== null || localStorage.getItem('authuser') !== undefined) {
      setAuth(JSON.parse(localStorage.getItem('authuser')))
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="App">
          {
            (auth) ?
              (<><Navbar photo={auth.photoURL} setAuth={setAuth} />
                <div className="app" style={{ display: 'flex', flexDirection: 'row' }}>
                  <Leftbar />
                  <Home auth={auth} />
                </div></>) : <Login setAuth={setAuth} />
          }
        </div>} />
        <Route path="/*" element={<>{(auth) ? <><Navbar photo={auth.photoURL} setAuth={setAuth} />
          <div className="app" style={{ display: 'flex', flexDirection: 'row' }}>
            <Leftbar />
          </div></> : <Login setAuth={setAuth} />}</>} />

        
      </Routes>

    </BrowserRouter>
  );
}

export default App;
