export interface TrainingModule {
  id: string;
  title: string;
  desc: string;
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