import Square from "./Square";

function Board({ xIsNext, squares, onPlay, currentMove }) {
    function handleClick(i, position) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares, position);
    }

    const winner = calculateWinner(squares);
    let status;
    let winningLine;
    if (winner) {
        status = <span style={{ color: "green", fontWeight: "bold" }}>{"Winner: " + winner.winner}</span>;
        winningLine = winner.lines;
    } else if (currentMove === 9 && !winner) {
        status = <span style={{ color: "blue", fontWeight: "bold" }}>Draw result</span>;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {
                    winner: squares[a],
                    lines: [a, b, c],
                };
            }
        }
        return null;
    }

    return (
        <>
            <div className="status">{status}</div>

            {Array(3)
                .fill(null)
                .map((_, row) => {
                    return (
                        <div key={row} className="board-row">
                            {Array(3)
                                .fill(null)
                                .map((_, col) => {
                                    const squareIndex = row * 3 + col;
                                    const isWinning = winningLine && winningLine.includes(squareIndex);
                                    return (
                                        <Square
                                            key={squareIndex}
                                            value={squares[squareIndex]}
                                            onSquareClick={() => handleClick(squareIndex, { row, col })}
                                            isWinning={isWinning}
                                        />
                                    );
                                })}
                        </div>
                    );
                })}
        </>
    );
}

export default Board;
