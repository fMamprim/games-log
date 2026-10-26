import fs from 'fs';

const raw = fs.readFileSync('gamers_log_backup (17).json', 'utf8');
const games = JSON.parse(raw);

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function escapeJson(obj) {
  if (!obj || (Array.isArray(obj) && obj.length === 0)) return "'[]'::jsonb";
  const jsonStr = JSON.stringify(obj).replace(/'/g, "''");
  return "'" + jsonStr + "'::jsonb";
}

let sql = `-- ========================================================\n`;
sql += `-- Games Log - Script SQL de Migração para PostgreSQL (Neon / Vercel)\n`;
sql += `-- Gerado automaticamente para 214 jogos de: gamers_log_backup (17).json\n`;
sql += `-- ========================================================\n\n`;

sql += `CREATE TABLE IF NOT EXISTS games (\n`;
sql += `  id VARCHAR(255) PRIMARY KEY,\n`;
sql += `  name VARCHAR(255) NOT NULL,\n`;
sql += `  console VARCHAR(100),\n`;
sql += `  genre VARCHAR(100) DEFAULT '',\n`;
sql += `  completion_level VARCHAR(50) DEFAULT 'jogado',\n`;
sql += `  rating NUMERIC(4, 1) DEFAULT 0,\n`;
sql += `  image_url TEXT DEFAULT '',\n`;
sql += `  is_favorite BOOLEAN DEFAULT FALSE,\n`;
sql += `  acquired_date TEXT DEFAULT '',\n`;
sql += `  acquired_source TEXT DEFAULT '',\n`;
sql += `  played_period TEXT DEFAULT '',\n`;
sql += `  finish_date TEXT DEFAULT '',\n`;
sql += `  hours_played TEXT DEFAULT '',\n`;
sql += `  media_type TEXT DEFAULT '',\n`;
sql += `  difficulty VARCHAR(100) DEFAULT 'Normal',\n`;
sql += `  personal_notes TEXT DEFAULT '',\n`;
sql += `  achievements JSONB DEFAULT '[]'::jsonb,\n`;
sql += `  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n`;
sql += `);\n\n`;

// Vamos dividir em lotes de 50 para garantir execução suave em qualquer cliente SQL (Vercel SQL Console, DBeaver, psql, etc.)
const BATCH_SIZE = 50;

for (let i = 0; i < games.length; i += BATCH_SIZE) {
  const batch = games.slice(i, i + BATCH_SIZE);

  sql += `-- Lote ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} jogos)\n`;
  sql += `INSERT INTO games (\n`;
  sql += `  id, name, console, genre, completion_level, rating, image_url,\n`;
  sql += `  is_favorite, acquired_date, acquired_source, played_period,\n`;
  sql += `  finish_date, hours_played, media_type, difficulty, personal_notes,\n`;
  sql += `  achievements, updated_at\n`;
  sql += `) VALUES\n`;

  const rows = batch.map((g) => {
    const id = escapeSql(String(g.id));
    const name = escapeSql(g.name || 'Sem Nome');
    const consoleName = escapeSql(g.console || 'pc');
    const genre = escapeSql(g.genre || '');
    const completionLevel = escapeSql(g.completionLevel || 'jogado');

    // Converte a nota antiga de 0 a 5 para a escala de 0 a 10 (ex: 5 -> 10.0, 4.5 -> 9.0)
    let rawRating = Number(g.rating) || 0;
    let finalRating = (rawRating > 0 && rawRating <= 5) ? (rawRating * 2) : rawRating;
    finalRating = Math.min(10, Math.max(0, finalRating));

    const imageUrl = escapeSql(g.imageUrl || '');
    const isFavorite = g.isFavorite ? 'TRUE' : 'FALSE';
    const acquiredDate = escapeSql(g.acquiredDate || '');
    const acquiredSource = escapeSql(g.acquiredSource || '');
    const playedPeriod = escapeSql(g.playedPeriod || '');
    const finishDate = escapeSql(g.finishDate || '');
    const hoursPlayed = escapeSql(g.hoursPlayed || '');
    const mediaType = escapeSql(g.mediaType || '');
    const difficulty = escapeSql(g.difficulty || 'Normal');
    const personalNotes = escapeSql(g.personalNotes || '');
    const achievements = escapeJson(g.achievements || []);

    return `  (${id}, ${name}, ${consoleName}, ${genre}, ${completionLevel}, ${finalRating.toFixed(1)}, ${imageUrl}, ${isFavorite}, ${acquiredDate}, ${acquiredSource}, ${playedPeriod}, ${finishDate}, ${hoursPlayed}, ${mediaType}, ${difficulty}, ${personalNotes}, ${achievements}, NOW())`;
  });

  sql += rows.join(',\n') + '\n';
  sql += `ON CONFLICT (id) DO UPDATE SET\n`;
  sql += `  name = EXCLUDED.name,\n`;
  sql += `  console = EXCLUDED.console,\n`;
  sql += `  genre = EXCLUDED.genre,\n`;
  sql += `  completion_level = EXCLUDED.completion_level,\n`;
  sql += `  rating = EXCLUDED.rating,\n`;
  sql += `  image_url = EXCLUDED.image_url,\n`;
  sql += `  is_favorite = EXCLUDED.is_favorite,\n`;
  sql += `  acquired_date = EXCLUDED.acquired_date,\n`;
  sql += `  acquired_source = EXCLUDED.acquired_source,\n`;
  sql += `  played_period = EXCLUDED.played_period,\n`;
  sql += `  finish_date = EXCLUDED.finish_date,\n`;
  sql += `  hours_played = EXCLUDED.hours_played,\n`;
  sql += `  media_type = EXCLUDED.media_type,\n`;
  sql += `  difficulty = EXCLUDED.difficulty,\n`;
  sql += `  personal_notes = EXCLUDED.personal_notes,\n`;
  sql += `  achievements = EXCLUDED.achievements,\n`;
  sql += `  updated_at = NOW();\n\n`;
}

fs.writeFileSync('import_games.sql', sql, 'utf8');
console.log('Sucesso! Arquivo import_games.sql gerado com ' + games.length + ' jogos.');
