import { useEffect } from "react";

const Countdown = () => {
  useEffect(() => {
    var countdownNumberEl = document.getElementById("countdown-number");
    var countdown = 15;

    if (countdownNumberEl) {
      countdownNumberEl.textContent = countdown.toString();
    }

    setInterval(function () {
      countdown = --countdown <= 0 ? 15 : countdown;

      if (countdownNumberEl) {
        countdownNumberEl.textContent = countdown.toString();
      }
      if (countdown == 0) {
        document.getElementById("countdown")?.remove();
        document.getElementById("countdown")?.setAttribute("hidden", "true");
      }
    }, 1000);
  }, []);

  return (
    <div className="mt-8">
      <div className="" id="countdown">
        <div
          className="font-novaMono font-bold text-2xl"
          id="countdown-number"
        ></div>
        <svg>
          <circle r="36" cx="40" cy="40"></circle>
        </svg>
      </div>
    </div>
  );
};

type ResultSceneProps = {
  question: Question;
};
const ResultScene = (props: ResultSceneProps) => {
  const { question } = props;

  return (
    <>
      <p className="font-bold text-xl text-center italic mx-4">
        {question.description}
      </p>
      <p
        className="font-bold text-4xl text-center mb-4 mt-1 text-green-600"
        style={{ textShadow: "1px 1px black" }}
      >
        {question.correct_choice}
      </p>
      {question.answers.length > 0 && (
        <>
          {question.correct_players.length > 0 && (
            <>
              <p
                className="font-bold text-3xl text-center mt-4"
                style={{ textShadow: "1px 1px black" }}
              >
                Rätt svar, dela ut {question.reward * 3} klunkar:
              </p>
              {question.correct_players.map((playerName) => {
                return (
                  <p
                    className="font-bold text-2xl text-center italic text-green-600"
                    style={{ textShadow: "1px 1px black" }}
                    key={playerName}
                  >
                    {playerName}
                  </p>
                );
              })}
            </>
          )}
          {question.incorrect_players.length > 0 && (
            <>
              <p
                className="font-bold text-3xl text-center mt-4"
                style={{ textShadow: "1px 1px black" }}
              >
                Felaktigt svar, straff {question.reward / 2} klunk(ar):
              </p>
              {question.incorrect_players.map((playerName) => {
                return (
                  <p
                    className="font-bold text-2xl text-center italic text-red-600"
                    style={{ textShadow: "1px 1px black" }}
                    key={playerName}
                  >
                    {playerName}
                  </p>
                );
              })}
            </>
          )}
        </>
      )}
      <Countdown />
    </>
  );
};

export default ResultScene;
