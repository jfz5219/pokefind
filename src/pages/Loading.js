import LoadIcon from '../images/load_icon.png'
import '../css/Loading.css'

export default function Loading() {
  return (
    <div className='loading-container'>
        <h1>Loading...</h1>
        <div class="spinner-border text-light" role="status">
            <img src={LoadIcon} alt="Responsive Image" className="map-image"/>
        </div>
    </div>
    
  )
}
