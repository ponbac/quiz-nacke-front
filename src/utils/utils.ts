import { useState, useEffect } from "react";

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export { sleep };

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export const hasAnswered = (
  playerName: string,
  question: Question | undefined
) => {
  if (!question) {
    return false;
  }

  const allAnswers = question?.answers;

  if (allAnswers) {
    return allAnswers.some((name) => name === playerName);
  }
  return false;
};
