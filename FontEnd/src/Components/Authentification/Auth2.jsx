import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FullLogo from "../../assets/lightLogo.svg";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { login, signup } from '../../Redux/Actions/Auth.action';
import './styles.css'
const Auth2 = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const dispatch = useDispatch();
    const { loading, message, error, user } = useSelector((state) => state.user);

    const togglePanel = () => {
        setIsSignIn(!isSignIn);
    };

     const signUpFormik = useFormik({
          initialValues: {
              firstName: '',
              email: '',
              password: '',
              lastName: '',
              consentRGPD: false,
          },
          validationSchema: Yup.object({
              firstName: Yup.string().required('First Name is required'),
              email: Yup.string().email('Invalid email format').required('Email is required'),
              password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
              lastName: Yup.string().required('Last Name is required'),
              consentRGPD: Yup.bool().oneOf([true], 'You must accept the terms and conditions').required(),
          }),
          onSubmit: (values) => {
              const userRole = 'Client'; // Rôle par défaut
              const userData = { ...values, role: userRole };
              dispatch(signup(userData));
              console.log(values)
          },
      });
  
      const signInFormik = useFormik({
          initialValues: {
              email: '',
              password: '',
          },
          validationSchema: Yup.object({
              email: Yup.string().email('Invalid email format').required('Email is required'),
              password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
          }),
          onSubmit: (values) => {
              dispatch(login(values.email, values.password));
          },
      });
  
      if (user) {
          // Ajoutez une redirection ici si nécessaire
          console.log('Utilisateur connecté :', user);
      }
    return (
        <div className={`d-flex split-container ${isSignIn ? "sign-in-mode" : "sign-up-mode"}`}>
            {/* Panneau gauche */}
            {isSignIn ? (
                <div className="left-panel d-flex flex-column justify-content-center align-items-center panel-with-image" >
                    <div className="logo-ath-container">
                        <img src={FullLogo} alt="totalis-logo" />
                    </div>
                    <h1 className='auth-title'>Hello, Friend !</h1>
                    <p className='auth-subtitle'>Enter your personal information and start your journey with us.</p>
                    <button
                        className="prim-btn mt-3"
                        onClick={togglePanel}
                    >
                        SIGN UP
                    </button>
                </div>
            ) : (
                <div className="left-panel d-flex flex-column justify-content-center align-items-center">
                    <h1 className='auth-title-prim mb-4'>Create account</h1>
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
                    <form onSubmit={signUpFormik.handleSubmit} className="w-75">
                        <div className="form-group mb-2">
                            <label className='mb-2'>First Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id='firstName'
                                placeholder="Enter your full name"
                                {...signUpFormik.getFieldProps('firstName')}
                            />
                            {signUpFormik.touched.firstName && signUpFormik.errors.firstName && (
                                <div className="text-dangers">{signUpFormik.errors.firstName}</div>
                            )}
                        </div>
                        <div className="form-group mb-2">
                            <label  className='mb-2'>Last Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id='lastName'
                                placeholder="Enter your full name"
                                {...signUpFormik.getFieldProps('lastName')}
                            />
                            {signUpFormik.touched.lastName && signUpFormik.errors.lastName && (
                                <div className="text-dangers">{signUpFormik.errors.lastName}</div>
                            )}
                        </div>
                        <div className="form-group mb-2">
                            <label  className='mb-2'>Email:</label>
                            <input
                                type="email"
                                id='email'
                                  className="form-control"
                                placeholder="Enter email"
                                {...signUpFormik.getFieldProps('email')}
                            />
                            {signUpFormik.touched.email && signUpFormik.errors.email && (
                                <div className="text-dangers">{signUpFormik.errors.email}</div>
                            )}
                        </div>
                        <div className="form-group mb-2">
                            <label  className='mb-2'>Password:</label>
                            <input
                                type="password"
                                 className="form-control"
                                placeholder="Enter password"
                                {...signUpFormik.getFieldProps('password')}
                                id='password'
                            />
                            {signUpFormik.touched.password && signUpFormik.errors.password && (
                                <div className="text-dangers">{signUpFormik.errors.password}</div>
                            )}
                        </div>
                        <div className="form-check mt-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                {...signUpFormik.getFieldProps('consentRGPD')}
                            />
                            <label className="form-check-label">I agree to the terms and conditions</label>
                            {signUpFormik.touched.consentRGPD && signUpFormik.errors.consentRGPD && (
                                <div className="text-dangers">{signUpFormik.errors.consentRGPD}</div>
                            )}
                        </div>
                        <div className='d-flex flex-row justify-content-end mt-3'>
                            <button
                                type="submit"
                                className="sec-btn mt-2 px-4 py-2"
                                disabled={loading}
                            >
                                {loading ? 'Registering...' : 'SIGN UP'}
                            </button>
                        </div>
                    </form>
                </div>

            )}

            {/* Panneau droit */}

            {isSignIn ? (
                <div className="right-panel d-flex flex-column justify-content-center align-items-center">
                    <h1 className='auth-title-prim mb-4'>Sign In</h1>
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
                    <form onSubmit={signInFormik.handleSubmit} className='w-75'>
                        <div className="form-group mb-2">
                            <label className='mb-2'>Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                id='email'
                                {...signInFormik.getFieldProps('email')}
                            />
                            {signInFormik.touched.email && signInFormik.errors.email && (
                                <div className="text-dangers">{signInFormik.errors.email}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label className='mb-2'>Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                id='password'
                                {...signInFormik.getFieldProps('password')}
                            />
                            {signInFormik.touched.password && signInFormik.errors.password && (
                                <div className="text-dangers">{signInFormik.errors.password}</div>
                            )}
                        </div>
                        <div className='d-flex flex-row justify-content-end mt-3'>
                            <button
                                type="submit"
                                className="sec-btn mt-2 px-4 py-2"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'LOGIN'}
                            </button>
                        </div>
                    </form>
                    <a href="#" className="mt-3 text-decoration-none text-secondary">
                    Forgot password?
                    </a>
                </div>
            ) : (
                <div className="right-panel d-flex flex-column justify-content-center align-items-center panel-with-image">
                    <div className="logo-ath-container">
                        <img src={FullLogo} alt="totalis-logo" />
                    </div>
                    <h1 className='auth-title'>Good to see you again!</h1>
                    <p className='auth-subtitle'>To stay connected with us, log in with your personal information.</p>
                    <button
                        className="prim-btn mt-3"
                        onClick={togglePanel}
                    >
                        LOGIN
                    </button>
                </div>
            )}
        </div>

    );
};

export default Auth2;
