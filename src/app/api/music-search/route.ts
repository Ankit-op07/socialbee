import { NextRequest, NextResponse } from 'next/server';

// YouTube Data API search
// Note: This requires a YouTube Data API key
// For demo purposes, we're using a mock search that returns popular love songs

const POPULAR_LOVE_SONGS = [
    {
        id: 'youtube-1',
        videoId: '2Vv-BfVoq4g',
        title: 'Perfect',
        artist: 'Ed Sheeran',
        thumbnail: 'https://i.ytimg.com/vi/2Vv-BfVoq4g/mqdefault.jpg',
        duration: '4:23'
    },
    {
        id: 'youtube-2',
        videoId: 'lp-EO5I60KA',
        title: 'Thinking Out Loud',
        artist: 'Ed Sheeran',
        thumbnail: 'https://i.ytimg.com/vi/lp-EO5I60KA/mqdefault.jpg',
        duration: '4:41'
    },
    {
        id: 'youtube-3',
        videoId: '450p7goxZqg',
        title: 'All of Me',
        artist: 'John Legend',
        thumbnail: 'https://i.ytimg.com/vi/450p7goxZqg/mqdefault.jpg',
        duration: '4:29'
    },
    {
        id: 'youtube-4',
        videoId: 'rtOvBOTyX00',
        title: 'Cant Help Falling In Love',
        artist: 'Elvis Presley',
        thumbnail: 'https://i.ytimg.com/vi/rtOvBOTyX00/mqdefault.jpg',
        duration: '3:00'
    },
    {
        id: 'youtube-5',
        videoId: 'Bo-zT1JWUFQ',
        title: 'My Heart Will Go On',
        artist: 'Celine Dion',
        thumbnail: 'https://i.ytimg.com/vi/Bo-zT1JWUFQ/mqdefault.jpg',
        duration: '4:40'
    },
    {
        id: 'youtube-6',
        videoId: 'Gc5316b6Fwo',
        title: 'A Thousand Years',
        artist: 'Christina Perri',
        thumbnail: 'https://i.ytimg.com/vi/Gc5316b6Fwo/mqdefault.jpg',
        duration: '4:45'
    },
    {
        id: 'youtube-7',
        videoId: 'HqYnevHibaI',
        title: 'Photograph',
        artist: 'Ed Sheeran',
        thumbnail: 'https://i.ytimg.com/vi/HqYnevHibaI/mqdefault.jpg',
        duration: '4:19'
    },
    {
        id: 'youtube-8',
        videoId: 'k32IPg4iCjk',
        title: 'Unchained Melody',
        artist: 'Righteous Brothers',
        thumbnail: 'https://i.ytimg.com/vi/k32IPg4iCjk/mqdefault.jpg',
        duration: '3:39'
    },
    {
        id: 'youtube-9',
        videoId: '1cCBqY2B9H0',
        title: 'Just The Way You Are',
        artist: 'Bruno Mars',
        thumbnail: 'https://i.ytimg.com/vi/1cCBqY2B9H0/mqdefault.jpg',
        duration: '3:40'
    },
    {
        id: 'youtube-10',
        videoId: 'QdBZY2fkU-0',
        title: 'I Will Always Love You',
        artist: 'Whitney Houston',
        thumbnail: 'https://i.ytimg.com/vi/QdBZY2fkU-0/mqdefault.jpg',
        duration: '4:31'
    },
    {
        id: 'youtube-11',
        videoId: 'nSDgHBxUbVQ',
        title: 'Say You Wont Let Go',
        artist: 'James Arthur',
        thumbnail: 'https://i.ytimg.com/vi/nSDgHBxUbVQ/mqdefault.jpg',
        duration: '3:31'
    },
    {
        id: 'youtube-12',
        videoId: 'raNGeq3_DtM',
        title: 'Everything I Do I Do It For You',
        artist: 'Bryan Adams',
        thumbnail: 'https://i.ytimg.com/vi/raNGeq3_DtM/mqdefault.jpg',
        duration: '6:34'
    }
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q')?.toLowerCase() || '';

        let results = POPULAR_LOVE_SONGS;

        if (query) {
            results = POPULAR_LOVE_SONGS.filter(song =>
                song.title.toLowerCase().includes(query) ||
                song.artist.toLowerCase().includes(query)
            );
        }

        return NextResponse.json({
            songs: results,
            total: results.length
        });
    } catch (error) {
        console.error('Music search error:', error);
        return NextResponse.json(
            { error: 'Failed to search music' },
            { status: 500 }
        );
    }
}
