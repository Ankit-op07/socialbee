import { NextRequest, NextResponse } from 'next/server';

// This route is no longer needed for Vercel deployment
// Images are handled client-side as base64 data URLs
// Music uses external library URLs

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const imageFile = formData.get('image') as File | null;

        const result: { imageUrl?: string; musicUrl?: string } = {};

        // Convert image to base64 data URL (no file system needed)
        if (imageFile && imageFile.size > 0) {
            const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) {
                return NextResponse.json(
                    { error: 'Invalid image type. Allowed: JPG, PNG, GIF, WebP' },
                    { status: 400 }
                );
            }
            if (imageFile.size > 5 * 1024 * 1024) {
                return NextResponse.json(
                    { error: 'Image too large. Maximum size is 5MB' },
                    { status: 400 }
                );
            }

            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const base64 = buffer.toString('base64');
            result.imageUrl = `data:${imageFile.type};base64,${base64}`;
        }

        if (!result.imageUrl) {
            return NextResponse.json(
                { error: 'No files uploaded' },
                { status: 400 }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to process files' },
            { status: 500 }
        );
    }
}
