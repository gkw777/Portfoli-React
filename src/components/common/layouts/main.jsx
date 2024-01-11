import { memo } from 'react';

import classNames from 'classnames';

const Main = ({ children, className, ...args }) => {
  return (
    <main id='layout-main' className={classNames('layout-main', className)} {...args}>
      {children}
    </main>
  );
};

export default memo(Main);
