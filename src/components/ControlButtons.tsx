import { Undo2, RotateCcw, Lightbulb, ChevronRight, Play, Pause } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { getPuzzleById } from '@/data/puzzles';

export function ControlButtons() {
  const {
    undoMove,
    resetPuzzle,
    toggleShowAnswer,
    showAnswer,
    loadNextPuzzle,
    stepAnswer,
    answerStep,
    currentPuzzleId,
    isGameOver,
    isWin,
    moveHistory,
  } = useGameStore();

  const puzzle = getPuzzleById(currentPuzzleId);

  const formatMoveNotation = (move: { fromRow: number; fromCol: number; toRow: number; toCol: number }, index: number) => {
    const isRed = index % 2 === 0;
    const colNames = ['九', '八', '七', '六', '五', '四', '三', '二', '一'];
    const fromCol = isRed ? colNames[move.fromCol] : colNames[8 - move.fromCol];
    const toCol = isRed ? colNames[move.toCol] : colNames[8 - move.toCol];
    const direction = move.fromRow === move.toRow ? '平' : (isRed ? (move.toRow < move.fromRow ? '进' : '退') : (move.toRow > move.fromRow ? '进' : '退'));
    const steps = Math.abs(move.toRow - move.fromRow);
    return `${isRed ? '红' : '黑'}: ${fromCol}${direction}${steps > 0 ? steps : toCol}`;
  };

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={undoMove}
          disabled={moveHistory.length === 0}
          className="flex flex-col items-center gap-1 p-3 bg-white border-2 border-amber-200 rounded-xl hover:bg-amber-50 hover:border-amber-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          <Undo2 className="w-5 h-5 text-amber-700" />
          <span className="text-xs font-medium text-gray-700">悔棋</span>
        </button>

        <button
          onClick={resetPuzzle}
          className="flex flex-col items-center gap-1 p-3 bg-white border-2 border-amber-200 rounded-xl hover:bg-amber-50 hover:border-amber-400 transition-all shadow-sm"
        >
          <RotateCcw className="w-5 h-5 text-amber-700" />
          <span className="text-xs font-medium text-gray-700">重置</span>
        </button>

        <button
          onClick={toggleShowAnswer}
          className={`flex flex-col items-center gap-1 p-3 border-2 rounded-xl transition-all shadow-sm ${
            showAnswer
              ? 'bg-yellow-100 border-yellow-400 hover:bg-yellow-200'
              : 'bg-white border-amber-200 hover:bg-amber-50 hover:border-amber-400'
          }`}
        >
          <Lightbulb className={`w-5 h-5 ${showAnswer ? 'text-yellow-700' : 'text-amber-700'}`} />
          <span className={`text-xs font-medium ${showAnswer ? 'text-yellow-800' : 'text-gray-700'}`}>
            {showAnswer ? '隐藏答案' : '答案'}
          </span>
        </button>

        <button
          onClick={loadNextPuzzle}
          className={`flex flex-col items-center gap-1 p-3 border-2 rounded-xl transition-all shadow-sm ${
            isWin
              ? 'bg-green-100 border-green-400 hover:bg-green-200'
              : 'bg-white border-amber-200 hover:bg-amber-50 hover:border-amber-400'
          }`}
        >
          <ChevronRight className={`w-5 h-5 ${isWin ? 'text-green-700' : 'text-amber-700'}`} />
          <span className={`text-xs font-medium ${isWin ? 'text-green-800' : 'text-gray-700'}`}>下一题</span>
        </button>
      </div>

      {showAnswer && puzzle && (
        <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-yellow-800 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              参考答案
            </h3>
            <button
              onClick={stepAnswer}
              disabled={answerStep >= puzzle.solution.length}
              className="flex items-center gap-1 px-3 py-1 bg-yellow-200 hover:bg-yellow-300 rounded-lg text-xs font-medium text-yellow-800 transition-colors disabled:opacity-50"
            >
              <Play className="w-3 h-3" />
              逐步演示
            </button>
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {puzzle.solution.map((move, idx) => (
              <div
                key={idx}
                className={`text-sm py-1 px-2 rounded ${
                  idx < answerStep
                    ? 'bg-green-100 text-green-800'
                    : idx === answerStep
                    ? 'bg-yellow-200 text-yellow-900 font-medium animate-pulse'
                    : 'text-yellow-700 opacity-60'
                }`}
              >
                第{Math.floor(idx / 2) + 1}步 {formatMoveNotation(move, idx)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
