import { FC } from 'react';
import block from 'bem-css-modules';
import cn from 'classnames';
import styles from './Form.module.css';

const b = block(styles);

const Form: FC<{ className?: string }> = ({ className = undefined }) => {
  return (
    <form className={cn(b(), className)}>
      <input placeholder="email" />
      <input placeholder="number" />
    </form>
  );
};

export default Form;
