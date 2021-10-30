import { ChangeEvent } from 'react';

import Button from './styled/Button';

export default function LoginForm() {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    console.log(event);

  return (
    <>
      <div className="body">
        <div className="input-group">
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-group">
          <Button onClick={() => console.log('Logging in')} className="button">
            Log In
          </Button>
        </div>
        <div className="input-group input-group-row">
          Don&apos;t have an account?{' '}
          <span className="link">Sign up here.</span>
        </div>
      </div>
    </>
  );
}
