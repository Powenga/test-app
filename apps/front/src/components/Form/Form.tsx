import { FC } from 'react';
import block from 'bem-css-modules';
import cn from 'classnames';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { findRequestBodySchema } from '@test-app/validation';
import Input from '../Input/Input';
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
    resolver: yupResolver(findRequestBodySchema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <FormProvider {...methods}>
      <form
        className={cn(b(), className)}
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          id="user-email"
          name="email"
          className={b('input')}
          placeholder="email"
          required
        />
        <Input
          id="user-number"
          name="number"
          className={b('input')}
          placeholder="number"
        />

        <button type="submit">Search</button>
      </form>
    </FormProvider>
  );
};

export default Form;
