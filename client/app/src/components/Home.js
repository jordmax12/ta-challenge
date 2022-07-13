import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from "react-cookie";
import LoginComponent from './Login';
import VerifyOtpComponent from './Otp';
import { requestOtp, verifyOtp } from '../helpers/api';

const LOGIN_FLOWS = {
  'LOGIN': 'LOGIN',
  'REQUEST_OTP': 'REQUEST_OTP',
  'VERIFY_OTP': 'VERIFY_OTP',
  'VERIFIED_OTP': 'VERIFIED_OTP',
  'LOGGED_IN': 'LOGGED_IN',
  'LOGGING_IN': 'LOGGING_IN',
}
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const determineContinueEligiblity = (email) => {
  return email.length === 0 || !validateEmail(email)
}

const determineVerifyEligiblity = (otp) => otp.length !== 4

/* eslint-disable react/react-in-jsx-scope */
function Dashboard(props) {
    return <h1>Welcome back!</h1>;
}

function Home(props) {
  const [, setCookie] = useCookies();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginState, setLoginState] = useState(props.isLoggedIn ? LOGIN_FLOWS.LOGGED_IN : LOGIN_FLOWS.LOGIN);

  useEffect(() => {
    if(loginState === LOGIN_FLOWS.REQUEST_OTP) {
      setIsLoading(true);
      requestOtp(email)
      .then((result) => {
        setIsLoading(false);
        if(result.success) {
          setLoginState(LOGIN_FLOWS.VERIFY_OTP);
        } else {
          setLoginState(LOGIN_FLOWS.LOGIN);
          setEmail('');
          setOtp('');
        }
      })
    } else if(loginState === LOGIN_FLOWS.LOGGING_IN) {
      setIsLoading(true);
      verifyOtp(email, otp)
      .then(({ access_token: accessToken, refresh_token: refreshToken}) => {
        setIsLoading(false);
        if(!accessToken || !refreshToken) {
          setLoginState(LOGIN_FLOWS.LOGIN);
          setEmail('');
          setOtp('');
        } else {
          setLoginState(LOGIN_FLOWS.VERIFIED_OTP);
          setCookie('isLoggedIn', true);
          setEmail('');
          setOtp('');
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState])

  const handleLoginContinue = async () => {
    setLoginState(LOGIN_FLOWS.REQUEST_OTP);
  }

  const handleOtpContinue = () => {
    setLoginState(LOGIN_FLOWS.LOGGING_IN)
  }

  if(loginState === LOGIN_FLOWS.LOGIN || loginState === LOGIN_FLOWS.REQUEST_OTP) {
    return <LoginComponent isLoading={isLoading} setEmail={setEmail} continueLoginFlow={handleLoginContinue} disabled={determineContinueEligiblity(email, isLoading)} />;
  } else if(loginState === LOGIN_FLOWS.VERIFY_OTP || loginState === LOGIN_FLOWS.LOGGING_IN) {
    return <VerifyOtpComponent isLoading={isLoading} setOtp={setOtp} continueVerifyFlow={handleOtpContinue} disabled={determineVerifyEligiblity(otp, isLoading)} />;
  } else if(loginState === LOGIN_FLOWS.VERIFIED_OTP) {
    return <Dashboard />;
  }
  
}

export default Home;
