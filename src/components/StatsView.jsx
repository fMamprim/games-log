import React, { useMemo } from 'react';
import { Trophy, Crown, Flame, Gamepad2, Star, Clock, Heart, BarChart3, Disc } from 'lucide-react';
import { consoleThemes, completionLevels, normalizeScore } from '../constants/gameData';

export const StatsView = ({ games }) => {
    const stats = useMemo(() => {
        const total = games.length;
        if (total === 0) return null;

        const zerados = games.filter(g => g.completionLevel === 'zerado' || g.completionLevel === '100%' || g.completionLevel === 'mastersave').length;
        const complete100 = games.filter(g => g.completionLevel === '100%').length;
        const masterSaves = games.filter(g => g.completionLevel === 'mastersave').length;
        const favorites = games.filter(g => g.isFavorite).length;

        // Média de Notas
        const validScores = games.map(g => normalizeScore(g.rating)).filter(s => s > 0);
        const avgScore = validScores.length > 0
            ? (validScores.reduce((acc, curr) => acc + curr, 0) / validScores.length).toFixed(1)
            : '0.0';

        // Horas totais estimadas
        const totalHours = games.reduce((acc, g) => {
            const num = parseFloat(String(g.hoursPlayed || '').replace(/[^\d.]/g, ''));
            return isNaN(num) ? acc : acc + num;
        }, 0);

        // Agrupamento por console
        const consoleCount = {};
        games.forEach(g => {
            const c = g.console || 'pc';
            consoleCount[c] = (consoleCount[c] || 0) + 1;
        });

        // Agrupamento por status
        const statusCount = {
            jogado: games.filter(g => g.completionLevel === 'jogado').length,
            zerado: games.filter(g => g.completionLevel === 'zerado').length,
            '100%': complete100,
            mastersave: masterSaves
        };

        return {
            total,
            zerados,
            complete100,
            masterSaves,
            favorites,
            completionRate: Math.round((zerados / total) * 100),
            avgScore,
            totalHours: Math.round(totalHours),
            consoleCount,
            statusCount
        };
    }, [games]);

    if (!stats) {
        return (
            <div className="text-center py-16 bg-slate-900/60 rounded-2xl border border-slate-800">
                <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">Nenhum dado para estatísticas!</h3>
                <p className="text-slate-400 text-sm mt-1">Adicione jogos à sua biblioteca para ver suas estatísticas.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 p-6 rounded-2xl border border-purple-500/20 shadow-2xl">
                <div className="flex items-center gap-2 text-purple-400 font-bold uppercase tracking-wider text-xs mb-1">
                    <BarChart3 size={16} />
                    <span>Visão Geral & Métricas</span>
                </div>
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                    Painel do Jogador
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                    Um raio-x da sua trajetória gamer: horas investidas, jogos platinados e preferências.
                </p>
            </div>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                        <Gamepad2 size={14} className="text-cyan-400" /> Total de Jogos
                    </span>
                    <span className="text-3xl font-black text-white mt-2">{stats.total}</span>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                        <Trophy size={14} className="text-emerald-400" /> Zerados / Concluídos
                    </span>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-black text-emerald-400">{stats.zerados}</span>
                        <span className="text-xs text-slate-400">({stats.completionRate}%)</span>
                    </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                        <Crown size={14} className="text-amber-400" /> 100% e Platinas
                    </span>
                    <span className="text-3xl font-black text-amber-400 mt-2">{stats.complete100}</span>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                        <Flame size={14} className="text-red-400" /> MasterSaves
                    </span>
                    <span className="text-3xl font-black text-red-500 mt-2">{stats.masterSaves}</span>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                        <Star size={14} className="text-yellow-400" /> Média de Notas
                    </span>
                    <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-3xl font-black text-yellow-400">{stats.avgScore}</span>
                        <span className="text-xs text-slate-400">/ 10</span>
                    </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                        <Clock size={14} className="text-blue-400" /> Horas Registradas
                    </span>
                    <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">{stats.totalHours}</span>
                        <span className="text-xs text-slate-400">h</span>
                    </div>
                </div>
            </div>

            {/* Gráficos de Barras / Progresso */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Por Console */}
                <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
                        <Disc size={18} className="text-cyan-400" /> Jogos por Plataforma
                    </h3>
                    <div className="space-y-3">
                        {Object.entries(stats.consoleCount)
                            .sort((a, b) => b[1] - a[1])
                            .map(([consoleKey, count]) => {
                                const theme = consoleThemes[consoleKey] || consoleThemes.pc;
                                const percentage = Math.round((count / stats.total) * 100);

                                return (
                                    <div key={consoleKey} className="space-y-1">
                                        <div className="flex justify-between text-xs font-semibold">
                                            <span className="text-slate-300">{theme.name}</span>
                                            <span className="text-slate-400">{count} ({percentage}%)</span>
                                        </div>
                                        <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                                            <div
                                                className="h-full rounded-full transition-all duration-700"
                                                style={{
                                                    width: `${percentage}%`,
                                                    backgroundColor: theme.accentColor || '#38bdf8'
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                {/* Por Nível de Conclusão */}
                <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
                        <Trophy size={18} className="text-emerald-400" /> Distribuição de Conclusão
                    </h3>
                    <div className="space-y-3">
                        {Object.entries(stats.statusCount).map(([statusKey, count]) => {
                            const level = completionLevels[statusKey];
                            const percentage = Math.round((count / stats.total) * 100);

                            const colorMap = {
                                jogado: 'bg-blue-500',
                                zerado: 'bg-emerald-500',
                                '100%': 'bg-amber-400',
                                mastersave: 'bg-red-500'
                            };

                            return (
                                <div key={statusKey} className="space-y-1">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span className="text-slate-300 flex items-center gap-1.5">
                                            {level?.icon} {level?.label}
                                        </span>
                                        <span className="text-slate-400">{count} ({percentage}%)</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                                        <div
                                            className={`h-full rounded-full transition-all duration-700 ${colorMap[statusKey] || 'bg-slate-500'}`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
