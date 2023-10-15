import { useState } from "react";
import Board from "./Board";

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [historyPostion, setHistoryPosition] = useState([]);
    const [isAscending, setIsAscending] = useState(true);

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares, position) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setHistoryPosition((prev) => [...prev, position]);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function handleToggle() {
        setIsAscending(!isAscending);
    }

    const moves = history
        .map((squares, move) => {
            let description;

            if (move > 0) {
                description = `Go to move #(row, col) = (${historyPostion[move - 1].row}, ${
                    historyPostion[move - 1].col
                })`;
            } else {
                description = "Go to game start";
            }
            return {
                move,
                description,
            };
        })
        .slice()
        .sort((a, b) => (isAscending ? a.move - b.move : b.move - a.move))
        .map(({ move, description }) => (
            <li key={move}>
                {currentMove === move && move > 0 ? (
                    <span>You are at move #{`(${historyPostion[move - 1].row}, ${historyPostion[move - 1].col})`}</span>
                ) : (
                    <button onClick={() => jumpTo(move)}>{description}</button>
                )}
            </li>
        ));

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} currentMove={currentMove} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>History</ol>
                <ol>{moves}</ol>
            </div>
            <div className="game-info">
                <ol>Action</ol>
                <ol>
                    <button onClick={handleToggle}>Toggle asc/desc</button>
                </ol>
            </div>
        </div>
    );
}

export default Game;
