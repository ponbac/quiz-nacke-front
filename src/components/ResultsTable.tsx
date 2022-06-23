import { selectCurrentQuestion, selectName } from "../features/auth/gameSlice";
import { useAppSelector } from "../features/store";
import { hasAnswered } from "../utils/utils";

type ResultsTableProps = {
  room: Room;
  whoVoted?: boolean;
  className?: string;
};
const ResultsTable = (props: ResultsTableProps) => {
  const { room, whoVoted = false, className } = props;
  const question = useAppSelector(selectCurrentQuestion);
  const sortedPlayers = [...room.players].sort((a, b) => {
    let n = b.score - a.score;
    if (n === 0) {
      n = a.name.localeCompare(b.name);
    }
    return n;
  });

  return (
    <div className={className}>
      <p className="text-center font-bold text-xl">Tavlan:</p>
      <ul className="text-center">
        {sortedPlayers.map((player) => {
          if (whoVoted && hasAnswered(player.name, question)) {
            return (
              <p
                className="text-lg text-gray-400 font-bold italic"
                key={player.name}
              >
                {player.name} - {player.score} klunkar
              </p>
            );
          }
          return (
            <p className="text-lg font-bold" key={player.name}>
              {player.name} - {player.score} klunkar
            </p>
          );
        })}
      </ul>
    </div>
  );
};

export default ResultsTable;
