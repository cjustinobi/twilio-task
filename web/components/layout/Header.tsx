import Link from 'next/link'
import { useRouter } from 'next/router'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useContext } from 'react'
import { ModalContext } from '@/contexts/ModalContext'

const Header = () => {
	const router = useRouter()
	const { toggleModal } = useContext(ModalContext)
	return (
		<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  {/* <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-black">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button> */}
                </div>
                <div className="flex flex-1 justify-between">
                  <div className="flex flex-shrink-0 items-center text-gray-100">
                    <Link href="/" className="font-semibold">EventHub</Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      href="/events"
                      className={`inline-flex items-center ${router.pathname === '/events' ? 'border-b-2 border-black' : ''} px-1 pt-1 text-sm font-bold text-white-200`}
                    >
                      Events
                    </Link>
                    <Link
                      href="/my-events"
                      className={`inline-flex items-center ${router.pathname === '/my-events' ? 'border-b-2 border-black' : ''} px-1 pt-1 text-sm font-bold text-white-200`}
                    >
                      My Events
                    </Link>
                  </div>
                
                  <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button onClick={toggleModal} className="bg-gradient-to-b from-blue-1 to-green-1 text-white font-bold py-2 px-4 rounded-[10px] mr-4 ml-2">
                      Create Event
                    </button>
                    <ConnectButton showBalance={{smallScreen: true, largeScreen: false}} />
                  </div>
                </div>
              </div>
            </div>
	)
}

export default Header