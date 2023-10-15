import { FC } from 'react';
import cn from 'classnames';
import block from 'bem-css-modules';
import { useController } from 'react-hook-form';
import styles from './Input.module.css';

const b = block(styles);

export enum InputTypes {
  text = 'text',
}

export enum InputModes {
  numeric = 'numeric',
}

interface IIntup {
  id: string;
  name: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  type?: InputTypes;
  inputMode?: InputModes;
  transform?: (value: string) => string;
}

const Input: FC<IIntup> = ({
  id,
  name,
  className,
  placeholder,
  required,
  type = InputTypes.text,
  inputMode,
  transform,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });
  return (
    <label htmlFor={id} className={cn(b(), className)}>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        inputMode={inputMode}
        {...field}
        onChange={(event) => {
          if (transform) {
            field.onChange(transform(event.target.value));
          } else {
            field.onChange(event.target.value);
          }
        }}
      />
      {error && (
        <span role="alert" className={b('error')}>
          {error.message}
        </span>
      )}
    </label>
  );
};

export default Input;
