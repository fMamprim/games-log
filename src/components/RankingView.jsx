import React, { useState, useMemo } from 'react';
import { Trophy, Crown, Medal, Flame, Star, Sparkles, Filter, Heart, Calendar, Clock, ChevronRight } from 'lucide-react';
import { consoleThemes, completionLevels, normalizeScore, getScoreTier } from '../constants/gameData';
import { ScoreBadge } from './ScoreBadge';

export const RankingView = ({ games, onSelectGame, onToggleFavorite }) => {
    const [selectedConsole, setSelectedConsole] = useState('all');

    // Filtra e classifica os jogos pelo ranking de qualidade
    const rankedGames = useMemo(() => {
        let list = [...games];

        if (selectedConsole !== 'all') {
            list = list.filter(g => g.console === selectedConsole);
        }

        // Ordenação de Ranking:
        // 1. Nota (Score 0 a 10) decrescente
        // 2. Nível de conclusão (MasterSave > 100% > Zerado > Jogado)
        // 3. Favorito ❤️
        // 4. Nome A-Z
        const statusWeights = { mastersave: 4, '100%': 3, zerado: 2, jogado: 1 };

        list.sort((a, b) => {
            const scoreA = normalizeScore(a.rating);
            const scoreB = normalizeScore(b.rating);
            if (scoreB !== scoreA) return scoreB - scoreA;

            const weightA = statusWeights[a.completionLevel] || 0;
            const weightB = statusWeights[b.completionLevel] || 0;
            if (weightB !== weightA) return weightB - weightA;

            if (a.isFavorite && !b.isFavorite) return -1;
            if (!a.isFavorite && b.isFavorite) return 1;

            return a.name.localeCompare(b.name);
        });

        return list;
    }, [games, selectedConsole]);

    const firstPlace = rankedGames[0];
    const secondPlace = rankedGames[1];
    const thirdPlace = rankedGames[2];
    const otherRanked = rankedGames.slice(3);

    return (
        <div className="space-y-10">
            {/* Header do Ranking */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 p-6 rounded-2xl border border-amber-500/20 shadow-2xl">
                <div>
                    <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-xs mb-1">
                        <Sparkles size={16} />
                        <span>Hall da Fama & Top Jogos</span>
                    </div>
                    <h2 className="text-3xl font-black text-white flex items-center gap-3">
                        <Trophy className="text-amber-400 w-8 h-8" />
                        Ranking dos Melhores Jogos
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                        Classificação de acordo com sua nota pessoal, status de conclusão e memórias inesquecíveis.
                    </p>
                </div>

                {/* Seletor de Console para o Ranking */}
                <div className="flex items-center gap-2 bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                    <Filter size={16} className="text-slate-400 ml-2" />
                    <span className="text-xs text-slate-400 font-medium">Filtrar:</span>
                    <select
                        value={selectedConsole}
                        onChange={(e) => setSelectedConsole(e.target.value)}
                        className="bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer pr-4"
                    >
                        {Object.entries(consoleThemes).map(([key, { name }]) => (
                            <option key={key} value={key} className="bg-slate-900 text-white">
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {rankedGames.length === 0 ? (
                <div className="text-center py-16 bg-slate-900/60 rounded-2xl border border-slate-800">
                    <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">Nenhum jogo cadastrado neste filtro!</h3>
                    <p className="text-slate-400 text-sm mt-1">Adicione ou classifique novos jogos para compor o seu ranking.</p>
                </div>
            ) : (
                <>
                    {/* --- PÓDIO DOS 3 PRIMEIROS (TOP 3) --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end pt-6">
                        {/* 2º LUGAR (Prata) */}
                        {secondPlace ? (
                            <div
                                onClick={() => onSelectGame(secondPlace)}
                                className="order-2 lg:order-1 bg-gradient-to-b from-slate-800/90 via-slate-900 to-slate-950 rounded-2xl p-5 border-2 border-slate-400/50 shadow-xl hover:shadow-2xl transition-all cursor-pointer relative group flex flex-col justify-between h-full"
                            >
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-950 px-4 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1.5 border border-white">
                                    <Medal size={14} className="text-slate-800" />
                                    <span>2º LUGAR • PRATA</span>
                                </div>

                                <div className="pt-3">
                                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-slate-700 bg-slate-950">
                                        <img
                                            src={secondPlace.imageUrl || `https://placehold.co/600x400/1e293b/e2e8f0?text=${encodeURIComponent(secondPlace.name)}`}
                                            alt={secondPlace.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <ScoreBadge score={secondPlace.rating} size="sm" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${consoleThemes[secondPlace.console]?.badge || 'bg-slate-700 text-white'}`}>
                                            {consoleThemes[secondPlace.console]?.short}
                                        </span>
                                        {secondPlace.genre && (
                                            <span className="text-[11px] text-slate-400 truncate">{secondPlace.genre}</span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                                        {secondPlace.name}
                                    </h3>

                                    {secondPlace.playedPeriod && (
                                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <Clock size={12} className="text-cyan-400" />
                                            <span>Jogava em: <strong>{secondPlace.playedPeriod}</strong></span>
                                        </p>
                                    )}

                                    {secondPlace.personalNotes && (
                                        <p className="text-xs text-slate-400/90 italic mt-2 line-clamp-2 bg-black/30 p-2 rounded-lg border border-slate-800">
                                            "{secondPlace.personalNotes}"
                                        </p>
                                    )}
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                                    <span>Status: <strong className="text-white">{completionLevels[secondPlace.completionLevel]?.label}</strong></span>
                                    <span className="text-slate-300 group-hover:text-white flex items-center font-bold">Ver mais &rarr;</span>
                                </div>
                            </div>
                        ) : <div className="order-2 lg:order-1 hidden lg:block" />}

                        {/* 1º LUGAR (O Campeão Supremo • Ouro) */}
                        {firstPlace && (
                            <div
                                onClick={() => onSelectGame(firstPlace)}
                                className="order-1 lg:order-2 bg-gradient-to-b from-amber-950/60 via-slate-900 to-slate-950 rounded-2xl p-6 border-2 border-amber-400 animate-gold shadow-2xl transition-all cursor-pointer relative group flex flex-col justify-between -translate-y-2 lg:-translate-y-4"
                            >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 px-5 py-1.5 rounded-full text-xs font-black shadow-xl flex items-center gap-1.5 border border-yellow-200 uppercase tracking-wider">
                                    <Crown size={16} className="text-slate-950 fill-slate-950 animate-bounce" />
                                    <span>1º LUGAR • GOAT SUPREMO</span>
                                </div>

                                <div className="pt-3">
                                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 border-2 border-amber-400/80 bg-slate-950 shadow-lg">
                                        <img
                                            src={firstPlace.imageUrl || `https://placehold.co/600x400/1e293b/e2e8f0?text=${encodeURIComponent(firstPlace.name)}`}
                                            alt={firstPlace.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-2.5 right-2.5">
                                            <ScoreBadge score={firstPlace.rating} size="md" />
                                        </div>
                                        <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-amber-300 text-xs font-bold flex items-center gap-1 border border-amber-500/40">
                                            <Sparkles size={12} />
                                            <span>O Maior de Todos os Tempos</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs font-black px-2.5 py-0.5 rounded uppercase ${consoleThemes[firstPlace.console]?.badge || 'bg-slate-700 text-white'}`}>
                                            {consoleThemes[firstPlace.console]?.name}
                                        </span>
                                        {firstPlace.genre && (
                                            <span className="text-xs text-amber-200/80 font-medium">{firstPlace.genre}</span>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                                        {firstPlace.name}
                                    </h3>

                                    <div className="mt-2 space-y-1 text-xs text-slate-300">
                                        {firstPlace.playedPeriod && (
                                            <p className="flex items-center gap-1.5">
                                                <Clock size={13} className="text-amber-400" />
                                                <span>Jogava em: <strong className="text-white">{firstPlace.playedPeriod}</strong></span>
                                            </p>
                                        )}
                                        {firstPlace.acquiredDate && (
                                            <p className="flex items-center gap-1.5 text-slate-400">
                                                <Calendar size={13} className="text-amber-400" />
                                                <span>Quando ganhei: <span className="text-slate-200">{firstPlace.acquiredDate}</span></span>
                                            </p>
                                        )}
                                    </div>

                                    {firstPlace.personalNotes && (
                                        <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-100/90 text-xs italic line-clamp-3">
                                            "{firstPlace.personalNotes}"
                                        </div>
                                    )}
                                </div>

                                <div className="mt-5 pt-3 border-t border-amber-500/30 flex items-center justify-between text-xs">
                                    <span className="text-amber-200">
                                        Status: <strong>{completionLevels[firstPlace.completionLevel]?.label}</strong>
                                    </span>
                                    <span className="bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-lg flex items-center gap-1 shadow-md hover:bg-amber-300 transition-colors">
                                        Explorar Obra-Prima &rarr;
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* 3º LUGAR (Bronze) */}
                        {thirdPlace ? (
                            <div
                                onClick={() => onSelectGame(thirdPlace)}
                                className="order-3 lg:order-3 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 rounded-2xl p-5 border-2 border-amber-700/60 shadow-xl hover:shadow-2xl transition-all cursor-pointer relative group flex flex-col justify-between h-full"
                            >
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-700 text-amber-100 px-4 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1.5 border border-amber-500">
                                    <Medal size={14} className="text-amber-300" />
                                    <span>3º LUGAR • BRONZE</span>
                                </div>

                                <div className="pt-3">
                                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-amber-900/50 bg-slate-950">
                                        <img
                                            src={thirdPlace.imageUrl || `https://placehold.co/600x400/1e293b/e2e8f0?text=${encodeURIComponent(thirdPlace.name)}`}
                                            alt={thirdPlace.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <ScoreBadge score={thirdPlace.rating} size="sm" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${consoleThemes[thirdPlace.console]?.badge || 'bg-slate-700 text-white'}`}>
                                            {consoleThemes[thirdPlace.console]?.short}
                                        </span>
                                        {thirdPlace.genre && (
                                            <span className="text-[11px] text-slate-400 truncate">{thirdPlace.genre}</span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                                        {thirdPlace.name}
                                    </h3>

                                    {thirdPlace.playedPeriod && (
                                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <Clock size={12} className="text-amber-500" />
                                            <span>Jogava em: <strong>{thirdPlace.playedPeriod}</strong></span>
                                        </p>
                                    )}

                                    {thirdPlace.personalNotes && (
                                        <p className="text-xs text-slate-400/90 italic mt-2 line-clamp-2 bg-black/30 p-2 rounded-lg border border-slate-800">
                                            "{thirdPlace.personalNotes}"
                                        </p>
                                    )}
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                                    <span>Status: <strong className="text-white">{completionLevels[thirdPlace.completionLevel]?.label}</strong></span>
                                    <span className="text-slate-300 group-hover:text-white flex items-center font-bold">Ver mais &rarr;</span>
                                </div>
                            </div>
                        ) : <div className="order-3 lg:order-3 hidden lg:block" />}
                    </div>

                    {/* --- TABELA DO RESTANTE DO RANKING (#4 em diante) --- */}
                    {otherRanked.length > 0 && (
                        <div className="mt-12 bg-slate-900/80 rounded-2xl border border-slate-800 p-6 shadow-2xl">
                            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                                <span className="bg-slate-800 text-amber-400 p-1.5 rounded-lg">#4+</span>
                                Continuar Explorando a Classificação
                            </h3>

                            <div className="space-y-3">
                                {otherRanked.map((game, index) => {
                                    const rankNum = index + 4;
                                    const theme = consoleThemes[game.console] || consoleThemes.pc;
                                    const levelStyle = completionLevels[game.completionLevel] || completionLevels.jogado;

                                    return (
                                        <div
                                            key={game.id}
                                            onClick={() => onSelectGame(game)}
                                            className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* Posição */}
                                                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-base text-slate-300 group-hover:text-amber-400 group-hover:border-amber-400/50 transition-colors shrink-0">
                                                    #{rankNum}
                                                </div>

                                                {/* Capa Miniatura */}
                                                <img
                                                    src={game.imageUrl || `https://placehold.co/100x100/1e293b/e2e8f0?text=${encodeURIComponent(game.name)}`}
                                                    alt={game.name}
                                                    className="w-14 h-14 rounded-lg object-cover border border-slate-700 shrink-0"
                                                />

                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors text-base">
                                                            {game.name}
                                                        </h4>
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${theme.badge}`}>
                                                            {theme.short}
                                                        </span>
                                                        {game.isFavorite && (
                                                            <Heart size={14} className="text-red-500 fill-red-500" />
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
                                                        {game.genre && <span>{game.genre}</span>}
                                                        {game.playedPeriod && (
                                                            <span className="flex items-center gap-1 text-slate-300">
                                                                <Clock size={12} className="text-cyan-400" />
                                                                Jogava: {game.playedPeriod}
                                                            </span>
                                                        )}
                                                        {game.acquiredDate && (
                                                            <span className="flex items-center gap-1 text-slate-400">
                                                                <Calendar size={12} className="text-amber-400" />
                                                                Ganhei: {game.acquiredDate}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                                                <div className="text-right">
                                                    <ScoreBadge score={game.rating} size="md" />
                                                    <div className="text-[11px] text-slate-400 mt-0.5">
                                                        {levelStyle.label}
                                                    </div>
                                                </div>

                                                <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
