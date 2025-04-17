export interface LocationPreferences {
    parking?: boolean;
  }
  
  export interface CateringPreferences {
    kosher?: boolean;
    vegetarian?: boolean;
    vegan?: boolean;
    gluten_free?: boolean;
  }
  
  export interface DJPreferences {
    music_styles?: string[];
  }
  
  export interface PhotographerPreferences {
    has_magnets?: boolean;
    has_stills?: boolean;
    has_video?: boolean;
  }
  
  export interface LecturerPreferences {
    field?: string;
  }
  