'use client';

import { useState, useMemo } from 'react';
import { ArtistCard } from '@/components/artists/ArtistCard';
import { Artist } from '@/types/artist';

interface ArtistsPageClientProps {
  artists: Artist[];
  allTags: string[];
}

export default function ArtistsPageClient({ artists, allTags }: ArtistsPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter artists based on search term and selected tags
  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      const matchesSearch = searchTerm === '' || 
        artist.fields.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (artist.fields.Bio && artist.fields.Bio.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (artist.fields.Speciality && artist.fields.Speciality.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTags = selectedTags.length === 0 || 
        (artist.fields.Tags && selectedTags.some(tag => artist.fields.Tags!.includes(tag)));
      return matchesSearch && matchesTags;
    });
  }, [artists, searchTerm, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black tracking-tight text-foreground">
          All Artists
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-muted mt-2 md:mt-4 max-w-2xl mx-auto">
          Discover and explore our complete collection of talented artists and creators.
        </p>
      </div>

      <div className="space-y-6 md:space-y-8">
        {/* Search and Filters */}
        <div className="space-y-4 md:space-y-6">
          {/* Search Input */}
          <div className="max-w-md w-full mx-auto">
            <input
              type="text"
              placeholder="Search artists by name, specialty, or bio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 md:py-3 rounded-lg bg-muted/20 border border-muted/30 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base md:text-lg min-h-[44px]"
            />
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div className="space-y-3 md:space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between px-2 md:px-4 gap-2 md:gap-0">
                <h3 className="text-base md:text-lg font-semibold text-foreground">Filter by Tags</h3>
                {(searchTerm || selectedTags.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm md:text-base text-muted hover:text-primary transition-colors min-h-[44px] px-2 py-1"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-center px-2 md:px-4">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 min-h-[32px] flex items-center justify-center ${
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
          <p className="text-muted text-sm md:text-base">
            {filteredArtists.length} of {artists.length} artists
            {(searchTerm || selectedTags.length > 0) && ' found'}
          </p>
        </div>

        {/* Artists Grid */}
        {filteredArtists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full">
            {filteredArtists.map((artist) => (
              <div key={artist.id} className="w-full flex justify-center">
                <ArtistCard artist={artist} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 md:py-12">
            <p className="text-muted text-base md:text-lg px-4">
              {searchTerm || selectedTags.length > 0 
                ? 'No artists match your current filters.'
                : 'No artists available at this time.'
              }
            </p>
            {(searchTerm || selectedTags.length > 0) && (
              <button
                onClick={clearFilters}
                className="mt-4 text-primary hover:opacity-80 transition-opacity text-base md:text-lg min-h-[44px] px-4 py-2"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 