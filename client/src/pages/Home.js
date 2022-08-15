import React, { useContext, useEffect, useState } from 'react'
import { Cardc } from '../components/Cardc'
import { Folderc } from '../components/Folderc'
import { Selection } from '../components/Selection'
import { AppContext } from '../App'
import axios from 'axios'
import { url } from '../BaseUrl'
import { useParams, useSearchParams } from 'react-router-dom'
import { ListFile } from '../components/ListFile'
import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { ListFolder } from '../components/ListFolder'


export const Home = () => {

  const context = useContext(AppContext)
  const [folders, setFolders] = useState([])
  const [files, setFiles] = useState([])
  const params = useParams()
  const [home, sethome] = useState(true)
  let [searchParams] = useSearchParams();
  const [grid, setGrid] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('grid')) {
      if (localStorage.getItem('grid') === 'false') {
        setGrid(false);
      } else setGrid(true)
    }
  }, [])

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
    } else if (page === 'search') {
      sethome(true)
      const urlquery = searchParams.get('q')
      console.log(urlquery)
      axios.post(`${url}/ff/search`, {
        query: urlquery
      })
        .then(function (response) {
          setFiles(response.data.files)
          setFolders(response.data.folders)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
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

  const handleGrid = () => {
    setGrid(!grid)
    localStorage.setItem('grid', `${!grid}`)
  }


  return (
    <div className="home" style={{ width: '100%', marginLeft: '2vw' }}>
      <Selection setGrid={handleGrid} grid={grid} value={params.page} />
      {
        grid ? <div className="gridbox">
          <div className="files" >
            {
              (home && folders && folders.length !== 0) ?
                <p style={{ marginBottom: '20px', marginTop: '35px', fontSize: '14px' }}>Folders</p> : <></>
            }
            <div className='grid'>
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
            <div className='grid'>
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
                    />

                    : <></>
                }) : <></>
              }
            </div>
          </div>
        </div> : <div className='list' style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <TableContainer style={{ width: '100%' }}>
            <Table style={{ width: '100%' }} aria-label="simple table"></Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '90%' }} >Name</TableCell>
                <TableCell align="right" style={{ fontSize: '12px', width: '10%' }}>Last Modified</TableCell>
                <TableCell align="right" style={{ fontSize: '12px', width: '10%' }}> Type</TableCell>
                <TableCell align="right" style={{ fontSize: '12px', width: '10%' }}> - </TableCell>
              </TableRow>
            </TableHead>
            {
              home && folders && folders.map((item) => {
                return <ListFolder key={item._id} name={item.Name} id={item.Folderid} />
              })
            }
            {
              (files && files.length !== 0) ? files.map(item => {
                return item !== null ?
                  <ListFile
                    key={item.fileid}
                    name={item.filename}
                    img={item.storageLink}
                    id={item.fileid}
                    link={item.storageLink}
                    type={item.filetype}
                    star={item.starred}
                    trash={item.trash}
                    timstamp={item.timstamp}
                    handleRemoveFileCard={handleRemoveFileCard}
                  />
                  : <></>
              }) : <></>
            }
          </TableContainer>
        </div>
      }

      {
        (files?.length === 0 && folders?.length === 0) ?
          <p style={{ margin: 'auto', width: 'fit-content', marginTop: '5vh', fontSize: '13.75px' }}>Nothing to see here</p> : <></>
      }

    </div>
  )
}
