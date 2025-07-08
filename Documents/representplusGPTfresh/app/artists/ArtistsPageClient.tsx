'use client';

import { useState, useMemo } from 'react';
import { ArtistCard } from '@/components/artists/ArtistCard';
import { Artist } from '@/types/artist';
import { Container, responsiveClasses } from '@/components/ui/Container';

interface ArtistsPageClientProps {
  artists: Artist[];
  allTags: string[];
}

export default function ArtistsPageClient({ artists, allTags }: ArtistsPageClientProps) {
  //   console.log('ArtistsPageClient received:', { artists, allTags });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter artists based on search term and selected tags
  const filteredArtists = useMemo(() => {
    //   console.log('Filtering artists:', artists);
    return artists.filter((artist) => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        artist.fields.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (artist.fields.Bio && artist.fields.Bio.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (artist.fields.Speciality && artist.fields.Speciality.toLowerCase().includes(searchTerm.toLowerCase()));

      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        (artist.fields.Tags && selectedTags.some(tag => 
          artist.fields.Tags!.includes(tag)
        ));

      return matchesSearch && matchesTags;
    });
  }, [artists, searchTerm, selectedTags]);

  //   console.log('Filtered artists:', filteredArtists);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  return (
    <Container className="py-12 xs:py-16 sm:py-24 lg:py-32">
      <div className="text-center mb-8 xs:mb-12 sm:mb-16">
        <h1 className={`${responsiveClasses.text.h1} font-serif font-black tracking-tight text-foreground`}>
          All Artists
        </h1>
        <p className={`${responsiveClasses.text.body} text-muted mt-2 xs:mt-3 sm:mt-4 max-w-2xl mx-auto`}>
          Discover and explore our complete collection of talented artists and creators.
        </p>
      </div>

      <div className="space-y-4 xs:space-y-6 sm:space-y-8 max-w-7xl mx-auto">
        {/* Search and Filters */}
        <div className="space-y-3 xs:space-y-4 sm:space-y-6">
          {/* Search Input */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search artists by name, specialty, or bio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-muted/20 border border-muted/30 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base min-h-[44px]"
            />
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between px-2 sm:px-4">
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-foreground">Filter by Tags</h3>
                {(searchTerm || selectedTags.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-xs sm:text-sm text-muted hover:text-primary transition-colors min-h-[44px] px-2 py-1"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-center px-2 sm:px-4">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all duration-200 min-h-[32px] flex items-center justify-center ${
                      selectedTags.includes(tag)
                        ? 'bg-primary text-black'
                        : 'bg-muted/20 text-foreground hover:bg-muted/30'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-center">
          <p className="text-muted text-xs xs:text-sm sm:text-base">
            {filteredArtists.length} of {artists.length} artists
            {(searchTerm || selectedTags.length > 0) && ' found'}
          </p>
        </div>

        {/* Artists Grid */}
        {(() => {
          //   console.log('Rendering artists grid with:', filteredArtists.length, 'artists');
          return filteredArtists.length > 0 ? (
            <div className={`grid ${responsiveClasses.grid.mobile} ${responsiveClasses.grid.tablet} ${responsiveClasses.grid.desktop} ${responsiveClasses.grid.large} ${responsiveClasses.spacing.md} justify-items-center`}>
              {filteredArtists.map((artist) => {
                //   console.log('Rendering artist:', artist.fields.Name);
                return <ArtistCard key={artist.id} artist={artist} />;
              })}
            </div>
          ) : (
            <div className="text-center py-6 xs:py-8 sm:py-12">
              <p className="text-muted text-sm xs:text-base sm:text-lg px-3 xs:px-4 sm:px-6">
                {searchTerm || selectedTags.length > 0 
                  ? 'No artists match your current filters.'
                  : 'No artists available at this time.'
                }
              </p>
              {(searchTerm || selectedTags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="mt-3 xs:mt-4 text-primary hover:opacity-80 transition-opacity text-sm sm:text-base min-h-[44px] px-3 py-2"
                >
                  Clear filters
                </button>
              )}
            </div>
          );
        })()}
      </div>
    </Container>
  );
} 