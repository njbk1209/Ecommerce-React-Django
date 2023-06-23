import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { SearchIcon } from '@heroicons/react/solid'
import { connect } from 'react-redux'
import { get_categories } from '../../redux/actions/categories'
import { get_search_products, get_products, filtered_products_delete } from '../../redux/actions/products';

import Logo from '../../staticImage/Logo_Blanco_Multimax.png'

const social = [
    {
        name: 'Twitter',
        href: '#',
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
        ),
    },
    {
        name: 'Facebook',
        href: '#',
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        href: '#',
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },


]

const SearchBox = ({
    get_search_products,
    get_categories,
    get_products,
    categories,
    filtered_products_delete
}) => {

    // eslint-disable-next-line
    const [redirect, setRedirect] = useState(false);

    const [render, setRender] = useState(false);
    const [formData, setFormData] = useState({
        category_id: 0,
        search: ''
    });
    const { category_id, search } = formData;

    useEffect(() => {
        get_categories()
    }, [])

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        get_search_products(search, category_id);
        get_products(null)
        filtered_products_delete()
        if (window.location.pathname !== '/shop') {
            setRender(!render);
        }
    }

    if (render) {
        return <Navigate to='/shop' />;
    }

    return (

        <div className='max-w-7xl mx-auto'>
            {/*Este es el Grande*/}
            <form onSubmit={e => onSubmit(e)} className='hidden md:block'>
                <div className='md:grid md:grid-cols-4 w-11/12 mx-auto py-4 gap-x-8'>
                    <div><img
                        className="h-8 w-auto sm:h-10"
                        src={Logo}
                        alt=""
                    /></div>
                    <div className="md:col-span-2 flex rounded-md bg-white">
                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                            <div className="mt-1 mx-1 px-2 py-1 ">
                                <select
                                    onChange={e => onChange(e)}
                                    name='category_id'
                                    className='rounded-sm text-slate-600 outline-slate-400 outline-1'
                                >
                                    <option value={0}>Todos</option>
                                    {
                                        categories &&
                                        categories !== null &&
                                        categories !== undefined &&
                                        categories.map((category, index) => (
                                            <option key={index} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))
                                    }

                                </select>
                            </div>
                            <input
                                type="search"
                                name="search"
                                onChange={e => onChange(e)}
                                value={search}
                                required
                                className="outline-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300 outline-slate-500 "
                                placeholder="Buscar producto..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />

                        </button>
                    </div>
                    <div className="flex flex-row-reverse space-x-6 space-x-reverse md:order-2 mt-1">
                        {social.map((item) => (
                            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">{item.name}</span>
                                <item.icon className="h-9 w-9 text-white hover:scale-110 transition ease-in-out delay-100" aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </div>
            </form>

            {/*Este es el Movil*/}
            <form onSubmit={e => onSubmit(e)} className='md:hidden'>
                <div className='grid grid-cols-2 w-11/12 mx-auto py-4 gap-x-8'>
                    <div><img
                        className="h-8 w-auto sm:h-10"
                        src={Logo}
                        alt=""
                    /></div>
                    <div className="flex flex-row-reverse space-x-6 space-x-reverse md:order-2 mb-4">
                        {social.map((item) => (
                            <a key={item.name} href={item.href} className="text-white hover:font-bold">
                                <span className="sr-only">{item.name}</span>
                                <item.icon className="h-8 w-8" aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                    <div className="mt-1 col-span-2 flex rounded-md bg-white">
                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                            <div className="mt-1 mx-1 px-2 py-1 ">
                                <select
                                    onChange={e => onChange(e)}
                                    name='category_id'
                                    className='rounded-sm text-slate-600 outline-slate-400 outline-1'
                                >
                                    <option value={0}>Todos</option>
                                    {
                                        categories &&
                                        categories !== null &&
                                        categories !== undefined &&
                                        categories.map((category, index) => (
                                            <option key={index} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))
                                    }

                                </select>
                            </div>
                            <input
                                type="text"
                                name="text"
                                className="outline-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-2 sm:text-sm border-gray-300 outline-slate-500 "
                                placeholder="Buscar producto..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />

                        </button>
                    </div>

                </div>
            </form>
        </div>

    )
}

const mapStateToProps = state => ({
    categories: state.Categories.categories,
})

export default connect(mapStateToProps, {
    get_categories,
    get_search_products,
    get_products,
    filtered_products_delete
})(SearchBox)