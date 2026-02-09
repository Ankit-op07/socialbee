'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Send, Copy, Check, ExternalLink, Heart, ChevronRight, ChevronLeft, BookOpen, Sparkles, Edit3, Upload, Image, Music, X, Play, Pause, Search } from 'lucide-react';
import { getTemplateById, StoryPage } from '@/lib/templates';
import { copyToClipboard, getSurpriseUrl } from '@/lib/utils';
import { musicLibrary, MusicTrack } from '@/lib/music';

// Template Preview Components - All 6 Be My Valentine + Others
function EscapingLovePreview() {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: '3rem', marginBottom: '15px' }}>💘</motion.div>
            <p style={{ color: '#ff6b9d', marginBottom: '15px' }}>Will you be my Valentine?</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <motion.button whileHover={{ scale: 1.05 }} style={{ padding: '8px 24px', background: 'linear-gradient(135deg, #ff6b9d, #ff3366)', border: 'none', borderRadius: '20px', color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>Yes! 💕</motion.button>
                <motion.button animate={{ x: [0, 8, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity }} style={{ padding: '8px 24px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '20px', color: 'white', fontSize: '0.9rem' }}>No 😢</motion.button>
            </div>
            <p style={{ marginTop: '12px', fontSize: '0.75rem', color: '#888' }}>✨ "No" escapes when clicked!</p>
        </div>
    );
}

function LoveLockPreview() {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: '4rem' }}>🔒</motion.div>
                <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: '2rem', position: 'absolute', bottom: '-10px', right: '-15px' }}>🔑</motion.div>
            </div>
            <p style={{ marginTop: '15px', fontSize: '0.75rem', color: '#888' }}>✨ Unlock with love to reveal</p>
        </div>
    );
}

function HeartExplosionPreview() {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 20px rgba(255,77,109,0.5))' }}
            >💗</motion.div>
            <p style={{ marginTop: '15px', fontSize: '0.75rem', color: '#888' }}>✨ Tap to explode with love!</p>
        </div>
    );
}

function LoveMeterPreview() {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{
                width: '150px',
                height: '25px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                overflow: 'hidden',
                margin: '0 auto'
            }}>
                <motion.div
                    animate={{ width: ['20%', '70%', '100%', '70%'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ height: '100%', background: 'linear-gradient(90deg, #ff6b9d, #ff3366)' }}
                />
            </div>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }} style={{ fontSize: '2rem', marginTop: '10px' }}>💝</motion.div>
            <p style={{ marginTop: '10px', fontSize: '0.75rem', color: '#888' }}>✨ Fill the meter to 100%!</p>
        </div>
    );
}

function FortuneHeartPreview() {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: '4rem' }}
            >💖</motion.div>
            <div style={{ marginTop: '10px', padding: '8px 16px', background: 'rgba(255,107,157,0.2)', borderRadius: '10px', display: 'inline-block' }}>
                <span style={{ fontSize: '1rem' }}>🥠</span>
                <span style={{ fontSize: '0.8rem', marginLeft: '8px', color: '#f06292' }}>Crack to reveal!</span>
            </div>
            <p style={{ marginTop: '10px', fontSize: '0.75rem', color: '#888' }}>✨ Fortune cookie style reveal</p>
        </div>
    );
}

function SpinWheelPreview() {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'conic-gradient(#ff6b9d, #ec407a, #e91e63, #d81b60, #c2185b, #ff6b9d)',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                }}>
                    💘
                </div>
            </motion.div>
            <p style={{ marginTop: '15px', fontSize: '0.75rem', color: '#888' }}>✨ Every option says YES!</p>
        </div>
    );
}

function LoveLetterPreview() {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <motion.div animate={{ rotateY: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: '3rem', marginBottom: '10px' }}>💌</motion.div>
            <div style={{ background: 'rgba(231, 76, 136, 0.1)', padding: '12px', borderRadius: '10px', fontFamily: 'Georgia, serif', fontSize: '0.9rem' }}>
                Dear love...<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>|</motion.span>
            </div>
            <p style={{ marginTop: '10px', fontSize: '0.75rem', color: '#888' }}>✨ Typewriter text effect</p>
        </div>
    );
}

