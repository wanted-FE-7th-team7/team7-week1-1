import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useCheck from '../hooks/useCheck';
import { postSignup } from '../apis/signup';
import { checkEmail, checkPassword } from '../utils/checkSignup';
import InputGroup from './InputGroup';

function Signup() {
  const SIGNUP_URL = `/auth/signup`;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 유효성 검사 state
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  // 유효성 검사 커스텀 훅
  useCheck(checkEmail, email, setIsEmail);
  useCheck(checkPassword, password, setIsPassword);

  /** 회원가입 axios 요청 버튼 */
  const submitSignup = event => {
    event.preventDefault();
    postSignup(SIGNUP_URL, email, password, setIsError);
  };

  return (
    <SignupFrame>
      <SignUpForm onSubmit={submitSignup}>
        <h1>회원가입</h1>

        <InputGroup
          placeholder="이메일"
          value={email}
          setValue={setEmail}
          setIsError={setIsError}
        />
        {isError === true ? (
          <ContentCheck>중복된 계정입니다.</ContentCheck>
        ) : isEmail === true ? null : (
          <ContentCheck>
            올바른 형식의 이메일을 입력해주세요(@ 필수 포함)
          </ContentCheck>
        )}

        <InputGroup
          placeholder="비밀번호"
          value={password}
          setValue={setPassword}
          type="password"
        />
        {isPassword === true ? null : (
          <ContentCheck>8자 이상의 비밀번호를 입력해주세요</ContentCheck>
        )}

        {isEmail && isPassword ? (
          <button type="submit" className="allow-signup">
            가입하기
          </button>
        ) : (
          <button type="button" className="block-signup">
            가입하기
          </button>
        )}
        <LoginContainer>
          <div>계정이 있으신가요?</div>
          <div>
            <Link to="/" className="move-sign-up">
              로그인
            </Link>
          </div>
        </LoginContainer>
      </SignUpForm>
    </SignupFrame>
  );
}

export default Signup;

/** div - 회원가입 프레임 */
const SignupFrame = styled.div`
  width: 500px;
  padding: 15px;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

/** div - 회원가입 레이아웃 */
const SignUpForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px;
  text-align: center;

  button {
    margin-top: 20px;
    width: 400px;
    height: 45px;
    border-radius: 5px;
    border: 1px solid;
    background-color: green;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 1ms ease-in;
    cursor: pointer;
  }

  .allow-signup:active {
    transform: scale(0.99);
  }

  .allow-signup:focus {
    outline: none;
  }

  .allow-signup.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }

  .allow-signup:hover {
    opacity: 0.93;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 400px;
  }

  .social-container {
    margin: 20px 0;
  }

  .goggle-icon {
    margin-right: 10px;
    font-size: 25px;
  }
  .social-container a {
    border: 1px solid #dddddd;
    border-radius: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 50px;
    width: 400px;
    font-size: 20px;
    font-weight: bold;
    color: gray;
    cursor: pointer;
  }

  .social-container p {
    opacity: 0.6;
  }

  .sign-up {
    margin-right: auto;
    margin-top: 15px;
    display: flex;
  }

  .move-sign-up {
    margin-left: 15px;
    margin-bottom: 15px;
  }

  .block-signup {
    opacity: 0.5;
  }

  .block-signup:hover {
    opacity: 0.5;
  }

  .block-signup {
    opacity: 0.5;
  }

  .block-signup:hover {
    opacity: 0.5;
  }
`;

const ContentCheck = styled.p`
  margin: 0px auto 15px 10px;
  font-size: 13px;
  color: red;
  opacity: 0.8;
`;

const LoginContainer = styled.div`
  margin: 15px auto 0 0;
  display: flex;

  .move-sign-up {
    margin-left: 15px;
    font-size: 14px;
    text-decoration: none;
    color: gray;
  }
`;
