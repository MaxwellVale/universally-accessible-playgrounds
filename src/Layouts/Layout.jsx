import { Outlet, Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { playgrounds } from '../data/playgroundData.js'

export default function Layout() {
    return (
        <>
            <Header />
            <div className='page-content'>
                <Outlet />
            </div>
            <Footer />
        </>
    );
}