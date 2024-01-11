import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const Base = () => {
  return (
    <div className='container'>
      <Outlet />
    </div>
  );
};

export default memo(Base);
