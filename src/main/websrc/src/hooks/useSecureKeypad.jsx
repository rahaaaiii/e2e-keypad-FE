"use client";

import { useState, useEffect } from 'react';
import axios from "axios";

export default function useSecureKeypad() {
  const [keypad, setKeypad] = useState([]); // 2차원 배열로 키패드 데이터 저장
  const [userInput, setUserInput] = useState(''); // 사용자가 입력한 값 저장
  const [activeKeys, setActiveKeys] = useState([]); // 활성화된 키 저장
  const [alertShown, setAlertShown] = useState(false); // Alert가 이미 표시되었는지 확인하는 상태
  const [lastKeyPressed, setLastKeyPressed] = useState(null); // 마지막으로 눌린 키를 저장
  const [prevHash, setPrevHash] = useState(''); // 해시 값을 누적하여 저장

  // 키패드를 서버에서 가져오는 함수
  const getSecureKeypad = async () => {
    try {
      const response = await axios.get('/api/keypad/generate');
      const cols = 4; // 4열 구조로 가정
      const rows = Math.ceil(response.data.length / cols);
      const transformedKeypad = [];

      for (let i = 0; i < rows; i++) {
        const row = response.data.slice(i * cols, i * cols + cols);
        transformedKeypad.push(row);
      }

      setKeypad(transformedKeypad);

    } catch (error) {
      console.error('Failed to fetch secure keypad:', error);
    }
  };

  const onKeyPressed = (row, col) => {
    console.log('Pressed:', { row, col });

    if (!Array.isArray(keypad) || !Array.isArray(keypad[row])) {
      console.error('Keypad is not a 2D array or is undefined.');
      return;
    }

    const keypadItem = keypad[row][col];
    //console.log('Keypad Item:', keypadItem);

    if (!keypadItem || !keypadItem.hashedValue || keypadItem.hashedValue === 'blank') {
      return; // blank 키는 무시하고 아무 작업도 하지 않음
    }

    setUserInput(prevInput => {
      const newInput = prevInput + 1;

      if (newInput.length <= 6) {
        setActiveKeys(prevKeys => [...prevKeys, { row, col }]); // 활성화된 키 저장
        setPrevHash(prev => prev + keypadItem.hashedValue); // 해시 값을 누적하여 저장
      }

      if (newInput.length === 6) {
        setLastKeyPressed(keypadItem); // 마지막으로 눌린 키 저장
      }

      return newInput;
    });
  };

  useEffect(() => {
    if (userInput.length === 6 && !alertShown && lastKeyPressed) {
      setAlertShown(true);
      alert(`${prevHash}`); // 누적된 해시 값 출력

      setTimeout(() => {
        window.location.reload(); // 페이지 새로고침
      }, 1000); // 새로고침 전 1초 대기
    }
  }, [userInput, alertShown, lastKeyPressed, prevHash]);

  useEffect(() => {
    getSecureKeypad(); // 컴포넌트 마운트 시 한 번만 키패드 데이터를 가져옴
  }, []);

  return {
    states: {
      keypad,
      userInput,
      activeKeys, // 활성화된 키 반환
    },
    actions: {
      getSecureKeypad,
      onKeyPressed,
    }
  };
}
