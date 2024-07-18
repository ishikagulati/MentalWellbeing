import React from 'react'
import '../../styles/Groupdesc.css'

const GroupAbout = (props) => {
  return (
    <div className='grpaboutcontainer'>
      <h2 id='grpcardheading'>What we’re about</h2>
      <div className="groupcarddesc" dangerouslySetInnerHTML={{__html: props.data}}></div>
    </div>
  )
}

export default GroupAbout