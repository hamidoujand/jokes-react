import React from "react";
import styled from "styled-components";

let StyledJoke = styled.div`
  & {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 1rem;
  }
  .joke-buttons {
    margin: 1rem 0;
    margin-right: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .arrow {
    font-size: 1.5rem;
    cursor: pointer;
  }
  .text {
    font-weight: 600;
    font-size: 1.2rem;
    max-width: 60rem;
    margin-right: auto;
  }
  .votes {
    display: flex;
    width: 3rem;
    height: 3rem;
    border: 2px solid
      ${(props) => {
        if (props.votes >= 15) {
          return "#4caf50";
        } else if (props.votes >= 12) {
          return "#8bc34a";
        } else if (props.votes >= 9) {
          return "#cddc39";
        } else if (props.votes >= 6) {
          return "#ffeb3b";
        } else if (props.votes >= 3) {
          return "#ffc107";
        } else if (props.votes >= 0) {
          return "#ff9800";
        } else {
          return "#f44336";
        }
      }};
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin: 0 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    -webkit-box-shadow: 0px 8px 10px -6px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 8px 10px -6px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 8px 10px -6px rgba(0, 0, 0, 0.75);
  }
  .smiley {
    font-size: 2rem;
    border-radius: 50%;
    -webkit-box-shadow: 0px 8px 10px -6px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 8px 10px -6px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 8px 10px -6px rgba(0, 0, 0, 0.75);
  }
`;

export default function Joke(props) {
  let getSmiley = () => {
    if (props.votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (props.votes >= 12) {
      return "em em-laughing";
    } else if (props.votes >= 9) {
      return "em em-smiley";
    } else if (props.votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (props.votes >= 3) {
      return "em em-neutral_face";
    } else if (props.votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  };
  return (
    <StyledJoke votes={props.votes}>
      <div className="joke-buttons">
        <i
          className="fas fa-arrow-up arrow"
          onClick={() => props.handleVotes(props.id, "up")}
        ></i>
        <span className="votes">{props.votes}</span>
        <i
          className="fas fa-arrow-down arrow"
          onClick={() => props.handleVotes(props.id, "down")}
        ></i>
      </div>
      <div className="text">{props.text}</div>
      <div className="smiley">
        <i className={getSmiley()} aria-label="BIRD"></i>
      </div>
    </StyledJoke>
  );
}
