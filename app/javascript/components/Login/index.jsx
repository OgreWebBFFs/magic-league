import React from 'react';

const Login = () => (
  <div className="login">
    <div className="login-content">
      <h2 className="login__title">Log in</h2>
      <form className="new_user" id="new_user" action="/users/sign_in" acceptCharset="UTF-8" method="post">
        <div className="login_form-field">
          <label htmlFor="user_email">Email</label>
          <input autoComplete="email" type="email" name="user[email]" id="user_email" />
        </div>
        <div className="login_form-field">
          <label htmlFor="user_password">Password</label>
          <input autoComplete="current-password" type="password" name="user[password]" id="user_password" />
        </div>
        <input type="submit" name="commit" value="Log in" className="button" data-disable-with="Log in" />
        <a className="button" href="/users/auth/google_oauth2">
          <svg className="google-icon" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
              <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0 0 10 20z" fill="#34A853" />
              <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 0 0 0 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05" />
              <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.192 5.736 7.396 3.977 10 3.977z" fill="#EA4335" />
            </g>
          </svg>
          {' '}
          Continue with Google
        </a>
      </form>
      <a className="button button--ghost" href="/users/sign_up">Sign up</a>
      <a className="button button--ghost" href="/users/password/new">Forgot your password?</a>
    </div>
  </div>
);

export default Login;