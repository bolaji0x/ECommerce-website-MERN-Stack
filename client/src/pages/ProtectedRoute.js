import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';
const ProtectedRoute = ({ children }) => {
  const { user, userLoading } = useAppContext();

  if (userLoading)
   return (
    <div className='top-loading'>
      <Loading />
    </div>
  );

  if (!user) {
    return <Navigate to='/shop' />;
  }
  return children;
};

export default ProtectedRoute;
