import { create } from 'zustand';
import type { GameState, Piece, Move, Difficulty, DifficultyFilter } from '@/types';
import { getPuzzleById, getNextPuzzle, puzzles } from '@/data/puzzles';
import {
  createEmptyBoard,
  getValidMoves,
  makeMove,
  isCheckmate,
  cloneBoard,
  getPieceAt,
  isValidMove,
} from '@/utils/chessRules';

const initBoardFromPuzzle = (puzzleId: string): (Piece | null)[][] => {
  const puzzle = getPuzzleById(puzzleId);
  if (!puzzle) return createEmptyBoard();

  const board = createEmptyBoard();
  puzzle.initialPosition.forEach((p, idx) => {
    board[p.row][p.col] = {
      ...p,
      id: `${p.color}_${p.type}_${idx}`,
    } as Piece;
  });
  return board;
};

interface GameStore extends GameState {
  selectPiece: (piece: Piece | null) => void;
  makePlayerMove: (toRow: number, toCol: number) => boolean;
  autoBlackMove: () => void;
  undoMove: () => void;
  resetPuzzle: () => void;
  loadPuzzle: (puzzleId: string) => void;
  loadNextPuzzle: () => void;
  setDifficulty: (difficulty: DifficultyFilter) => void;
  toggleShowAnswer: () => void;
  stepAnswer: () => void;
  incrementTimer: () => void;
}

const initialPuzzleId = puzzles[0].id;

