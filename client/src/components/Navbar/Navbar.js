import React, { useState, useContext } from 'react'
import logo from '../../assets/images/shoppers-haven-logo.png'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import DotLoader from "react-spinners/DotLoader";
import Modal from 'react-bootstrap/Modal';

export default function Navbar() {
    const [current] = useState(false)
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [searches, setSearches] = useState([]);
    const [loading, setLoading] = useState(false)

    
    const { handleSignOut, loggedIn, user, token} = useContext(AuthContext)
    
    const navigate = useNavigate()
   
    const navigation = [
        { name: 'Home', href: '/', current: false }, 
        { name: 'About', href: '/about', current: false },
    ]

    function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
    }

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    function fetchSearches() {
        setLoading(true)
        fetch('search_histories',{
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
         .then(r => r.json())
         .then(data => {
            setTimeout(() => {
                setLoading(false)
              }, 2500)
            setSearches(data)
        })
         
    }


  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800 fixed w-full z-20">
        {({ open }) => (
            <>
                <div className="mx-3 max-w-full px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-20 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                            )}
                            </Disclosure.Button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                            <img
                                className="block h-20 w-auto lg:hidden"
                                src={logo}
                                alt="Your Company"
                            />
                            <img
                                className="hidden h-20 w-auto lg:block"
                                src={logo}
                                alt="Your Company"
                            />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    style = {{textDecoration: "none"  }}
                                    href={item.href}
                                    className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'rounded-md px-3 py-2 text-sm font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </a>
                                ))}
                            </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Menu as="div" className="relative ml-3">
                            { loggedIn ?
                                (<div>
                                    <Menu.Button className="flex rounded-full bg-cover bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-16 w-16 rounded-full bg-cover"
                                        src={user.image_url}
                                        alt=""
                                    />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                    <h1
                                        className={`${classNames(active ? 'bg-gray-100 w-full' : '', 'block px-4 py-2 text-xl text-gray-700')}`}
                                    >
                                        {user.first_name}
                                    </h1>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                    <button
                                        className={`${classNames(active ? 'bg-gray-100 w-full' : '', 'block px-4 py-2 text-sm text-gray-700')} no-underline`}
                                        onClick={(e) => {handleSignOut(e); navigate('/login')}}
                                    >
                                        Sign out
                                    </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                    <button
                                        className={`${classNames(active ? 'bg-gray-100 w-full' : '', 'block px-4 py-2 text-sm text-gray-700')} no-underline`}
                                        onClick={() => {handleShow(); fetchSearches()}}
                                    >
                                        Search history
                                    </button>
                                    )}
                                </Menu.Item>
                                </Menu.Items>
                                    </Transition>
                                </div>
                                 ) :
                                (<Disclosure.Button
                                    as="a"
                                    style = {{textDecoration: "none"}}
                                    href='/login'
                                    className={classNames(
                                        current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={current ? 'page' : undefined}
                                    >
                                    Login
                                </Disclosure.Button>)
                            }
                            </Menu>
                        </div>
                    </div>
                </div>
                <Disclosure.Panel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <Disclosure.Button
                        key={item.name}
                        as="a"
                        style = {{textDecoration: "none"}}
                        href={item.href}
                        className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        >
                        {item.name}
                        </Disclosure.Button>
                    ))}
                    </div>
                </Disclosure.Panel>
            </>
        )}
      </Disclosure>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='text-lg text-center'>Your Search History</Modal.Title>
        </Modal.Header>
        {
            loading ? (
                <div className='loading-screen'>
                    <DotLoader
                        color={"#14B8A6"}
                        loading={loading}
                        size={40}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    <h1 className='mt-5'>Loading ...</h1>
                </div> 
            ) 
            : 
            (
                 <ul className="divide-y divide-gray-200 pb-0">
                    {searches?.map((search) => (
                        <li key={search.id} className="flex py-4">
                        <div className="ml-1">
                            <p className="text-sm font-medium text-gray-900 mb-0">{search.query}</p>
                        </div>
                        </li>
                    ))}
                </ul> 
            ) 
        }
      </Modal>
      
    </div>
  )
}