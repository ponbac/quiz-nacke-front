import { exitGame, newGameState } from "../../features/game/gameSlice";
import { useAppDispatch } from "../../features/store";
import ResultsTable from "../ResultsTable";

type PostGameProps = {
  room: Room;
};
const PostGame = (props: PostGameProps) => {
  const { room } = props;
  const dispatch = useAppDispatch();

  return (
    <div className="text-center">
      <h1 className="font-bold text-4xl px-2" style={{ textShadow: "2px 2px black" }}>Spelet är slut!</h1>
      <h1 className=" mt-6 mb-1 font-bold text-2xl px-2 italic">
        Vem blev fullast?
      </h1>
      <ResultsTable className="my-4" room={room} />
      <button
        className="shadow-sm shadow-black mt-0 bg-primary text-secondary p-2 rounded-xl font-bold w-36 hover:w-40 hover:bg-primaryLight hover:text-secondaryLight transition-all"
        onClick={() => {
          dispatch(exitGame());
        }}
      >
        Tillbaka!
      </button>
    </div>
  );
};

export default PostGame;
