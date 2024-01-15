import { memo } from 'react';

import classNames from 'classnames';

const Footer = ({ children, className, ...args }) => {
  return (
    <footer className={classNames('layout-footer', className)} {...args}>
      {children}
    </footer>
  );
};

export default memo(Footer);
