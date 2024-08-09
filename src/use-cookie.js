import { useEffect, useState } from "react";

const getRandomCookieKey = () => {
  const cookieLen = 15;
  // 0~1사이의 랜덤한 실수에 원하는 범위만큼을 곱하면 0~14사이로 랜덤 도출 후 소수점 내림.
  const randomNum = Math.floor(Math.random() * cookieLen);
  // console.log(randomNum);
  //randomNum : 0~14
  //randomNum + 1 : 0~15
  return `cookie_${randomNum + 1}`;
};

export const useCookie = () => {
  const [cookieKey, setCookieKey] = useState("");

  useEffect(() => {
    const randomCookieKey = getRandomCookieKey();
    setTimeout(() => {
      setCookieKey(randomCookieKey);
    }, 2000);
  }, []);

  return {
    cookieKey,
  };
};
