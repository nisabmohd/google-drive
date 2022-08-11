import React from 'react'

export const Card = (props) => {
  return (
    <a target="_blank" href={props.url} className='card' style={{ width: '234px', height: '200px', border: '1.5px solid #E7E7ED', position: 'relative', borderRadius: '6px', background: `url(${props.url})`, overflow: 'hidden', backgroundSize: '100% 95%', backgroundRepeat: 'no-repeat', marginRight: '19px', marginTop: '15px' }} rel="noreferrer">
      <div className="name" style={{ backgroundColor: 'white', width: '100%', height: '20%', position: 'absolute', bottom: "0", display: 'flex', alignItems: 'center', zIndex: '88' }}>
        <h5 style={{ marginLeft: '9px' }}>{props.filename}</h5>

      </div>
    </a>
  )
}
