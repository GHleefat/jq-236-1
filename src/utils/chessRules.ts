import type { Piece, PieceColor } from '@/types';

export const BOARD_ROWS = 10;
export const BOARD_COLS = 9;

export const inBoard = (row: number, col: number): boolean => {
  return row >= 0 && row < BOARD_ROWS && col >= 0 && col < BOARD_COLS;
};

export const getPieceAt = (board: (Piece | null)[][], row: number, col: number): Piece | null => {
  if (!inBoard(row, col)) return null;
  return board[row][col];
};

export const isInPalace = (row: number, col: number, color: PieceColor): boolean => {
  if (col < 3 || col > 5) return false;
  if (color === 'red') {
    return row >= 7 && row <= 9;
  } else {
    return row >= 0 && row <= 2;
  }
};

export const getValidMoves = (board: (Piece | null)[][], piece: Piece): { row: number; col: number }[] => {
  const moves: { row: number; col: number }[] = [];
  const { type, color, row, col } = piece;

  switch (type) {
    case '帅':
    case '将':
      getKingMoves(board, piece, moves);
      break;
    case '士':
    case '仕':
      getAdvisorMoves(board, piece, moves);
      break;
    case '相':
    case '象':
      getElephantMoves(board, piece, moves);
      break;
    case '马':
      getHorseMoves(board, piece, moves);
      break;
    case '车':
      getRookMoves(board, piece, moves);
      break;
    case '炮':
      getCannonMoves(board, piece, moves);
      break;
    case '兵':
    case '卒':
      getPawnMoves(board, piece, moves);
      break;
  }

  return moves.filter(m => inBoard(m.row, m.col));
};

const getKingMoves = (board: (Piece | null)[][], piece: Piece, moves: { row: number; col: number }[]) => {
  const { color, row, col } = piece;
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
  ];

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (isInPalace(newRow, newCol, color)) {
      const target = getPieceAt(board, newRow, newCol);
      if (!target || target.color !== color) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  }

  const oppositeColor = color === 'red' ? 'black' : 'red';
  const kingType = oppositeColor === 'red' ? '帅' : '将';
  let dir = color === 'red' ? -1 : 1;
  let checkRow = row + dir;
  while (inBoard(checkRow, col)) {
    const target = getPieceAt(board, checkRow, col);
    if (target) {
      if (target.type === kingType && target.color === oppositeColor) {
        moves.push({ row: checkRow, col });
      }
      break;
    }
    checkRow += dir;
  }
};

const getAdvisorMoves = (board: (Piece | null)[][], piece: Piece, moves: { row: number; col: number }[]) => {
  const { color, row, col } = piece;
  const directions = [
    [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (isInPalace(newRow, newCol, color)) {
      const target = getPieceAt(board, newRow, newCol);
      if (!target || target.color !== color) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  }
};

const getElephantMoves = (board: (Piece | null)[][], piece: Piece, moves: { row: number; col: number }[]) => {
  const { color, row, col } = piece;
  const directions = [
    [-2, -2], [-2, 2], [2, -2], [2, 2]
  ];
  const blocks = [
    [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];

  for (let i = 0; i < directions.length; i++) {
    const [dr, dc] = directions[i];
    const [br, bc] = blocks[i];
    const newRow = row + dr;
    const newCol = col + dc;
    const blockRow = row + br;
    const blockCol = col + bc;

    const crossesRiver = color === 'red' ? newRow < 5 : newRow > 4;
    if (crossesRiver) continue;

    if (!inBoard(newRow, newCol)) continue;

    if (getPieceAt(board, blockRow, blockCol)) continue;

    const target = getPieceAt(board, newRow, newCol);
    if (!target || target.color !== color) {
      moves.push({ row: newRow, col: newCol });
    }
  }
};

const getHorseMoves = (board: (Piece | null)[][], piece: Piece, moves: { row: number; col: number }[]) => {
  const { row, col, color } = piece;
  const jumps = [
    [-2, -1, -1, 0], [-2, 1, -1, 0],
    [2, -1, 1, 0], [2, 1, 1, 0],
    [-1, -2, 0, -1], [1, -2, 0, -1],
    [-1, 2, 0, 1], [1, 2, 0, 1]
  ];

  for (const [dr, dc, br, bc] of jumps) {
    const newRow = row + dr;
    const newCol = col + dc;
    const blockRow = row + br;
    const blockCol = col + bc;

    if (!inBoard(newRow, newCol)) continue;

    if (getPieceAt(board, blockRow, blockCol)) continue;

    const target = getPieceAt(board, newRow, newCol);
    if (!target || target.color !== color) {
      moves.push({ row: newRow, col: newCol });
    }
  }
};

const getRookMoves = (board: (Piece | null)[][], piece: Piece, moves: { row: number; col: number }[]) => {
  const { row, col, color } = piece;
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
  ];

  for (const [dr, dc] of directions) {
    let newRow = row + dr;
    let newCol = col + dc;
    while (inBoard(newRow, newCol)) {
      const target = getPieceAt(board, newRow, newCol);
      if (!target) {
        moves.push({ row: newRow, col: newCol });
      } else {
        if (target.color !== color) {
          moves.push({ row: newRow, col: newCol });
        }
        break;
      }
      newRow += dr;
      newCol += dc;
    }
  }
};

const getCannonMoves = (board: (Piece | null)[][], piece: Piece, moves: { row: number; col: number }[]) => {
  const { row, col, color } = piece;
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
  ];

  for (const [dr, dc] of directions) {
    let newRow = row + dr;
    let newCol = col + dc;
    let jumped = false;

    while (inBoard(newRow, newCol)) {
      const target = getPieceAt(board, newRow, newCol);
      if (!jumped) {
        if (!target) {
          moves.push({ row: newRow, col: newCol });
        } else {
          jumped = true;
        }
      } else {
        if (target) {
          if (target.color !== color) {
            moves.push({ row: newRow, col: newCol });
          }
          break;
        }
      }
      newRow += dr;
      newCol += dc;
    }
  }
};

const getPawnMoves = (board: (Piece | null)[][], piece: Piece, moves: { row: number; col: number }[]) => {
  const { row, col, color } = piece;
  const forward = color === 'red' ? -1 : 1;
  const crossedRiver = color === 'red' ? row <= 4 : row >= 5;

  const directions: [number, number][] = [[forward, 0]];
  if (crossedRiver) {
    directions.push([0, -1], [0, 1]);
  }

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (!inBoard(newRow, newCol)) continue;
    const target = getPieceAt(board, newRow, newCol);
    if (!target || target.color !== color) {
      moves.push({ row: newRow, col: newCol });
    }
  }
};

