import React from 'react'
// import { Card } from '../components/Card'
// import { Folder } from '../components/Folder'
import { Selection } from '../components/Selection'

export const Home = (props) => {


  return (
    <div className="home" style={{ width: '100%', marginLeft: '2vw' }}>
      <Selection />
      <div className="files">
        <h5 style={{ marginBottom: '5px', marginTop: '35px' }}>Files</h5>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '15px', marginTop: '0px', flexWrap: 'wrap' }}>
          
             {/* return( <Card  />) */}

        </div>
      </div>
    </div>
  )
}
