import { Check, Lock, BookOpen } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { getPuzzlesByDifficulty } from '@/data/puzzles';
import type { Difficulty } from '@/types';

const difficulties: { key: Difficulty | 'all'; label: string; color: string }[] = [
  { key: 'all', label: '全部', color: 'bg-gray-600' },
  { key: 'beginner', label: '入门', color: 'bg-green-600' },
  { key: 'easy', label: '初级', color: 'bg-blue-600' },
  { key: 'medium', label: '中级', color: 'bg-orange-600' },
  { key: 'hard', label: '高级', color: 'bg-red-600' },
];

export function PuzzlePanel() {
  const {
    currentPuzzleId,
    loadPuzzle,
    selectedDifficulty,
    setDifficulty,
    completedPuzzles,
  } = useGameStore();

  const puzzleList = getPuzzlesByDifficulty(selectedDifficulty);

  const handleDifficultyClick = (key: Difficulty | 'all') => {
    setDifficulty(key as Difficulty);
    const list = getPuzzlesByDifficulty(key);
    if (list.length > 0 && !list.find(p => p.id === currentPuzzleId)) {
      loadPuzzle(list[0].id);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-2xl border-2 border-amber-200 overflow-hidden shadow-lg">
      <div className="p-4 bg-gradient-to-r from-amber-100 to-amber-50 border-b-2 border-amber-200">
        <h3 className="text-lg font-bold text-wood-dark font-kai flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          残局题库
        </h3>
      </div>

      <div className="p-3 border-b border-amber-100">
        <div className="flex flex-wrap gap-2">
          {difficulties.map((d) => (
            <button
              key={d.key}
              onClick={() => handleDifficultyClick(d.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedDifficulty === d.key
                  ? `${d.color} text-white shadow-md scale-105`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          共 {puzzleList.length} 题，已完成 {puzzleList.filter(p => completedPuzzles.includes(p.id)).length} 题
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {puzzleList.map((puzzle, index) => {
          const isCompleted = completedPuzzles.includes(puzzle.id);
          const isCurrent = puzzle.id === currentPuzzleId;

          return (
            <button
              key={puzzle.id}
              onClick={() => loadPuzzle(puzzle.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                isCurrent
                  ? 'bg-amber-100 border-2 border-amber-400 shadow-md'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-amber-50 hover:border-amber-200'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isCurrent
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${
                  isCurrent ? 'text-amber-900' : 'text-gray-800'
                }`}>
                  {puzzle.name}
                </p>
                <p className="text-xs text-gray-500">
                  {puzzle.targetMoves} 步杀
                </p>
              </div>
              {!isCompleted && (
                <Lock className="w-4 h-4 text-gray-300" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
