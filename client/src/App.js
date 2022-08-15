import { Home } from "./pages/Home";
import { Leftbar } from "./components/Leftbar";
import { Navbar } from "./components/Navbar";
import React, { useEffect, useState } from "react";
import { Login } from "./pages/Login";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios'
import { url } from './BaseUrl'
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { Redirect } from "./pages/Redirect";


export const AppContext = React.createContext()
const storage = getStorage();
function App() {
  const [dark, setDark] = useState(false)
  const darkTheme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
    },
  });

  const [auth, setAuth] = useState(null)
  const [mainFolder, setMainFolder] = useState()
  const [currentFolder, setCurrentFolder] = useState()
  const [render, setrender] = useState(true)
  const [loading, setLoading] = useState(false)

  const newFolderCreate = (name) => {
    axios.post(`${url}/ff/addfolder`, {
      folderid: currentFolder,
      newfoldername: name,
      uid: auth.uid
    })
      .then(function (response) {
        setrender((prev) => !prev)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  console.debug(render)

  const fileUpload = (file) => {
    upload(file);
  }
  function upload(file) {
    if (!file) return;
    setLoading(true)
    const storageRef = ref(storage, 'files/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (e) => {
        console.log(e);
        setLoading(false)

      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          axios.post(`${url}/ff/addfile`,
            {
              folderid: currentFolder,
              filename: file.name,
              storageLink: downloadURL,
              uid: auth.uid,
              filetype: file.type
            }
          )
            .then(function (response) {
              setrender((prev) => !prev)
              setLoading(false)
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      }
    );
  }

  const ContextValue = {
    auth, mainFolder, setMainFolder, currentFolder, setCurrentFolder, newFolderCreate, fileUpload, loading, setLoading,dark
  }



  useEffect(() => {
    if (localStorage.getItem('authuser') !== null || localStorage.getItem('authuser') !== undefined) {
      setAuth(JSON.parse(localStorage.getItem('authuser')))
    }
    if (localStorage.getItem('dark')) {
      localStorage.getItem('dark') === 'true' ? setDark(true) : setDark(false)
    }
    if (localStorage.getItem('mainFolder')) {
      setMainFolder(localStorage.getItem('mainFolder'))
    }
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
          <AppContext.Provider value={ContextValue}>
            <Routes>
            <Route path="/" element={
                <div className="App">
                  <Redirect/>
                </div>}
              />
              <Route path="/:page" element={
                <div className="App">
                  {
                    (auth) ?
                      (<><Navbar loading={loading} photo={auth.photoURL} setAuth={setAuth} handleDark={handleDark} />
                        <div className="app" style={{ display: 'flex', flexDirection: 'row' }}>
                          <Leftbar />
                          <Home auth={auth} />
                        </div></>) : <Login setAuth={setAuth} />
                  }
                </div>}
              />
            </Routes>
          </AppContext.Provider>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
