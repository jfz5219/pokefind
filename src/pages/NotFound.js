import { NavLink, useLocation, useRouteError } from "react-router-dom"

export default function NotFound() {
  const route_error = useRouteError(); // Retrieves errors thrown in loader/action or element rendering
  const state_error = useLocation();  // Accesses the state passed via useNavigate

  // Check if error exists and has a message, url
  const error_message = 
    route_error?.message || 
    state_error?.state?.message || 
    "Page not located";

  const error_url = 
    route_error?.url || 
    state_error?.state?.url || 
    "/";

  const page_name = 
    route_error?.page_name ||
    state_error?.state?.page_name || 
    "Homepage";

  return (
    <div>
      <h2>{error_message}</h2>
      <p>
        Go back to <NavLink to={error_url}>{page_name}</NavLink>.
      </p>
    </div>
  );
  
}