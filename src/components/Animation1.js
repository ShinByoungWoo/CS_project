import { css, keyframes } from "@emotion/react";

function Animation1() {
  return (
    <div>
      <h2>emotion Animation</h2>
      <div className="wrap">
        <div className="box" css={boxStyle}></div>
      </div>
    </div>
  );
}

const floating = keyframes`
    0 {
        transform: translateY(0);    
    }
    50% {
        transform: translateY(-15px);
    }
    100% {
        transform: translateY(0);
    }
`;

const boxStyle = css`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: #a951bf;
  animation: ${floating} 2s ease infinite;
`;

export default Animation1;
