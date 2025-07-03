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
    Email?: string;
    Phone?: string;
    Website?: string;
    Instagram?: string;
    Twitter?: string;
  };
} 