import { Fragment, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { Link, NavLink } from 'react-router-dom'
import Alert from '../../components/alert'
import {
    ChartBarIcon,
    CheckCircleIcon,
    CursorClickIcon,
    MenuIcon,
    PhoneIcon,
    PlayIcon,
    ShieldCheckIcon,
    ViewGridIcon,
    XIcon,
    WrenchIcon,
    GiftIcon,
    QuestionMarkCircleIcon
} from '@heroicons/react/outline'
import { ChevronDownIcon, HomeIcon, OfficeBuildingIcon, ShoppingBagIcon, ShoppingCartIcon, UserGroupIcon } from '@heroicons/react/solid'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth'
import { get_categories } from '../../redux/actions/categories'

const Llave = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
    )
}

const Envios = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" /></svg>
    )
}

const Efectivo = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
    )
}

const Sucursales = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>

    )
}

const solutions = [
    {
        name: 'Políticas de garantía',
        description: 'Términos y condiciones para solicitar garantías de productos.',
        href: '#',
        icon: Llave,
    },
    {
        name: 'Políticas de entrega',
        description: 'Cómo el cliente recibirá la mercancía comprada por tienda on-line.',
        href: '#',
        icon: Envios,
    },
    {
        name: 'Noticias y eventos',
        description: "Todos los eventos, noticias y sorteos que Multimax Store tiene para ti.",
        href: '#',
        icon: GiftIcon
    },
    {
        name: 'Preguntas frecuentes',
        description: "Todo lo relacionado al proceso de compra y servicio PostVenta.",
        href: '#',
        icon: QuestionMarkCircleIcon,
    },
]

