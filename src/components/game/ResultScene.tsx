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
        <div className="font-novaMono font-bold text-2xl" id="countdown-number"></div>
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

  const losingChoice = () => {
    const groupOneVotes = question.group_one.length;
    const groupTwoVotes = question.group_two.length;

    if (groupOneVotes == groupTwoVotes) {
      return -1;
    }

    return groupOneVotes > groupTwoVotes ? 2 : 1;
  };

  const losingPlayers = () => {
    const group_one = question.group_one;
    const group_two = question.group_two;
    const losingAlternative = losingChoice();

    if (losingAlternative == 1) {
      return group_one;
    } else if (losingAlternative == 2) {
      return group_two;
    }

    return [];
  };

  if (losingChoice() == -1) {
    return (
      <>
        <p className="font-bold text-xl text-center italic mb-4 mx-4">
          {question.description}
        </p>
        <p className="font-bold text-5xl text-center italic" style={{ textShadow: "1px 1px black" }}>Oavgjort!</p>
        <p className="mt-5 font-bold text-4xl text-center px-2">
          Alla dricker {question.reward / 2} klunk(ar)!
        </p>
        <Countdown />
      </>
    );
  }

  return (
    <>
      <p className="font-bold text-xl text-center italic mx-4">
        {question.description}
      </p>
      <p className="font-bold text-4xl text-center mb-4 mt-1 text-green-600" style={{ textShadow: "1px 1px black" }}>
        {losingChoice() == 1 ? question.choices[1] : question.choices[0]}
      </p>
      <p className="font-bold text-2xl text-center">Förlorare:</p>
      <p className="font-bold text-3xl text-center underline decoration-red-700 text-red-700" style={{ textShadow: "1px 1px black" }}>
        {question.choices[losingChoice() - 1]}
      </p>
      {losingPlayers().length > 0 && (
        <>
          <p className="font-bold text-3xl text-center mt-4" style={{ textShadow: "1px 1px black" }}>
            Drick {question.reward} klunkar:
          </p>
          {losingPlayers().map((player) => {
            return (
              <p
                className="font-bold text-2xl text-center italic"
                style={{ textShadow: "1px 1px black" }}
                key={player.name}
              >
                {player.name}
              </p>
            );
          })}
        </>
      )}
      {losingPlayers().length == 0 && (
        <>
          <p className="mt-4 font-bold text-5xl text-center px-2" style={{ textShadow: "1px 1px black" }}>
            Överens, ingen dricker!
          </p>
        </>
      )}
      <Countdown />
    </>
  );
};

export default ResultScene;
