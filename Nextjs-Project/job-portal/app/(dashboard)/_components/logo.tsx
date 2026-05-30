import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div>
        <Image 
          height={60}
          width={60}
          alt='Logo'
          src={"/car.jpeg"}
        />
    </div>
  )
}

export default Logo