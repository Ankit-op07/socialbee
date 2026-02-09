import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { generateUniqueId } from '@/lib/utils';
import { Surprise } from '@/lib/templates';

const DATA_FILE = path.join(process.cwd(), 'src/data/surprises.json');

// Ensure data directory and file exist
async function ensureDataFile() {
    const dataDir = path.dirname(DATA_FILE);
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
    }
}

// Read all surprises
async function readSurprises(): Promise<Surprise[]> {
    await ensureDataFile();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
}

// Write surprises
async function writeSurprises(surprises: Surprise[]): Promise<void> {
    await ensureDataFile();
    await fs.writeFile(DATA_FILE, JSON.stringify(surprises, null, 2));
}

// GET - Retrieve a surprise by ID
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Surprise ID required' }, { status: 400 });
    }

    const surprises = await readSurprises();
    const surprise = surprises.find(s => s.id === id);

    if (!surprise) {
        return NextResponse.json({ error: 'Surprise not found' }, { status: 404 });
    }

    return NextResponse.json(surprise);
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

        const surprises = await readSurprises();
        surprises.push(surprise);
        await writeSurprises(surprises);

        return NextResponse.json({ id: surprise.id, success: true });
    } catch (error) {
        console.error('Error creating surprise:', error);
        return NextResponse.json(
            { error: 'Failed to create surprise' },
            { status: 500 }
        );
    }
}
