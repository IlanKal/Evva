export const MUSIC_STYLES = [
    "Pop",
    "Rock",
    "House",
    "Techno",
    "Hip-hop",
    "Jazz",
    "Classical",
    "Israeli",
    "EDM",
    "Dance",
    "Latin", 
    "Salsa", 
    "Reggaeton",
  ] as const;
  
  export type MusicStyle = typeof MUSIC_STYLES[number];
