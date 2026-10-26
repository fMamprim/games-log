import React, { useState } from 'react';
import { Star, Heart, Calendar, Clock, Gift, Disc, Image as ImageIcon, Sparkles, Upload } from 'lucide-react';
import {
    consoleThemes,
    completionLevels,
    genresList,
    mediaTypesList,
    acquiredSourcesList,
    normalizeScore,
    getScoreTier
} from '../constants/gameData';
import { StarRating } from './ScoreBadge';

export const GameForm = ({ onSave, onCancel, initialData = null, preselectedConsole = 'pc' }) => {
    // Campos Básicos
    const [name, setName] = useState(initialData?.name || '');
    const [consoleType, setConsoleType] = useState(initialData?.console || preselectedConsole);
    const [genre, setGenre] = useState(initialData?.genre || 'Ação');
    const [completionLevel, setCompletionLevel] = useState(initialData?.completionLevel || 'jogado');
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
    const [isFavorite, setIsFavorite] = useState(initialData?.isFavorite || false);

    // Sistema de Notas (0 a 10)
    const [rating, setRating] = useState(() => {
        if (initialData?.rating !== undefined && initialData?.rating !== null) {
            return normalizeScore(initialData.rating);
        }
        return 8.0;
    });

    // Datas e Memórias Nostálgicas
    const [acquiredDate, setAcquiredDate] = useState(initialData?.acquiredDate || '');
    const [acquiredSource, setAcquiredSource] = useState(initialData?.acquiredSource || '');
    const [playedPeriod, setPlayedPeriod] = useState(initialData?.playedPeriod || '');
    const [finishDate, setFinishDate] = useState(initialData?.finishDate || '');
    const [hoursPlayed, setHoursPlayed] = useState(initialData?.hoursPlayed || '');
    const [mediaType, setMediaType] = useState(initialData?.mediaType || '');
    const [difficulty, setDifficulty] = useState(initialData?.difficulty || 'Normal');
    const [personalNotes, setPersonalNotes] = useState(initialData?.personalNotes || '');

    const [activeTab, setActiveTab] = useState('geral'); // 'geral', 'notas', 'datas', 'memorias'
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            alert('Por favor, informe o nome do jogo.');
            return;
        }

        onSave({
            id: initialData?.id || Date.now(),
            name: name.trim(),
            console: consoleType,
            genre: genre.trim(),
            completionLevel,
            rating: Number(rating),
            imageUrl: imageUrl.trim(),
            isFavorite,
            acquiredDate: acquiredDate.trim(),
            acquiredSource: acquiredSource.trim(),
            playedPeriod: playedPeriod.trim(),
            finishDate: finishDate.trim(),
            hoursPlayed: hoursPlayed ? Number(hoursPlayed) || hoursPlayed : '',
            mediaType: mediaType.trim(),
            difficulty,
            personalNotes: personalNotes.trim(),
            achievements: initialData?.achievements || []
        });
    };

    const currentScoreTier = getScoreTier(rating);

    return (
        <form onSubmit={handleSubmit} className="text-white space-y-6">
            {/* Header do Modal */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                        <Sparkles className="text-cyan-400 w-6 h-6" />
                        {initialData ? 'Editar Jogo' : 'Adicionar Novo Jogo'}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Preencha a nota, quando você jogava, quando ganhou e suas lembranças.
                    </p>
                </div>

                {/* Botão de Favorito Rápido */}
                <button
                    type="button"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md ${
                        isFavorite
                            ? 'bg-red-500 text-white border border-red-400 scale-105'
                            : 'bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-700'
                    }`}
                >
                    <Heart size={14} className={isFavorite ? 'fill-current' : ''} />
                    <span>{isFavorite ? 'Favorito do Coração' : 'Favoritar'}</span>
                </button>
            </div>

            {/* Abas de Navegação no Formulário */}
            <div className="flex border-b border-slate-700/80 gap-1 overflow-x-auto pb-1">
                <button
                    type="button"
                    onClick={() => setActiveTab('geral')}
                    className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors whitespace-nowrap ${
                        activeTab === 'geral' ? 'bg-slate-700 text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'
                    }`}
                >
                    1. Informações Básicas
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('notas')}
                    className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors whitespace-nowrap ${
                        activeTab === 'notas' ? 'bg-slate-700 text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'
                    }`}
                >
                    2. Nota & Status
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('datas')}
                    className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors whitespace-nowrap ${
                        activeTab === 'datas' ? 'bg-slate-700 text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'
                    }`}
                >
                    3. Quando Ganhei & Jogava
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('memorias')}
                    className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors whitespace-nowrap ${
                        activeTab === 'memorias' ? 'bg-slate-700 text-white border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'
                    }`}
                >
                    4. Memórias & Anotações
                </button>
            </div>

            {/* --- ABA 1: Informações Básicas --- */}
            {activeTab === 'geral' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Nome do Jogo *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: Grand Theft Auto: San Andreas"
                            className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Console / Plataforma</label>
                            <select
                                value={consoleType}
                                onChange={(e) => setConsoleType(e.target.value)}
                                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                {Object.entries(consoleThemes)
                                    .filter(([key]) => key !== 'all')
                                    .map(([key, { name }]) => (
                                        <option key={key} value={key}>{name}</option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Gênero</label>
                            <input
                                list="genres-list"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                placeholder="Selecione ou digite o gênero"
                                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                            <datalist id="genres-list">
                                {genresList.map(g => <option key={g} value={g} />)}
                            </datalist>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Capa do Jogo (URL ou Arquivo)</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://exemplo.com/capa.jpg"
                                className="flex-1 p-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                            />
                            <label className="px-3 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg cursor-pointer flex items-center gap-1.5 text-xs font-bold transition-colors">
                                <Upload size={14} /> Upload
                                <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
                            </label>
                        </div>
                        {isUploading && <p className="text-xs text-cyan-400 mt-1">Carregando imagem...</p>}
                    </div>

                    {/* Preview da Capa */}
                    {imageUrl && (
                        <div className="flex items-center gap-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                            <img
                                src={imageUrl}
                                alt="Pré-visualização"
                                className="w-16 h-20 object-cover rounded-lg border border-slate-700"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <div className="text-xs text-slate-400">
                                <span className="font-semibold text-slate-200 block">Prévia da Capa</span>
                                A imagem será ajustada automaticamente nos cards e no Hall da Fama.
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* --- ABA 2: Nota & Status --- */}
            {activeTab === 'notas' && (
                <div className="space-y-5">
                    {/* Nota de 0 a 10 */}
                    <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                            <label className="font-bold text-sm text-white flex items-center gap-1.5">
                                <Star className="text-yellow-400 w-4 h-4 fill-yellow-400" />
                                Nota Pessoal (0.0 a 10.0)
                            </label>

                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-black text-amber-400">{Number(rating).toFixed(1)}</span>
                                <span className="text-xs text-slate-400 font-semibold">/ 10</span>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase ${currentScoreTier.bg}`}>
                                    {currentScoreTier.tier}
                                </span>
                            </div>
                        </div>

                        {/* Slider de Nota */}
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={rating}
                            onChange={(e) => setRating(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
                        />

                        {/* Estrelas Visuais Sincronizadas */}
                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <StarRating rating={rating} onChange={(newRate) => setRating(newRate)} size={24} />
                            </div>
                            <span className="text-xs text-slate-400 italic">
                                {currentScoreTier.title}
                            </span>
                        </div>

                        {/* Atalhos Rápidos de Notas */}
                        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                            <span className="text-slate-400 text-[11px] font-semibold mr-1">Rápido:</span>
                            {[10, 9.5, 9.0, 8.5, 8.0, 7.5, 7.0, 6.0, 5.0].map((val) => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setRating(val)}
                                    className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                                        Math.abs(rating - val) < 0.1
                                            ? 'bg-amber-400 text-slate-950 scale-105'
                                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                    }`}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Nível de Conclusão */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Nível de Conclusão</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {Object.entries(completionLevels).map(([key, { label, icon, bgBadge }]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setCompletionLevel(key)}
                                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                                        completionLevel === key
                                            ? 'border-cyan-400 bg-cyan-950/40 ring-2 ring-cyan-500/50'
                                            : 'border-slate-700 bg-slate-900/60 hover:bg-slate-800'
                                    }`}
                                >
                                    <div className="mb-2">{icon}</div>
                                    <span className="font-bold text-xs text-white">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mídia e Dificuldade */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Mídia / Formato</label>
                            <input
                                list="media-types"
                                value={mediaType}
                                onChange={(e) => setMediaType(e.target.value)}
                                placeholder="Ex: DVD Prensado, Digital..."
                                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                            <datalist id="media-types">
                                {mediaTypesList.map(m => <option key={m} value={m} />)}
                            </datalist>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Dificuldade Jogada</label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="Fácil">Fácil</option>
                                <option value="Normal">Normal</option>
                                <option value="Difícil">Difícil</option>
                                <option value="Muito Difícil / Extremo">Muito Difícil / Extremo</option>
                                <option value="Soulslike">Soulslike / Hardcore</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* --- ABA 3: Quando Ganhei & Jogava (Datas e Nostalgia) --- */}
            {activeTab === 'datas' && (
                <div className="space-y-4">
                    <div className="p-3 bg-cyan-950/30 rounded-xl border border-cyan-500/30 text-xs text-cyan-200">
                        <strong className="block font-bold mb-1">Registro de Épocas & Datas:</strong>
                        Você pode digitar datas flexíveis como "Natal de 2008", "Férias de 2012" ou anos como "2007". Isso ajuda a montar a sua Linha do Tempo Gamer!
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1 flex items-center gap-1.5">
                                <Gift size={15} className="text-amber-400" />
                                Quando ganhei / adquiri:
                            </label>
                            <input
                                type="text"
                                value={acquiredDate}
                                onChange={(e) => setAcquiredDate(e.target.value)}
                                placeholder="Ex: Natal de 2008, 15/04/2012, Ano 2006..."
                                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1 flex items-center gap-1.5">
                                <Clock size={15} className="text-cyan-400" />
                                Época em que mais jogava:
                            </label>
                            <input
                                type="text"
                                value={playedPeriod}
                                onChange={(e) => setPlayedPeriod(e.target.value)}
                                placeholder="Ex: 2008 a 2011, Férias de Julho..."
                                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Como consegui / Origem do jogo:</label>
                        <input
                            list="sources-list"
                            value={acquiredSource}
                            onChange={(e) => setAcquiredSource(e.target.value)}
                            placeholder="Ex: Presente dos meus pais, comprei na feira por R$ 5..."
                            className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                        />
                        <datalist id="sources-list">
                            {acquiredSourcesList.map(s => <option key={s} value={s} />)}
                        </datalist>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1 flex items-center gap-1.5">
                                <Calendar size={15} className="text-emerald-400" />
                                Quando zerei (opcional):
                            </label>
                            <input
                                type="text"
                                value={finishDate}
                                onChange={(e) => setFinishDate(e.target.value)}
                                placeholder="Ex: Janeiro de 2009, 2014..."
                                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1 flex items-center gap-1.5">
                                <Clock size={15} className="text-blue-400" />
                                Horas aproximadas jogadas:
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={hoursPlayed}
                                onChange={(e) => setHoursPlayed(e.target.value)}
                                placeholder="Ex: 120"
                                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* --- ABA 4: Memórias & Anotações --- */}
            {activeTab === 'memorias' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Minhas Lembranças & Histórias com o Jogo:
                        </label>
                        <textarea
                            value={personalNotes}
                            onChange={(e) => setPersonalNotes(e.target.value)}
                            rows={6}
                            placeholder="Conte suas histórias nostálgicas: amigos com quem jogava, noites em claro, macetes e senhas anotados na folha de caderno, o que sentiu quando jogou pela primeira vez..."
                            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm text-slate-200"
                        />
                    </div>
                </div>
            )}

            {/* Rodapé com Botões de Ação */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <div className="flex gap-2">
                    {activeTab !== 'geral' && (
                        <button
                            type="button"
                            onClick={() => {
                                const tabs = ['geral', 'notas', 'datas', 'memorias'];
                                const currentIndex = tabs.indexOf(activeTab);
                                if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
                        >
                            &larr; Aba Anterior
                        </button>
                    )}
                    {activeTab !== 'memorias' && (
                        <button
                            type="button"
                            onClick={() => {
                                const tabs = ['geral', 'notas', 'datas', 'memorias'];
                                const currentIndex = tabs.indexOf(activeTab);
                                if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-semibold"
                        >
                            Próxima Aba &rarr;
                        </button>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
                    >
                        Salvar Jogo
                    </button>
                </div>
            </div>
        </form>
    );
};
