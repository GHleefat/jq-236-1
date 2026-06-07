export type PieceColor = 'red' | 'black';

export type PieceType = '帅' | '将' | '士' | '仕' | '相' | '象' | '马' | '车' | '炮' | '兵' | '卒';

export interface Piece {
  id: string;
  type: PieceType;
  color: PieceColor;
  row: number;
  col: number;
}

export interface Move {
  fromRow: number;
  fromCol: number;
  toRow: number;
  toCol: number;
  capturedPiece?: Piece;
  piece: Piece;
}

export type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard';
export type DifficultyFilter = Difficulty | 'all';

export interface Puzzle {
  id: string;
  name: string;
  difficulty: Difficulty;
  targetMoves: number;
  initialPosition: Omit<Piece, 'id'>[];
  solution: { fromRow: number; fromCol: number; toRow: number; toCol: number }[];
}

export interface GameState {
  currentPuzzleId: string;
  board: (Piece | null)[][];
  moveHistory: Move[];
  isRedTurn: boolean;
  redMoves: number;
  selectedPiece: Piece | null;
  validMoves: { row: number; col: number }[];
  isGameOver: boolean;
  isWin: boolean;
  showAnswer: boolean;
  answerStep: number;
  completedPuzzles: string[];
  elapsedSeconds: number;
  selectedDifficulty: DifficultyFilter;
  message: string;
}
