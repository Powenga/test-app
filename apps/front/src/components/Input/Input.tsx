import { FC } from 'react';
import cn from 'classnames';
import block from 'bem-css-modules';
import { useController } from 'react-hook-form';
import styles from './Input.module.css';

const b = block(styles);

export enum InputTypes {
  text = 'text',
}

interface IIntup {
  id: string;
  name: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  type?: InputTypes;
}

const Input: FC<IIntup> = ({
  id,
  name,
  className,
  placeholder,
  required,
  type = InputTypes.text,
}) => {
  const { field } = useController({ name });
  return (
    <label htmlFor={id}>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
        className={cn(b(), className)}
        {...field}
      />
    </label>
  );
};

export default Input;