export const useGameStore = create<GameStore>((set, get) => ({
  currentPuzzleId: initialPuzzleId,
  board: initBoardFromPuzzle(initialPuzzleId),
  moveHistory: [],
  isRedTurn: true,
  redMoves: 0,
  selectedPiece: null,
  validMoves: [],
  isGameOver: false,
  isWin: false,
  showAnswer: false,
  answerStep: 0,
  completedPuzzles: [],
  elapsedSeconds: 0,
  selectedDifficulty: 'all',
  message: '红方先行，请选择棋子',

  selectPiece: (piece) => {
    const state = get();
    if (state.isGameOver || !state.isRedTurn) return;

    if (!piece) {
      set({ selectedPiece: null, validMoves: [] });
      return;
    }

    if (piece.color !== 'red') return;

    const validMoves = getValidMoves(state.board, piece);
    set({ selectedPiece: piece, validMoves, message: '请选择目标位置' });
  },

  makePlayerMove: (toRow, toCol) => {
    const state = get();
    const { selectedPiece, board, isRedTurn, isGameOver, currentPuzzleId, moveHistory } = state;

    if (!selectedPiece || !isRedTurn || isGameOver) return false;

    if (!isValidMove(board, selectedPiece, toRow, toCol)) {
      set({ message: '非法走法！' });
      return false;
    }

    const targetPiece = getPieceAt(board, toRow, toCol);
    const { newBoard } = makeMove(board, selectedPiece.row, selectedPiece.col, toRow, toCol);

    const move: Move = {
      fromRow: selectedPiece.row,
      fromCol: selectedPiece.col,
      toRow,
      toCol,
      capturedPiece: targetPiece || undefined,
      piece: selectedPiece,
    };

    const newHistory = [...moveHistory, move];
    const newRedMoves = state.redMoves + 1;
    const puzzle = getPuzzleById(currentPuzzleId);

    if (isCheckmate(newBoard, 'black')) {
      const completed = state.completedPuzzles.includes(currentPuzzleId)
        ? state.completedPuzzles
        : [...state.completedPuzzles, currentPuzzleId];
      set({
        board: newBoard,
        moveHistory: newHistory,
        redMoves: newRedMoves,
        selectedPiece: null,
        validMoves: [],
        isRedTurn: false,
        isGameOver: true,
        isWin: true,
        completedPuzzles: completed,
        message: '🎉 恭喜过关！',
        showAnswer: false,
      });
      return true;
    }

    if (puzzle && newRedMoves >= puzzle.targetMoves) {
      set({
        board: newBoard,
        moveHistory: newHistory,
        redMoves: newRedMoves,
        selectedPiece: null,
        validMoves: [],
        isRedTurn: false,
        isGameOver: true,
        isWin: false,
        message: '步数已用完，挑战失败！可悔棋或查看答案。',
      });
      return true;
    }

    set({
      board: newBoard,
      moveHistory: newHistory,
      redMoves: newRedMoves,
      selectedPiece: null,
      validMoves: [],
      isRedTurn: false,
      message: '黑方思考中...',
    });

    setTimeout(() => {
      get().autoBlackMove();
    }, 600);

    return true;
  },

  autoBlackMove: () => {
    const state = get();
    const { board, currentPuzzleId, moveHistory, isGameOver } = state;
    if (isGameOver) return;

    const puzzle = getPuzzleById(currentPuzzleId);
    if (!puzzle) return;

    const solutionStep = moveHistory.length;
    if (solutionStep < puzzle.solution.length) {
      const expectedMove = puzzle.solution[solutionStep];
      const piece = getPieceAt(board, expectedMove.fromRow, expectedMove.fromCol);
      if (piece && piece.color === 'black' && isValidMove(board, piece, expectedMove.toRow, expectedMove.toCol)) {
        const targetPiece = getPieceAt(board, expectedMove.toRow, expectedMove.toCol);
        const { newBoard } = makeMove(board, expectedMove.fromRow, expectedMove.fromCol, expectedMove.toRow, expectedMove.toCol);

        const move: Move = {
          fromRow: expectedMove.fromRow,
          fromCol: expectedMove.fromCol,
          toRow: expectedMove.toRow,
          toCol: expectedMove.toCol,
          capturedPiece: targetPiece || undefined,
          piece,
        };

        if (isCheckmate(newBoard, 'red')) {
          set({
            board: newBoard,
            moveHistory: [...moveHistory, move],
            isRedTurn: true,
            isGameOver: true,
            isWin: false,
            message: '被将死了！可悔棋重试。',
          });
          return;
        }

        set({
          board: newBoard,
          moveHistory: [...moveHistory, move],
          isRedTurn: true,
          message: '轮到红方走棋',
        });
        return;
      }
    }

    const blackPieces: Piece[] = [];
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 9; c++) {
        const p = board[r][c];
        if (p && p.color === 'black') {
          blackPieces.push(p);
        }
      }
    }

    for (const piece of blackPieces) {
      const moves = getValidMoves(board, piece);
      if (moves.length > 0) {
        const targetPiece = getPieceAt(board, moves[0].row, moves[0].col);
        const { newBoard } = makeMove(board, piece.row, piece.col, moves[0].row, moves[0].col);
        const move: Move = {
          fromRow: piece.row,
          fromCol: piece.col,
          toRow: moves[0].row,
          toCol: moves[0].col,
          capturedPiece: targetPiece || undefined,
          piece,
        };

        if (isCheckmate(newBoard, 'red')) {
          set({
            board: newBoard,
            moveHistory: [...moveHistory, move],
            isRedTurn: true,
            isGameOver: true,
            isWin: false,
            message: '被将死了！可悔棋重试。',
          });
          return;
        }

        set({
          board: newBoard,
          moveHistory: [...moveHistory, move],
          isRedTurn: true,
          message: '轮到红方走棋',
        });
        return;
      }
    }

    set({
      isRedTurn: true,
      isGameOver: true,
      isWin: true,
      message: '黑方无子可动，红方胜利！',
    });
  },

  undoMove: () => {
    const state = get();
    const { moveHistory, currentPuzzleId } = state;

    if (moveHistory.length === 0) {
      set({ message: '没有可悔的棋' });
      return;
    }

    let newHistory = [...moveHistory];
    let newBoard = initBoardFromPuzzle(currentPuzzleId);
    let redMoves = 0;

    const undoCount = newHistory.length >= 2 && !state.isRedTurn ? 2 : 1;
    for (let i = 0; i < undoCount && newHistory.length > 0; i++) {
      newHistory.pop();
    }

    for (const move of newHistory) {
      const { newBoard: nb } = makeMove(newBoard, move.fromRow, move.fromCol, move.toRow, move.toCol);
      newBoard = nb;
      if (move.piece.color === 'red') {
        redMoves++;
      }
    }

    set({
      board: newBoard,
      moveHistory: newHistory,
      redMoves,
      isRedTurn: true,
      selectedPiece: null,
      validMoves: [],
      isGameOver: false,
      isWin: false,
      message: '已悔棋，红方继续',
    });
  },

  resetPuzzle: () => {
    const state = get();
    set({
      board: initBoardFromPuzzle(state.currentPuzzleId),
      moveHistory: [],
      isRedTurn: true,
      redMoves: 0,
      selectedPiece: null,
      validMoves: [],
      isGameOver: false,
      isWin: false,
      showAnswer: false,
      answerStep: 0,
      message: '已重置，红方先行',
    });
  },

  loadPuzzle: (puzzleId) => {
    set({
      currentPuzzleId: puzzleId,
      board: initBoardFromPuzzle(puzzleId),
      moveHistory: [],
      isRedTurn: true,
      redMoves: 0,
      selectedPiece: null,
      validMoves: [],
      isGameOver: false,
      isWin: false,
      showAnswer: false,
      answerStep: 0,
      message: '红方先行',
    });
  },

  loadNextPuzzle: () => {
    const state = get();
    const nextPuzzle = getNextPuzzle(state.currentPuzzleId, state.selectedDifficulty);
    if (nextPuzzle) {
      set({
        currentPuzzleId: nextPuzzle.id,
        board: initBoardFromPuzzle(nextPuzzle.id),
        moveHistory: [],
        isRedTurn: true,
        redMoves: 0,
        selectedPiece: null,
        validMoves: [],
        isGameOver: false,
        isWin: false,
        showAnswer: false,
        answerStep: 0,
        message: '红方先行',
      });
    }
  },

  setDifficulty: (difficulty) => {
    set({ selectedDifficulty: difficulty });
  },

  toggleShowAnswer: () => {
    set((state) => ({ showAnswer: !state.showAnswer, answerStep: 0 }));
  },

  stepAnswer: () => {
    const state = get();
    const puzzle = getPuzzleById(state.currentPuzzleId);
    if (!puzzle) return;
    if (state.answerStep < puzzle.solution.length) {
      set({ answerStep: state.answerStep + 1 });
    }
  },

  incrementTimer: () => {
    set((state) => ({ elapsedSeconds: state.elapsedSeconds + 1 }));
  },
}));