const callsToAction = [
    { name: 'Métodos de pago', href: '#', icon: Efectivo },
    { name: 'Sucursales', href: '#', icon: Sucursales },
    { name: 'Contacto vía Whatsapp', href: '#', icon: PhoneIcon },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = ({
    isAuthenticated,
    user,
    logout,
    get_categories,
    total_items
}) => {

    const logoutHandler = () => {
        logout()
    }

    useEffect(() => {
        get_categories()
    }, [])

    let activeStyle = {
        fontWeight: "bolder",
        borderBottom: '1px solid'
    };

    let activeClassName = "underline";

    const authLinks = (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-full text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </span>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Account settings
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Support
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Dashboard
                                </a>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={logoutHandler}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full text-left px-4 py-2 text-sm'
                                    )}
                                >
                                    Cerrar sesión
                                </button>
                            )}
                        </Menu.Item>

                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )

    const guestLinks = (
        <Fragment>
            <Link to="/login" className="md:text-sm font-medium text-white hover:border-b">
                Iniciar sesión
            </Link>
            <Link
                to="/signup"
                className="ml-4 inline-flex items-center justify-center px-4 py-2 md:px-2 md:py-1 md:w-20 border border-transparent rounded-md shadow-sm md:text-sm font-medium text-white bg-blue-900 hover:bg-white hover:text-blue-600"
            >
                Registrar
            </Link>
        </Fragment>
    )

    return (
        <div className='bg-blue-600'>
            <Popover className="relative">
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true" />
                <div className="relative z-20">
                    <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">

                        <div className="-mr-2 -my-2 md:hidden">
                            <Popover.Button className=" rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open menu</span>
                                <MenuIcon className="h-8 w-8" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                        <div className="md:hidden">
                            <Link to='/cart' className="p-2 rounded-md inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <ShoppingCartIcon className='h-8 w-8 text-white hover:scale-110 hover:cursor-pointer transition ease-in-out delay-100' />
                                <span className="text-xs absolute top-1 mt-3 ml-4 bg-red-500 text-white font-semibold rounded-full px-1.5 text-center">{total_items}</span>
                            </Link>
                        </div>
                        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
                            <Popover.Group as="nav" className="flex space-x-10">

                                <NavLink to="/"
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                    className="md:pt-1 lg:pt-0 md:text-sm lg:text-base font-medium text-white hover:border-b">
                                    <HomeIcon className='mb-1 mr-1 w-5 h-5 inline' />Inicio
                                </NavLink>
                                <Popover>
                                    {({ open }) => (
                                        <>
                                            <Popover.Button
                                                className={classNames(
                                                    open ? 'text-white' : 'text-white',
                                                    'group inline-flex items-center md:text-sm lg:text-base font-medium focus:outline-none focus:ring-white focus:text-white hover:border-b'
                                                )}
                                            >
                                                <span>Terminos y condiciones</span>
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open ? 'text-white' : 'text-white',
                                                        'ml-2 h-5 w-5 group-hover:text-white'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0 -translate-y-1"
                                                enterTo="opacity-100 translate-y-0"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100 translate-y-0"
                                                leaveTo="opacity-0 -translate-y-1"
                                            >
                                                <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg bg-white">
                                                    <div className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                                                        {solutions.map((item) => (
                                                            <Link
                                                                key={item.name}
                                                                to={item.href}
                                                                className="-m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-100"
                                                            >
                                                                <div className="flex md:h-full lg:flex-col">
                                                                    <div className="flex-shrink-0">
                                                                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white sm:h-12 sm:w-12">
                                                                            <item.icon className="h-6 w-6" aria-hidden="true" />
                                                                        </span>
                                                                    </div>
                                                                    <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                                                        <div>
                                                                            <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                            <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                                        </div>
                                                                        <p className="mt-2 text-sm font-medium text-blue-600 lg:mt-4">
                                                                            Ver más <span aria-hidden="true">&rarr;</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                    <div className="bg-blue-600">
                                                        <div className="max-w-7xl mx-auto space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                                                            {callsToAction.map((item) => (
                                                                <div key={item.name} className="flow-root">
                                                                    <Link
                                                                        to={item.href}
                                                                        className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-white hover:bg-white hover:text-blue-600"
                                                                    >
                                                                        <item.icon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
                                                                        <span className="ml-3">{item.name}</span>
                                                                    </Link>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                                <NavLink to="/shop/s"
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                    className="md:pt-1 lg:pt-0 md:text-sm lg:text-base font-medium text-white hover:border-b">
                                    <ShoppingBagIcon className='mb-1 mr-1 w-5 h-5 inline' /> Tienda
                                </NavLink>
                                <NavLink to="/nosotros"
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                    className="md:pt-1 lg:pt-0 md:text-sm lg:text-base font-medium text-white hover:border-b">
                                    <OfficeBuildingIcon className='mb-1 mr-1 w-5 h-5 inline' /> Nosotros
                                </NavLink>
                            </Popover.Group>
                            <div className="flex items-center md:ml-12">
                                <>
                                    <Link to="/cart">
                                        <ShoppingCartIcon className='h-8 w-8 text-white mr-6 font-bold hover:scale-105' />
                                        <span className="text-xs absolute top-1 mt-3 ml-4 bg-red-500 text-white font-semibold rounded-full px-1.5 text-center">{total_items}</span>
                                    </Link>
                                    {
                                        isAuthenticated ? authLinks : guestLinks
                                    }
                                </>
                            </div>
                        </div>
                    </div>
                </div>

                <Transition
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        focus
                        className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                    >
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                            <div className="pt-5 pb-6 px-5 sm:pb-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                            alt="Workflow"
                                        />
                                    </div>
                                    <div className="-mr-2">

                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="mt-6 sm:mt-8">
                                    <nav>
                                        <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                                            {solutions.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                                                >
                                                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                                        <item.icon className="h-6 w-6" aria-hidden="true" />
                                                    </div>
                                                    <div className="ml-4 text-base font-medium text-gray-900">{item.name}</div>
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="mt-8 text-base">
                                            <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                {' '}
                                                View all products <span aria-hidden="true">&rarr;</span>
                                            </Link>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <div className="py-6 px-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <NavLink to="/shop/s"
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                        className="rounded-md text-base font-medium text-white">
                                        Tienda
                                    </NavLink>

                                    <NavLink to="#"
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                        className="rounded-md text-base font-medium text-white">
                                        Docs
                                    </NavLink>

                                    <NavLink to="#"
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                        className="rounded-md text-base font-medium text-white">
                                        Company
                                    </NavLink>

                                    <NavLink to="#"
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                        className="rounded-md text-base font-medium text-white">
                                        Resources
                                    </NavLink>

                                    <NavLink to="#"
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                        className="rounded-md text-base font-medium text-white">
                                        Blog
                                    </NavLink>

                                    <NavLink to="#"
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                        className="rounded-md text-base font-medium text-white">
                                        Contact Sales
                                    </NavLink>
                                </div>
                                <div className="mt-6">
                                    {
                                        isAuthenticated ? authLinks : guestLinks
                                    }
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
            <Alert />
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    categories: state.Categories.categories,
    total_items: state.Cart.total_items
})

export default connect(mapStateToProps, {
    logout,
    get_categories,
})(Navbar)