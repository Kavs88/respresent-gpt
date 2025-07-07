export interface Attachment {
  id: string;
  url: string;
  filename: string;
}

export interface Artist {
  id: string;
  fields: {
    Name: string;
    Speciality?: string;
    Bio?: string;
    ProfileImage?: Array<Attachment>;
    Artwork?: Array<Attachment>;
    SocialLinks?: string;
    Tags?: string[];
    Featured?: boolean;
    GeneratedBannerImage?: Array<Attachment>;
    ThemePrimaryColor?: string;
    ThemeBackgroundColor?: string;
    ThemeTextColor?: string;
  };
} 