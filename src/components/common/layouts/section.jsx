import { memo } from 'react';

import classNames from 'classnames';

const Section = ({ children, className, ...args }) => {
  return (
    <section id='layout-section' className={classNames('layout-section', className)} {...args}>
      {children}
    </section>
  );
};

export default memo(Section);
