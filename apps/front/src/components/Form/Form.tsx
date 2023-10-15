import { FC } from 'react';
import block from 'bem-css-modules';
import cn from 'classnames';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import styles from './Form.module.css';

const b = block(styles);

interface Inputs {
  email: string;
  number?: string;
}

const Form: FC<{ className?: string }> = ({ className = undefined }) => {
  const methods = useForm<Inputs>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      number: '',
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <FormProvider {...methods}>
      <form
        className={cn(b(), className)}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <input className={b('input')} placeholder="email" />
        <input className={b('input')} placeholder="number" />
        <button type="submit">Search</button>
      </form>
    </FormProvider>
  );
};

export default Form;
