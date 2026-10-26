import React, { useState } from 'react';
import {
    Edit,
    Trash2,
    Calendar,
    Clock,
    Gift,
    Disc,
    Heart,
    Plus,
    X,
    Trophy,
    Star,
    ShieldAlert,
    Gamepad2,
    ArrowLeft
} from 'lucide-react';
import {
    consoleThemes,
    completionLevels,
    achievementIcons,
    normalizeScore,
    getScoreTier
} from '../constants/gameData';
import { ScoreBadge, StarRating } from './ScoreBadge';

const AchievementModal = ({ onSave, onCancel, initialData = null }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [icon, setIcon] = useState(initialData?.icon || 'trophy');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('O título da conquista é obrigatório.');
            return;
        }
        onSave({
            id: initialData?.id || Date.now().toString(),
            title: title.trim(),
            description: description.trim(),
            icon
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <h3 className="text-xl font-bold">{initialData ? 'Editar Conquista' : 'Nova Conquista'}</h3>
            <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300">Título</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Mestre do Mercenaries"
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                />
            </div>
            <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300">Descrição</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Como conquistou este objetivo..."
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    rows={3}
                />
            </div>
            <div>
                <label className="block text-xs font-semibold mb-1 text-slate-300">Ícone</label>
                <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm"
                >
                    <option value="trophy">🏆 Troféu</option>
                    <option value="star">⭐ Estrela</option>
                    <option value="shield">🛡️ Escudo</option>
                    <option value="gamepad">🎮 Gamepad</option>
                </select>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
                >
                    Salvar Conquista
                </button>
            </div>
        </form>
    );
};

