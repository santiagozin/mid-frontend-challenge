import Navbar from '@/components/custom/navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-[80px] pb-10">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout