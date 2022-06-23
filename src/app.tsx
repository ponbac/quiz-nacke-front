import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import FadeInDiv from "./components/FadeInDiv";
import StartMenu from "./components/StartMenu";
import { exitGame, selectInGame } from "./features/game/gameSlice";
import { useAppDispatch, useAppSelector } from "./features/store";
import { SERVER_URL } from "./utils/constants";
import Game, { StartAction } from "./views/game";

const Head = () => {
  return (
    <Helmet>
      <title>[Quiznacke]</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};

const App: FC<{}> = () => {
  const inGame = useAppSelector(selectInGame);
  const [startAction, setStartAction] = useState<StartAction>();
  const [name, setName] = useState<string>();
  const [roomId, setRoomId] = useState<string>();
  const [nQuestions, setNQuestions] = useState<string>();

  const dispatch = useAppDispatch();

  // Ping to wake up server
  useEffect(() => {
    fetch(SERVER_URL);
  }, []);

  return (
    <FadeInDiv className="min-h-screen">
      <Head />
      <div className="flex flex-col flex-0 justify-center items-center min-h-screen">
        <button
          className="fixed top-3 right-3 shadow-sm shadow-black mt-0 bg-primary p-2 rounded-xl font-bold w-10 hover:bg-primaryLight hover:animate-spin transition-all"
          onClick={() => {
            dispatch(exitGame());
            setStartAction(undefined);
          }}
        >
          ❌
        </button>
        {!inGame && (
          <>
            <p
              className="mb-2 font-novaMono text-primary text-6xl lg:text-8xl font-bold text-center px-2 w-full"
              style={{ textShadow: "2px 2px black" }}
            >
              [QUIZNACKE]
            </p>
            <StartMenu
              startAction={startAction}
              setStartAction={setStartAction}
              name={name ?? ""}
              setName={setName}
              roomId={roomId ?? ""}
              setRoomId={setRoomId}
              nQuestions={nQuestions ?? ""}
              setNQuestions={setNQuestions}
            />
          </>
        )}
        {inGame && startAction == StartAction.NEW_GAME && name && (
          <Game startAction={startAction} name={name} nQuestions={nQuestions} />
        )}
        {inGame && startAction == StartAction.JOIN_GAME && name && roomId && (
          <Game startAction={startAction} name={name} roomId={roomId} />
        )}
      </div>
    </FadeInDiv>
  );
};

export default App;
