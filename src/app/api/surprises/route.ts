import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { generateUniqueId } from '@/lib/utils';
import { Surprise } from '@/lib/templates';

// Key prefix for surprises in KV store
const SURPRISE_PREFIX = 'surprise:';

// GET - Retrieve a surprise by ID
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Surprise ID required' }, { status: 400 });
        }

        const surprise = await kv.get<Surprise>(`${SURPRISE_PREFIX}${id}`);

        if (!surprise) {
            return NextResponse.json({ error: 'Surprise not found' }, { status: 404 });
        }

        return NextResponse.json(surprise);
    } catch (error) {
        console.error('Error fetching surprise:', error);
        return NextResponse.json(
            { error: 'Failed to fetch surprise. Please check your KV configuration.' },
            { status: 500 }
        );
    }
}

// POST - Create a new surprise
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { templateId, senderName, recipientName, message, storyPages, finalMessage, imageUrl, musicUrl } = body;

        if (!templateId || !senderName || !recipientName || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const surprise: Surprise = {
            id: generateUniqueId(),
            templateId,
            senderName,
            recipientName,
            message,
            createdAt: new Date().toISOString(),
            viewed: false,
            // Premium template fields
            ...(storyPages && { storyPages }),
            ...(finalMessage && { finalMessage }),
            // Media enhancements
            ...(imageUrl && { imageUrl }),
            ...(musicUrl && { musicUrl })
        };

        // Store in Vercel KV
        await kv.set(`${SURPRISE_PREFIX}${surprise.id}`, surprise);

        return NextResponse.json({ id: surprise.id, success: true });
    } catch (error) {
        console.error('Error creating surprise:', error);

        // Provide more helpful error message
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        return NextResponse.json(
            {
                error: 'Failed to create surprise',
                details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
                hint: 'Ensure Vercel KV is properly configured with KV_REST_API_URL and KV_REST_API_TOKEN environment variables.'
            },
            { status: 500 }
        );
    }
}
