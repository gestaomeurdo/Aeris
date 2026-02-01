export interface TrainingModule {
  id: string; 
  dbId: string;
  title: string;
  desc: string;
  type: "Leadership" | "Strategy" | "Structure" | "Advanced";
  category: "module" | "podcast"; 
  audioUrl: string;      // Usado para Podcast
  audiobookUrl: string;  // Usado para Audiobook
  docUrl: string;        // Usado para PDF
  videoUrl: string;      // Usado para Vídeo
  coverUrl: string; 
  progress: number;
  locked: boolean;
}

export interface PortalData {
  mainVideo: string;
  missionTitle: string;
  missionDescription: string;
  modules: TrainingModule[];
}