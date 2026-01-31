export interface TrainingModule {
  id: string; 
  dbId: string;
  title: string;
  desc: string;
  type: "Leadership" | "Strategy" | "Structure" | "Advanced";
  category: "module" | "podcast"; // Nova separação clara
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