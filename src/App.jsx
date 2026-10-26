import React, { useState, useEffect, useMemo } from 'react';
import {
    Gamepad2,
    Trophy,
    Calendar,
    BarChart3,
    Search,
    Plus,
    Download,
    Upload,
    Heart,
    SlidersHorizontal,
    Sparkles,
    X,
    RotateCcw
} from 'lucide-react';

import {
    consoleThemes,
    completionLevels,
    INITIAL_DEMO_GAMES,
    normalizeScore
} from './constants/gameData';

import { GameCard } from './components/GameCard';
import { GameDetails } from './components/GameDetails';
import { GameForm } from './components/GameForm';
import { RankingView } from './components/RankingView';
import { TimelineView } from './components/TimelineView';
import { StatsView } from './components/StatsView';

// Modal Genérico com Overlay
const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex justify-center items-center z-50 p-4 overflow-y-auto">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-6 my-8">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                title="Fechar"
            >
                <X size={22} />
            </button>
            {children}
        </div>
    </div>
);

export default function App() {
    // 1. Carrega dados do localStorage ou inicia vazio (com convite a carregar exemplos)
    const [games, setGames] = useState(() => {
        try {
            const saved = localStorage.getItem('gamers-log-data');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
            // Se estiver vazio, já carrega com os exemplos nostálgicos para demonstração imediata
            return INITIAL_DEMO_GAMES;
        } catch (e) {
            console.error('Erro ao ler localStorage:', e);
            return INITIAL_DEMO_GAMES;
        }
    });

    // 2. Estados de navegação e filtros
    const [currentTab, setCurrentTab] = useState('library'); // 'library', 'ranking', 'timeline', 'stats'
    const [filterConsole, setFilterConsole] = useState('all');
    const [completionFilter, setCompletionFilter] = useState('all');
    const [onlyFavorites, setOnlyFavorites] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('ranking'); // 'ranking', 'status', 'name', 'date-old', 'date-new', 'hours'

    const [selectedGame, setSelectedGame] = useState(null);
    const [modalContent, setModalContent] = useState(null);

    // Salva automaticamente no localStorage sempre que houver alteração
    useEffect(() => {
        try {
            localStorage.setItem('gamers-log-data', JSON.stringify(games));
        } catch (e) {
            console.error('Erro ao salvar no localStorage:', e);
        }
    }, [games]);

    // Manipulação de Jogos
    const handleSaveGame = (gameData) => {
        if (gameData.id && games.some(g => g.id === gameData.id)) {
            const updated = games.map(g => g.id === gameData.id ? gameData : g);
            setGames(updated);
            if (selectedGame && selectedGame.id === gameData.id) {
                setSelectedGame(gameData);
            }
        } else {
            setGames(prev => [gameData, ...prev]);
        }
        setModalContent(null);
    };

    const handleDeleteGame = (gameId) => {
        setGames(prev => prev.filter(g => g.id !== gameId));
        setSelectedGame(null);
    };

    const handleUpdateGame = (updatedGame) => {
        setGames(prev => prev.map(g => g.id === updatedGame.id ? updatedGame : g));
        setSelectedGame(updatedGame);
    };

    const handleToggleFavorite = (gameId) => {
        setGames(prev => prev.map(g => {
            if (g.id === gameId) {
                const nextFav = !g.isFavorite;
                if (selectedGame && selectedGame.id === gameId) {
                    setSelectedGame({ ...g, isFavorite: nextFav });
                }
                return { ...g, isFavorite: nextFav };
            }
            return g;
        }));
    };

    const handleLoadDemoGames = () => {
        if (window.confirm('Deseja carregar a lista de jogos nostálgicos de demonstração (GTA San Andreas, RE4, TLOU, NFS Underground 2, etc.)?')) {
            setGames(INITIAL_DEMO_GAMES);
            setSelectedGame(null);
        }
    };

    const handleClearAll = () => {
        if (window.confirm('Atenção: Isso limpará toda a sua lista atual. Tem certeza?')) {
            setGames([]);
            setSelectedGame(null);
        }
    };

    // Backup Exportar
    const handleExport = () => {
        if (games.length === 0) {
            alert('Nenhum jogo cadastrado para exportar.');
            return;
        }
        const jsonString = JSON.stringify(games, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `games_log_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Backup Importar
    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const imported = JSON.parse(event.target.result);
                if (!Array.isArray(imported)) {
                    throw new Error('O arquivo JSON não é uma lista de jogos válida.');
                }
                if (window.confirm(`Deseja importar ${imported.length} jogos? Isso substituirá a lista atual.`)) {
                    setGames(imported);
                    setSelectedGame(null);
                    alert('Jogos importados com sucesso!');
                }
            } catch (err) {
                alert('Erro ao importar JSON. Verifique a estrutura do arquivo.');
            } finally {
                e.target.value = null;
            }
        };
        reader.readAsText(file);
    };

    const openAddGameModal = () => {
        const preselected = filterConsole !== 'all' ? filterConsole : 'pc';
        setModalContent(
            <GameForm
                onSave={handleSaveGame}
                onCancel={() => setModalContent(null)}
                preselectedConsole={preselected}
            />
        );
    };

    const openEditGameModal = (game) => {
        setModalContent(
            <GameForm
                initialData={game}
                onSave={handleSaveGame}
                onCancel={() => setModalContent(null)}
            />
        );
    };

    // Lista filtrada e ordenada para a Biblioteca
    const filteredGames = useMemo(() => {
        let list = [...games];

        // 1. Busca textual (nome, gênero, memórias, console)
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            list = list.filter(g =>
                (g.name && g.name.toLowerCase().includes(q)) ||
                (g.genre && g.genre.toLowerCase().includes(q)) ||
                (g.personalNotes && g.personalNotes.toLowerCase().includes(q)) ||
                (g.acquiredDate && g.acquiredDate.toLowerCase().includes(q)) ||
                (g.playedPeriod && g.playedPeriod.toLowerCase().includes(q))
            );
        }

        // 2. Filtro por console
        if (filterConsole !== 'all') {
            list = list.filter(g => g.console === filterConsole);
        }

        // 3. Filtro por nível de conclusão
        if (completionFilter !== 'all') {
            list = list.filter(g => g.completionLevel === completionFilter);
        }

        // 4. Apenas favoritos
        if (onlyFavorites) {
            list = list.filter(g => g.isFavorite);
        }

        // 5. Ordenação
        const statusWeights = { mastersave: 4, '100%': 3, zerado: 2, jogado: 1 };

        list.sort((a, b) => {
            if (sortOption === 'ranking') {
                const scoreA = normalizeScore(a.rating);
                const scoreB = normalizeScore(b.rating);
                if (scoreB !== scoreA) return scoreB - scoreA;
                const weightA = statusWeights[a.completionLevel] || 0;
                const weightB = statusWeights[b.completionLevel] || 0;
                if (weightB !== weightA) return weightB - weightA;
                return a.name.localeCompare(b.name);
            }

            if (sortOption === 'status') {
                const weightA = statusWeights[a.completionLevel] || 0;
                const weightB = statusWeights[b.completionLevel] || 0;
                if (weightB !== weightA) return weightB - weightA;
                return a.name.localeCompare(b.name);
            }

            if (sortOption === 'name') {
                return a.name.localeCompare(b.name);
            }

            if (sortOption === 'hours') {
                const hA = parseFloat(String(a.hoursPlayed || '').replace(/[^\d.]/g, '')) || 0;
                const hB = parseFloat(String(b.hoursPlayed || '').replace(/[^\d.]/g, '')) || 0;
                return hB - hA;
            }

            if (sortOption === 'date-old' || sortOption === 'date-new') {
                const extractYear = (txt) => {
                    if (!txt) return 9999;
                    const m = String(txt).match(/\b(19\d\d|20\d\d)\b/);
                    return m ? parseInt(m[0], 10) : 9999;
                };
                const yA = Math.min(extractYear(a.acquiredDate), extractYear(a.playedPeriod));
                const yB = Math.min(extractYear(b.acquiredDate), extractYear(b.playedPeriod));
                return sortOption === 'date-old' ? yA - yB : yB - yA;
            }

            return 0;
        });

        return list;
    }, [games, searchQuery, filterConsole, completionFilter, onlyFavorites, sortOption]);

    const activeTheme = consoleThemes[filterConsole] || consoleThemes.all;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
            {/* Modal Global */}
            {modalContent && <Modal onClose={() => setModalContent(null)}>{modalContent}</Modal>}

            {/* --- TOP NAVBAR --- */}
            <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl">
                <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
                    {/* Logo & Marca */}
                    <div
                        onClick={() => { setSelectedGame(null); setCurrentTab('library'); }}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                            <Gamepad2 size={24} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                                    GAMES LOG
                                </h1>
                                <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                                    PRO
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium">Meu Diário & Hall da Fama Gamer</p>
                        </div>
                    </div>

                    {/* Abas Principais de Navegação */}
                    <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-bold">
                        <button
                            onClick={() => { setSelectedGame(null); setCurrentTab('library'); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                                currentTab === 'library' && !selectedGame
                                    ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                                    : 'text-slate-300 hover:text-white'
                            }`}
                        >
                            <Gamepad2 size={15} /> Biblioteca ({games.length})
                        </button>

                        <button
                            onClick={() => { setSelectedGame(null); setCurrentTab('ranking'); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                                currentTab === 'ranking' && !selectedGame
                                    ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                                    : 'text-slate-300 hover:text-white'
                            }`}
                        >
                            <Trophy size={15} /> Ranking Top Jogos
                        </button>

                        <button
                            onClick={() => { setSelectedGame(null); setCurrentTab('timeline'); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                                currentTab === 'timeline' && !selectedGame
                                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                                    : 'text-slate-300 hover:text-white'
                            }`}
                        >
                            <Calendar size={15} /> Linha do Tempo
                        </button>

                        <button
                            onClick={() => { setSelectedGame(null); setCurrentTab('stats'); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                                currentTab === 'stats' && !selectedGame
                                    ? 'bg-purple-500 text-white shadow-md font-black'
                                    : 'text-slate-300 hover:text-white'
                            }`}
                        >
                            <BarChart3 size={15} /> Estatísticas
                        </button>
                    </div>

                    {/* Ações Rápidas do Topo */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleExport}
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                            title="Exportar Backup JSON"
                        >
                            <Download size={16} />
                        </button>

                        <label
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                            title="Importar Backup JSON"
                        >
                            <Upload size={16} />
                            <input type="file" className="hidden" accept=".json" onChange={handleImport} />
                        </label>

                        <button
                            onClick={openAddGameModal}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-black shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
                        >
                            <Plus size={16} /> Adicionar Jogo
                        </button>
                    </div>
                </div>

                {/* Barra Deslizante de Plataformas / Consoles */}
                <div className="border-t border-slate-800/60 bg-slate-950/60 py-2">
                    <div className="container mx-auto px-4 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                        <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mr-1 shrink-0">
                            Plataforma:
                        </span>
                        {Object.entries(consoleThemes).map(([key, { name, short }]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setFilterConsole(key);
                                    if (selectedGame) setSelectedGame(null);
                                }}
                                className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-bold transition-all shrink-0 ${
                                    filterConsole === key
                                        ? 'bg-cyan-500 text-slate-950 shadow-md font-black scale-105'
                                        : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                                }`}
                            >
                                {short}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* --- CONTEÚDO PRINCIPAL --- */}
            <main className="container mx-auto px-4 py-8 flex-1">
                {selectedGame ? (
                    <GameDetails
                        game={selectedGame}
                        onBack={() => setSelectedGame(null)}
                        onEditGame={openEditGameModal}
                        onDeleteGame={handleDeleteGame}
                        onUpdateGame={handleUpdateGame}
                        onToggleFavorite={handleToggleFavorite}
                    />
                ) : (
                    <>
                        {/* Se estiver na aba Ranking */}
                        {currentTab === 'ranking' && (
                            <RankingView
                                games={games}
                                onSelectGame={setSelectedGame}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        )}

                        {/* Se estiver na aba Linha do Tempo */}
                        {currentTab === 'timeline' && (
                            <TimelineView
                                games={games}
                                onSelectGame={setSelectedGame}
                            />
                        )}

                        {/* Se estiver na aba Estatísticas */}
                        {currentTab === 'stats' && (
                            <StatsView games={games} />
                        )}

                        {/* Se estiver na aba Biblioteca (Meus Jogos) */}
                        {currentTab === 'library' && (
                            <div className="space-y-6">
                                {/* Barra de Filtros, Busca e Ordenação */}
                                <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl space-y-4">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                        {/* Campo de Busca Textual */}
                                        <div className="relative w-full md:w-80">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Buscar jogo, gênero, memórias..."
                                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs text-white placeholder-slate-500"
                                            />
                                            {searchQuery && (
                                                <button
                                                    onClick={() => setSearchQuery('')}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                                >
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </div>

                                        {/* Controles de Ordenação e Filtros */}
                                        <div className="flex items-center gap-3 flex-wrap w-full md:w-auto justify-end">
                                            {/* Toggle Favoritos */}
                                            <button
                                                onClick={() => setOnlyFavorites(!onlyFavorites)}
                                                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                                                    onlyFavorites
                                                        ? 'bg-red-500 text-white border-red-400 shadow-md shadow-red-500/20'
                                                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-red-400'
                                                }`}
                                            >
                                                <Heart size={14} className={onlyFavorites ? 'fill-current' : ''} />
                                                <span>Favoritos</span>
                                            </button>

                                            {/* Seletor de Ordenação */}
                                            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                                                <SlidersHorizontal size={14} className="text-slate-400" />
                                                <span className="text-xs text-slate-400 font-medium">Ordenar:</span>
                                                <select
                                                    value={sortOption}
                                                    onChange={(e) => setSortOption(e.target.value)}
                                                    className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
                                                >
                                                    <option value="ranking" className="bg-slate-900">🏆 Maior Nota / Ranking</option>
                                                    <option value="status" className="bg-slate-900">👑 Melhor Status</option>
                                                    <option value="name" className="bg-slate-900">🔤 Nome (A-Z)</option>
                                                    <option value="date-old" className="bg-slate-900">📅 Mais Antigos Primeiro</option>
                                                    <option value="date-new" className="bg-slate-900">📅 Mais Recentes Primeiro</option>
                                                    <option value="hours" className="bg-slate-900">⏱️ Mais Horas Jogadas</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chips de Status de Conclusão */}
                                    <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-800/80 pt-3 text-xs">
                                        <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider shrink-0 mr-1">
                                            Status:
                                        </span>
                                        <button
                                            onClick={() => setCompletionFilter('all')}
                                            className={`px-3 py-1 rounded-lg font-bold transition-all shrink-0 ${
                                                completionFilter === 'all'
                                                    ? 'bg-purple-600 text-white shadow-md'
                                                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                                            }`}
                                        >
                                            Todos ({games.length})
                                        </button>
                                        {Object.entries(completionLevels).map(([key, { label, color, icon }]) => (
                                            <button
                                                key={key}
                                                onClick={() => setCompletionFilter(key)}
                                                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all shrink-0 ${
                                                    completionFilter === key
                                                        ? 'bg-slate-700 text-white border-2 border-cyan-400 shadow-md'
                                                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                                                }`}
                                            >
                                                {icon}
                                                <span>{label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Grade de Jogos */}
                                {filteredGames.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                        {filteredGames.map((game, index) => (
                                            <GameCard
                                                key={game.id}
                                                game={game}
                                                onSelect={setSelectedGame}
                                                onToggleFavorite={handleToggleFavorite}
                                                rankNumber={sortOption === 'ranking' ? index + 1 : null}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
                                        <Gamepad2 className="w-16 h-16 text-slate-600 mx-auto" />
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">Nenhum jogo encontrado!</h3>
                                            <p className="text-slate-400 text-sm mt-1">
                                                Ajuste os filtros de console e busca ou adicione um novo jogo.
                                            </p>
                                        </div>

                                        <div className="flex justify-center gap-3 pt-2">
                                            <button
                                                onClick={handleLoadDemoGames}
                                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
                                            >
                                                Restaurar Jogos Nostálgicos de Exemplo
                                            </button>
                                            <button
                                                onClick={openAddGameModal}
                                                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl transition-colors"
                                            >
                                                Adicionar Novo Jogo
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* --- RODAPÉ --- */}
            <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
                <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <Gamepad2 size={16} className="text-cyan-400" />
                        <span className="font-bold text-slate-400">Games Log</span>
                        <span>• Registro e memórias das suas melhores jogatinas</span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px]">
                        <button
                            onClick={handleLoadDemoGames}
                            className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                        >
                            <RotateCcw size={12} /> Carregar Exemplos
                        </button>
                        <button
                            onClick={handleClearAll}
                            className="text-slate-500 hover:text-red-400 transition-colors"
                        >
                            Limpar Tudo
                        </button>
                        <span>Feito com 💜 para Gamers</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
