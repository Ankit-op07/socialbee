import { NextRequest, NextResponse } from 'next/server';

// POST - Create a new surprise (encode data into a token)
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

        // Build surprise object (only include non-empty fields)
        const surprise: Record<string, unknown> = {
            t: templateId,
            s: senderName,
            r: recipientName,
            m: message,
        };

        if (storyPages && storyPages.length > 0) surprise.sp = storyPages;
        if (finalMessage) surprise.fm = finalMessage;
        if (imageUrl) surprise.img = imageUrl;
        if (musicUrl) surprise.mu = musicUrl;

        // Encode the surprise data as a base64 token
        const jsonStr = JSON.stringify(surprise);
        const token = Buffer.from(jsonStr).toString('base64url');

        return NextResponse.json({ id: token, success: true });
    } catch (error) {
        console.error('Error creating surprise:', error);
        return NextResponse.json(
            { error: 'Failed to create surprise' },
            { status: 500 }
        );
    }
}

// GET - Decode a surprise from the token
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Surprise ID required' }, { status: 400 });
        }

        // Decode the base64url token
        const jsonStr = Buffer.from(id, 'base64url').toString('utf-8');
        const data = JSON.parse(jsonStr);

        // Reconstruct the full surprise object
        const surprise = {
            id: id.substring(0, 8), // Short ID for display
            templateId: data.t,
            senderName: data.s,
            recipientName: data.r,
            message: data.m,
            createdAt: new Date().toISOString(),
            viewed: false,
            ...(data.sp && { storyPages: data.sp }),
            ...(data.fm && { finalMessage: data.fm }),
            ...(data.img && { imageUrl: data.img }),
            ...(data.mu && { musicUrl: data.mu }),
        };

        return NextResponse.json(surprise);
    } catch (error) {
        console.error('Error decoding surprise:', error);
        return NextResponse.json({ error: 'Invalid or corrupted surprise link' }, { status: 400 });
    }
}
