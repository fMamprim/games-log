import React from 'react';
import { Trophy, Star, ShieldAlert, Gamepad2, Crown } from 'lucide-react';

export const MasterSaveIcon = ({ className = "w-5 h-5 text-white" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.071l9 9a.75.75 0 001.071-1.071l-9-9zM11.204 2.286a.75.75 0 00-1.071-1.071l-9 9A.75.75 0 002.204 11.28l9-9z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12.002 6.365a.75.75 0 01.53 1.28l-4.488 4.488a.75.75 0 01-1.06-1.06l4.488-4.488a.75.75 0 01.53-.22z" clipRule="evenodd" />
        <path d="M11.34 15.34a.75.75 0 10-1.06 1.06l2.12 2.12a.75.75 0 101.06-1.06l-2.12-2.12zM14.47 12.21a.75.75 0 10-1.06 1.06l2.12 2.12a.75.75 0 101.06-1.06l-2.12-2.12zM12.24 17.47a.75.75 0 10-1.06 1.06l2.12 2.12a.75.75 0 101.06-1.06l-2.12-2.12zM15.53 14.34a.75.75 0 10-1.06 1.06l2.12 2.12a.75.75 0 101.06-1.06l-2.12-2.12zM13.3 19.6a.75.75 0 10-1.06 1.06l2.12 2.12a.75.75 0 101.06-1.06l-2.12-2.12z" />
    </svg>
);

export const consoleThemes = {
    all: {
        id: 'all',
        name: 'Todos os Consoles',
        short: 'Todos',
        bg: 'bg-slate-900',
        text: 'text-white',
        border: 'border-slate-700',
        header: 'bg-slate-950/90',
        badge: 'bg-slate-800 text-slate-200 border-slate-700',
        accentColor: '#38bdf8'
    },
    ps1: {
        id: 'ps1',
        name: 'PlayStation 1',
        short: 'PS1',
        bg: 'bg-slate-900',
        text: 'text-gray-100',
        border: 'border-slate-500',
        header: 'bg-slate-950/90',
        badge: 'bg-slate-700 text-slate-100 border-slate-500',
        accentColor: '#94a3b8'
    },
    ps2: {
        id: 'ps2',
        name: 'PlayStation 2',
        short: 'PS2',
        bg: 'bg-slate-950',
        text: 'text-blue-100',
        border: 'border-blue-600',
        header: 'bg-blue-950/90',
        badge: 'bg-blue-900 text-blue-200 border-blue-500',
        accentColor: '#3b82f6'
    },
    ps3: {
        id: 'ps3',
        name: 'PlayStation 3',
        short: 'PS3',
        bg: 'bg-zinc-950',
        text: 'text-red-100',
        border: 'border-red-600',
        header: 'bg-zinc-950/90',
        badge: 'bg-red-950/80 text-red-200 border-red-700',
        accentColor: '#ef4444'
    },
    ps4: {
        id: 'ps4',
        name: 'PlayStation 4',
        short: 'PS4',
        bg: 'bg-slate-950',
        text: 'text-blue-100',
        border: 'border-blue-500',
        header: 'bg-blue-950/90',
        badge: 'bg-blue-800 text-blue-100 border-blue-400',
        accentColor: '#2563eb'
    },
    ps5: {
        id: 'ps5',
        name: 'PlayStation 5',
        short: 'PS5',
        bg: 'bg-slate-950',
        text: 'text-cyan-100',
        border: 'border-cyan-500',
        header: 'bg-slate-900/90',
        badge: 'bg-cyan-950 text-cyan-200 border-cyan-500',
        accentColor: '#06b6d4'
    },
    xbox360: {
        id: 'xbox360',
        name: 'Xbox 360',
        short: 'Xbox 360',
        bg: 'bg-slate-950',
        text: 'text-lime-100',
        border: 'border-lime-500',
        header: 'bg-emerald-950/90',
        badge: 'bg-lime-950 text-lime-300 border-lime-500',
        accentColor: '#84cc16'
    },
    xboxone: {
        id: 'xboxone',
        name: 'Xbox One / Series',
        short: 'Xbox Series',
        bg: 'bg-zinc-950',
        text: 'text-emerald-100',
        border: 'border-emerald-500',
        header: 'bg-zinc-900/90',
        badge: 'bg-emerald-950 text-emerald-200 border-emerald-600',
        accentColor: '#10b981'
    },
    pc: {
        id: 'pc',
        name: 'PC Master Race',
        short: 'PC',
        bg: 'bg-slate-950',
        text: 'text-cyan-100',
        border: 'border-cyan-400',
        header: 'bg-slate-900/90',
        badge: 'bg-cyan-950 text-cyan-300 border-cyan-500',
        accentColor: '#22d3ee'
    },
    snes: {
        id: 'snes',
        name: 'Super Nintendo (SNES)',
        short: 'SNES',
        bg: 'bg-slate-950',
        text: 'text-purple-100',
        border: 'border-purple-500',
        header: 'bg-purple-950/90',
        badge: 'bg-purple-950 text-purple-200 border-purple-500',
        accentColor: '#c084fc'
    },
    n64: {
        id: 'n64',
        name: 'Nintendo 64',
        short: 'N64',
        bg: 'bg-slate-950',
        text: 'text-amber-100',
        border: 'border-amber-500',
        header: 'bg-amber-950/90',
        badge: 'bg-amber-950 text-amber-200 border-amber-500',
        accentColor: '#f59e0b'
    },
    switch: {
        id: 'switch',
        name: 'Nintendo Switch',
        short: 'Switch',
        bg: 'bg-slate-950',
        text: 'text-red-100',
        border: 'border-red-500',
        header: 'bg-red-950/90',
        badge: 'bg-red-950 text-red-200 border-red-500',
        accentColor: '#ef4444'
    },
    gba: {
        id: 'gba',
        name: 'Game Boy Advance',
        short: 'GBA',
        bg: 'bg-indigo-950',
        text: 'text-indigo-100',
        border: 'border-indigo-500',
        header: 'bg-indigo-950/90',
        badge: 'bg-indigo-900 text-indigo-200 border-indigo-500',
        accentColor: '#818cf8'
    },
    android: {
        id: 'android',
        name: 'Android',
        short: 'Android',
        bg: 'bg-slate-950',
        text: 'text-emerald-100',
        border: 'border-emerald-500',
        header: 'bg-emerald-950/90',
        badge: 'bg-emerald-950 text-emerald-300 border-emerald-500',
        accentColor: '#4ade80'
    },
    java: {
        id: 'java',
        name: 'Celular (Java/J2ME)',
        short: 'Java',
        bg: 'bg-stone-950',
        text: 'text-orange-100',
        border: 'border-orange-500',
        header: 'bg-orange-950/90',
        badge: 'bg-orange-950 text-orange-200 border-orange-500',
        accentColor: '#fb923c'
    },
    flash: {
        id: 'flash',
        name: 'Jogos Flash Web',
        short: 'Flash',
        bg: 'bg-rose-950',
        text: 'text-yellow-100',
        border: 'border-yellow-400',
        header: 'bg-rose-950/90',
        badge: 'bg-rose-950 text-yellow-300 border-yellow-500',
        accentColor: '#facc15'
    },
};

export const completionLevels = {
    jogado: {
        id: 'jogado',
        label: 'Jogado',
        color: 'blue-500',
        borderClass: 'border-blue-500',
        bgBadge: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
        pillBg: 'bg-blue-600',
        icon: <Gamepad2 className="w-4 h-4 text-white" />,
        weight: 1
    },
    zerado: {
        id: 'zerado',
        label: 'Zerado',
        color: 'emerald-500',
        borderClass: 'border-emerald-500',
        bgBadge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        pillBg: 'bg-emerald-600',
        icon: <Trophy className="w-4 h-4 text-white" />,
        weight: 2
    },
    '100%': {
        id: '100%',
        label: '100% Completo',
        color: 'yellow-500',
        borderClass: 'border-yellow-400 animate-glow',
        bgBadge: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50',
        pillBg: 'bg-yellow-500',
        icon: <Crown className="w-4 h-4 text-white" />,
        weight: 3
    },
    mastersave: {
        id: 'mastersave',
        label: 'MasterSave',
        color: 'red-500',
        borderClass: 'border-red-500 animate-fire',
        bgBadge: 'bg-red-500/20 text-red-300 border-red-500/50',
        pillBg: 'bg-red-600',
        icon: <MasterSaveIcon className="w-4 h-4 text-white" />,
        weight: 4
    },
};

export const achievementIcons = {
    trophy: <Trophy className="w-5 h-5 text-yellow-400" />,
    star: <Star className="w-5 h-5 text-blue-400" />,
    shield: <ShieldAlert className="w-5 h-5 text-red-400" />,
    gamepad: <Gamepad2 className="w-5 h-5 text-green-400" />,
};

export const genresList = [
    'Ação',
    'Ação / Aventura',
    'RPG / JRPG',
    'Mundo Aberto',
    'Tiro / FPS',
    'Survival Horror / Terror',
    'Corrida / Customização',
    'Luta / Fighting',
    'Hack and Slash',
    'Plataforma 2D / 3D',
    'Futebol / Esporte',
    'Estratégia / RTS',
    'Simulação',
    'Battle Royale',
    'Puzzle / Raciocínio',
    'Outro'
];

export const mediaTypesList = [
    'DVD / CD Prensado (Feira/Camelô)',
    'Mídia Física Original',
    'Digital (Steam / PS Store / Xbox)',
    'Emulador (PC / Celular)',
    'Cartucho Original',
    'Cartucho Paralelo',
    'ROM / ISO Baixada'
];

export const acquiredSourcesList = [
    'Ganhei de presente de Natal',
    'Ganhei de aniversário',
    'Comprei com minha própria mesada',
    'Comprei na feira / camelô',
    'Peguei emprestado com um amigo',
    'Troquei com um colega de escola',
    'Comprei em promoção / Steam Sale',
    'Veio junto com o console'
];

// Normaliza nota para escala 0.0 a 10.0
export const normalizeScore = (rawRating) => {
    if (rawRating === undefined || rawRating === null || rawRating === '') return 0;
    const num = Number(rawRating);
    if (isNaN(num)) return 0;
    // Se o jogo era da versão antiga onde o máximo era 5 estrelas (ex: 5, 4.5, 4, 3.5),
    // convertemos proporcionalmente para a escala de 10:
    if (num > 0 && num <= 5) {
        return Number((num * 2).toFixed(1));
    }
    return Number(Math.min(10, Math.max(0, num)).toFixed(1));
};

export const getScoreTier = (score) => {
    const num = normalizeScore(score);
    if (num >= 9.6) {
        return {
            tier: 'S+',
            title: 'Obra-Prima Suprema 👑',
            shortDesc: 'Must-play lendário de todos os tempos',
            color: 'text-amber-300',
            border: 'border-amber-400',
            bg: 'bg-gradient-to-r from-amber-500/20 to-yellow-500/30 text-amber-300 border-amber-400/60'
        };
    }
    if (num >= 9.0) {
        return {
            tier: 'S',
            title: 'Excelente / Inesquecível ⭐',
            shortDesc: 'Experiência marcante e memorável',
            color: 'text-emerald-300',
            border: 'border-emerald-500',
            bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
        };
    }
    if (num >= 8.0) {
        return {
            tier: 'A',
            title: 'Muito Bom 🎮',
            shortDesc: 'Jogo de altíssima qualidade',
            color: 'text-blue-300',
            border: 'border-blue-500',
            bg: 'bg-blue-500/20 text-blue-300 border-blue-500/50'
        };
    }
    if (num >= 7.0) {
        return {
            tier: 'B',
            title: 'Bom / Divertido 👍',
            shortDesc: 'Gostoso de jogar',
            color: 'text-cyan-300',
            border: 'border-cyan-500',
            bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
        };
    }
    if (num >= 5.0) {
        return {
            tier: 'C',
            title: 'Mediano / Regular 😐',
            shortDesc: 'Valeu a experiência',
            color: 'text-yellow-300',
            border: 'border-yellow-500',
            bg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
        };
    }
    return {
        tier: 'D',
        title: 'Fraco / Esquecível 👎',
        shortDesc: 'Deixou a desejar',
        color: 'text-gray-400',
        border: 'border-gray-600',
        bg: 'bg-gray-800 text-gray-400 border-gray-700'
    };
};

export const INITIAL_DEMO_GAMES = [
    {
        id: 1,
        name: 'Grand Theft Auto: San Andreas',
        console: 'ps2',
        genre: 'Mundo Aberto',
        completionLevel: 'mastersave',
        rating: 10,
        imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2k3e.webp',
        isFavorite: true,
        acquiredDate: 'Dezembro de 2006',
        acquiredSource: 'Ganhei de presente de Natal dos meus pais junto com o memory card',
        playedPeriod: '2006 a 2010',
        finishDate: 'Janeiro de 2007',
        hoursPlayed: 350,
        mediaType: 'DVD / CD Prensado (Feira/Camelô)',
        difficulty: 'Normal',
        personalNotes: 'O jogo mais marcante da minha infância. Tinha um caderno cheio de códigos anotados a caneta (HESOYAM, ROCKETMAN, etc.). Jogava tardes inteiras com os amigos da rua revezando o controle a cada morte.',
        achievements: [
            { id: '1', title: 'Grove Street King', description: 'Conquistou todos os territórios de Los Santos', icon: 'trophy' },
            { id: '2', title: 'Piloto Lendário', description: 'Tirou ouro em todas as provas da escola de aviação no deserto', icon: 'star' },
            { id: '3', title: '100% Master', description: 'Coletou todas as ferraduras, pichações e fotos', icon: 'shield' }
        ]
    },
    {
        id: 2,
        name: 'Resident Evil 4',
        console: 'ps2',
        genre: 'Survival Horror / Terror',
        completionLevel: '100%',
        rating: 9.9,
        imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2l1b.webp',
        isFavorite: true,
        acquiredDate: 'Fevereiro de 2007',
        acquiredSource: 'Comprei com minha própria mesada na feira por 5 reais',
        playedPeriod: '2007 - 2009',
        finishDate: 'Março de 2007',
        hoursPlayed: 180,
        mediaType: 'DVD / CD Prensado (Feira/Camelô)',
        difficulty: 'Profissional',
        personalNotes: 'Morria de medo da motosserra do Dr. Salvador e dos Regenerators no laboratório escuro. Desbloqueei a Chicago Typewriter e a Handcannon com 5 estrelas em todos os mapas do Mercenaries.',
        achievements: [
            { id: '4', title: 'Mestre do Mercenaries', description: '5 estrelas com todos os personagens em todos os cenários', icon: 'trophy' },
            { id: '5', title: 'Armamento Pesado', description: 'Desbloqueou a Chicago Typewriter infinita', icon: 'star' }
        ]
    },
    {
        id: 3,
        name: 'The Last of Us',
        console: 'ps3',
        genre: 'Ação / Aventura',
        completionLevel: '100%',
        rating: 10,
        imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.webp',
        isFavorite: true,
        acquiredDate: 'Junho de 2013',
        acquiredSource: 'Comprei no lançamento oficial com meu primeiro salário',
        playedPeriod: '2013 - 2014',
        finishDate: 'Julho de 2013',
        hoursPlayed: 90,
        mediaType: 'Mídia Física Original',
        difficulty: 'Sobrevivente',
        personalNotes: 'A narrativa mais emocionante que já joguei. A cena da girafa e o prólogo do jogo me marcaram para sempre. Trilha sonora fantástica de Gustavo Santaolalla.',
        achievements: [
            { id: '6', title: 'Não foi em vão', description: 'Platinou o jogo no modo Sobrevivente+', icon: 'trophy' }
        ]
    },
    {
        id: 4,
        name: 'Need for Speed: Underground 2',
        console: 'pc',
        genre: 'Corrida / Customização',
        completionLevel: 'zerado',
        rating: 9.6,
        imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x9n.webp',
        isFavorite: true,
        acquiredDate: 'Outubro de 2005',
        acquiredSource: 'Peguei emprestado em 2 CDs gravados com meu primo',
        playedPeriod: '2005 - 2008',
        finishDate: 'Dezembro de 2005',
        hoursPlayed: 140,
        mediaType: 'ROM / ISO Baixada',
        difficulty: 'Normal',
        personalNotes: 'Riders on the Storm tocando no rádio enquanto tunava o Nissan Skyline e o Peugeot 206 verde neon rebaixado. Época de ouro.',
        achievements: [
            { id: '7', title: 'Rei de Bayview', description: 'Derrotou Caleb e venceu o circuito mundial URL', icon: 'trophy' }
        ]
    },
    {
        id: 5,
        name: 'God of War II',
        console: 'ps2',
        genre: 'Hack and Slash',
        completionLevel: 'zerado',
        rating: 9.7,
        imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2k9x.webp',
        isFavorite: true,
        acquiredDate: 'Abril de 2007',
        acquiredSource: 'Ganhei de aniversário de 12 anos',
        playedPeriod: '2007 - 2008',
        finishDate: 'Maio de 2007',
        hoursPlayed: 65,
        mediaType: 'DVD / CD Prensado (Feira/Camelô)',
        difficulty: 'Titan',
        personalNotes: 'O ápice gráfico do PlayStation 2. Enfrentar o Colosso de Rodes logo na primeira fase foi a coisa mais grandiosa que já vi.',
        achievements: [
            { id: '8', title: 'Fúria dos Deuses', description: 'Derrotou Zeus no topo do templo dos destinos', icon: 'trophy' }
        ]
    },
    {
        id: 6,
        name: 'Super Mario World',
        console: 'snes',
        genre: 'Plataforma 2D / 3D',
        completionLevel: '100%',
        rating: 9.8,
        imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co652x.webp',
        isFavorite: false,
        acquiredDate: 'Ano 2002',
        acquiredSource: 'Veio junto com o console usado que ganhamos do tio',
        playedPeriod: '2002 - 2006',
        finishDate: '2004',
        hoursPlayed: 120,
        mediaType: 'Cartucho Original',
        difficulty: 'Normal',
        personalNotes: 'Descobrir o Special World e completar todas as 96 saídas sem auxílio de revista ou internet é um troféu pessoal da infância.',
        achievements: [
            { id: '9', title: '96 Saídas Estrelares', description: 'Conquistou as 96 saídas e completou o Mundo Especial', icon: 'trophy' }
        ]
    }
];
