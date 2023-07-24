import React from 'react'

const Error = () => {
  return (
    <div><h1 className='text-red-500'>Your current location could not be fetched due to one of the Reasons:
      1) location's permission denied
      2)slow internet, Kindly Reload and give permission to location
    </h1>
    </div>
  )
}

export default Error