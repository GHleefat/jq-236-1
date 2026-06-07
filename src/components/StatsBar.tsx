import { useEffect } from 'react';
import { Timer, Trophy, Target, Flame } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { getPuzzleById } from '@/data/puzzles';

export function StatsBar() {
  const {
    currentPuzzleId,
    redMoves,
    completedPuzzles,
    elapsedSeconds,
    isWin,
    isGameOver,
    incrementTimer,
    message,
  } = useGameStore();

  const puzzle = getPuzzleById(currentPuzzleId);

  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      incrementTimer();
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver, incrementTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const difficultyLabel: Record<string, { text: string; color: string }> = {
    beginner: { text: '入门', color: 'bg-green-100 text-green-700 border-green-300' },
    easy: { text: '初级', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    medium: { text: '中级', color: 'bg-orange-100 text-orange-700 border-orange-300' },
    hard: { text: '高级', color: 'bg-red-100 text-red-700 border-red-300' },
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-wood-dark font-kai">{puzzle?.name || '残局'}</h2>
          {puzzle && (
            <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded border ${difficultyLabel[puzzle.difficulty].color}`}>
              {difficultyLabel[puzzle.difficulty].text}
            </span>
          )}
        </div>
        <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
          isWin
            ? 'bg-green-100 text-green-700 border border-green-300'
            : isGameOver
            ? 'bg-red-100 text-red-700 border border-red-300'
            : 'bg-amber-50 text-amber-800 border border-amber-200'
        }`}>
          {message}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Target className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <p className="text-xs text-gray-500">步数</p>
            <p className="text-lg font-bold text-gray-800">
              {redMoves}<span className="text-sm text-gray-400">/{puzzle?.targetMoves || '?'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
          <div className="p-2 bg-green-100 rounded-lg">
            <Trophy className="w-5 h-5 text-green-700" />
          </div>
          <div>
            <p className="text-xs text-gray-500">过关</p>
            <p className="text-lg font-bold text-gray-800">{completedPuzzles.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Timer className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <p className="text-xs text-gray-500">用时</p>
            <p className="text-lg font-bold text-gray-800">{formatTime(elapsedSeconds)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
          <div className="p-2 bg-red-100 rounded-lg">
            <Flame className="w-5 h-5 text-red-700" />
          </div>
          <div>
            <p className="text-xs text-gray-500">状态</p>
            <p className={`text-lg font-bold ${isWin ? 'text-green-600' : isGameOver ? 'text-red-600' : 'text-amber-600'}`}>
              {isWin ? '胜利' : isGameOver ? '失败' : '进行中'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
