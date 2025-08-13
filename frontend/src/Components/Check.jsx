import React from 'react'

const Check = () => {
  return (
    <div className='flex items-center justify-center w-full min-h-screen'>
      <div>
        <label htmlFor="uploadCategoryImage">
          <div className='border outline-none px-6 py-4 text-sm justify-center text-center items-center rounded border-blue-500 bg-blue-50 cursor-pointer'>upload Image</div>
          <input type="file" id='uploadCategoryImage' className='hidden'/>
        </label>
      </div>
    </div>
  )
}

export default Check