function RosesBloomPreview() {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.2, type: 'spring' }}
                        style={{ fontSize: '1.8rem' }}
                    >🌹</motion.div>
                ))}
            </div>
            <p style={{ marginTop: '15px', fontSize: '0.75rem', color: '#888' }}>✨ Roses bloom one by one</p>
        </div>
    );
}

function LoveStoryPreview() {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <motion.div
                animate={{ rotateY: [0, 15, 0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ fontSize: '4rem', marginBottom: '15px' }}
            >📖</motion.div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '15px' }}>
                {[1, 2, 3, 4, 5].map((num) => (
                    <motion.div
                        key={num}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: [0.8, 1, 0.8] }}
                        transition={{ delay: num * 0.3, duration: 2, repeat: Infinity }}
                        style={{
                            width: '30px',
                            height: '8px',
                            background: `linear-gradient(90deg, #ff1744, #d50000)`,
                            borderRadius: '4px',
                            opacity: 0.5 + num * 0.1
                        }}
                    />
                ))}
            </div>
            <p style={{ color: '#ff1744', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>5 Interactive Chapters</p>
            <p style={{ fontSize: '0.75rem', color: '#888' }}>✨ A multi-page love story journey</p>
        </div>
    );
}

function DefaultPreview({ icon }: { icon: string }) {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: '4rem', marginBottom: '10px' }}>{icon}</motion.div>
            <p style={{ fontSize: '0.85rem', color: '#888' }}>✨ Beautiful surprise reveal</p>
        </div>
    );
}

function TemplatePreview({ templateId, icon }: { templateId: string; icon: string }) {
    switch (templateId) {
        case 'valentine-escape': return <EscapingLovePreview />;
        case 'valentine-love-lock': return <LoveLockPreview />;
        case 'valentine-heart-explosion': return <HeartExplosionPreview />;
        case 'valentine-love-meter': return <LoveMeterPreview />;
        case 'valentine-fortune-heart': return <FortuneHeartPreview />;
        case 'valentine-spin-wheel': return <SpinWheelPreview />;
        case 'valentine-love-story': return <LoveStoryPreview />;
        case 'love-letter-reveal': return <LoveLetterPreview />;
        case 'roses-bloom': return <RosesBloomPreview />;
        default: return <DefaultPreview icon={icon} />;
    }
}

