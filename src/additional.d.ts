type Room = {
    id: string;
    players: Player[];
    questions: Question[];
    current_question: number;
    scene: number;
}

type Player = {
    name: string;
    score: number;
}

type Question = {
    type: string;
    description: string;
    choices: string[];
    reward: number;
    group_one: Player[];
    group_two: Player[];
}