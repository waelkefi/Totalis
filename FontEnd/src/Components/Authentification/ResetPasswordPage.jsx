import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FullLogo from "../../assets/lightLogo.svg";
import './styles.css';

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.user);

  const resetFormik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: (values) => {
      // You should get the token from the URL or props
      const token = 'your-reset-token'; // Replace with actual token from route params or query
      dispatch(resetPassword({ ...values, token }));
    },
  });

  return (
    <div className={`d-flex split-container sign-in-mode`}>
      <div className="left-panel d-flex flex-column justify-content-center align-items-center panel-with-image">
        <div className="logo-ath-container">
          <img src={FullLogo} alt="totalis-logo" />
        </div>
        <h1 className='auth-title'>Hello, Friend !</h1>
        <p className='auth-subtitle'>You Can Reset Your Password Here</p>
        <button
          className="prim-btn mt-3"
        >
          Login Page
        </button>
      </div>
      <div className="right-panel d-flex flex-column justify-content-center align-items-center">
        <h1 className='auth-title-prim mb-4'>Reset Password</h1>
        <form onSubmit={resetFormik.handleSubmit} className='w-75'>
          <div className="form-group mb-2">
            <label className='mb-2'>New Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              {...resetFormik.getFieldProps('password')}
            />
            {resetFormik.touched.password && resetFormik.errors.password && (
              <div className="text-dangers">{resetFormik.errors.password}</div>
            )}
          </div>
          <div className="form-group mb-2">
            <label className='mb-2'>Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              {...resetFormik.getFieldProps('confirmPassword')}
            />
            {resetFormik.touched.confirmPassword && resetFormik.errors.confirmPassword && (
              <div className="text-dangers">{resetFormik.errors.confirmPassword}</div>
            )}
          </div>
          <div className='d-flex flex-row justify-content-end mt-3'>
            <button
              type="submit"
              className="sec-btn mt-2 px-4 py-2"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
