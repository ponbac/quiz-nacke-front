type Room = {
  id: string;
  players: Player[];
  questions: Question[];
  current_question: number;
  scene: number;
};

type Player = {
  name: string;
  score: number;
};

type Question = {
  type: string;
  category: string;
  description: string;
  choices: string[];
  correct_choice: string;
  reward: number;
  answers: string[];
  correct_players: string[];
  incorrect_players: string[];
};
