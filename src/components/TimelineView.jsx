import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Gift, Award, Heart, ChevronRight, History } from 'lucide-react';
import { consoleThemes, completionLevels, normalizeScore } from '../constants/gameData';
import { ScoreBadge } from './ScoreBadge';

export const TimelineView = ({ games, onSelectGame }) => {
    const [order, setOrder] = useState('asc'); // 'asc' = anos mais antigos primeiro, 'desc' = mais recentes

    // Processa os jogos para ordenação cronológica
    const timelineGames = useMemo(() => {
        // Tenta extrair um ano numérico de acquiredDate ou playedPeriod
        const getYearFromText = (text) => {
            if (!text) return 9999;
            const match = String(text).match(/\b(19\d\d|20\d\d)\b/);
            return match ? parseInt(match[0], 10) : 9999;
        };

        const list = [...games].map(game => {
            const yearAcquired = getYearFromText(game.acquiredDate);
            const yearPlayed = getYearFromText(game.playedPeriod);
            const effectiveYear = Math.min(yearAcquired, yearPlayed);
            return {
                ...game,
                _extractedYear: effectiveYear === 9999 ? null : effectiveYear
            };
        });

        list.sort((a, b) => {
            const yearA = a._extractedYear || 9999;
            const yearB = b._extractedYear || 9999;
            if (order === 'asc') {
                return yearA - yearB;
            }
            return yearB - yearA;
        });

        return list;
    }, [games, order]);

    return (
        <div className="space-y-8">
            {/* Header da Timeline */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 p-6 rounded-2xl border border-cyan-500/20 shadow-2xl">
                <div>
                    <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-xs mb-1">
                        <History size={16} />
                        <span>Diário Gamer de Épocas</span>
                    </div>
                    <h2 className="text-3xl font-black text-white flex items-center gap-3">
                        <Calendar className="text-cyan-400 w-8 h-8" />
                        Linha do Tempo das Memórias
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                        Reviva quando você ganhou cada jogo, as épocas em que você mais jogava e histórias inesquecíveis.
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-medium ml-2">Ordem:</span>
                    <button
                        onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                        className="px-3 py-1 bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 font-bold text-xs rounded-lg border border-cyan-500/40 transition-colors"
                    >
                        {order === 'asc' ? 'Mais Antigos Primeiro' : 'Mais Recentes Primeiro'}
                    </button>
                </div>
            </div>

            {timelineGames.length === 0 ? (
                <div className="text-center py-16 bg-slate-900/60 rounded-2xl border border-slate-800">
                    <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">Nenhum jogo com data adicionado!</h3>
                    <p className="text-slate-400 text-sm mt-1">Edite ou adicione novos jogos preenchendo "Quando ganhei" ou "Quando jogava".</p>
                </div>
            ) : (
                <div className="relative border-l-2 border-cyan-500/30 ml-4 md:ml-8 space-y-8 pl-6 md:pl-10 py-4">
                    {timelineGames.map((game, index) => {
                        const theme = consoleThemes[game.console] || consoleThemes.pc;
                        const levelStyle = completionLevels[game.completionLevel] || completionLevels.jogado;
                        const score = normalizeScore(game.rating);

                        return (
                            <div key={game.id} className="relative group">
                                {/* Ponto na linha do tempo */}
                                <div className="absolute -left-[35px] md:-left-[51px] top-6 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-950 shadow-lg shadow-cyan-500/50 group-hover:scale-125 transition-transform" />

                                <div
                                    onClick={() => onSelectGame(game)}
                                    className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/50 p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col md:flex-row gap-6 items-start justify-between"
                                >
                                    {/* Capa */}
                                    <div className="w-full md:w-48 aspect-[16/10] md:aspect-[4/3] rounded-xl overflow-hidden shrink-0 border border-slate-700 bg-slate-950 relative">
                                        <img
                                            src={game.imageUrl || `https://placehold.co/400x300/1e293b/e2e8f0?text=${encodeURIComponent(game.name)}`}
                                            alt={game.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <ScoreBadge score={score} size="sm" />
                                        </div>
                                    </div>

                                    {/* Informações Nostálgicas */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded uppercase ${theme.badge}`}>
                                                {theme.name}
                                            </span>
                                            {game.genre && (
                                                <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                                                    {game.genre}
                                                </span>
                                            )}
                                            {game._extractedYear && (
                                                <span className="text-xs font-extrabold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                                                    Época ~{game._extractedYear}
                                                </span>
                                            )}
                                            {game.isFavorite && (
                                                <Heart size={16} className="text-red-500 fill-red-500" />
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">
                                            {game.name}
                                        </h3>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                            {game.acquiredDate && (
                                                <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                                                    <Gift size={15} className="text-amber-400 shrink-0 mt-0.5" />
                                                    <div>
                                                        <span className="text-slate-400 block font-medium">Quando Ganhei / Comprei:</span>
                                                        <strong className="text-slate-200">{game.acquiredDate}</strong>
                                                        {game.acquiredSource && (
                                                            <span className="block text-slate-400 text-[11px] mt-0.5">{game.acquiredSource}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {game.playedPeriod && (
                                                <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                                                    <Clock size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                                                    <div>
                                                        <span className="text-slate-400 block font-medium">Época em que jogava:</span>
                                                        <strong className="text-slate-200">{game.playedPeriod}</strong>
                                                        {game.hoursPlayed && (
                                                            <span className="block text-slate-400 text-[11px] mt-0.5">{game.hoursPlayed} horas dedicadas</span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Memórias Pessoais */}
                                        {game.personalNotes && (
                                            <div className="p-3 bg-black/40 rounded-xl border border-slate-800 text-slate-300 text-xs italic">
                                                "{game.personalNotes}"
                                            </div>
                                        )}
                                    </div>

                                    {/* Status & Botão */}
                                    <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-800 gap-2">
                                        <div className="text-right">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${levelStyle.bgBadge}`}>
                                                {levelStyle.label}
                                            </span>
                                        </div>

                                        <span className="text-cyan-400 text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            Ver Detalhes <ChevronRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
