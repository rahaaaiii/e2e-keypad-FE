"use client";

import React, { useEffect } from 'react';
import useSecureKeypad from '../hooks/useSecureKeypad';
import SecureKeypad from "../components/SecureKeypad";
import KeypadUserInput from "../components/KeypadUserInput";

export default function Page() {
    const { states, actions } = useSecureKeypad();

    useEffect(() => {
        if (states.keypad === null) {
            actions.getSecureKeypad();  // 키패드를 처음 한 번만 가져오기
        }
    }, [states.keypad, actions]);

    if (!states.keypad) {
        return (
            <div>
                ...isLoading...
            </div>
        );
    } else {
        return (
            <div>
                <KeypadUserInput userInput={states.userInput} />
                <SecureKeypad keypad={states.keypad} onKeyPressed={actions.onKeyPressed} activeKeys={states.activeKeys} />
            </div>
        );
    }
}