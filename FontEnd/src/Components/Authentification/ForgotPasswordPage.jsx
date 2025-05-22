import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FullLogo from "../../assets/lightLogo.svg";
import './styles.css'
function ForgotPasswordPage() {

  const dispatch = useDispatch();
  const { loading, message, error, user } = useSelector((state) => state.user);

  const togglePanel = () => {
    setIsSignIn(!isSignIn);
  };

  const forgetFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
    }),
    onSubmit: (values) => {
      dispatch(signup(values));
      console.log(values)
    },
  });


  return (
    <div className={`d-flex split-container sign-in-mode`}>
      <div className="left-panel d-flex flex-column justify-content-center align-items-center panel-with-image" >
        <div className="logo-ath-container">
          <img src={FullLogo} alt="totalis-logo" />
        </div>
        <h1 className='auth-title'>Hello, Friend !</h1>
        <p className='auth-subtitle'>You Can Reset Your Password Here</p>
        <button
          className="prim-btn mt-3"
        // onClick={togglePanel}
        >
          Login Page
        </button>
      </div>
      <div className="right-panel d-flex flex-column justify-content-center align-items-center">
        <h1 className='auth-title-prim mb-4'>Forget Password</h1>
        {/* <div className="social-buttons d-flex gap-3 my-3">
                        <button className="btn btn-light btn-rounded">
                        <FaLinkedinIn/>

                        </button>
                        <button className="btn btn-light btn-rounded">
                        <FaFacebookF />
                        
                        </button>
                        <button className="btn btn-light btn-rounded">
                        <FaGoogle />
                        </button>
                    </div> */}
        <form /*onSubmit={signInFormik.handleSubmit}*/ className='w-75'>
          <div className="form-group mb-2">
            <label className='mb-2'>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              id='email'
              {...forgetFormik.getFieldProps('email')}
            />
            {forgetFormik.touched.email && forgetFormik.errors.email && (
              <div className="text-dangers">{forgetFormik.errors.email}</div>
            )}
          </div>
          <div className='d-flex flex-row justify-content-end mt-3'>
            <button
              type="submit"
              className="sec-btn mt-2 px-4 py-2"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Send Email'}
            </button>
          </div>
        </form>
        {/* <a href="#" className="mt-3 text-decoration-none text-secondary">
          Mot de passe oublié ?
        </a> */}
      </div>
    </div>
  )
}

export default ForgotPasswordPage