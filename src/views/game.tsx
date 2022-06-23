import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import FadeInDiv from "../components/FadeInDiv";
import PostGame from "../components/game/PostGame";
import PreGame from "../components/game/PreGame";
import QuestionScene from "../components/game/QuestionScene";
import ResultScene from "../components/game/ResultScene";
import {
  exitGame,
  newGameState,
  selectCurrentQuestion,
  selectName,
  selectRoom,
  setName,
} from "../features/game/gameSlice";
import { useAppDispatch, useAppSelector } from "../features/store";
import { SERVER_URL } from "../utils/constants";

export enum StartAction {
  JOIN_GAME,
  NEW_GAME,
}
type GameProps = {
  startAction: StartAction;
  name: string;
  roomId?: string;
  nQuestions?: string;
};
const Game = (props: GameProps) => {
  const { startAction, name, roomId, nQuestions } = props;

  const startQuery =
    startAction === StartAction.JOIN_GAME
      ? `/join?room=${roomId}&name=${name}`
      : `/new?name=${name}&questions=${nQuestions}`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${SERVER_URL}${startQuery}`
  );

  const room = useAppSelector(selectRoom);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const stateName = useAppSelector(selectName);

  const dispatch = useAppDispatch();

  const [prevScene, setPrevScene] = useState<number>();
  const SceneHandler = () => {
    switch (room?.scene) {
      case 0:
        return (
          <PreGame
            isLeader={startAction === StartAction.NEW_GAME ? true : false}
            room={room}
            sendMessage={sendMessage}
          />
        );
      case 1:
        if (currentQuestion && stateName) {
          return (
            <QuestionScene
              question={currentQuestion}
              room={room}
              name={stateName}
              sendMessage={sendMessage}
            />
          );
        }
      case 2:
        if (currentQuestion) {
          return <ResultScene question={currentQuestion} />;
        }
      case 3:
        return <PostGame room={room} />;
      default:
        return <>SceneHandler, ogiltig scen!</>;
    }
  };

  useEffect(() => {
    if (!stateName) {
      dispatch(setName(name));
    }
  }, []);

  const [messageHistory, setMessageHistory] = useState<string>();
  useEffect(() => {
    if (lastMessage !== null) {
      setPrevScene(room?.scene);
      if (messageHistory !== lastMessage.data) {
        console.log(`old length: ${messageHistory?.length}`);
        console.log(`new length: ${lastMessage.data.length}`);
        const gameState: Room = JSON.parse(lastMessage.data);
        if (!(gameState.scene == 0 && room?.scene == 3)) {
          dispatch(newGameState(gameState));
        }
        setMessageHistory(lastMessage.data);
      }
      //console.log(JSON.parse(lastMessage.data));
    }
  }, [lastMessage]);

  if (room) {
    return (
      <FadeInDiv className=" font-novaMono" duration={0.5}>
        <div className="flex flex-col flex-0 justify-center items-center">
          {prevScene == room.scene && <SceneHandler />}
          {prevScene != room.scene && (
            <FadeInDiv className="flex flex-col flex-0 justify-center items-center">
              <SceneHandler />
            </FadeInDiv>
          )}
        </div>
      </FadeInDiv>
    );
  }

  if (readyState === ReadyState.CLOSED) {
    return (
      <FadeInDiv className=" font-novaMono" duration={0.5}>
        <div className="flex flex-col flex-0 justify-center items-center">
          <p className="font-bold text-3xl px-2 text-center">
            Hittar inte rummet [{roomId}], eller så är ditt namn redan taget!
          </p>
          <button
            className="mt-6 bg-primary text-secondary p-2 rounded-xl font-bold w-36 hover:w-40 hover:bg-primaryLight hover:text-secondaryLight transition-all"
            onClick={() => {
              dispatch(exitGame());
            }}
          >
            Tillbaka!
          </button>
        </div>
      </FadeInDiv>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="loading-indicator">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Game;
