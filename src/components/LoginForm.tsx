import React, { useCallback, useEffect, useState } from "react";
import {
  PwVector,
  EmailInput,
  PwInput,
  LoginBtn,
  LogInComponent,
  LogInInsideBox,
  LogoImg,
  SignupTag,
  FingTag,
  AutoLoginImg,
  AutoLoginTxt,
  TagBox,
} from "./styled";
import pwCheck from "../img/Vector-2.svg";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import circleFill from "../img/akar-icons_circle-check-fill.svg";
import styled from "styled-components";
import { useAppDispatch } from "../hooks";
import { logIn } from "../slices/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const AutoBox = styled.div`
  display: flex;
  align-items: center;
`;
function LoginForm() {
  const { user, logInDone, logInError, logInLoading } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const gotoHome = () => {
    navigate("/");
  };
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const emailHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const pwHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setPw(event.currentTarget.value);
  };

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(
        logIn({
          username: email,
          password: pw,
        })
      );
    },
    [dispatch, email, pw]
  );
  useEffect(() => {
    console.log(user, logInDone, logInLoading, logInError);
    if (logInDone) {
      gotoHome();
    } else if (logInLoading) {
      //로그인 시 오류 구분 지어서 동작하도록 해야할듯 합니다. -> 노션 에러코드(현재는 지금 에러코드가 하나밖에 안나옴)
      console.log("로그인 전");
    } else if (logInError) {
      console.log(logInError);
    }
  }, [user, logInDone, logInError, logInLoading]);
  return (
    <LogInComponent>
      <LogInInsideBox>
        <LogoImg src={logo} onClick={gotoHome}></LogoImg>
        <form onSubmit={onSubmit}>
          <EmailInput
            value={email}
            onChange={emailHandler}
            type="text"
            placeholder="이메일"
          />
          <PwInput
            value={pw}
            onChange={pwHandler}
            type="password"
            placeholder="비밀번호"
          />
          <AutoBox>
            <AutoLoginImg src={circleFill}></AutoLoginImg>
            <AutoLoginTxt>이메일 기억하기</AutoLoginTxt>
          </AutoBox>

          <PwVector src={pwCheck}></PwVector>
          <LoginBtn>로그인</LoginBtn>
          <TagBox>
            <SignupTag href="/signUp">회원가입</SignupTag>
            <FingTag href="#">아이디 ∙ 비밀번호 찾기</FingTag>
          </TagBox>
        </form>
      </LogInInsideBox>
    </LogInComponent>
  );
}

export default LoginForm;
