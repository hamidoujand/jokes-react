import React from "react";
import styled, { keyframes } from "styled-components";

let skRotate = keyframes`
    100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }   
`;

let skBounce = keyframes`
 0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
`;

let StyledLoader = styled.div`
  & {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .spinner {
    margin: 100px auto;
    width: 40px;
    height: 40px;
    position: relative;
    text-align: center;

    -webkit-animation: ${skRotate} 2s infinite linear;
    animation: ${skRotate} 2s infinite linear;
  }

  .dot1,
  .dot2 {
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: var(--color-light-pink);
    border-radius: 100%;

    -webkit-animation: ${skBounce} 2s infinite ease-in-out;
    animation: ${skBounce} 2s infinite ease-in-out;
  }

  .dot2 {
    top: auto;
    bottom: 0;
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
`;

export default function Loader() {
  return (
    <StyledLoader>
      <div className="spinner">
        <div className="dot1"></div>
        <div className="dot2"></div>
      </div>
    </StyledLoader>
  );
}
