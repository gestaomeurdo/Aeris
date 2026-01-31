export interface TrainingModule {
  id: string; // Ex: MOD-01
  dbId: string; // UUID do Supabase
  title: string;
  desc: string;
  type: "Leadership" | "Strategy" | "Structure" | "Advanced";
  audioUrl: string;
  docUrl: string;
  progress: number;
  locked: boolean;
}

export interface PortalData {
  mainVideo: string;
  missionTitle: string;
  missionDescription: string;
  modules: TrainingModule[];
}