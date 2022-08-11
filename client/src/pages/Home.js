import React from 'react'
import { Cardc } from '../components/Cardc'
// import { Card } from '../components/Card'
import { Folderc } from '../components/Folderc'
import { Selection } from '../components/Selection'

export const Home = (props) => {


  return (
    <div className="home" style={{ width: '100%', marginLeft: '2vw' }}>
      <Selection />
      <div className="files">
        <h5 style={{ marginBottom: '5px', marginTop: '35px' }}>Folders</h5>
        <div style={{ display: 'grid', gridTemplateColumns:'repeat(6,1fr)', marginBottom: '15px', marginTop: '9px' }}>
          <Folderc name="Farewell 2k22" id="3748jhdfkfgdg"/>
          <Folderc name="Study Material" id="fgh657576hjg"/>
          <Folderc name="Farewell 2k22" id="tyut67tyhfghty"/>
        </div>
      </div>
      <div className="files">
        <h5 style={{ marginBottom: '5px', marginTop: '35px' }}>Files</h5>
        <div style={{ display: 'grid', gridTemplateColumns:'repeat(6,1fr)', marginBottom: '15px', marginTop: '-15px' }}>
          <Cardc name="Building" img="https://images.hdqwalls.com/wallpapers/spiderman-in-dubai-si.jpg" id="kjnhmf87367864jhdf" link=""/>
          <Cardc name="Spiderman" img="https://images.hdqwalls.com/download/spiderman-ps4-new-6c-1400x900.jpg" id="kjfghf5657f87364jhdf" link=""/>
        </div>
      </div>
      
    </div>
  )
}
