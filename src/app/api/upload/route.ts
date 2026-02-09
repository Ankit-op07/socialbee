import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// Allowed file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/x-m4a'];

// Generate unique filename
function generateFileName(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const ext = originalName.split('.').pop()?.toLowerCase() || 'bin';
    return `${timestamp}-${random}.${ext}`;
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const imageFile = formData.get('image') as File | null;
        const musicFile = formData.get('music') as File | null;

        const result: { imageUrl?: string; musicUrl?: string } = {};

        // Handle image upload
        if (imageFile && imageFile.size > 0) {
            if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) {
                return NextResponse.json(
                    { error: 'Invalid image type. Allowed: JPG, PNG, GIF, WebP' },
                    { status: 400 }
                );
            }

            // Max 5MB for images
            if (imageFile.size > 5 * 1024 * 1024) {
                return NextResponse.json(
                    { error: 'Image too large. Maximum size is 5MB' },
                    { status: 400 }
                );
            }

            const imageFileName = generateFileName(imageFile.name);
            const imageBlob = await put(`uploads/images/${imageFileName}`, imageFile, {
                access: 'public',
                contentType: imageFile.type
            });
            result.imageUrl = imageBlob.url;
        }

        // Handle music upload
        if (musicFile && musicFile.size > 0) {
            if (!ALLOWED_AUDIO_TYPES.includes(musicFile.type)) {
                return NextResponse.json(
                    { error: 'Invalid audio type. Allowed: MP3, WAV, OGG, M4A' },
                    { status: 400 }
                );
            }

            // Max 10MB for audio
            if (musicFile.size > 10 * 1024 * 1024) {
                return NextResponse.json(
                    { error: 'Audio file too large. Maximum size is 10MB' },
                    { status: 400 }
                );
            }

            const musicFileName = generateFileName(musicFile.name);
            const musicBlob = await put(`uploads/audio/${musicFileName}`, musicFile, {
                access: 'public',
                contentType: musicFile.type
            });
            result.musicUrl = musicBlob.url;
        }

        if (!result.imageUrl && !result.musicUrl) {
            return NextResponse.json(
                { error: 'No files uploaded' },
                { status: 400 }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Upload error:', error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        return NextResponse.json(
            {
                error: 'Failed to upload files',
                details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
                hint: 'Ensure Vercel Blob is properly configured with BLOB_READ_WRITE_TOKEN environment variable.'
            },
            { status: 500 }
        );
    }
}
