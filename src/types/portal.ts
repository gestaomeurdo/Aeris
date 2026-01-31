export interface AudioTrack {
  id: string;
  title: string;
  host: string;
  url: string;
  duration: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  desc: string;
  docUrl: string;
  progress: number;
  locked: boolean;
}

export interface PortalData {
  missionTitle: string;
  videoUrl: string;
  missionDescription: string;
  audioTracks: AudioTrack[];
  modules: TrainingModule[];
}