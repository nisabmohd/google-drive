import React, { useContext } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import { Box } from '@mui/system';
import altimg from '../assets/alt.png'
import altimg1 from '../assets/alt1.png'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GridOnIcon from '@mui/icons-material/GridOn';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { AppContext } from '../App';

export const Cardc = (props) => {
  const context = useContext(AppContext)

  console.log(props);
  return (
    <a href={`${props.link}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box className='card' sx={{ border: 1, borderColor: 'divider' }} style={{ width: '234px', height: '150px', borderRadius: '5px', display: 'flex', flexDirection: 'column', marginRight: '13px', marginTop: '19px', overflow: 'hidden' }}>
        <div href={props.url} className='card' style={{ position: 'relative', background: `url(${props.url})`, overflow: 'hidden', height: '75%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {
            (props.type === 'image/png' || props.type === 'image/jpeg' || props.type === 'image/jpg') ? <>
              <img src={props.img} alt="" style={{ width: '100%' }} />
            </> : <><img src={context.dark?altimg1:altimg} alt="" style={{ width: '100%', marginBottom: '-29px', }} /></>
          }
        </div>
        <div className='folder' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '234px', height: '39px', marginRight: '13px', marginTop: '3px' }}>
          {
            (props.type === 'image/png' || props.type === 'image/jpeg' || props.type === 'image/jpg') ?
              <ImageIcon style={{ width: '20px', marginLeft: '9px' }} /> : <>
              </>
          }
          {
            (props.type === 'application/pdf') ?
              <PictureAsPdfIcon style={{ width: '20px', marginLeft: '9px', color: 'red' }} /> : <></>

          }
          {
            (props.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ?
              <GridOnIcon style={{ width: '20px', marginLeft: '9px', color: 'green' }} /> : <></>

          }
          {
            (props.type === 'video/x-matroska' || props.type === 'video/mp4' || props.type === 'video/3gp') ?
              <MovieCreationIcon style={{ width: '20px', marginLeft: '9px', color: '#757ce8' }} /> : <></>

          }
          {
            (props.type !== 'video/x-matroska' && props.type !== 'video/mp4' && props.type !== 'video/3gp' && props.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && props.type !== 'application/pdf' && props.type !== 'image/png' && props.type !== 'image/jpeg' && props.type !== 'image/jpg') ?
              <InsertDriveFileIcon style={{ width: '20px', marginLeft: '9px' }} /> : <></>
          }

          <p style={{ marginLeft: '9px', color: 'inherit' }}>{props.name?.length > 25 ? props.name?.slice(0, 20) + "..." : props.name}</p>
        </div>
      </Box>
    </a>
  )
}
