export interface Attachment {
  url: string;
  filename?: string;
  id?: string;
}

export interface Artist {
  id: string;
  fields: {
    Name: string;
    Bio: string;
    Specialty: string;
    ProfileImage?: Array<Attachment>;
    Artwork?: Array<Attachment>;
    ThemeBgColor?: string;
    ThemeBackgroundColor?: string;
    ThemeTextColor?: string;
    ThemePrimaryColor?: string;
    Email?: string;
    Phone?: string;
    Website?: string;
    Instagram?: string;
    Twitter?: string;
    FeaturedArticle?: string;
    Tags?: string[];
  };
} 