//KeypadUserInput.jsx
import '../style/keypad.css';

export default function KeypadUserInput({ userInput }) {
    const maxInputLength = 6; // 총 6개의 입력
    const inputLength = userInput.length;

    return (
        <>
            <div className="input-group-style">
                {[...Array(maxInputLength)].map((_, index) => (
                    <span
                        key={index}
                        className={`input-char-style ${index < inputLength ? 'active' : ''}`}
                    >
                    </span>
                ))}
            </div>
        </>
    );
}
