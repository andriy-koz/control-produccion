import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Control de produccion',
  description: 'Demo control de produccion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='navbar bg-base-100'>
          <div className='navbar-start w-auto'>
            <div className='dropdown'>
              <label tabIndex={0} className='btn btn-ghost lg:hidden'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h8m-8 6h16'
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
                <li>
                  <Link href={'/objetivos'}>Objetivos</Link>
                </li>
                <li>
                  <Link href={'/entregas'}>Entregas</Link>
                </li>
                <li>
                  <Link href={'/seguimiento'}>Seguimiento</Link>
                </li>
              </ul>
            </div>
            <Link href={'/'} className='btn btn-ghost normal-case text-xl'>
              LeanSys
            </Link>
          </div>
          <div className='navbar-center hidden lg:flex mx-auto'>
            <ul className='menu menu-horizontal px-1'>
              <li>
                <Link href={'/objetivos'}>Objetivos</Link>
              </li>
              <li>
                <Link href={'/entregas'}>Entregas</Link>
              </li>
              <li>
                <Link href={'/seguimiento'}>Seguimiento</Link>
              </li>
            </ul>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
