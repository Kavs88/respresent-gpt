export interface Artist {
  id: string;
  fields: {
    Name: string;
    Bio: string;
    Specialty: string;
    ProfileImage?: Array<{
      url: string;
      filename?: string;
    }>;
    Artwork?: Array<{
      url: string;
      filename?: string;
    }>;
    ThemeBgColor?: string;
    ThemeTextColor?: string;
    ThemePrimaryColor?: string;
    Email?: string;
    Phone?: string;
    Website?: string;
    Instagram?: string;
    Twitter?: string;
  };
} 