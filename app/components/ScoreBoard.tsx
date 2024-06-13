interface ScoreBoardProps {
    score: number;
    level: number;
    lines: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, level, lines }) => {
    return (
        <div className="flex justify-evenly space-x-4 text-xl">
            <div className="flex gap-2">
                <p className="font-bold">Score: </p>
                <p>{score}</p>
            </div>
            <div className="flex gap-2">
                <p className="font-bold">Level: </p>
                <p>{level}</p>
            </div>
            <div className="flex gap-2">
                <p className="font-bold">Lines: </p>
                <p>{lines}</p>
            </div>
        </div>
    );
}

export default ScoreBoard;
