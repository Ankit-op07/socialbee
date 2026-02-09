import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

// Ensure uploads directory exists
async function ensureUploadDir() {
    try {
        await fs.access(UPLOAD_DIR);
    } catch {
        await fs.mkdir(UPLOAD_DIR, { recursive: true });
    }
}

// Generate unique filename
function generateFileName(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const ext = path.extname(originalName).toLowerCase();
    return `${timestamp}-${random}${ext}`;
}

// Allowed file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/x-m4a'];

export async function POST(request: NextRequest) {
    try {
        await ensureUploadDir();

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
            const imagePath = path.join(UPLOAD_DIR, imageFileName);
            const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
            await fs.writeFile(imagePath, imageBuffer);
            result.imageUrl = `/uploads/${imageFileName}`;
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
            const musicPath = path.join(UPLOAD_DIR, musicFileName);
            const musicBuffer = Buffer.from(await musicFile.arrayBuffer());
            await fs.writeFile(musicPath, musicBuffer);
            result.musicUrl = `/uploads/${musicFileName}`;
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
        return NextResponse.json(
            { error: 'Failed to upload files' },
            { status: 500 }
        );
    }
}
