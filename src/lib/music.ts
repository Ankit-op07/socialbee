// Music library with free-to-use audio URLs
// These are royalty-free romantic music tracks

export interface MusicTrack {
    id: string;
    title: string;
    artist: string;
    thumbnail: string;
    duration: string;
    audioUrl: string;
    category: 'romantic' | 'classic' | 'modern';
}

// Romantic music tracks with audio URLs
// Using Pixabay's free music API (royalty-free)
export const musicLibrary: MusicTrack[] = [
    {
        id: 'romantic-piano-1',
        title: 'Romantic Piano',
        artist: 'Love Melodies',
        thumbnail: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=120&h=80&fit=crop',
        duration: '3:45',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1baa.mp3',
        category: 'romantic'
    },
    {
        id: 'perfect-moment',
        title: 'Perfect Moment',
        artist: 'Romantic Dreams',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120&h=80&fit=crop',
        duration: '2:58',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        category: 'romantic'
    },
    {
        id: 'love-story',
        title: 'Love Story',
        artist: 'Heart Beats',
        thumbnail: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=120&h=80&fit=crop',
        duration: '4:12',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2021/11/25/audio_cb33d17e43.mp3',
        category: 'romantic'
    },
    {
        id: 'wedding-dreams',
        title: 'Wedding Dreams',
        artist: 'Forever Yours',
        thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=120&h=80&fit=crop',
        duration: '3:30',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7ca006beae.mp3',
        category: 'romantic'
    },
    {
        id: 'sweet-memories',
        title: 'Sweet Memories',
        artist: 'Gentle Hearts',
        thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120&h=80&fit=crop',
        duration: '3:15',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_946b0939c8.mp3',
        category: 'romantic'
    },
    {
        id: 'eternal-love',
        title: 'Eternal Love',
        artist: 'Romance FM',
        thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120&h=80&fit=crop',
        duration: '4:00',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_b9bd4170e4.mp3',
        category: 'romantic'
    },
    {
        id: 'first-dance',
        title: 'First Dance',
        artist: 'Love Notes',
        thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120&h=80&fit=crop',
        duration: '3:40',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3',
        category: 'romantic'
    },
    {
        id: 'heartbeat',
        title: 'Heartbeat',
        artist: 'Soft Tunes',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120&h=80&fit=crop',
        duration: '2:50',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/09/07/audio_7e21295a10.mp3',
        category: 'romantic'
    }
];

export function getMusicTrackById(id: string): MusicTrack | undefined {
    return musicLibrary.find(track => track.id === id);
}

export function searchMusicTracks(query: string): MusicTrack[] {
    if (!query) return musicLibrary;

    const lowerQuery = query.toLowerCase();
    return musicLibrary.filter(track =>
        track.title.toLowerCase().includes(lowerQuery) ||
        track.artist.toLowerCase().includes(lowerQuery)
    );
}
