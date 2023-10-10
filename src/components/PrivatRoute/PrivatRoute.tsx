import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthProvider';

export function PrivatRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (currentUser === null) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />;
  }

  return children ? children : <Outlet />;
}

PrivatRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.elementType),
    PropTypes.elementType
  ])
};
