import React from 'react';
import { Heart, Calendar, Clock, Disc } from 'lucide-react';
import { consoleThemes, completionLevels, normalizeScore } from '../constants/gameData';
import { ScoreBadge } from './ScoreBadge';

export const GameCard = ({ game, onSelect, onToggleFavorite, rankNumber }) => {
    const levelStyle = completionLevels[game.completionLevel] || completionLevels.jogado;
    const theme = consoleThemes[game.console] || consoleThemes.pc;
    const score = normalizeScore(game.rating);

    let borderClass = 'border-slate-800';
    if (game.completionLevel === 'mastersave') {
        borderClass = 'border-red-500 animate-fire shadow-red-950/50';
    } else if (game.completionLevel === '100%') {
        borderClass = 'border-yellow-400 animate-glow shadow-yellow-950/50';
    } else if (game.completionLevel === 'zerado') {
        borderClass = 'border-emerald-500/70 hover:border-emerald-400';
    } else {
        borderClass = 'border-blue-500/50 hover:border-blue-400';
    }

    return (
        <div
            onClick={() => onSelect(game)}
            className={`group relative bg-slate-900/90 rounded-xl overflow-hidden border-2 ${borderClass} shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col`}
        >
            {/* Top Badges */}
            <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
                {/* Ranking Position Badge (se passado) */}
                {rankNumber ? (
                    <div className={`px-2.5 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1 ${
                        rankNumber === 1
                            ? 'bg-amber-400 text-black border border-yellow-200'
                            : rankNumber === 2
                            ? 'bg-slate-300 text-black border border-white'
                            : rankNumber === 3
                            ? 'bg-amber-700 text-white border border-amber-500'
                            : 'bg-black/80 text-white border border-slate-700'
                    }`}>
                        <span>#{rankNumber}</span>
                    </div>
                ) : (
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow ${theme.badge}`}>
                        {theme.short}
                    </span>
                )}

                <div className="flex items-center gap-1.5 pointer-events-auto">
                    {/* Botão de Favorito */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onToggleFavorite) onToggleFavorite(game.id);
                        }}
                        className={`p-1.5 rounded-full backdrop-blur-md transition-transform hover:scale-110 shadow-md ${
                            game.isFavorite
                                ? 'bg-red-500/90 text-white'
                                : 'bg-black/60 text-gray-400 hover:text-red-400'
                        }`}
                        title={game.isFavorite ? 'Favorito do Coração' : 'Marcar como Favorito'}
                    >
                        <Heart size={14} className={game.isFavorite ? 'fill-current' : ''} />
                    </button>

                    {/* Badge de Status de Conclusão */}
                    <div
                        className={`p-1.5 rounded-full backdrop-blur-md ${levelStyle.pillBg} shadow-md`}
                        title={levelStyle.label}
                    >
                        {levelStyle.icon}
                    </div>
                </div>
            </div>

            {/* Imagem de Capa do Jogo */}
            <div className="relative w-full aspect-[4/3] bg-slate-950 overflow-hidden">
                <img
                    src={game.imageUrl || `https://placehold.co/600x450/1e293b/e2e8f0?text=${encodeURIComponent(game.name)}`}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/600x450/1e293b/e2e8f0?text=${encodeURIComponent(game.name)}`;
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                {/* Score no canto inferior da capa */}
                <div className="absolute bottom-2.5 left-2.5 z-10">
                    <ScoreBadge score={score} size="sm" showOutOfTen={true} />
                </div>

                {/* Gênero no canto inferior direito */}
                {game.genre && (
                    <div className="absolute bottom-2.5 right-2.5 z-10">
                        <span className="text-[10px] font-semibold bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-slate-300 border border-slate-700/60 truncate max-w-[120px] inline-block">
                            {game.genre}
                        </span>
                    </div>
                )}
            </div>

            {/* Conteúdo do Card */}
            <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors line-clamp-1 title" title={game.name}>
                        {game.name}
                    </h3>

                    {/* Chips de Informações Nostálgicas */}
                    <div className="mt-2 space-y-1 text-xs text-slate-400">
                        {game.playedPeriod && (
                            <div className="flex items-center gap-1.5 text-slate-300">
                                <Clock size={12} className="text-cyan-400 shrink-0" />
                                <span className="truncate">Jogava em: <strong className="text-slate-200">{game.playedPeriod}</strong></span>
                            </div>
                        )}

                        {game.acquiredDate && (
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <Calendar size={12} className="text-amber-400 shrink-0" />
                                <span className="truncate">Ganhei: <span className="text-slate-300">{game.acquiredDate}</span></span>
                            </div>
                        )}

                        {!game.playedPeriod && !game.acquiredDate && game.hoursPlayed && (
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <Disc size={12} className="text-emerald-400 shrink-0" />
                                <span>{game.hoursPlayed} horas jogadas</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Barra Inferior com Status */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className={`px-2 py-0.5 rounded font-medium ${levelStyle.bgBadge}`}>
                        {levelStyle.label}
                    </span>

                    <span className="text-slate-400 group-hover:text-white font-medium flex items-center gap-1 transition-colors">
                        Detalhes &rarr;
                    </span>
                </div>
            </div>
        </div>
    );
};
