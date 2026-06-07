import { useEffect } from 'react';
import { Piece } from './Piece';
import { useGameStore } from '@/store/useGameStore';
import { BOARD_ROWS, BOARD_COLS } from '@/utils/chessRules';

const CELL_SIZE = 48;
const CELL_SIZE_MD = 56;

export function ChessBoard() {
  const {
    board,
    selectedPiece,
    validMoves,
    selectPiece,
    makePlayerMove,
    isRedTurn,
    isGameOver,
  } = useGameStore();

  const boardWidth = (BOARD_COLS - 1) * CELL_SIZE + 48;
  const boardHeight = (BOARD_ROWS - 1) * CELL_SIZE + 48;

  const handleCellClick = (row: number, col: number) => {
    if (isGameOver || !isRedTurn) return;

    if (selectedPiece) {
      const isValid = validMoves.some(m => m.row === row && m.col === col);
      if (isValid) {
        makePlayerMove(row, col);
        return;
      }
    }

    const piece = board[row][col];
    if (piece) {
      if (selectedPiece && selectedPiece.row === row && selectedPiece.col === col) {
        selectPiece(null);
      } else {
        selectPiece(piece);
      }
    } else if (selectedPiece) {
      selectPiece(null);
    }
  };

  const isValidMoveCell = (row: number, col: number) => {
    return validMoves.some(m => m.row === row && m.col === col);
  };

  const isValidMoveWithPiece = (row: number, col: number) => {
    return validMoves.some(m => m.row === row && m.col === col) && board[row][col];
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-2xl"
      style={{
        width: boardWidth,
        height: boardHeight,
        padding: 24,
        background: `
          linear-gradient(135deg, #DEB887 0%, #D2B48C 25%, #C4A57B 50%, #B8956E 75%, #DEB887 100%)
        `,
      }}
    >
      <div
        className="absolute inset-6 border-2 border-board-line rounded-sm"
        style={{ opacity: 0.9 }}
      />

      <svg
        className="absolute inset-6 pointer-events-none"
        width={boardWidth - 48}
        height={boardHeight - 48}
      >
        {Array.from({ length: BOARD_ROWS }).map((_, row) => (
          <line
            key={`h-${row}`}
            x1={0}
            y1={row * CELL_SIZE}
            x2={(BOARD_COLS - 1) * CELL_SIZE}
            y2={row * CELL_SIZE}
            stroke="#5D3A1A"
            strokeWidth={1.2}
          />
        ))}

        {Array.from({ length: BOARD_COLS }).map((_, col) => (
          <g key={`v-${col}`}>
            {col === 0 || col === BOARD_COLS - 1 ? (
              <line
                x1={col * CELL_SIZE}
                y1={0}
                x2={col * CELL_SIZE}
                y2={(BOARD_ROWS - 1) * CELL_SIZE}
                stroke="#5D3A1A"
                strokeWidth={1.2}
              />
            ) : (
              <>
                <line
                  x1={col * CELL_SIZE}
                  y1={0}
                  x2={col * CELL_SIZE}
                  y2={4 * CELL_SIZE}
                  stroke="#5D3A1A"
                  strokeWidth={1.2}
                />
                <line
                  x1={col * CELL_SIZE}
                  y1={5 * CELL_SIZE}
                  x2={col * CELL_SIZE}
                  y2={9 * CELL_SIZE}
                  stroke="#5D3A1A"
                  strokeWidth={1.2}
                />
              </>
            )}
          </g>
        ))}

        <line
          x1={3 * CELL_SIZE}
          y1={0}
          x2={5 * CELL_SIZE}
          y2={2 * CELL_SIZE}
          stroke="#5D3A1A"
          strokeWidth={1.2}
        />
        <line
          x1={5 * CELL_SIZE}
          y1={0}
          x2={3 * CELL_SIZE}
          y2={2 * CELL_SIZE}
          stroke="#5D3A1A"
          strokeWidth={1.2}
        />
        <line
          x1={3 * CELL_SIZE}
          y1={7 * CELL_SIZE}
          x2={5 * CELL_SIZE}
          y2={9 * CELL_SIZE}
          stroke="#5D3A1A"
          strokeWidth={1.2}
        />
        <line
          x1={5 * CELL_SIZE}
          y1={7 * CELL_SIZE}
          x2={3 * CELL_SIZE}
          y2={9 * CELL_SIZE}
          stroke="#5D3A1A"
          strokeWidth={1.2}
        />

        <text
          x={CELL_SIZE * 1.2}
          y={CELL_SIZE * 4.7}
          fill="#5D3A1A"
          fontSize={22}
          fontFamily="KaiTi, STKaiti, serif"
          fontWeight="bold"
          letterSpacing={16}
        >
          楚 河
        </text>
        <text
          x={CELL_SIZE * 5.2}
          y={CELL_SIZE * 4.7}
          fill="#5D3A1A"
          fontSize={22}
          fontFamily="KaiTi, STKaiti, serif"
          fontWeight="bold"
          letterSpacing={16}
        >
          漢 界
        </text>
      </svg>

      {Array.from({ length: BOARD_ROWS }).map((_, row) =>
        Array.from({ length: BOARD_COLS }).map((_, col) => {
          const piece = board[row][col];
          const isValid = isValidMoveCell(row, col);
          const hasPieceTarget = isValidMoveWithPiece(row, col);

          return (
            <div
              key={`${row}-${col}`}
              className="absolute flex items-center justify-center cursor-pointer"
              style={{
                left: col * CELL_SIZE,
                top: row * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                transform: 'translate(-50%, -50%)',
                marginLeft: 24,
                marginTop: 24,
              }}
              onClick={() => handleCellClick(row, col)}
            >
              {isValid && !hasPieceTarget && (
                <div className="absolute w-4 h-4 rounded-full bg-emerald-500 opacity-60 animate-pulse" />
              )}
              {hasPieceTarget && (
                <div className="absolute inset-0 rounded-full border-4 border-red-500 opacity-70 animate-pulse scale-110" />
              )}

              {piece && (
                <Piece
                  piece={piece}
                  isSelected={selectedPiece?.id === piece.id}
                  onClick={() => {}}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
