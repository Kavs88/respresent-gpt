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
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        artist.fields.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.fields.Specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.fields.Bio.toLowerCase().includes(searchTerm.toLowerCase());

      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        (artist.fields.Tags && selectedTags.some(tag => 
          artist.fields.Tags!.includes(tag)
        ));

      return matchesSearch && matchesTags;
    });
  }, [artists, searchTerm, selectedTags]);

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
    <div className="container mx-auto py-32 px-4">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-serif font-black tracking-tight text-foreground">
          All Artists
        </h1>
        <p className="text-xl text-muted mt-4 max-w-2xl mx-auto">
          Discover and explore our complete collection of talented artists and creators.
        </p>
      </div>

    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="space-y-6">
        {/* Search Input */}
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search artists by name, specialty, or bio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-muted/20 border border-muted/30 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Filter by Tags</h3>
              {(searchTerm || selectedTags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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
        <p className="text-muted">
          {filteredArtists.length} of {artists.length} artists
          {(searchTerm || selectedTags.length > 0) && ' found'}
        </p>
      </div>

      {/* Artists Grid */}
      {filteredArtists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted text-lg">
            {searchTerm || selectedTags.length > 0 
              ? 'No artists match your current filters.'
              : 'No artists available at this time.'
            }
          </p>
          {(searchTerm || selectedTags.length > 0) && (
            <button
              onClick={clearFilters}
              className="mt-4 text-primary hover:opacity-80 transition-opacity"
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