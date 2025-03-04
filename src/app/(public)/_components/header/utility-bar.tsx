import Link from 'next/link'
import React from 'react'

const UtilityBar = () => {
  return (
    <div className='bg-primary text-primary-foreground py-2 px-4 text-sm flex justify-between items-center'>
        <div className='hidden md:block'>Free shipping on orders over $50</div>
        <div className='md:hidden'>Free shipping</div>
        <div className='flex gap-4 text-xs'>
            <Link href='#' className='hover:underline'>
            Track Orders
            </Link>
            <Link href='#' className='hover:underline'>
            Help & FAQ
            </Link>
            <Link href='#' className='hover:underline'>
            Store Locator
            </Link>
        </div>
    </div>
  )
}

export default UtilityBar