export const GameDetails = ({
    game,
    onBack,
    onEditGame,
    onDeleteGame,
    onUpdateGame,
    onToggleFavorite
}) => {
    const [modalContent, setModalContent] = useState(null);

    const levelStyle = completionLevels[game.completionLevel] || completionLevels.jogado;
    const theme = consoleThemes[game.console] || consoleThemes.pc;
    const score = normalizeScore(game.rating);
    const scoreTier = getScoreTier(score);

    let imageBorder = 'border-slate-700';
    if (game.completionLevel === 'mastersave') {
        imageBorder = 'border-red-500 animate-fire';
    } else if (game.completionLevel === '100%') {
        imageBorder = 'border-yellow-400 animate-glow';
    } else if (game.completionLevel === 'zerado') {
        imageBorder = 'border-emerald-500';
    } else {
        imageBorder = 'border-blue-500';
    }

    const handleAddAchievement = () => {
        setModalContent(
            <AchievementModal
                onSave={handleSaveAchievement}
                onCancel={() => setModalContent(null)}
            />
        );
    };

    const handleEditAchievement = (ach) => {
        setModalContent(
            <AchievementModal
                initialData={ach}
                onSave={(updated) => handleSaveAchievement(updated, true)}
                onCancel={() => setModalContent(null)}
            />
        );
    };

    const handleSaveAchievement = (newAch, isEdit = false) => {
        let updatedAchievements;
        if (isEdit) {
            updatedAchievements = (game.achievements || []).map(a => a.id === newAch.id ? newAch : a);
        } else {
            updatedAchievements = [...(game.achievements || []), newAch];
        }
        onUpdateGame({ ...game, achievements: updatedAchievements });
        setModalContent(null);
    };

    const handleDeleteAchievement = (achId) => {
        const updated = (game.achievements || []).filter(a => a.id !== achId);
        onUpdateGame({ ...game, achievements: updated });
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Modal para Adicionar/Editar Conquistas */}
            {modalContent && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setModalContent(null)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        {modalContent}
                    </div>
                </div>
            )}

            {/* Botão de Voltar e Ações Principais */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-sm font-bold border border-slate-700 shadow transition-colors"
                >
                    <ArrowLeft size={16} /> Voltar para a Biblioteca
                </button>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onToggleFavorite(game.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border shadow transition-all ${
                            game.isFavorite
                                ? 'bg-red-500 text-white border-red-400'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-red-400'
                        }`}
                    >
                        <Heart size={16} className={game.isFavorite ? 'fill-current' : ''} />
                        <span>{game.isFavorite ? 'Favorito' : 'Favoritar'}</span>
                    </button>

                    <button
                        onClick={() => onEditGame(game)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow transition-colors"
                    >
                        <Edit size={16} /> Editar
                    </button>

                    <button
                        onClick={() => {
                            if (window.confirm(`Tem certeza que deseja apagar "${game.name}" da sua biblioteca?`)) {
                                onDeleteGame(game.id);
                            }
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-sm font-bold shadow transition-colors"
                    >
                        <Trash2 size={16} /> Apagar
                    </button>
                </div>
            </div>

            {/* Painel Principal Hero do Jogo */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Capa com Borda de Status Especial */}
                    <div className="w-full lg:w-72 shrink-0">
                        <div className={`relative rounded-xl overflow-hidden border-4 ${imageBorder} shadow-2xl aspect-[3/4] bg-slate-950`}>
                            <img
                                src={game.imageUrl || `https://placehold.co/600x800/1e293b/e2e8f0?text=${encodeURIComponent(game.name)}`}
                                alt={game.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://placehold.co/600x800/1e293b/e2e8f0?text=${encodeURIComponent(game.name)}`;
                                }}
                            />
                        </div>
                    </div>

                    {/* Informações Centrais do Jogo */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                                <span className={`text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider ${theme.badge}`}>
                                    {theme.name}
                                </span>
                                {game.genre && (
                                    <span className="text-xs text-slate-300 font-semibold bg-slate-800 px-3 py-1 rounded-md">
                                        {game.genre}
                                    </span>
                                )}
                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold ${levelStyle.bgBadge}`}>
                                    {levelStyle.icon}
                                    <span>{levelStyle.label}</span>
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                                {game.name}
                            </h1>
                        </div>

                        {/* Bloco de Nota e Tier */}
                        <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <ScoreBadge score={score} size="xl" showOutOfTen={true} />
                                <div>
                                    <span className="text-xs font-extrabold text-slate-300 block">{scoreTier.title}</span>
                                    <span className="text-[11px] text-slate-400">{scoreTier.shortDesc}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <StarRating rating={score} readOnly size={22} />
                            </div>
                        </div>

                        {/* Grade de Atributos Detalhados */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                            {game.acquiredDate && (
                                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                                    <span className="text-slate-400 flex items-center gap-1.5 font-medium mb-1">
                                        <Gift size={14} className="text-amber-400" /> Quando Ganhei:
                                    </span>
                                    <strong className="text-white text-sm block">{game.acquiredDate}</strong>
                                    {game.acquiredSource && (
                                        <span className="text-[11px] text-slate-400 mt-0.5 block">{game.acquiredSource}</span>
                                    )}
                                </div>
                            )}

                            {game.playedPeriod && (
                                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                                    <span className="text-slate-400 flex items-center gap-1.5 font-medium mb-1">
                                        <Clock size={14} className="text-cyan-400" /> Época em que jogava:
                                    </span>
                                    <strong className="text-white text-sm block">{game.playedPeriod}</strong>
                                    {game.hoursPlayed && (
                                        <span className="text-[11px] text-slate-400 mt-0.5 block">{game.hoursPlayed} horas estimadas</span>
                                    )}
                                </div>
                            )}

                            {game.finishDate && (
                                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                                    <span className="text-slate-400 flex items-center gap-1.5 font-medium mb-1">
                                        <Calendar size={14} className="text-emerald-400" /> Quando zerei:
                                    </span>
                                    <strong className="text-white text-sm block">{game.finishDate}</strong>
                                </div>
                            )}

                            {game.mediaType && (
                                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                                    <span className="text-slate-400 flex items-center gap-1.5 font-medium mb-1">
                                        <Disc size={14} className="text-purple-400" /> Mídia / Formato:
                                    </span>
                                    <strong className="text-white text-sm block">{game.mediaType}</strong>
                                </div>
                            )}

                            {game.difficulty && (
                                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                                    <span className="text-slate-400 flex items-center gap-1.5 font-medium mb-1">
                                        <Gamepad2 size={14} className="text-pink-400" /> Dificuldade:
                                    </span>
                                    <strong className="text-white text-sm block">{game.difficulty}</strong>
                                </div>
                            )}
                        </div>

                        {/* Memórias e Histórias Pessoais */}
                        {game.personalNotes && (
                            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-950 to-slate-950 border border-amber-500/30">
                                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                                    <span>💭 Minhas Lembranças & História</span>
                                </h4>
                                <p className="text-sm text-slate-200 leading-relaxed italic">
                                    "{game.personalNotes}"
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Seção de Conquistas */}
                <div className="mt-10 pt-8 border-t border-slate-800">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-2xl font-black text-white flex items-center gap-2">
                                <Trophy className="text-yellow-400 w-6 h-6" /> Conquistas do Jogo ({(game.achievements || []).length})
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">Metas, troféus e desafios superados neste título.</p>
                        </div>

                        <button
                            onClick={handleAddAchievement}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                        >
                            <Plus size={16} /> Nova Conquista
                        </button>
                    </div>

                    {(game.achievements || []).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {game.achievements.map((ach) => (
                                <div
                                    key={ach.id}
                                    className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex items-start gap-3 hover:border-slate-700 transition-colors"
                                >
                                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                                        {achievementIcons[ach.icon] || achievementIcons.trophy}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="font-bold text-sm text-white truncate">{ach.title}</h5>
                                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{ach.description}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleEditAchievement(ach)}
                                            className="p-1.5 text-slate-400 hover:text-white transition-colors"
                                            title="Editar Conquista"
                                        >
                                            <Edit size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteAchievement(ach.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                                            title="Excluir Conquista"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-slate-950/40 rounded-xl border border-slate-800/80">
                            <Trophy className="w-10 h-10 text-slate-600 mx-auto mb-2 opacity-50" />
                            <p className="text-xs text-slate-400">Nenhuma conquista registrada ainda. Clique em "Nova Conquista" para cadastrar seus feitos!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
