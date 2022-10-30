import React from "react";
import { useEffect } from "react";
import ImageUpload from "../subComponents/ImageUpload";

export default function TestPage() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const url = `${API_KEY}`;

  const TEST_KEY = process.env.REACT_APP_TEST;

  useEffect(() => {
      console.log(url);
  },[]);
  
  return (<div>
      테스트페이지
      <ImageUpload /> 

      </div>);
}
