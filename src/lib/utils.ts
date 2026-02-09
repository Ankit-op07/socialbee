import { v4 as uuidv4 } from 'uuid';

// Generate a unique ID for surprises
export function generateUniqueId(): string {
    return uuidv4().slice(0, 8);
}

// Format date for display
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}

// Generate full surprise URL
export function getSurpriseUrl(id: string): string {
    if (typeof window !== 'undefined') {
        return `${window.location.origin}/surprise/${id}`;
    }
    return `/surprise/${id}`;
}

// Delay helper for animations
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Random number in range
export function randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

// Generate random color
export function randomColor(): string {
    const colors = [
        '#ff6b9d', '#c084fc', '#ffd93d', '#ff6b6b',
        '#6c5ce7', '#00cec9', '#fd79a8', '#e17055'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
