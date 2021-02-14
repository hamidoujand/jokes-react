import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { v4 } from "uuid";
import Joke from "./Joke";
import Loader from "./Loader";

let StyledJokeList = styled.div`
  .container {
    display: flex;
    margin: 0 auto;
    -webkit-box-shadow: 4px 1px 17px -4px rgba(0, 0, 0, 0.53);
    box-shadow: 4px 1px 17px -4px rgba(0, 0, 0, 0.53);
    @media ${(props) => props.theme.mediaQuery.phone} {
      flex-direction: column;
    }
  }
  .sidebar {
    background-color: var(--color-dark-blue);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60rem;
    width: 30rem;
    @media ${(props) => props.theme.mediaQuery.tapPort} {
      width: 20rem;
    }
    @media ${(props) => props.theme.mediaQuery.phone} {
      width: 100%;
      height: 60rem;
    }
  }
  .jokes {
    background-color: var(--color-white);
    min-width: 50rem;
    padding: 2rem;
    overflow-y: scroll;
    height: 60rem;
    position: relative;
  }
  .header {
    color: var(--color-white);
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0.6rem;
    @media ${(props) => props.theme.mediaQuery.tapPort} {
      font-size: 1rem;
      font-weight: 400;
    }
  }
  .bold {
    font-size: 4rem;
    font-weight: 600;
    letter-spacing: 0;
    @media ${(props) => props.theme.mediaQuery.tapPort} {
      font-size: 2rem;
      font-weight: 400;
    }
    @media ${(props) => props.theme.mediaQuery.phone} {
      font-size: 4rem;
      font-weight: 600;
    }
  }
  .emoji {
    width: 20rem;
    -webkit-box-shadow: -2px 0px 9px 3px rgba(0, 0, 0, 0.33);
    box-shadow: -2px 0px 9px 3px rgba(0, 0, 0, 0.33);
    display: block;
    border-radius: 50%;
    @media ${(props) => props.theme.mediaQuery.tapPort} {
      width: 10rem;
    }
    @media ${(props) => props.theme.mediaQuery.phone} {
      width: 10rem;
    }
  }
  .get-more {
    border: none;
    background: none;
    background-image: linear-gradient(
      to right,
      var(--color-light-blue),
      var(--color-light-pink)
    );
    padding: 1rem 2rem;
    color: white;
    font-size: 1.4rem;
    display: block;
    text-transform: uppercase;
    margin-top: 2rem;
    border-radius: 5rem;
    transition: all 0.5s;
    font-weight: 600;
    font-family: inherit;
    &:hover {
      transform: translateY(-0.3rem);
    }
    &:active {
      transform: translateY(0rem);
    }
  }
`;

export default function JokeList(props) {
  let [jokes, setJokes] = useState(
    () => JSON.parse(localStorage.getItem("jokes")) || []
  );
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");
  let { numOfJokes } = props;

  let jokeRequest = useCallback(async () => {
    let jokesArr = [];
    while (jokesArr.length < numOfJokes) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });
      jokesArr.push({ joke: res.data.joke, votes: 0, id: v4() });
    }

    return jokesArr;
  }, [numOfJokes]);

  useEffect(() => {
    let localStorageJokes = JSON.parse(localStorage.getItem("jokes") || "[]");
    if (localStorageJokes.length === 0) {
      (async function () {
        try {
          setLoading(true);
          let jokes = await jokeRequest();
          setJokes(jokes);
          window.localStorage.setItem("jokes", JSON.stringify(jokes));
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError("Something went wrong! ");
        }
      })();
    }
  }, [jokeRequest]);
  let handleVotes = (id, status) => {
    let votedJokes = jokes.map((j) => {
      if (j.id === id) {
        if (status === "up") {
          return {
            ...j,
            votes: j.votes + 1,
          };
        } else if (status === "down") {
          return {
            ...j,
            votes: j.votes - 1,
          };
        } else {
          return j;
        }
      } else {
        return j;
      }
    });
    setJokes(votedJokes);
    window.localStorage.setItem("jokes", JSON.stringify(votedJokes));
  };
  let renderJokes = () => {
    return jokes
      .sort((jokeA, jokeB) => jokeB.votes - jokeA.votes)
      .map((joke) => (
        <Joke
          key={joke.id}
          id={joke.id}
          text={joke.joke}
          votes={joke.votes}
          handleVotes={handleVotes}
        />
      ));
  };

  let loadNewJokes = async () => {
    //we do not want any duplicated jokes
    try {
      setLoading(true);
      let setOfJokes = new Set(jokes.map((j) => j.joke));
      let newJokes = [];
      while (newJokes.length < numOfJokes) {
        let res = await axios.get("https://icanhazdadjoke.com/", {
          headers: {
            Accept: "application/json",
          },
        });
        if (!setOfJokes.has(res.data.joke)) {
          newJokes.push({ joke: res.data.joke, votes: 0, id: v4() });
        }
      }
      let allJokes = [...jokes, ...newJokes];
      setJokes(allJokes);
      window.localStorage.setItem("jokes", JSON.stringify(allJokes));
      setLoading(false);
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  let renderContent = () => {
    if (loading) {
      return <Loader />;
    } else if (error) {
      return (
        <div className="error-container">
          <h2>{error}</h2>
        </div>
      );
    } else {
      return (
        <StyledJokeList>
          <div className="container">
            <div className="sidebar">
              <h1 className="header">
                <span className="bold">Dad</span> jokes
              </h1>
              <img
                src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
                alt="emoji"
                className="emoji"
              />
              <button className="get-more" onClick={loadNewJokes}>
                New Jokes
              </button>
            </div>
            <div
              className="jokes"
              style={{ alignSelf: loading ? "center" : "auto" }}
            >
              {renderJokes()}
            </div>
          </div>
        </StyledJokeList>
      );
    }
  };
  return renderContent();
}

JokeList.defaultProps = {
  numOfJokes: 10,
};
