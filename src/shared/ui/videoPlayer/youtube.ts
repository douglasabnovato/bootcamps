const PADRAO_YOUTUBE = /(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/;

/** Devolve o id de 11 caracteres de um link do YouTube (embed, watch, shorts ou youtu.be), ou null. */
export const idDoYoutube = (url: string): string | null => PADRAO_YOUTUBE.exec(url)?.[1] ?? null;
