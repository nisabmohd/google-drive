import React, { useContext, useEffect, useState } from 'react'
import { Cardc } from '../components/Cardc'
import { Folderc } from '../components/Folderc'
import { Selection } from '../components/Selection'
import { AppContext } from '../App'
import axios from 'axios'
import { url } from '../BaseUrl'
import { useParams, useSearchParams } from 'react-router-dom'


export const Home = () => {

  const context = useContext(AppContext)
  const [folders, setFolders] = useState([])
  const [files, setFiles] = useState([])
  const params = useParams()
  const [home, sethome] = useState(true)
  let [searchParams] = useSearchParams();
  useEffect(() => {
    const { page } = params
    if (page === 'mydrive') {
      sethome(true)
      const urlquery = searchParams.get('folderid')
      context.setCurrentFolder(urlquery ? urlquery : context.mainFolder)
      axios.get(`${url}/ff/${urlquery ? urlquery : context.mainFolder}`)
        .then(function (response) {
          setFiles(response.data.files)
          setFolders(response.data.folders)
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      sethome(false)
      axios.get(`${url}/ff/${page}/${context.auth.uid}`)
        .then(function (response) {
          setFiles(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }, [context, context.auth.uid, context.mainFolder, params, searchParams])

  const handleRemoveFileCard = (fileid) => {
    setFiles(files.filter(item => item.fileid !== fileid));
  }

  return (
    <div className="home" style={{ width: '100%', marginLeft: '2vw' }}>
      <Selection value={params.page} />
      <div className="grid">

        <div className="files">
          {
            (home && folders && folders.length !== 0) ?
              <p style={{ marginBottom: '5px', marginTop: '35px', fontSize: '14px' }}>Folders</p> : <></>
          }
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', marginBottom: '15px', marginTop: '9px' }}>
            {
              home && folders && folders.map((item) => {
                return <Folderc key={item._id} name={item.Name} id={item.Folderid} />
              })
            }
          </div>
        </div>
        <div className="files">
          {
            files?.length !== 0 ?
              <p style={{ marginBottom: '5px', marginTop: '35px', fontSize: '14px' }}>Files</p> : <></>
          }
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', marginBottom: '15px', marginTop: '-15px' }}>
            {
              (files && files.length !== 0) ? files.map(item => {
                return item !== null ?
                  <Cardc
                    key={item.fileid}
                    name={item.filename}
                    img={item.storageLink}
                    id={item.fileid}
                    link={item.storageLink}
                    type={item.filetype}
                    star={item.starred}
                    trash={item.trash}
                    handleRemoveFileCard={handleRemoveFileCard}
                  /> : <></>
              }) : <></>
            }
          </div>
        </div>
      </div>
      {
        (files?.length === 0 && folders?.length === 0) ?
          <p style={{ margin: 'auto', width: 'fit-content', marginTop: '5vh', fontSize: '16px' }}>Nothing to see here</p> : <></>
      }

    </div>
  )
}
