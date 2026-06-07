import type { Puzzle } from '@/types';

export const puzzles: Puzzle[] = [
  // ========== 入门难度 (1步杀) ==========
  {
    id: 'beginner_001',
    name: '白脸将',
    difficulty: 'beginner',
    targetMoves: 1,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '车', color: 'red', row: 0, col: 3 },
      { type: '将', color: 'black', row: 0, col: 4 },
    ],
    solution: [
      { fromRow: 0, fromCol: 3, toRow: 0, toCol: 4 },
    ],
  },
  {
    id: 'beginner_002',
    name: '大胆穿心',
    difficulty: 'beginner',
    targetMoves: 1,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '车', color: 'red', row: 3, col: 4 },
      { type: '士', color: 'black', row: 1, col: 3 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '士', color: 'black', row: 1, col: 5 },
    ],
    solution: [
      { fromRow: 3, fromCol: 4, toRow: 0, toCol: 4 },
    ],
  },
  {
    id: 'beginner_003',
    name: '重炮杀',
    difficulty: 'beginner',
    targetMoves: 1,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '炮', color: 'red', row: 2, col: 4 },
      { type: '炮', color: 'red', row: 4, col: 4 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '象', color: 'black', row: 2, col: 2 },
    ],
    solution: [
      { fromRow: 2, fromCol: 4, toRow: 0, toCol: 4 },
    ],
  },
  {
    id: 'beginner_004',
    name: '双车错',
    difficulty: 'beginner',
    targetMoves: 1,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '车', color: 'red', row: 0, col: 3 },
      { type: '车', color: 'red', row: 1, col: 5 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '士', color: 'black', row: 1, col: 4 },
    ],
    solution: [
      { fromRow: 0, fromCol: 3, toRow: 0, toCol: 4 },
    ],
  },
  {
    id: 'beginner_005',
    name: '马后炮',
    difficulty: 'beginner',
    targetMoves: 1,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '马', color: 'red', row: 2, col: 3 },
      { type: '炮', color: 'red', row: 0, col: 3 },
      { type: '将', color: 'black', row: 0, col: 4 },
    ],
    solution: [
      { fromRow: 0, fromCol: 3, toRow: 0, toCol: 4 },
    ],
  },

  // ========== 初级难度 (2-3步杀) ==========
  {
    id: 'easy_001',
    name: '铁门栓',
    difficulty: 'easy',
    targetMoves: 2,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '车', color: 'red', row: 6, col: 3 },
      { type: '炮', color: 'red', row: 9, col: 3 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '士', color: 'black', row: 1, col: 3 },
      { type: '士', color: 'black', row: 1, col: 5 },
      { type: '象', color: 'black', row: 2, col: 4 },
    ],
    solution: [
      { fromRow: 6, fromCol: 3, toRow: 0, toCol: 3 },
      { fromRow: 0, fromCol: 4, toRow: 0, toCol: 3 },
      { fromRow: 9, fromCol: 3, toRow: 0, toCol: 3 },
    ],
  },
  {
    id: 'easy_002',
    name: '海底捞月',
    difficulty: 'easy',
    targetMoves: 3,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '车', color: 'red', row: 4, col: 4 },
      { type: '炮', color: 'red', row: 9, col: 5 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '车', color: 'black', row: 3, col: 4 },
    ],
    solution: [
      { fromRow: 9, fromCol: 5, toRow: 4, toCol: 5 },
      { fromRow: 3, fromCol: 4, toRow: 3, toCol: 0 },
      { fromRow: 4, fromCol: 4, toRow: 0, toCol: 4 },
    ],
  },
  {
    id: 'easy_003',
    name: '马炮联合',
    difficulty: 'easy',
    targetMoves: 2,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '马', color: 'red', row: 3, col: 2 },
      { type: '炮', color: 'red', row: 3, col: 6 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '士', color: 'black', row: 1, col: 3 },
      { type: '士', color: 'black', row: 1, col: 5 },
    ],
    solution: [
      { fromRow: 3, fromCol: 2, toRow: 1, toCol: 3 },
      { fromRow: 1, fromCol: 5, toRow: 0, toCol: 4 },
      { fromRow: 3, fromCol: 6, toRow: 0, toCol: 6 },
    ],
  },
  {
    id: 'easy_004',
    name: '双马饮泉',
    difficulty: 'easy',
    targetMoves: 2,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '马', color: 'red', row: 3, col: 2 },
      { type: '马', color: 'red', row: 3, col: 6 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '士', color: 'black', row: 1, col: 4 },
      { type: '象', color: 'black', row: 2, col: 2 },
    ],
    solution: [
      { fromRow: 3, fromCol: 6, toRow: 1, toCol: 5 },
      { fromRow: 0, fromCol: 4, toRow: 0, toCol: 5 },
      { fromRow: 3, fromCol: 2, toRow: 1, toCol: 3 },
    ],
  },
  {
    id: 'easy_005',
    name: '天地炮',
    difficulty: 'easy',
    targetMoves: 2,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '炮', color: 'red', row: 0, col: 3 },
      { type: '炮', color: 'red', row: 5, col: 5 },
      { type: '车', color: 'red', row: 5, col: 4 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '士', color: 'black', row: 1, col: 3 },
      { type: '士', color: 'black', row: 1, col: 5 },
    ],
    solution: [
      { fromRow: 5, fromCol: 4, toRow: 1, toCol: 4 },
      { fromRow: 1, fromCol: 5, toRow: 0, toCol: 4 },
      { fromRow: 5, fromCol: 5, toRow: 0, toCol: 5 },
    ],
  },

  // ========== 中级难度 (3-4步杀) ==========
  {
    id: 'medium_001',
    name: '千里走单骑',
    difficulty: 'medium',
    targetMoves: 3,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '车', color: 'red', row: 9, col: 0 },
      { type: '马', color: 'red', row: 7, col: 7 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '士', color: 'black', row: 1, col: 3 },
      { type: '士', color: 'black', row: 1, col: 5 },
      { type: '象', color: 'black', row: 2, col: 2 },
      { type: '象', color: 'black', row: 2, col: 6 },
      { type: '车', color: 'black', row: 0, col: 0 },
    ],
    solution: [
      { fromRow: 9, fromCol: 0, toRow: 0, toCol: 0 },
      { fromRow: 1, fromCol: 3, toRow: 0, toCol: 0 },
      { fromRow: 7, fromCol: 7, toRow: 5, toCol: 6 },
      { fromRow: 0, fromCol: 4, toRow: 0, toCol: 5 },
      { fromRow: 5, fromCol: 6, toRow: 3, toCol: 5 },
    ],
  },
  {
    id: 'medium_002',
    name: '大刀剜心',
    difficulty: 'medium',
    targetMoves: 3,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '车', color: 'red', row: 4, col: 4 },
      { type: '炮', color: 'red', row: 7, col: 2 },
      { type: '兵', color: 'red', row: 3, col: 6 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '士', color: 'black', row: 1, col: 3 },
      { type: '士', color: 'black', row: 1, col: 5 },
      { type: '象', color: 'black', row: 2, col: 4 },
      { type: '车', color: 'black', row: 2, col: 0 },
    ],
    solution: [
      { fromRow: 4, fromCol: 4, toRow: 1, toCol: 4 },
      { fromRow: 1, fromCol: 5, toRow: 0, toCol: 4 },
      { fromRow: 3, fromCol: 6, toRow: 2, toCol: 5 },
      { fromRow: 0, fromCol: 4, toRow: 0, toCol: 5 },
      { fromRow: 7, fromCol: 2, toRow: 0, toCol: 2 },
    ],
  },
  {
    id: 'medium_003',
    name: '炮碾丹砂',
    difficulty: 'medium',
    targetMoves: 3,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '车', color: 'red', row: 4, col: 2 },
      { type: '炮', color: 'red', row: 3, col: 3 },
      { type: '马', color: 'red', row: 5, col: 5 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '士', color: 'black', row: 1, col: 4 },
      { type: '士', color: 'black', row: 2, col: 3 },
      { type: '象', color: 'black', row: 2, col: 6 },
      { type: '车', color: 'black', row: 0, col: 7 },
    ],
    solution: [
      { fromRow: 3, fromCol: 3, toRow: 1, toCol: 3 },
      { fromRow: 2, fromCol: 3, toRow: 1, toCol: 4 },
      { fromRow: 4, fromCol: 2, toRow: 4, toCol: 4 },
      { fromRow: 0, fromCol: 4, toRow: 0, toCol: 5 },
      { fromRow: 4, fromCol: 4, toRow: 0, toCol: 4 },
    ],
  },
  {
    id: 'medium_004',
    name: '双车胁士',
    difficulty: 'medium',
    targetMoves: 3,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '车', color: 'red', row: 6, col: 3 },
      { type: '车', color: 'red', row: 6, col: 5 },
      { type: '马', color: 'red', row: 7, col: 7 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '士', color: 'black', row: 1, col: 3 },
      { type: '士', color: 'black', row: 1, col: 5 },
      { type: '象', color: 'black', row: 2, col: 4 },
    ],
    solution: [
      { fromRow: 6, fromCol: 5, toRow: 1, toCol: 5 },
      { fromRow: 1, fromCol: 3, toRow: 0, toCol: 4 },
      { fromRow: 6, fromCol: 3, toRow: 0, toCol: 3 },
      { fromRow: 0, fromCol: 4, toRow: 1, toCol: 3 },
      { fromRow: 0, fromCol: 3, toRow: 1, toCol: 3 },
    ],
  },

  // ========== 高级难度 (4步以上) ==========
  {
    id: 'hard_001',
    name: '七星聚会',
    difficulty: 'hard',
    targetMoves: 4,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '车', color: 'red', row: 9, col: 0 },
      { type: '马', color: 'red', row: 7, col: 2 },
      { type: '炮', color: 'red', row: 7, col: 6 },
      { type: '兵', color: 'red', row: 4, col: 4 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '士', color: 'black', row: 1, col: 3 },
      { type: '士', color: 'black', row: 1, col: 5 },
      { type: '象', color: 'black', row: 2, col: 2 },
      { type: '象', color: 'black', row: 2, col: 6 },
      { type: '车', color: 'black', row: 0, col: 8 },
    ],
    solution: [
      { fromRow: 7, fromCol: 2, toRow: 5, toCol: 3 },
      { fromRow: 1, fromCol: 3, toRow: 0, toCol: 4 },
      { fromRow: 7, fromCol: 6, toRow: 4, toCol: 6 },
      { fromRow: 0, fromCol: 4, toRow: 0, toCol: 5 },
      { fromRow: 4, fromCol: 6, toRow: 0, toCol: 6 },
      { fromRow: 0, fromCol: 5, toRow: 0, toCol: 4 },
      { fromRow: 9, fromCol: 0, toRow: 0, toCol: 0 },
    ],
  },
  {
    id: 'hard_002',
    name: '蚯蚓降龙',
    difficulty: 'hard',
    targetMoves: 4,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '炮', color: 'red', row: 9, col: 2 },
      { type: '马', color: 'red', row: 7, col: 4 },
      { type: '兵', color: 'red', row: 6, col: 4 },
      { type: '车', color: 'red', row: 5, col: 0 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '士', color: 'black', row: 1, col: 4 },
      { type: '士', color: 'black', row: 2, col: 3 },
      { type: '象', color: 'black', row: 2, col: 6 },
      { type: '车', color: 'black', row: 3, col: 4 },
    ],
    solution: [
      { fromRow: 7, fromCol: 4, toRow: 5, toCol: 5 },
      { fromRow: 3, fromCol: 4, toRow: 5, toCol: 4 },
      { fromRow: 6, fromCol: 4, toRow: 5, toCol: 4 },
      { fromRow: 2, fromCol: 3, toRow: 1, toCol: 4 },
      { fromRow: 9, fromCol: 2, toRow: 9, toCol: 4 },
      { fromRow: 1, fromCol: 4, toRow: 0, toCol: 4 },
      { fromRow: 5, fromCol: 0, toRow: 0, toCol: 0 },
      { fromRow: 0, fromCol: 4, toRow: 0, toCol: 5 },
      { fromRow: 0, fromCol: 0, toRow: 0, toCol: 5 },
    ],
  },
  {
    id: 'hard_003',
    name: '野马操田',
    difficulty: 'hard',
    targetMoves: 4,
    initialPosition: [
      { type: '帅', color: 'red', row: 9, col: 4 },
      { type: '马', color: 'red', row: 5, col: 2 },
      { type: '马', color: 'red', row: 5, col: 6 },
      { type: '车', color: 'red', row: 8, col: 4 },
      { type: '炮', color: 'red', row: 2, col: 4 },
      { type: '将', color: 'black', row: 0, col: 4 },
      { type: '士', color: 'black', row: 1, col: 3 },
      { type: '士', color: 'black', row: 1, col: 5 },
      { type: '象', color: 'black', row: 2, col: 2 },
      { type: '车', color: 'black', row: 3, col: 7 },
    ],
    solution: [
      { fromRow: 5, fromCol: 2, toRow: 3, toCol: 3 },
      { fromRow: 1, fromCol: 3, toRow: 2, toCol: 4 },
      { fromRow: 5, fromCol: 6, toRow: 3, toCol: 5 },
      { fromRow: 2, fromCol: 4, toRow: 1, toCol: 5 },
      { fromRow: 8, fromCol: 4, toRow: 8, toCol: 0 },
      { fromRow: 1, fromCol: 5, toRow: 0, toCol: 4 },
      { fromRow: 8, fromCol: 0, toRow: 0, toCol: 0 },
      { fromRow: 0, fromCol: 4, toRow: 0, toCol: 5 },
      { fromRow: 0, fromCol: 0, toRow: 0, toCol: 5 },
    ],
  },
];

export const getPuzzlesByDifficulty = (difficulty: string) => {
  if (difficulty === 'all') return puzzles;
  return puzzles.filter(p => p.difficulty === difficulty);
};

export const getPuzzleById = (id: string) => {
  return puzzles.find(p => p.id === id);
};

export const getNextPuzzle = (currentId: string, difficulty: string) => {
  const list = getPuzzlesByDifficulty(difficulty);
  const currentIndex = list.findIndex(p => p.id === currentId);
  if (currentIndex === -1 || currentIndex >= list.length - 1) {
    return list[0];
  }
  return list[currentIndex + 1];
};
