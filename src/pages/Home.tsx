import { ChessBoard } from '@/components/ChessBoard';
import { StatsBar } from '@/components/StatsBar';
import { ControlButtons } from '@/components/ControlButtons';
import { PuzzlePanel } from '@/components/PuzzlePanel';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <header className="py-6 px-4 border-b-2 border-amber-200 bg-gradient-to-r from-amber-100/80 to-yellow-100/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-wood-dark font-kai tracking-wider">
              ♟ 中国象棋残局训练
            </h1>
            <p className="text-sm text-amber-700 mt-1 font-medium">
              红方先行 · 限定步数内将死黑方 · 提升实战杀法能力
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-amber-700">
            <span className="px-3 py-1 bg-amber-200/50 rounded-full">经典残局</span>
            <span className="px-3 py-1 bg-amber-200/50 rounded-full">分级训练</span>
            <span className="px-3 py-1 bg-amber-200/50 rounded-full">智能提示</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          <div className="flex-shrink-0 flex flex-col items-center gap-6">
            <ChessBoard />
            <div className="w-full max-w-[432px] space-y-4">
              <StatsBar />
              <ControlButtons />
            </div>
          </div>

          <div className="w-full lg:w-80 h-[700px]">
            <PuzzlePanel />
          </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <div className="p-4 bg-white/60 backdrop-blur rounded-xl border border-amber-200">
            <h3 className="text-sm font-bold text-wood-dark mb-2">📖 操作说明</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 点击<span className="text-piece-red font-medium">红色棋子</span>选中，绿色圆点表示可移动位置</li>
              <li>• 红色闪烁圆圈表示可吃掉对方棋子</li>
              <li>• 走错了可以点「悔棋」退回，或点「重置」从头开始</li>
              <li>• 实在想不出可以点「答案」查看参考解法</li>
              <li>• 完成后自动记录通关，点击「下一题」继续挑战</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="py-4 mt-8 text-center text-sm text-amber-600 border-t border-amber-200">
        象棋残局训练 · 熟能生巧，百战不殆
      </footer>
    </div>
  );
}
