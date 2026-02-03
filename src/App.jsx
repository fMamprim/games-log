import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Edit, Trash2, Crown, ShieldAlert, Trophy, Star, Gamepad2, X, Download, Upload } from 'lucide-react';

// --- Componentes de Ícones SVG ---
const MasterSaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.071l9 9a.75.75 0 001.071-1.071l-9-9zM11.204 2.286a.75.75 0 00-1.071-1.071l-9 9A.75.75 0 002.204 11.28l9-9z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12.002 6.365a.75.75 0 01.53 1.28l-4.488 4.488a.75.75 0 01-1.06-1.06l4.488-4.488a.75.75 0 01.53-.22z" clipRule="evenodd" />
        <path d="M11.34 15.34a.75.75 0 10-1.06 1.06l2.12 2.12a.75.75 0 101.06-1.06l-2.12-2.12zM14.47 12.21a.75.75 0 10-1.06 1.06l2.12 2.12a.75.75 0 101.06-1.06l-2.12-2.12zM12.24 17.47a.75.75 0 10-1.06 1.06l2.12 2.12a.75.75 0 101.06-1.06l-2.12-2.12zM15.53 14.34a.75.75 0 10-1.06 1.06l2.12 2.12a.75.75 0 101.06-1.06l-2.12-2.12zM13.3 19.6a.75.75 0 10-1.06 1.06l2.12 2.12a.75.75 0 101.06-1.06l-2.12-2.12z" />
    </svg>
);

