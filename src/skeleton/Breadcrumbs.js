import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { formatString } from "../reusable/FormatString"

export default function Breadcrumbs() {

    const location = useLocation()
    const [breadcrumbs, setBreadcrumbs] = useState(null)

    useEffect(()=>{

        let currentLink = ''
        
        const path_length = location.pathname.split('/').length
        if (path_length > 2) {
            const crumbs = location.pathname.split('/')
            .filter(crumb => crumb !== '')
            .map(crumb => {
            currentLink += `/${crumb}`
    
            return (
                <Link className="crumb" key={crumb} to={currentLink}>{formatString(crumb)}</Link>
            )
            })


        setBreadcrumbs(crumbs)
        } else{
            setBreadcrumbs(null)
        }

    }, [location])


  return (

    <>
     {breadcrumbs?          <div className="breadcrumbs fifth-color container col-lg-8 mt-3">
            <div className="container">
            {breadcrumbs}
            </div>
            
        </div>: <div className="mt-3 breadcrumbs"></div> }
    </>

  )
}
