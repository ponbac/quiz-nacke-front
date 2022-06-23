import { SendMessage } from "react-use-websocket";

type PreGameProps = {
  isLeader: boolean;
  room: Room;
  sendMessage: SendMessage;
};
const PreGame = (props: PreGameProps) => {
  const { isLeader, room, sendMessage } = props;
  const sortedPlayers = [...room.players].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      <p
        className="text-center text-5xl"
        style={{ textShadow: "1px 1px black" }}
      >
        Rumskod: <span className="font-bold">{room.id}</span>
      </p>
      <p className="font-bold">Väntar på att spelet ska startas...</p>
      <p className="font-bold text-xl mt-4">Spelare:</p>
      {sortedPlayers.map((player) => (
        <p className="font-bold text-lg italic" key={player.name}>
          {player.name}
        </p>
      ))}
      {isLeader && (
        <button
          className="shadow-sm shadow-black mt-4 bg-primary disabled:bg-gray-500 disabled:text-white text-secondary p-2 rounded-xl font-bold w-36 hover:w-40 hover:bg-primaryLight hover:text-secondaryLight transition-all font-novaMono"
          disabled={room.players.length < 2}
          onClick={() => {
            sendMessage(JSON.stringify({ action: "Start" }));
          }}
        >
          BÖRJA SPELET
        </button>
      )}
    </>
  );
};

export default PreGame;
