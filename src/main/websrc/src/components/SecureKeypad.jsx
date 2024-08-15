import React from 'react';

export default function SecureKeypad({ keypad, onKeyPressed, activeKeys }) {
    const cellSize = 50; // 각 버튼에 들어갈 이미지 크기

    const isActive = (row, col) => {
        return activeKeys.some(key => key.row === row && key.col === col);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ marginBottom: '20px' }}> {/* 회색 동그라미 컨테이너 */}
                {/* 회색 동그라미를 여기에 배치 */}
            </div>

            <div style={{ backgroundColor: '#ADD8E6', padding: '10px', display: 'inline-block', borderRadius: '8px' }}>
                <table style={{ borderSpacing: '5px', borderCollapse: 'collapse' }}>
                    <tbody>
                    {keypad.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((keypadItem, colIndex) => {
                                const backgroundPositionX = -(colIndex * cellSize);
                                const backgroundPositionY = -(rowIndex * cellSize);

                                // blank 키는 투명하게 표시
                                const isBlank = keypadItem.hashedValue === 'blank';

                                return (
                                    <td key={colIndex}>
                                        <button
                                            style={{
                                                width: `${cellSize}px`,
                                                height: `${cellSize}px`,
                                                backgroundImage: isBlank ? 'none' : `url(data:image/png;base64,${keypadItem.b64String})`,
                                                backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
                                                backgroundSize: `${cellSize * 4}px ${cellSize * 3}px`,
                                                backgroundColor: isBlank ? 'transparent' : '#ADD8E6', // blank 키는 투명 배경, 나머지는 하늘색
                                                borderRadius: '50%', // 버튼을 원형으로 설정
                                                border: 'none', // 테두리 없애기
                                                outline: 'none', // 포커스 테두리 제거
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => !isBlank && onKeyPressed(rowIndex, colIndex)} // blank 키는 클릭 무시
                                        >
                                        </button>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
