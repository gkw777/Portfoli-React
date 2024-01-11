import { memo } from 'react';

import classNames from 'classnames';

const Header = ({ children, className, ...args }) => {
  return (
    <header id='layout-header' className={classNames('layout-header', className)} {...args}>
      {children}
    </header>
  );
};

export default memo(Header);
