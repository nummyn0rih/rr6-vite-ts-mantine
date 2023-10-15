import { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, AuthContextType } from '../../context/AuthProvider';

type Props = {
  children?: ReactNode
};

export function PrivatRoute({ children }: Props): ReactNode {
  const { currentUser } = useAuth() as AuthContextType;
  const location = useLocation();

  if (currentUser === null) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />;
  }

  return children ? children : <Outlet />;
}