const StarIcon = ({ fillPercentage, size = 24, className = "" }) => {
    return (
        <div style={{ position: 'relative', width: size, height: size, display: 'inline-block' }} className={className}>
            {/* Base (Empty) Star */}
            <Star size={size} className="text-gray-600" />

            {/* Filled Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${fillPercentage}%`,
                overflow: 'hidden',
                pointerEvents: 'none'
            }}>
                <Star size={size} className="text-yellow-400 fill-yellow-400" />
            </div>
        </div>
    );
};

const StarRating = ({ rating, onChange, readOnly = false, size = 24 }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseMove = (e, index) => {
        if (readOnly) return;
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - left) / width;
        const isHalf = percent < 0.5;
        setHoverRating(index + (isHalf ? 0.5 : 1));
    };

    const handleMouseLeave = () => {
        if (readOnly) return;
        setHoverRating(0);
    };

    const handleClick = () => {
        if (readOnly) return;
        onChange(hoverRating);
    };

    return (
        <div className="flex" onMouseLeave={handleMouseLeave}>
            {[0, 1, 2, 3, 4].map((index) => {
                const currentVal = hoverRating || rating;
                let fill = 0;
                if (currentVal >= index + 1) {
                    fill = 100;
                } else if (currentVal >= index + 0.5) {
                    fill = 50;
                }

                return (
                    <div
                        key={index}
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onClick={handleClick}
                        className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} transition-transform hover:scale-110`}
                    >
                        <StarIcon fillPercentage={fill} size={size} />
                    </div>
                );
            })}
        </div>
    );
};

// --- Temas e Estilos ---
const consoleThemes = {
    all: { name: 'Todos', bg: 'bg-gray-800', text: 'text-white', accent: 'border-gray-400', header: 'bg-gray-900' },
    ps1: { name: 'PlayStation 1', bg: 'bg-gray-200', text: 'text-gray-800', accent: 'border-red-500', header: 'bg-gray-300' },
    ps2: { name: 'PlayStation 2', bg: 'bg-blue-900', text: 'text-white', accent: 'border-blue-400', header: 'bg-black' },
    ps3: { name: 'PlayStation 3', bg: 'bg-gray-900', text: 'text-white', accent: 'border-gray-500', header: 'bg-black' },
    ps4: { name: 'PlayStation 4', bg: 'bg-blue-800', text: 'text-white', accent: 'border-white', header: 'bg-blue-900' },
    xbox360: { name: 'Xbox 360', bg: 'bg-green-800', text: 'text-white', accent: 'border-lime-400', header: 'bg-green-900' },
    pc: { name: 'PC', bg: 'bg-slate-900', text: 'text-cyan-300', accent: 'border-cyan-400', header: 'bg-slate-800' },
    android: { name: 'Android', bg: 'bg-lime-200', text: 'text-green-900', accent: 'border-green-500', header: 'bg-lime-300' },
    java: { name: 'Celular (Java)', bg: 'bg-orange-700', text: 'text-white', accent: 'border-blue-400', header: 'bg-orange-800' },
    flash: { name: 'Flash', bg: 'bg-red-700', text: 'text-yellow-200', accent: 'border-yellow-400', header: 'bg-red-800' },
};

const completionLevels = {
    jogado: { label: 'Jogado', color: 'blue-500', icon: <Gamepad2 className="w-5 h-5 text-white" /> },
    zerado: { label: 'Zerado', color: 'green-500', icon: <Trophy className="w-5 h-5 text-white" /> },
    '100%': { label: '100% Completo', color: 'yellow-500', icon: <Crown className="w-5 h-5 text-white" /> },
    mastersave: { label: 'MasterSave', color: 'red-500', icon: <MasterSaveIcon /> },
};

const achievementIcons = {
    trophy: <Trophy className="w-5 h-5 text-yellow-400" />,
    star: <Star className="w-5 h-5 text-blue-400" />,
    shield: <ShieldAlert className="w-5 h-5 text-red-400" />,
    gamepad: <Gamepad2 className="w-5 h-5 text-green-400" />,
};

// --- Componente Modal Genérico ---
const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-full overflow-y-auto relative">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
                <X size={24} />
            </button>
            <div className="p-6">{children}</div>
        </div>
    </div>
);

// --- Formulário para Jogo ---
const GameForm = ({ onSave, onCancel, initialData = null, preselectedConsole = 'pc' }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [consoleType, setConsoleType] = useState(initialData?.console || preselectedConsole);
    const [completionLevel, setCompletionLevel] = useState(initialData?.completionLevel || 'jogado');
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
    const [rating, setRating] = useState(initialData?.rating || 0);
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
        if (!name) {
            alert("O nome do jogo é obrigatório.");
            return;
        }
        onSave({
            id: initialData?.id || Date.now(), // Gera um ID simples se for um novo jogo
            name,
            console: consoleType,
            completionLevel,
            imageUrl,
            rating,
            achievements: initialData?.achievements || [],
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <h2 className="text-2xl font-bold mb-4">{initialData ? 'Editar Jogo' : 'Adicionar Novo Jogo'}</h2>
            <div>
                <label className="block mb-1 font-semibold">Nome do Jogo</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Console</label>
                <select value={consoleType} onChange={(e) => setConsoleType(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600">
                    {Object.entries(consoleThemes).filter(([key]) => key !== 'all').map(([key, { name }]) => (
                        <option key={key} value={key}>{name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block mb-1 font-semibold">Nível de Conclusão</label>
                <select value={completionLevel} onChange={(e) => setCompletionLevel(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600">
                    {Object.entries(completionLevels).map(([key, { label }]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block mb-1 font-semibold">Avaliação</label>
                <div className="bg-gray-700 p-2 rounded border border-gray-600 flex justify-center">
                    <StarRating rating={rating} onChange={setRating} size={32} />
                </div>
            </div>
            <div>
                <label className="block mb-1 font-semibold">URL da Imagem</label>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="http://... ou cole aqui após o upload" className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Ou faça upload da imagem</label>
                <input type="file" onChange={handleFileChange} accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
                {isUploading && <p className="text-sm text-blue-400 mt-2">Processando imagem...</p>}
            </div>
            <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 font-semibold">Salvar</button>
            </div>
        </form>
    );
};

// --- Formulário para Conquista ---
const AchievementForm = ({ onSave, onCancel, initialData = null }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [icon, setIcon] = useState(initialData?.icon || 'trophy');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            alert("O título da conquista é obrigatório.");
            return;
        }
        onSave({
            id: initialData?.id || Date.now().toString(),
            title,
            description,
            icon,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <h2 className="text-2xl font-bold mb-4">{initialData ? 'Editar Conquista' : 'Nova Conquista'}</h2>
            <div>
                <label className="block mb-1 font-semibold">Título</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
            </div>
            <div>
                <label className="block mb-1 font-semibold">Descrição</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600" rows="3"></textarea>
            </div>
            <div>
                <label className="block mb-1 font-semibold">Ícone</label>
                <select value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600">
                    {Object.keys(achievementIcons).map(iconKey => (
                        <option key={iconKey} value={iconKey}>{iconKey.charAt(0).toUpperCase() + iconKey.slice(1)}</option>
                    ))}
                </select>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500">Cancelar</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 font-semibold">Salvar</button>
            </div>
        </form>
    );
};

// --- Card do Jogo ---
const GameCard = ({ game, onSelect }) => {
    const levelStyle = completionLevels[game.completionLevel];
    let cardClasses = `relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2`;

    if (game.completionLevel === '100%') {
        cardClasses += ' border-yellow-400 animate-glow';
    } else if (game.completionLevel === 'mastersave') {
        cardClasses += ' border-red-500 animate-fire';
    } else {
        cardClasses += ` border-${levelStyle.color}`;
    }

    return (
        <div className={cardClasses} onClick={() => onSelect(game)}>
            <div className="absolute top-2 right-2 z-10 p-2 bg-black bg-opacity-50 rounded-full" title={levelStyle.label}>
                {levelStyle.icon}
            </div>
            <img src={game.imageUrl || `https://placehold.co/600x400/2D3748/E2E8F0?text=${encodeURIComponent(game.name)}`} alt={game.name} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/2D3748/E2E8F0?text=${encodeURIComponent(game.name)}`; }} />
            <div className="p-4">
                <h3 className="font-bold text-lg truncate text-white">{game.name}</h3>
                <div className="flex justify-between items-center">
                    <p className={`text-sm font-semibold text-${consoleThemes[game.console]?.text || 'gray-300'}`}>{consoleThemes[game.console]?.name}</p>
                    {game.rating > 0 && <StarRating rating={game.rating} readOnly size={16} />}
                </div>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-bold text-lg">Ver Detalhes</span>
            </div>
        </div>
    );
};

// --- Detalhes do Jogo ---
const GameDetails = ({ game, onBack, onEditGame, onDeleteGame, onUpdateGame }) => {
    const [modalContent, setModalContent] = useState(null);

    const handleAddAchievement = () => {
        setModalContent(
            <AchievementForm
                onSave={handleSaveAchievement}
                onCancel={() => setModalContent(null)}
            />
        );
    };

    const handleEditAchievement = (ach) => {
        setModalContent(
            <AchievementForm
                initialData={ach}
                onSave={(updatedAch) => handleSaveAchievement(updatedAch, true)}
                onCancel={() => setModalContent(null)}
            />
        );
    };

    const handleSaveAchievement = (newAchievement, isEdit = false) => {
        let updatedAchievements;
        if (isEdit) {
            updatedAchievements = game.achievements.map(ach => ach.id === newAchievement.id ? newAchievement : ach);
        } else {
            updatedAchievements = [...(game.achievements || []), newAchievement];
        }
        onUpdateGame({ ...game, achievements: updatedAchievements });
        setModalContent(null);
    };

    const handleDeleteAchievement = (achievementId) => {
        const updatedAchievements = game.achievements.filter(ach => ach.id !== achievementId);
        onUpdateGame({ ...game, achievements: updatedAchievements });
    };

    const levelStyle = completionLevels[game.completionLevel];
    const theme = consoleThemes[game.console];

    let imageWrapperClasses = 'relative rounded-lg shadow-lg transition-all duration-300';
    switch (game.completionLevel) {
        case 'mastersave':
            imageWrapperClasses += ' p-1 border-2 border-red-500 animate-fire';
            break;
        case '100%':
            imageWrapperClasses += ' p-1 border-2 border-yellow-400 animate-glow';
            break;
        case 'zerado':
            imageWrapperClasses += ' border-2 border-green-500';
            break;
        case 'jogado':
            imageWrapperClasses += ' border-2 border-blue-500';
            break;
        default:
            imageWrapperClasses += ' border-2 border-transparent';
            break;
    }

    return (
        <div className={`p-4 md:p-8 rounded-lg ${theme.bg} ${theme.text}`}>
            {modalContent && <Modal onClose={() => setModalContent(null)}>{modalContent}</Modal>}
            <button onClick={onBack} className="mb-6 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white">&larr; Voltar para a lista</button>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                    <div className={imageWrapperClasses}>
                        <img src={game.imageUrl || `https://placehold.co/600x800/2D3748/E2E8F0?text=${encodeURIComponent(game.name)}`} alt={game.name} className="w-full rounded-lg" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x800/2D3748/E2E8F0?text=${encodeURIComponent(game.name)}`; }} />
                    </div>
                </div>
                <div className="md:w-2/3">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-bold">{game.name}</h1>
                            <p className="text-xl opacity-80">{theme.name}</p>
                        </div>
                        <div className={`flex items-center gap-2 p-2 rounded-lg bg-${levelStyle.color}`}>
                            {levelStyle.icon}
                            <span className="font-bold text-white">{levelStyle.label}</span>
                        </div>
                    </div>

                    <div className="mt-2 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-300">Avaliação:</span>
                            <StarRating rating={game.rating || 0} readOnly size={24} />
                            <span className="text-sm text-gray-400">({game.rating || 0}/5)</span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button onClick={() => onEditGame(game)} className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white"><Edit size={16} /> Editar Jogo</button>
                        <button onClick={() => onDeleteGame(game.id)} className="flex items-center gap-2 px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white"><Trash2 size={16} /> Apagar Jogo</button>
                    </div>

                    <div className="mt-10">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Conquistas</h2>
                            <button onClick={handleAddAchievement} className="flex items-center gap-2 px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white"><Plus size={16} /> Adicionar</button>
                        </div>
                        <div className="space-y-4">
                            {(game.achievements || []).length > 0 ? (
                                game.achievements.map(ach => (
                                    <div key={ach.id} className="bg-black bg-opacity-20 p-4 rounded-lg flex items-start gap-4">
                                        <div className="flex-shrink-0">{achievementIcons[ach.icon]}</div>
                                        <div className="flex-grow">
                                            <h4 className="font-bold">{ach.title}</h4>
                                            <p className="text-sm opacity-80">{ach.description}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEditAchievement(ach)} className="text-gray-400 hover:text-white"><Edit size={16} /></button>
                                            <button onClick={() => handleDeleteAchievement(ach.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="opacity-70">Nenhuma conquista adicionada ainda.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Componente Principal da Aplicação ---
export default function App() {
    // CORREÇÃO: Inicializa o estado diretamente do localStorage de forma segura.
    const [games, setGames] = useState(() => {
        try {
            const savedGames = localStorage.getItem('gamers-log-data');
            return savedGames ? JSON.parse(savedGames) : [];
        } catch (error) {
            console.error("Erro ao carregar dados do localStorage na inicialização:", error);
            return [];
        }
    });

    const [filterConsole, setFilterConsole] = useState('all');
    const [completionFilter, setCompletionFilter] = useState('all');
    const [sortOption, setSortOption] = useState('status'); // 'status', 'name', 'rating'
    const [selectedGame, setSelectedGame] = useState(null);
    const [modalContent, setModalContent] = useState(null);

    // Salva os jogos no localStorage sempre que a lista for alterada
    useEffect(() => {
        try {
            localStorage.setItem('gamers-log-data', JSON.stringify(games));
        } catch (error) {
            console.error("Erro ao salvar dados no localStorage:", error);
        }
    }, [games]);

    const handleSaveGame = (gameData) => {
        if (gameData.id && games.some(g => g.id === gameData.id)) {
            // Editar jogo existente
            const updatedGames = games.map(g => g.id === gameData.id ? gameData : g);
            setGames(updatedGames);
            if (selectedGame && selectedGame.id === gameData.id) {
                setSelectedGame(gameData);
            }
        } else {
            // Adicionar novo jogo
            setGames(prevGames => [...prevGames, gameData]);
        }
        setModalContent(null);
    };

    const handleDeleteGame = (gameId) => {
        setGames(prevGames => prevGames.filter(g => g.id !== gameId));
        setSelectedGame(null); // Volta para a lista após a exclusão
    };

    const handleUpdateGame = (updatedGame) => {
        const updatedGames = games.map(g => g.id === updatedGame.id ? updatedGame : g);
        setGames(updatedGames);
        setSelectedGame(updatedGame);
    };

    const handleExport = () => {
        if (games.length === 0) {
            alert("Nenhum jogo para exportar.");
            return;
        }
        const jsonString = JSON.stringify(games, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'gamers_log_backup.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedGames = JSON.parse(e.target.result);
                if (!Array.isArray(importedGames)) {
                    throw new Error("O arquivo JSON não é uma lista válida de jogos.");
                }

                if (window.confirm("Atenção: Isso substituirá TODA a sua lista de jogos atual. Deseja continuar?")) {
                    setGames(importedGames);
                    alert("Jogos importados com sucesso!");
                }
            } catch (error) {
                console.error("Erro ao importar JSON:", error);
                alert("Falha ao importar o arquivo. Verifique se o formato do JSON é válido.");
            } finally {
                event.target.value = null; // Reseta o input de arquivo
            }
        };
        reader.readAsText(file);
    };

    const openAddGameModal = () => {
        const consoleToPreselect = filterConsole !== 'all' ? filterConsole : 'pc';
        setModalContent(
            <GameForm
                onSave={handleSaveGame}
                onCancel={() => setModalContent(null)}
                preselectedConsole={consoleToPreselect}
            />
        );
    };

    const openEditGameModal = (game) => {
        setModalContent(<GameForm initialData={game} onSave={handleSaveGame} onCancel={() => setModalContent(null)} />);
    };

    const filteredGames = useMemo(() => {
        let tempGames = [...games]; // Clone array to avoid mutating state during sort

        // 1. Filtro por console
        if (filterConsole !== 'all') {
            tempGames = tempGames.filter(game => game.console === filterConsole);
        }

        // 2. Filtro por nível de conclusão
        if (completionFilter !== 'all') {
            tempGames = tempGames.filter(game => game.completionLevel === completionFilter);
        }

        // 3. Ordenação
        const statusWeights = {
            mastersave: 4,
            '100%': 3,
            zerado: 2,
            jogado: 1
        };

        tempGames.sort((a, b) => {
            if (sortOption === 'status') {
                const weightA = statusWeights[a.completionLevel] || 0;
                const weightB = statusWeights[b.completionLevel] || 0;
                // Se status igual, desempata por nome
                if (weightB !== weightA) return weightB - weightA;
                return a.name.localeCompare(b.name);
            } else if (sortOption === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortOption === 'rating') {
                const ratingA = a.rating || 0;
                const ratingB = b.rating || 0;

                // 1. Nota (Maior para menor)
                if (ratingB !== ratingA) return ratingB - ratingA;

                // 2. Status (Melhor para pior)
                const weightA = statusWeights[a.completionLevel] || 0;
                const weightB = statusWeights[b.completionLevel] || 0;
                if (weightB !== weightA) return weightB - weightA;

                // 3. Nome (A-Z)
                return a.name.localeCompare(b.name);
            }
            return 0;
        });

        return tempGames;
    }, [games, filterConsole, completionFilter, sortOption]);

    const currentTheme = consoleThemes[filterConsole];

    return (
        <>
            <style>{`
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 5px #fef08a, 0 0 10px #fef08a, 0 0 15px #facc15; }
                    50% { box-shadow: 0 0 10px #fef08a, 0 0 20px #facc15, 0 0 30px #eab308; }
                }
                .animate-glow { animation: glow 2s ease-in-out infinite; }

                @keyframes fire-flicker {
                    0% { box-shadow: 0 0 5px #f87171, 0 0 10px #ef4444, 0 0 15px #dc2626, inset 0 0 5px #f87171; }
                    50% { box-shadow: 0 0 8px #ef4444, 0 0 15px #dc2626, 0 0 20px #b91c1c, inset 0 0 8px #ef4444; }
                    100% { box-shadow: 0 0 5px #f87171, 0 0 10px #ef4444, 0 0 15px #dc2626, inset 0 0 5px #f87171; }
                }
                .animate-fire { animation: fire-flicker 1.5s ease-in-out infinite; }
            `}</style>

            <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-500`}>
                {modalContent && <Modal onClose={() => setModalContent(null)}>{modalContent}</Modal>}

                <header className={`p-4 shadow-md ${currentTheme.header} sticky top-0 z-40`}>
                    <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
                        <h1 className="text-2xl font-bold">Games Log</h1>
                        <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            {Object.entries(consoleThemes).map(([key, { name }]) => (
                                <button
                                    key={key}
                                    onClick={() => { setFilterConsole(key); setSelectedGame(null); }}
                                    className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-all ${filterConsole === key ? 'bg-blue-600 text-white font-bold' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                <main className="container mx-auto p-4 md:p-8">
                    {selectedGame ? (
                        <GameDetails
                            game={selectedGame}
                            onBack={() => setSelectedGame(null)}
                            onEditGame={openEditGameModal}
                            onDeleteGame={handleDeleteGame}
                            onUpdateGame={handleUpdateGame}
                        />
                    ) : (
                        <>
                            <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold">Meus Jogos ({filteredGames.length})</h2>
                                <div className="flex gap-2 flex-wrap items-center">
                                    <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2 mr-2">
                                        <span className="text-sm font-semibold mr-2 text-gray-300">Ordenar por:</span>
                                        <select
                                            value={sortOption}
                                            onChange={(e) => setSortOption(e.target.value)}
                                            className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                                        >
                                            <option value="status" className="bg-gray-800">Melhor Status</option>
                                            <option value="name" className="bg-gray-800">Nome (A-Z)</option>
                                            <option value="rating" className="bg-gray-800">Maior Nota</option>
                                        </select>
                                    </div>

                                    <button onClick={handleExport} className="flex items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                                        <Download size={20} /> Exportar
                                    </button>
                                    <label className="flex items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                                        <Upload size={20} /> Importar
                                        <input type="file" className="hidden" accept=".json" onChange={handleImport} />
                                    </label>
                                    <button onClick={openAddGameModal} className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                        <Plus size={20} /> Adicionar Jogo
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 border-b border-gray-700">
                                <span className="font-semibold mr-2 whitespace-nowrap">Filtrar status:</span>
                                <button
                                    onClick={() => { setCompletionFilter('all'); setSelectedGame(null); }}
                                    className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-all ${completionFilter === 'all' ? 'bg-purple-600 text-white font-bold' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                                >
                                    Todos
                                </button>
                                {Object.entries(completionLevels).map(([key, { label, color }]) => (
                                    <button
                                        key={key}
                                        onClick={() => { setCompletionFilter(key); setSelectedGame(null); }}
                                        className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-all ${completionFilter === key ? `bg-${color} text-white font-bold` : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            {filteredGames.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {filteredGames.map(game => (
                                        <GameCard key={game.id} game={game} onSelect={setSelectedGame} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-black bg-opacity-20 rounded-lg">
                                    <h3 className="text-2xl font-bold">Nenhum jogo encontrado!</h3>
                                    <p className="opacity-80 mt-2">Tente ajustar os filtros ou adicione um novo jogo.</p>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </>
    );
}
