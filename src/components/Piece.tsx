import type { Piece as PieceType } from '@/types';

interface PieceProps {
  piece: PieceType;
  isSelected: boolean;
  onClick: () => void;
}

export function Piece({ piece, isSelected, onClick }: PieceProps) {
  const isRed = piece.color === 'red';

  return (
    <button
      onClick={onClick}
      className={`
        w-11 h-11 md:w-12 md:h-12 rounded-full
        flex items-center justify-center
        text-xl md:text-2xl font-bold font-kai
        transition-all duration-150
        cursor-pointer select-none
        ${isRed ? 'text-piece-red' : 'text-piece-black'}
        ${isSelected
          ? 'bg-yellow-100 shadow-piece-selected scale-110 z-20'
          : 'bg-gradient-to-br from-amber-50 to-amber-100 shadow-piece hover:scale-105'
        }
        border-2 ${isRed ? 'border-piece-red' : 'border-piece-black'}
        relative
      `}
      style={{
        background: isSelected
          ? 'linear-gradient(145deg, #fef3c7, #fde68a)'
          : 'radial-gradient(circle at 30% 30%, #fffbeb, #fef3c7 60%, #fde68a)',
      }}
    >
      <span className="drop-shadow-sm">{piece.type}</span>
    </button>
  );
}