// Story Page Editor Component
function StoryPageEditor({
    pages,
    onPagesChange,
    primaryColor
}: {
    pages: StoryPage[];
    onPagesChange: (pages: StoryPage[]) => void;
    primaryColor: string;
}) {
    const [currentPage, setCurrentPage] = useState(0);

    const updatePage = (field: keyof StoryPage, value: string) => {
        const newPages = [...pages];
        newPages[currentPage] = { ...newPages[currentPage], [field]: value };
        onPagesChange(newPages);
    };

    const interactionLabels: Record<string, string> = {
        'tap-to-reveal': '👆 Tap to Reveal',
        'swipe-hearts': '💕 Swipe Hearts',
        'hold-to-fill': '⏳ Hold to Fill',
        'scratch-reveal': '✨ Scratch to Reveal',
        'puzzle-piece': '🧩 Puzzle Piece'
    };

    return (
        <div style={{ marginBottom: '30px' }}>
            {/* Chapter Navigation */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '20px',
                flexWrap: 'wrap'
            }}>
                {pages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: currentPage === index ? `2px solid ${primaryColor}` : '2px solid rgba(255,255,255,0.2)',
                            background: currentPage === index ? `${primaryColor}30` : 'rgba(255,255,255,0.05)',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Current Page Editor */}
            <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '20px',
                    padding: '25px 20px',
                    border: `1px solid ${primaryColor}30`
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px',
                    color: primaryColor
                }}>
                    <BookOpen size={20} />
                    <span style={{ fontWeight: 600 }}>Chapter {currentPage + 1} of 5</span>
                    <span style={{
                        marginLeft: 'auto',
                        fontSize: '0.8rem',
                        background: `${primaryColor}20`,
                        padding: '4px 12px',
                        borderRadius: '20px'
                    }}>
                        {interactionLabels[pages[currentPage].interactionType]}
                    </span>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                        Chapter Title
                    </label>
                    <input
                        type="text"
                        className="input-glass"
                        value={pages[currentPage].title}
                        onChange={(e) => updatePage('title', e.target.value)}
                        placeholder="Enter chapter title..."
                        style={{ fontSize: '16px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                        Chapter Message
                    </label>
                    <textarea
                        className="textarea-glass"
                        value={pages[currentPage].content}
                        onChange={(e) => updatePage('content', e.target.value)}
                        placeholder="Write your message for this chapter..."
                        rows={3}
                        style={{ fontSize: '16px' }}
                    />
                </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                <button
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    style={{
                        padding: '10px 20px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '10px',
                        color: 'white',
                        cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                        opacity: currentPage === 0 ? 0.5 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}
                >
                    <ChevronLeft size={18} /> Previous
                </button>
                <button
                    onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
                    disabled={currentPage === pages.length - 1}
                    style={{
                        padding: '10px 20px',
                        background: `${primaryColor}20`,
                        border: `1px solid ${primaryColor}50`,
                        borderRadius: '10px',
                        color: 'white',
                        cursor: currentPage === pages.length - 1 ? 'not-allowed' : 'pointer',
                        opacity: currentPage === pages.length - 1 ? 0.5 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}
                >
                    Next <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}

export default function CreateSurprisePage() {
    const params = useParams();
    const templateId = params.templateId as string;
    const template = getTemplateById(templateId);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ senderName: '', recipientName: '', message: '' });
    const [storyPages, setStoryPages] = useState<StoryPage[]>(template?.defaultPages || []);
    const [isCreating, setIsCreating] = useState(false);
    const [createdLink, setCreatedLink] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // File upload states
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [musicFile, setMusicFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [musicFileName, setMusicFileName] = useState<string | null>(null);

    // Music library states
    const [selectedLibraryTrack, setSelectedLibraryTrack] = useState<string | null>(null);
    const [showMusicLibrary, setShowMusicLibrary] = useState(true);
    const [musicSearchQuery, setMusicSearchQuery] = useState('');
    const [filteredTracks, setFilteredTracks] = useState<MusicTrack[]>(musicLibrary);

    if (!template) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ padding: '20px' }}>
                <div className="text-center">
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Template not found</h1>
                    <Link href="/templates" className="btn-gradient"><span>Browse Templates</span></Link>
                </div>
            </div>
        );
    }

    // Handle image file selection
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Handle music file selection
    const handleMusicSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMusicFile(file);
            setMusicFileName(file.name);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            let imageUrl: string | undefined;
            let musicUrl: string | undefined;

            // Upload files first if present
            if (imageFile || musicFile) {
                console.log('Uploading files...', { imageFile: imageFile?.name, musicFile: musicFile?.name });
                const uploadFormData = new FormData();
                if (imageFile) uploadFormData.append('image', imageFile);
                if (musicFile) uploadFormData.append('music', musicFile);

                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData
                });
                const uploadData = await uploadResponse.json();
                console.log('Upload response:', uploadData);
                if (uploadResponse.ok) {
                    if (uploadData.imageUrl) imageUrl = uploadData.imageUrl;
                    if (uploadData.musicUrl) musicUrl = uploadData.musicUrl;
                } else {
                    console.error('Upload failed:', uploadData.error);
                }
            }

            // If no uploaded music, check for library track
            if (!musicUrl && selectedLibraryTrack) {
                const libraryTrack = musicLibrary.find((t: MusicTrack) => t.id === selectedLibraryTrack);
                if (libraryTrack) {
                    // Store the audio URL directly
                    musicUrl = libraryTrack.audioUrl;
                }
            }

            const payload: Record<string, unknown> = {
                templateId,
                senderName: formData.senderName,
                recipientName: formData.recipientName,
                message: formData.message
            };

            // Add uploaded file URLs
            if (imageUrl) payload.imageUrl = imageUrl;
            if (musicUrl) payload.musicUrl = musicUrl;

            // Add story pages for premium template
            if (template.isPremium && storyPages.length > 0) {
                payload.storyPages = storyPages;
                payload.finalMessage = formData.message;
            }

            const response = await fetch('/api/surprises', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (data.id) setCreatedLink(getSurpriseUrl(data.id));
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleCopy = async () => {
        if (createdLink) {
            const success = await copyToClipboard(createdLink);
            if (success) { setCopied(true); setTimeout(() => setCopied(false), 2000); }
        }
    };

    return (
        <main className="min-h-screen" style={{ padding: '20px 0' }}>
            <div className="container" style={{ maxWidth: '600px', margin: '0 auto', padding: '0 16px' }}>
                <Link href={template.subCategory ? "/templates/be-my-valentine" : "/templates"} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', textDecoration: 'none', marginBottom: '30px', fontSize: '0.9rem' }}>
                    <ArrowLeft size={18} /> Back to Templates
                </Link>

                <AnimatePresence mode="wait">
                    {!createdLink ? (
                        !showForm ? (
                            <motion.div key="preview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <div className="glass-card" style={{ padding: '30px 20px', marginBottom: '30px' }}>
                                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                        {/* Premium Badge */}
                                        {template.isPremium && (
                                            <motion.div
                                                initial={{ scale: 0.9 }}
                                                animate={{ scale: 1 }}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '6px 16px',
                                                    background: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)',
                                                    borderRadius: '20px',
                                                    fontSize: '0.75rem',
                                                    color: '#000',
                                                    textTransform: 'uppercase',
                                                    fontWeight: 700,
                                                    marginBottom: '15px',
                                                    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
                                                }}
                                            >
                                                <Sparkles size={14} /> Premium Template
                                            </motion.div>
                                        )}
                                        {!template.isPremium && (
                                            <div style={{ display: 'inline-block', padding: '6px 16px', background: `${template.primaryColor}20`, borderRadius: '20px', fontSize: '0.75rem', color: template.primaryColor, textTransform: 'uppercase', fontWeight: 600, marginBottom: '15px' }}>
                                                {template.subCategory ? 'Be My Valentine' : template.category}
                                            </div>
                                        )}
                                        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '8px' }}>{template.name}</h1>
                                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{template.description}</p>
                                    </div>

                                    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '20px', padding: '20px 15px', marginBottom: '25px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '15px', color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
                                            <span>👁️ Preview</span>
                                        </div>
                                        <TemplatePreview templateId={templateId} icon={template.icon} />
                                    </div>

                                    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', padding: '20px', marginBottom: '25px' }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '15px', color: template.primaryColor }}>✨ What makes this special</h3>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {template.isPremium ? (
                                                <>
                                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><span style={{ color: '#ffd700' }}>⭐</span>5 interactive story chapters</li>
                                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><span style={{ color: '#ffd700' }}>⭐</span>Customize each page's message</li>
                                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><span style={{ color: '#ffd700' }}>⭐</span>Multiple surprise interactions</li>
                                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><span style={{ color: '#ffd700' }}>⭐</span>Grand finale reveal</li>
                                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><span style={{ color: '#ffd700' }}>⭐</span>Worth every moment!</li>
                                                </>
                                            ) : (
                                                <>
                                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><span style={{ color: '#10b981' }}>✓</span>Unique interactive experience</li>
                                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><span style={{ color: '#10b981' }}>✓</span>Personalized with their name</li>
                                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><span style={{ color: '#10b981' }}>✓</span>Beautiful animations</li>
                                                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><span style={{ color: '#10b981' }}>✓</span>Mobile-friendly</li>
                                                </>
                                            )}
                                        </ul>
                                    </div>

                                    <motion.button onClick={() => setShowForm(true)} className="btn-gradient" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ width: '100%', justifyContent: 'center', padding: '16px 32px', fontSize: '1.1rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {template.isPremium ? <><Edit3 size={20} /> Customize Your Story</> : <>Use This Template <ChevronRight size={20} /></>}
                                        </span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', padding: '15px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: '15px' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: `linear-gradient(135deg, ${template.primaryColor}30, ${template.secondaryColor}20)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>{template.icon}</div>
                                    <div>
                                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{template.name}</h2>
                                        <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: template.primaryColor, cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>← Change template</button>
                                    </div>
                                    {template.isPremium && (
                                        <div style={{ marginLeft: 'auto', padding: '4px 10px', background: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700, color: '#000' }}>
                                            PREMIUM
                                        </div>
                                    )}
                                </div>

                                <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '30px 20px' }}>
                                    <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '25px', textAlign: 'center' }}>
                                        {template.isPremium ? '📖 Create Your Love Story' : 'Personalize Your Surprise'}
                                    </h2>

                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Your Name</label>
                                        <input type="text" className="input-glass" placeholder="Enter your name" value={formData.senderName} onChange={(e) => setFormData({ ...formData, senderName: e.target.value })} required style={{ fontSize: '16px' }} />
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Their Name (Recipient)</label>
                                        <input type="text" className="input-glass" placeholder="Enter recipient's name" value={formData.recipientName} onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })} required style={{ fontSize: '16px' }} />
                                    </div>

                                    {/* Story Page Editor for Premium Template */}
                                    {template.isPremium && storyPages.length > 0 && (
                                        <>
                                            <div style={{
                                                borderTop: '1px solid rgba(255,255,255,0.1)',
                                                margin: '30px 0 25px',
                                                paddingTop: '25px'
                                            }}>
                                                <h3 style={{
                                                    fontSize: '1.1rem',
                                                    fontWeight: 600,
                                                    marginBottom: '20px',
                                                    textAlign: 'center',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '10px'
                                                }}>
                                                    <BookOpen size={22} /> Customize Your Chapters
                                                </h3>
                                                <StoryPageEditor
                                                    pages={storyPages}
                                                    onPagesChange={setStoryPages}
                                                    primaryColor={template.primaryColor}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {/* Image Upload */}
                                    <div style={{
                                        marginBottom: '20px',
                                        padding: '20px',
                                        background: 'linear-gradient(145deg, rgba(255,107,157,0.1), rgba(192,132,252,0.05))',
                                        borderRadius: '15px',
                                        border: '1px solid rgba(255,107,157,0.2)'
                                    }}>
                                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, fontSize: '0.95rem' }}>
                                            📷 Add Your Special Photo (Optional)
                                        </label>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                                            Upload a photo to make the reveal extra special!
                                        </p>

                                        {imagePreview ? (
                                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    style={{
                                                        maxWidth: '200px',
                                                        maxHeight: '150px',
                                                        borderRadius: '12px',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => { setImageFile(null); setImagePreview(null); }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '-8px',
                                                        right: '-8px',
                                                        width: '28px',
                                                        height: '28px',
                                                        borderRadius: '50%',
                                                        background: '#ff4757',
                                                        border: 'none',
                                                        color: 'white',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <label style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '10px',
                                                padding: '20px',
                                                border: '2px dashed rgba(255,107,157,0.4)',
                                                borderRadius: '12px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                background: 'rgba(255,107,157,0.05)'
                                            }}>
                                                <Image size={24} color="#ff6b9d" />
                                                <span style={{ color: '#ff6b9d', fontWeight: 500 }}>Choose Image</span>
                                                <input
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/gif,image/webp"
                                                    onChange={handleImageSelect}
                                                    style={{ display: 'none' }}
                                                />
                                            </label>
                                        )}
                                    </div>

                                    {/* Music Selection */}
                                    <div style={{
                                        marginBottom: '25px',
                                        padding: '20px',
                                        background: 'linear-gradient(145deg, rgba(192,132,252,0.1), rgba(255,107,157,0.05))',
                                        borderRadius: '15px',
                                        border: '1px solid rgba(192,132,252,0.2)'
                                    }}>
                                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, fontSize: '0.95rem' }}>
                                            🎵 Add Background Music (Optional)
                                        </label>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '15px' }}>
                                            Music will play when your surprise is revealed!
                                        </p>

                                        {/* Tabs: Library vs Upload */}
                                        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                            <button
                                                type="button"
                                                onClick={() => setShowMusicLibrary(true)}
                                                style={{
                                                    flex: 1,
                                                    padding: '10px 15px',
                                                    background: showMusicLibrary ? 'rgba(192,132,252,0.2)' : 'transparent',
                                                    border: `1px solid ${showMusicLibrary ? '#c084fc' : 'rgba(255,255,255,0.2)'}`,
                                                    borderRadius: '10px',
                                                    color: showMusicLibrary ? '#c084fc' : 'var(--color-text-secondary)',
                                                    cursor: 'pointer',
                                                    fontWeight: 500,
                                                    fontSize: '0.85rem'
                                                }}
                                            >
                                                🎶 Choose from Library
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowMusicLibrary(false)}
                                                style={{
                                                    flex: 1,
                                                    padding: '10px 15px',
                                                    background: !showMusicLibrary ? 'rgba(192,132,252,0.2)' : 'transparent',
                                                    border: `1px solid ${!showMusicLibrary ? '#c084fc' : 'rgba(255,255,255,0.2)'}`,
                                                    borderRadius: '10px',
                                                    color: !showMusicLibrary ? '#c084fc' : 'var(--color-text-secondary)',
                                                    cursor: 'pointer',
                                                    fontWeight: 500,
                                                    fontSize: '0.85rem'
                                                }}
                                            >
                                                📁 Upload Your Own
                                            </button>
                                        </div>

                                        {showMusicLibrary ? (
                                            /* YouTube Music Library with Search */
                                            <div>
                                                {/* Search Bar */}
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    padding: '10px 15px',
                                                    background: 'rgba(255,255,255,0.05)',
                                                    borderRadius: '10px',
                                                    marginBottom: '15px'
                                                }}>
                                                    <Search size={18} color="#c084fc" />
                                                    <input
                                                        type="text"
                                                        placeholder="Search romantic songs..."
                                                        value={musicSearchQuery}
                                                        onChange={(e) => {
                                                            const query = e.target.value;
                                                            setMusicSearchQuery(query);
                                                            if (query) {
                                                                const filtered = musicLibrary.filter((track: MusicTrack) =>
                                                                    track.title.toLowerCase().includes(query.toLowerCase()) ||
                                                                    track.artist.toLowerCase().includes(query.toLowerCase())
                                                                );
                                                                setFilteredTracks(filtered);
                                                            } else {
                                                                setFilteredTracks(musicLibrary);
                                                            }
                                                        }}
                                                        style={{
                                                            flex: 1,
                                                            background: 'transparent',
                                                            border: 'none',
                                                            outline: 'none',
                                                            color: 'white',
                                                            fontSize: '0.9rem'
                                                        }}
                                                    />
                                                    {musicSearchQuery && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setMusicSearchQuery('');
                                                                setFilteredTracks(musicLibrary);
                                                            }}
                                                            style={{
                                                                background: 'none',
                                                                border: 'none',
                                                                color: '#888',
                                                                cursor: 'pointer',
                                                                padding: '4px'
                                                            }}
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Song Grid with Thumbnails */}
                                                <div style={{
                                                    display: 'grid',
                                                    gap: '10px',
                                                    maxHeight: '300px',
                                                    overflowY: 'auto',
                                                    paddingRight: '5px'
                                                }}>
                                                    {filteredTracks.length === 0 ? (
                                                        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '20px' }}>
                                                            No songs found. Try another search.
                                                        </p>
                                                    ) : (
                                                        filteredTracks.map((track: MusicTrack) => (
                                                            <motion.div
                                                                key={track.id}
                                                                whileHover={{ scale: 1.01 }}
                                                                onClick={() => {
                                                                    setSelectedLibraryTrack(track.id);
                                                                    setMusicFile(null);
                                                                    setMusicFileName(null);
                                                                }}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '12px',
                                                                    padding: '10px 12px',
                                                                    background: selectedLibraryTrack === track.id
                                                                        ? 'linear-gradient(135deg, rgba(192,132,252,0.3), rgba(255,107,157,0.2))'
                                                                        : 'rgba(255,255,255,0.03)',
                                                                    border: selectedLibraryTrack === track.id
                                                                        ? '2px solid #c084fc'
                                                                        : '1px solid rgba(255,255,255,0.1)',
                                                                    borderRadius: '12px',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.2s'
                                                                }}
                                                            >
                                                                {/* Audio Thumbnail */}
                                                                <div style={{
                                                                    width: '60px',
                                                                    height: '45px',
                                                                    borderRadius: '8px',
                                                                    overflow: 'hidden',
                                                                    flexShrink: 0,
                                                                    background: '#222'
                                                                }}>
                                                                    <img
                                                                        src={track.thumbnail}
                                                                        alt={track.title}
                                                                        style={{
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            objectFit: 'cover'
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                                    <p style={{
                                                                        fontWeight: 600,
                                                                        fontSize: '0.9rem',
                                                                        marginBottom: '2px',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        whiteSpace: 'nowrap'
                                                                    }}>
                                                                        {track.title}
                                                                    </p>
                                                                    <p style={{
                                                                        fontSize: '0.75rem',
                                                                        color: 'var(--color-text-secondary)',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        whiteSpace: 'nowrap'
                                                                    }}>
                                                                        {track.artist} • {track.duration}
                                                                    </p>
                                                                </div>
                                                                {selectedLibraryTrack === track.id && (
                                                                    <span style={{
                                                                        background: 'linear-gradient(135deg, #c084fc, #ff6b9d)',
                                                                        padding: '4px 10px',
                                                                        borderRadius: '20px',
                                                                        fontSize: '0.7rem',
                                                                        fontWeight: 600,
                                                                        flexShrink: 0
                                                                    }}>
                                                                        ✓
                                                                    </span>
                                                                )}
                                                            </motion.div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            /* File Upload */
                                            musicFileName ? (
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    padding: '12px 16px',
                                                    background: 'rgba(192,132,252,0.15)',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Music size={20} color="#c084fc" />
                                                    <span style={{ flex: 1, fontSize: '0.9rem', color: '#c084fc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {musicFileName}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => { setMusicFile(null); setMusicFileName(null); }}
                                                        style={{
                                                            width: '28px',
                                                            height: '28px',
                                                            borderRadius: '50%',
                                                            background: '#ff4757',
                                                            border: 'none',
                                                            color: 'white',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '10px',
                                                    padding: '25px',
                                                    border: '2px dashed rgba(192,132,252,0.4)',
                                                    borderRadius: '12px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    background: 'rgba(192,132,252,0.05)'
                                                }}>
                                                    <Music size={24} color="#c084fc" />
                                                    <span style={{ color: '#c084fc', fontWeight: 500 }}>Choose Music File</span>
                                                    <input
                                                        type="file"
                                                        accept="audio/mpeg,audio/wav,audio/ogg,audio/mp4,audio/x-m4a"
                                                        onChange={(e) => {
                                                            handleMusicSelect(e);
                                                            setSelectedLibraryTrack(null);
                                                        }}
                                                        style={{ display: 'none' }}
                                                    />
                                                </label>
                                            )
                                        )}
                                    </div>

                                    <div style={{ marginBottom: '30px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>
                                            {template.isPremium ? '💝 Final Message (The Grand Reveal)' : 'Your Message 💕'}
                                        </label>
                                        <textarea className="textarea-glass" placeholder={template.isPremium ? "Write your final, most heartfelt message for the grand reveal..." : "Write your heartfelt message here..."} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={4} style={{ fontSize: '16px' }} />
                                    </div>

                                    <button type="submit" className="btn-gradient" disabled={isCreating} style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{isCreating ? 'Creating...' : template.isPremium ? '✨ Create Love Story' : 'Create Surprise'} <Send size={18} /></span>
                                    </button>
                                </form>
                            </motion.div>
                        )
                    ) : (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
                            <div className="glass-card" style={{ padding: '40px 20px' }}>
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} style={{ width: '80px', height: '80px', borderRadius: '50%', background: template.isPremium ? 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)' : 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}>
                                    {template.isPremium ? <Sparkles size={40} color="#000" /> : <Heart size={40} color="white" fill="white" />}
                                </motion.div>

                                <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '12px' }}>
                                    {template.isPremium ? '📖 Love Story Created!' : 'Surprise Created! 🎉'}
                                </h1>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '25px', fontSize: '0.95rem' }}>Share this link with <strong style={{ color: 'white' }}>{formData.recipientName}</strong></p>

                                <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '12px 15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                    <input type="text" value={createdLink} readOnly style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '0.85rem', outline: 'none', minWidth: 0 }} />
                                    <button onClick={handleCopy} style={{ background: copied ? '#10b981' : 'var(--gradient-primary)', border: 'none', borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: 'white', fontWeight: 500, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>

                                {/* Share Buttons */}
                                <div style={{ marginBottom: '25px' }}>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '15px' }}>Share via:</p>
                                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                        {/* WhatsApp */}
                                        <a
                                            href={`https://wa.me/?text=${encodeURIComponent(`💝 I made something special for you! Open this: ${createdLink}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                padding: '12px 20px',
                                                background: '#25D366',
                                                borderRadius: '12px',
                                                color: 'white',
                                                textDecoration: 'none',
                                                fontWeight: 600,
                                                fontSize: '0.9rem',
                                                transition: 'transform 0.2s'
                                            }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            WhatsApp
                                        </a>

                                        {/* Instagram (Copy for DM) */}
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(`💝 I made something special for you! Open this: ${createdLink}`);
                                                alert('Link copied! Paste it in Instagram DM 💕');
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                padding: '12px 20px',
                                                background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)',
                                                borderRadius: '12px',
                                                color: 'white',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                            Instagram
                                        </button>

                                        {/* Email */}
                                        <a
                                            href={`mailto:?subject=${encodeURIComponent('💝 A Special Surprise For You!')}&body=${encodeURIComponent(`I made something special just for you!\n\nOpen your surprise here: ${createdLink}\n\nWith love ❤️`)}`}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                padding: '12px 20px',
                                                background: '#EA4335',
                                                borderRadius: '12px',
                                                color: 'white',
                                                textDecoration: 'none',
                                                fontWeight: 600,
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <polyline points="22,6 12,13 2,6" />
                                            </svg>
                                            Email
                                        </a>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <Link href={createdLink} target="_blank" className="btn-gradient" style={{ width: '100%', justifyContent: 'center' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Preview {template.isPremium ? 'Story' : 'Surprise'} <ExternalLink size={16} /></span>
                                    </Link>
                                    <button onClick={() => { setCreatedLink(null); setShowForm(false); setFormData({ senderName: '', recipientName: '', message: '' }); setImageFile(null); setImagePreview(null); setMusicFile(null); setMusicFileName(null); if (template.defaultPages) setStoryPages(template.defaultPages); }} style={{ padding: '14px', borderRadius: '50px', border: '1px solid rgba(255, 255, 255, 0.2)', background: 'transparent', color: 'white', cursor: 'pointer', fontWeight: 500, width: '100%' }}>
                                        Create Another
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
