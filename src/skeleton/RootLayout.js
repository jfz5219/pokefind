import Header from './Header';
import { Outlet } from "react-router-dom"

export default function RootLayout() {
  return (
    <div className="root-layout container p-0">
      <div className='col-lg-10'>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='True' />
        <link href="https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap" rel="stylesheet" />
        <Header/>
        <div  className="container col-lg-8">
          <Outlet/>
        </div>
        
      </div>
    </div>
  )
}
