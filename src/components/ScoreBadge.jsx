import React from 'react';
import { Star } from 'lucide-react';
import { normalizeScore, getScoreTier } from '../constants/gameData';

export const ScoreBadge = ({ score, size = "md", showTier = true, showOutOfTen = true }) => {
    const normalized = normalizeScore(score);
    const tierInfo = getScoreTier(normalized);

    const sizeClasses = {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-1",
        lg: "text-base px-3 py-1.5 font-bold",
        xl: "text-xl px-4 py-2 font-black"
    };

    return (
        <div className="inline-flex items-center gap-1.5">
            <div className={`inline-flex items-center gap-1 rounded-md border font-bold ${tierInfo.bg} ${sizeClasses[size] || sizeClasses.md}`}>
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{normalized.toFixed(1)}</span>
                {showOutOfTen && <span className="opacity-75 font-normal text-[0.8em]">/10</span>}
            </div>

            {showTier && (
                <span className={`text-[10px] tracking-wider uppercase font-black px-1.5 py-0.5 rounded border ${tierInfo.border} ${tierInfo.color} bg-black/40`}>
                    {tierInfo.tier}
                </span>
            )}
        </div>
    );
};

export const StarRating = ({ rating, onChange, readOnly = false, size = 22, maxStars = 5 }) => {
    // 0 a 10 normalizado para 0 a 5 estrelas
    const currentStars = normalizeScore(rating) / 2;

    const handleStarClick = (index) => {
        if (readOnly || !onChange) return;
        // Clicar na estrela index (0 a 4) -> define (index + 1) * 2 como nota 0 a 10
        onChange((index + 1) * 2);
    };

    return (
        <div className="flex items-center gap-1">
            {[...Array(maxStars)].map((_, i) => {
                const fillPercent = Math.max(0, Math.min(100, (currentStars - i) * 100));

                return (
                    <div
                        key={i}
                        onClick={() => handleStarClick(i)}
                        className={`relative ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'}`}
                        style={{ width: size, height: size }}
                        title={`${((i + 1) * 2).toFixed(1)} / 10`}
                    >
                        {/* Estrela de fundo cinza */}
                        <Star size={size} className="text-gray-600/70" />

                        {/* Estrela preenchida proporcionalmente */}
                        {fillPercent > 0 && (
                            <div
                                className="absolute top-0 left-0 overflow-hidden pointer-events-none"
                                style={{ width: `${fillPercent}%` }}
                            >
                                <Star size={size} className="text-amber-400 fill-amber-400" />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
