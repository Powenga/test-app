import { FC, useState } from 'react';
import block from 'bem-css-modules';
import cn from 'classnames';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { findRequestBodySchema } from '@test-app/validation';
import Input from '../Input/Input';
import styles from './Form.module.css';
import { api } from '../../utils/api';
import { IUser } from '@test-app/types';

const b = block(styles);

interface Inputs {
  email: string;
  number?: string;
}

interface IState {
  status: 'idle' | 'pending' | 'error' | 'success';
  error?: string;
  users?: IUser[];
}

const Form: FC<{ className?: string }> = ({ className = undefined }) => {
  const [state, setState] = useState<IState>({ status: 'idle' });
  const methods = useForm<Inputs>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      number: '',
    },
    resolver: yupResolver(findRequestBodySchema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setState({
      status: 'pending',
      error: undefined,
      users: undefined,
    });
    api
      .findUser(data)
      .then((result) => {
        setState({
          status: 'success',
          error: undefined,
          users: result,
        });
      })
      .catch((error) => {
        setState({
          status: 'error',
          error: error,
          users: undefined,
        });
      });
  };

  function renderContent() {
    const { status, error, users } = state;
    if (status === 'pending') {
      return <p>Loading...</p>;
    }
    if (status === 'error' && error) {
      return (
        <div className={b('error-wrap')}>
          <p role="alert" className={b('error')}>
            {state.error}
          </p>
        </div>
      );
    }
    if (status === 'success' && users?.length) {
      return (
        <ul className={b('user-list')}>
          {users.map(({ email, number }) => (
            <li key={email} className={b('user-item')}>
              <span>
                Email: <strong>{email}</strong>, number:{' '}
                <strong>{number}</strong>
              </span>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  }

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
        <button type="submit" disabled={!methods.formState.isValid}>
          Search
        </button>
        {renderContent()}
      </form>
    </FormProvider>
  );
};

export default Form;