export const isInCheck = (board: (Piece | null)[][], color: PieceColor): boolean => {
  const kingType = color === 'red' ? '帅' : '将';
  let kingPos: { row: number; col: number } | null = null;

  for (let r = 0; r < BOARD_ROWS; r++) {
    for (let c = 0; c < BOARD_COLS; c++) {
      const piece = board[r][c];
      if (piece && piece.type === kingType && piece.color === color) {
        kingPos = { row: r, col: c };
        break;
      }
    }
    if (kingPos) break;
  }

  if (!kingPos) return true;

  const oppositeColor = color === 'red' ? 'black' : 'red';
  for (let r = 0; r < BOARD_ROWS; r++) {
    for (let c = 0; c < BOARD_COLS; c++) {
      const piece = board[r][c];
      if (piece && piece.color === oppositeColor) {
        const moves = getValidMoves(board, piece);
        if (moves.some(m => m.row === kingPos!.row && m.col === kingPos!.col)) {
          return true;
        }
      }
    }
  }

  return false;
};

export const isCheckmate = (board: (Piece | null)[][], color: PieceColor): boolean => {
  if (!isInCheck(board, color)) return false;

  for (let r = 0; r < BOARD_ROWS; r++) {
    for (let c = 0; c < BOARD_COLS; c++) {
      const piece = board[r][c];
      if (piece && piece.color === color) {
        const moves = getValidMoves(board, piece);
        for (const move of moves) {
          const newBoard = cloneBoard(board);
          newBoard[move.row][move.col] = { ...piece, row: move.row, col: move.col };
          newBoard[r][c] = null;
          if (!isInCheck(newBoard, color)) {
            return false;
          }
        }
      }
    }
  }

  return true;
};

export const cloneBoard = (board: (Piece | null)[][]): (Piece | null)[][] => {
  return board.map(row => row.map(piece => piece ? { ...piece } : null));
};

export const createEmptyBoard = (): (Piece | null)[][] => {
  return Array(BOARD_ROWS).fill(null).map(() => Array(BOARD_COLS).fill(null));
};

export const isValidMove = (
  board: (Piece | null)[][],
  piece: Piece,
  toRow: number,
  toCol: number
): boolean => {
  const validMoves = getValidMoves(board, piece);
  return validMoves.some(m => m.row === toRow && m.col === toCol);
};

export const makeMove = (
  board: (Piece | null)[][],
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
): { newBoard: (Piece | null)[][]; capturedPiece: Piece | null } => {
  const newBoard = cloneBoard(board);
  const piece = newBoard[fromRow][fromCol];
  const capturedPiece = newBoard[toRow][toCol];

  if (piece) {
    newBoard[toRow][toCol] = { ...piece, row: toRow, col: toCol };
    newBoard[fromRow][fromCol] = null;
  }

  return { newBoard, capturedPiece };
};
