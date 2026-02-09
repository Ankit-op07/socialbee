'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Heart, Sparkles, ArrowRight, Gift, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { Surprise, getTemplateById } from '@/lib/templates';

// Floating Hearts Component
function FloatingHearts() {
    const hearts = ['💕', '❤️', '💖', '💗', '💝', '💘'];
    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: '100vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
                    animate={{ y: '-20vh', opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
                    style={{ position: 'fixed', fontSize: `${1 + Math.random() * 1.5}rem` }}
                >
                    {hearts[Math.floor(Math.random() * hearts.length)]}
                </motion.div>
            ))}
        </div>
    );
}

// Confetti Component
function Confetti() {
    const colors = ['#ff6b9d', '#c084fc', '#ffd700', '#ff3366', '#10b981'];
    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: '-10vh', x: `${Math.random() * 100}vw`, rotate: 0 }}
                    animate={{ y: '110vh', rotate: 720 }}
                    transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
                    style={{
                        position: 'fixed',
                        width: '10px',
                        height: '10px',
                        background: colors[Math.floor(Math.random() * colors.length)],
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px'
                    }}
                />
            ))}
        </div>
    );
}

// Music Player Component - Audio autoplay on reveal
function MusicPlayer({ musicUrl, autoPlay = true }: { musicUrl: string; autoPlay?: boolean }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    // Autoplay when component mounts
    useEffect(() => {
        if (autoPlay && audioRef.current) {
            // Try to autoplay immediately
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch(() => {
                        // Autoplay was prevented - will need user interaction
                        // Add listener for first click
                        const tryPlay = () => {
                            if (audioRef.current) {
                                audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
                            }
                            window.removeEventListener('click', tryPlay);
                            window.removeEventListener('touchstart', tryPlay);
                        };
                        window.addEventListener('click', tryPlay);
                        window.addEventListener('touchstart', tryPlay);
                    });
            }
        }
    }, [autoPlay]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
        }
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50px',
                border: '1px solid rgba(255,107,157,0.3)',
                zIndex: 100
            }}
        >
            <audio ref={audioRef} src={musicUrl} loop />

            <span style={{ fontSize: '0.75rem', color: '#ff6b9d' }}>
                {isPlaying ? '🎵 Playing' : '🎵 Music'}
            </span>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff6b9d, #c084fc)',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {isPlaying ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" />}
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: isMuted ? '#888' : '#c084fc',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </motion.button>
        </motion.div>
    );
}



// ===== TEMPLATE 1: ESCAPING LOVE (No button runs away) =====
function EscapingLoveTemplate({ surprise, onReveal }: { surprise: Surprise; onReveal?: () => void }) {
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
    const [showMessage, setShowMessage] = useState(false);

    const handleNoHover = () => {
        const maxX = window.innerWidth < 500 ? 100 : 150;
        const maxY = window.innerWidth < 500 ? 80 : 100;
        setNoPosition({
            x: (Math.random() - 0.5) * maxX,
            y: (Math.random() - 0.5) * maxY
        });
    };

    const handleYes = () => {
        setShowMessage(true);
        if (onReveal) onReveal();
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
            textAlign: 'center',
            padding: '20px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <FloatingHearts />

            {!showMessage ? (
                <>
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontSize: 'clamp(4rem, 15vw, 6rem)', marginBottom: '20px' }}
                    >
                        💘
                    </motion.div>

                    <motion.h1
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        style={{
                            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                            fontWeight: 700,
                            marginBottom: '10px',
                            padding: '0 20px'
                        }}
                    >
                        Hey {surprise.recipientName}! 💕
                    </motion.h1>

                    <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                            color: '#ff6b9d',
                            marginBottom: '40px',
                            padding: '0 20px'
                        }}
                    >
                        Will you be my Valentine?
                    </motion.p>

                    <div style={{
                        display: 'flex',
                        gap: 'clamp(15px, 4vw, 30px)',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        position: 'relative',
                        minHeight: '80px'
                    }}>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleYes}
                            style={{
                                padding: 'clamp(12px, 3vw, 16px) clamp(30px, 8vw, 50px)',
                                fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                                background: 'linear-gradient(135deg, #ff6b9d, #ff3366)',
                                border: 'none',
                                borderRadius: '50px',
                                color: 'white',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(255, 51, 102, 0.4)'
                            }}
                        >
                            Yes! 💕
                        </motion.button>

                        <motion.button
                            animate={{ x: noPosition.x, y: noPosition.y }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            onMouseEnter={handleNoHover}
                            onTouchStart={handleNoHover}
                            style={{
                                padding: 'clamp(12px, 3vw, 16px) clamp(30px, 8vw, 50px)',
                                fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                                background: 'rgba(255,255,255,0.1)',
                                border: '2px solid rgba(255,255,255,0.3)',
                                borderRadius: '50px',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            No 😢
                        </motion.button>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        style={{ marginTop: '30px', fontSize: '0.9rem', color: '#888' }}
                    >
                        Try clicking No... if you can! 😉
                    </motion.p>
                </>
            ) : (
                <>
                    <Confetti />
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ fontSize: 'clamp(4rem, 15vw, 6rem)', marginBottom: '20px' }}
                        >
                            💖
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                fontSize: 'clamp(2rem, 6vw, 2.5rem)',
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #ff6b9d, #c084fc)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '25px'
                            }}
                        >
                            Yay! You said YES! 🎉
                        </motion.h1>

                        {/* Special Image if present */}
                        {surprise.imageUrl && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                style={{
                                    marginBottom: '25px',
                                    padding: '8px',
                                    background: 'linear-gradient(135deg, #ff6b9d, #c084fc)',
                                    borderRadius: '20px',
                                    display: 'inline-block'
                                }}
                            >
                                <img
                                    src={surprise.imageUrl}
                                    alt="Our special moment"
                                    style={{
                                        maxWidth: 'min(300px, 80vw)',
                                        maxHeight: '250px',
                                        objectFit: 'cover',
                                        borderRadius: '15px',
                                        display: 'block'
                                    }}
                                />
                                <p style={{
                                    marginTop: '10px',
                                    fontSize: '0.85rem',
                                    color: 'white',
                                    fontWeight: 500
                                }}>
                                    💕 Our Special Moment 💕
                                </p>
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: surprise.imageUrl ? 0.8 : 0.5 }}
                            style={{
                                background: 'linear-gradient(145deg, rgba(255,107,157,0.15), rgba(192,132,252,0.1))',
                                border: '2px solid rgba(255,107,157,0.3)',
                                padding: 'clamp(25px, 6vw, 40px)',
                                borderRadius: '25px',
                                maxWidth: '500px',
                                margin: '0 auto 30px'
                            }}
                        >
                            <p style={{
                                fontSize: 'clamp(1.2rem, 3.5vw, 1.4rem)',
                                lineHeight: 1.9,
                                marginBottom: '25px',
                                fontStyle: 'italic'
                            }}>
                                "{surprise.message}"
                            </p>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '2px',
                                    background: 'linear-gradient(90deg, transparent, #ff6b9d)'
                                }} />
                                <p style={{
                                    color: '#ff6b9d',
                                    fontWeight: 700,
                                    fontSize: '1.1rem'
                                }}>
                                    Forever yours, {surprise.senderName}
                                </p>
                                <div style={{
                                    width: '40px',
                                    height: '2px',
                                    background: 'linear-gradient(90deg, #ff6b9d, transparent)'
                                }} />
                            </div>
                        </motion.div>

                        {/* Animated Hearts */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}
                        >
                            {['💕', '💖', '💝', '💗', '💕'].map((heart, i) => (
                                <motion.span
                                    key={i}
                                    animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                                    style={{ fontSize: '1.8rem' }}
                                >
                                    {heart}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </motion.div>
    );
}

// ===== TEMPLATE 2: LOVE LOCK (Unlock hearts to reveal) =====
function LoveLockTemplate({ surprise }: { surprise: Surprise }) {
    const [unlocked, setUnlocked] = useState(false);
    const [keyRotation, setKeyRotation] = useState(0);

    const handleUnlock = () => {
        setKeyRotation(360);
        setTimeout(() => setUnlocked(true), 800);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
            textAlign: 'center',
            padding: '20px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <FloatingHearts />

            {!unlocked ? (
                <>
                    <motion.h1 style={{
                        fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                        marginBottom: '30px',
                        padding: '0 20px'
                    }}>
                        {surprise.recipientName}, unlock your heart 💝
                    </motion.h1>

                    <div style={{ position: 'relative', marginBottom: '40px' }}>
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ fontSize: 'clamp(6rem, 20vw, 10rem)' }}
                        >
                            🔒
                        </motion.div>

                        <motion.div
                            animate={{ rotate: keyRotation }}
                            transition={{ duration: 0.8 }}
                            style={{
                                fontSize: 'clamp(3rem, 10vw, 5rem)',
                                position: 'absolute',
                                bottom: '-30px',
                                right: '-20px'
                            }}
                        >
                            🔑
                        </motion.div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleUnlock}
                        style={{
                            padding: '16px 50px',
                            fontSize: '1.2rem',
                            background: 'linear-gradient(135deg, #e91e63, #c2185b)',
                            border: 'none',
                            borderRadius: '50px',
                            color: 'white',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        Unlock With Love 🔓
                    </motion.button>
                </>
            ) : (
                <>
                    <Confetti />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        <motion.div style={{ fontSize: 'clamp(4rem, 15vw, 6rem)', marginBottom: '20px' }}>
                            💖
                        </motion.div>

                        <motion.h1 style={{
                            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                            fontWeight: 700,
                            marginBottom: '10px',
                            color: '#ff6b9d'
                        }}>
                            Will you be my Valentine?
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                padding: 'clamp(20px, 5vw, 40px)',
                                borderRadius: '20px',
                                maxWidth: '500px',
                                margin: '20px auto 0'
                            }}
                        >
                            <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', lineHeight: 1.8, marginBottom: '25px' }}>
                                {surprise.message}
                            </p>
                            <p style={{ color: '#e91e63', fontWeight: 600 }}>
                                With love, {surprise.senderName} 💕
                            </p>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </motion.div>
    );
}

// ===== TEMPLATE 3: HEART EXPLOSION =====
function HeartExplosionTemplate({ surprise }: { surprise: Surprise }) {
    const [exploded, setExploded] = useState(false);
    const [hearts, setHearts] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

    const handleExplosion = () => {
        const newHearts = [...Array(30)].map((_, i) => ({
            id: i,
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            size: 20 + Math.random() * 40
        }));
        setHearts(newHearts);
        setTimeout(() => setExploded(true), 1500);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
            textAlign: 'center',
            padding: '20px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {!exploded ? (
                <>
                    <motion.h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '30px' }}>
                        {surprise.recipientName}, click the heart! 💗
                    </motion.h1>

                    <div style={{ position: 'relative' }}>
                        {hearts.map((heart) => (
                            <motion.div
                                key={heart.id}
                                initial={{ x: 0, y: 0, scale: 0 }}
                                animate={{ x: heart.x, y: heart.y, scale: 1, opacity: 0 }}
                                transition={{ duration: 1.5 }}
                                style={{
                                    position: 'absolute',
                                    fontSize: `${heart.size}px`,
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                💖
                            </motion.div>
                        ))}

                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            onClick={handleExplosion}
                            style={{
                                fontSize: 'clamp(6rem, 25vw, 10rem)',
                                cursor: 'pointer',
                                filter: 'drop-shadow(0 0 30px rgba(255,77,109,0.5))'
                            }}
                        >
                            💗
                        </motion.div>
                    </div>

                    <p style={{ marginTop: '30px', color: '#888' }}>Tap to explode with love!</p>
                </>
            ) : (
                <>
                    <Confetti />
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                        <motion.div style={{ fontSize: 'clamp(4rem, 15vw, 6rem)', marginBottom: '20px' }}>💥💖💥</motion.div>
                        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: '#ff4081', marginBottom: '20px' }}>
                            Will you be my Valentine?
                        </h1>
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: 'clamp(20px, 5vw, 40px)',
                            borderRadius: '20px',
                            maxWidth: '500px',
                            margin: '0 auto'
                        }}>
                            <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', lineHeight: 1.8, marginBottom: '25px' }}>
                                {surprise.message}
                            </p>
                            <p style={{ color: '#ff4081', fontWeight: 600 }}>
                                With love, {surprise.senderName} 💕
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </motion.div>
    );
}

// ===== TEMPLATE 4: LOVE METER =====
function LoveMeterTemplate({ surprise }: { surprise: Surprise }) {
    const [level, setLevel] = useState(0);
    const [revealed, setRevealed] = useState(false);

    const handleSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLevel = parseInt(e.target.value);
        setLevel(newLevel);
        if (newLevel >= 100) {
            setTimeout(() => setRevealed(true), 500);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
            textAlign: 'center',
            padding: '20px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <FloatingHearts />

            {!revealed ? (
                <>
                    <motion.h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '30px' }}>
                        {surprise.recipientName}, fill the love meter! 💕
                    </motion.h1>

                    <div style={{
                        width: 'min(80vw, 300px)',
                        height: '60px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '30px',
                        overflow: 'hidden',
                        position: 'relative',
                        marginBottom: '30px'
                    }}>
                        <motion.div
                            animate={{ width: `${level}%` }}
                            style={{
                                height: '100%',
                                background: 'linear-gradient(90deg, #ff6b9d, #ff3366, #ec407a)',
                                borderRadius: '30px'
                            }}
                        />
                        <span style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            color: 'white',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            {level}% 💖
                        </span>
                    </div>

                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={level}
                        onChange={handleSlide}
                        style={{ width: 'min(80vw, 300px)', cursor: 'pointer' }}
                    />

                    <p style={{ marginTop: '20px', color: '#888' }}>
                        {level < 50 ? 'Keep going...' : level < 100 ? 'Almost there!' : 'Overflowing with love!'}
                    </p>
                </>
            ) : (
                <>
                    <Confetti />
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                        <motion.div style={{ fontSize: 'clamp(4rem, 15vw, 6rem)', marginBottom: '20px' }}>💝</motion.div>
                        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: '#ec407a', marginBottom: '20px' }}>
                            Will you be my Valentine?
                        </h1>
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: 'clamp(20px, 5vw, 40px)',
                            borderRadius: '20px',
                            maxWidth: '500px',
                            margin: '0 auto'
                        }}>
                            <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', lineHeight: 1.8, marginBottom: '25px' }}>
                                {surprise.message}
                            </p>
                            <p style={{ color: '#ec407a', fontWeight: 600 }}>
                                With love, {surprise.senderName} 💕
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </motion.div>
    );
}

// ===== TEMPLATE 5: FORTUNE HEART =====
function FortuneHeartTemplate({ surprise }: { surprise: Surprise }) {
    const [cracked, setCracked] = useState(false);
    const [revealed, setRevealed] = useState(false);

    const handleCrack = () => {
        setCracked(true);
        setTimeout(() => setRevealed(true), 1000);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
            textAlign: 'center',
            padding: '20px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <FloatingHearts />

            {!revealed ? (
                <>
                    <motion.h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '30px' }}>
                        {surprise.recipientName}, crack open your fortune! 🥠
                    </motion.h1>

                    <motion.div
                        animate={cracked ? { scale: [1, 1.2, 0], rotate: [0, 10, -10, 0] } : { scale: [1, 1.05, 1] }}
                        transition={cracked ? { duration: 1 } : { duration: 2, repeat: Infinity }}
                        onClick={handleCrack}
                        style={{
                            fontSize: 'clamp(6rem, 25vw, 10rem)',
                            cursor: 'pointer'
                        }}
                    >
                        {cracked ? '💔' : '💖'}
                    </motion.div>

                    <p style={{ marginTop: '30px', color: '#888' }}>Tap to reveal your fortune!</p>
                </>
            ) : (
                <>
                    <Confetti />
                    <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring' }}>
                        <motion.div style={{ fontSize: 'clamp(3rem, 12vw, 5rem)', marginBottom: '20px' }}>✨🥠✨</motion.div>
                        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: '#f06292', marginBottom: '20px' }}>
                            Will you be my Valentine?
                        </h1>
                        <div style={{
                            background: 'linear-gradient(145deg, rgba(240,98,146,0.2), rgba(233,30,99,0.1))',
                            padding: 'clamp(20px, 5vw, 40px)',
                            borderRadius: '20px',
                            maxWidth: '500px',
                            margin: '0 auto',
                            border: '2px solid rgba(240,98,146,0.3)'
                        }}>
                            <p style={{
                                fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                                lineHeight: 1.8,
                                marginBottom: '25px',
                                fontStyle: 'italic'
                            }}>
                                &ldquo;{surprise.message}&rdquo;
                            </p>
                            <p style={{ color: '#f06292', fontWeight: 600 }}>
                                ~ {surprise.senderName} 💕
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </motion.div>
    );
}

// ===== TEMPLATE 6: SPIN WHEEL =====
function SpinWheelTemplate({ surprise }: { surprise: Surprise }) {
    const [spinning, setSpinning] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const [rotation, setRotation] = useState(0);

    const handleSpin = () => {
        if (spinning) return;
        setSpinning(true);
        const spins = 5 + Math.random() * 3;
        setRotation(spins * 360);
        setTimeout(() => setRevealed(true), 3500);
    };

    const options = ['💕 YES', '💖 YES', '💝 YES', '❤️ YES', '💘 YES', '💗 YES', '💓 YES', '💞 YES'];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
            textAlign: 'center',
            padding: '20px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <FloatingHearts />

            {!revealed ? (
                <>
                    <motion.h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '30px' }}>
                        {surprise.recipientName}, spin the wheel! 🎡
                    </motion.h1>

                    <div style={{ position: 'relative', marginBottom: '30px' }}>
                        {/* Wheel */}
                        <motion.div
                            animate={{ rotate: rotation }}
                            transition={{ duration: 3.5, ease: 'easeOut' }}
                            style={{
                                width: 'min(80vw, 280px)',
                                height: 'min(80vw, 280px)',
                                borderRadius: '50%',
                                background: 'conic-gradient(#ff6b9d, #ec407a, #e91e63, #d81b60, #c2185b, #ad1457, #880e4f, #ff6b9d)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 50px rgba(255,107,157,0.4)'
                            }}
                        >
                            <div style={{
                                width: '70%',
                                height: '70%',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column'
                            }}>
                                <span style={{ fontSize: '2rem' }}>💘</span>
                                <span style={{ fontSize: '0.8rem', color: '#ff6b9d' }}>Every option is YES!</span>
                            </div>
                        </motion.div>

                        {/* Pointer */}
                        <div style={{
                            position: 'absolute',
                            top: '-15px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '2rem'
                        }}>
                            ▼
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSpin}
                        disabled={spinning}
                        style={{
                            padding: '16px 50px',
                            fontSize: '1.2rem',
                            background: spinning ? '#888' : 'linear-gradient(135deg, #ad1457, #880e4f)',
                            border: 'none',
                            borderRadius: '50px',
                            color: 'white',
                            fontWeight: 700,
                            cursor: spinning ? 'wait' : 'pointer'
                        }}
                    >
                        {spinning ? 'Spinning...' : 'Spin!'} 🎡
                    </motion.button>
                </>
            ) : (
                <>
                    <Confetti />
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                        <motion.div style={{ fontSize: 'clamp(3rem, 12vw, 5rem)', marginBottom: '20px' }}>🎉💘🎉</motion.div>
                        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#ad1457', marginBottom: '10px' }}>
                            The wheel says...
                        </h1>
                        <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', color: '#ff6b9d', marginBottom: '20px' }}>
                            BE MY VALENTINE! 💕
                        </h2>
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: 'clamp(20px, 5vw, 40px)',
                            borderRadius: '20px',
                            maxWidth: '500px',
                            margin: '0 auto'
                        }}>
                            <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', lineHeight: 1.8, marginBottom: '25px' }}>
                                {surprise.message}
                            </p>
                            <p style={{ color: '#ad1457', fontWeight: 600 }}>
                                With love, {surprise.senderName} 💕
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </motion.div>
    );
}

// ===== OTHER TEMPLATES =====
function LoveLetterTemplate({ surprise }: { surprise: Surprise }) {
    const [typedText, setTypedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let i = 0;
        const text = surprise.message;
        const interval = setInterval(() => {
            if (i < text.length) {
                setTypedText(text.slice(0, i + 1));
                i++;
            } else {
                setIsComplete(true);
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, [surprise.message]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
            textAlign: 'center',
            padding: '20px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <FloatingHearts />
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💌</div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '30px' }}>
                A Love Letter for {surprise.recipientName}
            </h1>
            <div style={{
                background: 'rgba(231, 76, 136, 0.1)',
                padding: '40px',
                borderRadius: '20px',
                maxWidth: '600px',
                fontFamily: 'Georgia, serif',
                fontSize: '1.2rem',
                lineHeight: 1.8,
                textAlign: 'left'
            }}>
                <p>Dear {surprise.recipientName},</p>
                <p style={{ marginTop: '20px' }}>
                    {typedText}
                    {!isComplete && <span style={{ animation: 'blink 1s infinite' }}>|</span>}
                </p>
                {isComplete && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ marginTop: '30px', color: '#e74c88' }}
                    >
                        Forever yours, {surprise.senderName} 💕
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
}

function RosesBloomTemplate({ surprise }: { surprise: Surprise }) {
    const [bloomed, setBloomed] = useState(0);
    const totalRoses = 5;

    useEffect(() => {
        const interval = setInterval(() => {
            setBloomed(prev => prev < totalRoses ? prev + 1 : prev);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
            textAlign: 'center',
            padding: '20px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <FloatingHearts />
            <h1 style={{ fontSize: '1.8rem', marginBottom: '30px' }}>
                For {surprise.recipientName} 🌹
            </h1>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                {[...Array(totalRoses)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: bloomed > i ? 1 : 0, rotate: bloomed > i ? 0 : -180 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        style={{ fontSize: '3rem' }}
                    >
                        🌹
                    </motion.div>
                ))}
            </div>
            {bloomed === totalRoses && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'rgba(255,10,84,0.1)',
                        padding: '40px',
                        borderRadius: '20px',
                        maxWidth: '500px'
                    }}
                >
                    <p style={{ fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '25px' }}>
                        {surprise.message}
                    </p>
                    <p style={{ color: '#ff0a54', fontWeight: 600 }}>
                        With all my love, {surprise.senderName} 💕
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}

function DefaultTemplate({ surprise }: { surprise: Surprise }) {
    const template = getTemplateById(surprise.templateId);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
            textAlign: 'center',
            padding: '20px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Confetti />
            <div style={{ fontSize: '5rem', marginBottom: '20px' }}>{template?.icon || '🎉'}</div>
            <h1 style={{ fontSize: '2rem', marginBottom: '15px' }}>
                For {surprise.recipientName}!
            </h1>
            <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '40px',
                borderRadius: '20px',
                maxWidth: '500px'
            }}>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '25px' }}>
                    {surprise.message}
                </p>
                <p style={{ color: template?.primaryColor || '#ff6b9d', fontWeight: 600 }}>
                    From {surprise.senderName} 💕
                </p>
            </div>
        </motion.div>
    );
}

// ===== PREMIUM TEMPLATE: LOVE STORY JOURNEY =====
function LoveStoryTemplate({ surprise }: { surprise: Surprise }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageRevealed, setPageRevealed] = useState<boolean[]>([]);
    const [holdProgress, setHoldProgress] = useState(0);
    const [scratchProgress, setScratchProgress] = useState(0);
    const [puzzlePieces, setPuzzlePieces] = useState<boolean[]>([false, false, false, false]);
    const [showFinalReveal, setShowFinalReveal] = useState(false);
    const holdInterval = useRef<NodeJS.Timeout | null>(null);

    const pages = surprise.storyPages || [];
    const totalPages = pages.length;

    useEffect(() => {
        setPageRevealed(new Array(totalPages).fill(false));
    }, [totalPages]);

    const revealCurrentPage = () => {
        const newRevealed = [...pageRevealed];
        newRevealed[currentPage] = true;
        setPageRevealed(newRevealed);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
            setHoldProgress(0);
            setScratchProgress(0);
            setPuzzlePieces([false, false, false, false]);
        } else {
            setShowFinalReveal(true);
        }
    };

    // Interaction handlers
    const handleTapReveal = () => {
        revealCurrentPage();
    };

    const handleSwipeHearts = () => {
        revealCurrentPage();
    };

    const handleHoldStart = () => {
        holdInterval.current = setInterval(() => {
            setHoldProgress(prev => {
                if (prev >= 100) {
                    if (holdInterval.current) clearInterval(holdInterval.current);
                    revealCurrentPage();
                    return 100;
                }
                return prev + 5;
            });
        }, 50);
    };

    const handleHoldEnd = () => {
        if (holdInterval.current) clearInterval(holdInterval.current);
        if (holdProgress < 100) setHoldProgress(0);
    };

    const handleScratch = () => {
        setScratchProgress(prev => {
            const newProgress = prev + 10;
            if (newProgress >= 100) {
                revealCurrentPage();
                return 100;
            }
            return newProgress;
        });
    };

    const handlePuzzlePiece = (index: number) => {
        const newPieces = [...puzzlePieces];
        newPieces[index] = true;
        setPuzzlePieces(newPieces);
        if (newPieces.every(p => p)) {
            setTimeout(() => revealCurrentPage(), 500);
        }
    };

    const renderInteraction = (interactionType: string) => {
        switch (interactionType) {
            case 'tap-to-reveal':
                return (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTapReveal}
                        style={{
                            padding: '20px 50px',
                            fontSize: '1.2rem',
                            background: 'linear-gradient(135deg, #ff1744, #d50000)',
                            border: 'none',
                            borderRadius: '50px',
                            color: 'white',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 10px 30px rgba(255, 23, 68, 0.4)'
                        }}
                    >
                        👆 Tap to Reveal
                    </motion.button>
                );
            case 'swipe-hearts':
                return (
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.3, rotate: 15 }}
                                whileTap={{ scale: 0.8 }}
                                onClick={handleSwipeHearts}
                                style={{ fontSize: '3rem', cursor: 'pointer' }}
                            >
                                💕
                            </motion.div>
                        ))}
                        <p style={{ width: '100%', textAlign: 'center', marginTop: '15px', color: '#888' }}>
                            Tap any heart to reveal!
                        </p>
                    </div>
                );
            case 'hold-to-fill':
                return (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '200px',
                            height: '30px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            margin: '0 auto 20px'
                        }}>
                            <motion.div
                                animate={{ width: `${holdProgress}%` }}
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #ff1744, #d50000)',
                                    borderRadius: '15px'
                                }}
                            />
                        </div>
                        <motion.button
                            onMouseDown={handleHoldStart}
                            onMouseUp={handleHoldEnd}
                            onMouseLeave={handleHoldEnd}
                            onTouchStart={handleHoldStart}
                            onTouchEnd={handleHoldEnd}
                            whileHover={{ scale: 1.05 }}
                            style={{
                                padding: '20px 50px',
                                fontSize: '1.2rem',
                                background: holdProgress >= 100 ? '#10b981' : 'linear-gradient(135deg, #ff1744, #d50000)',
                                border: 'none',
                                borderRadius: '50px',
                                color: 'white',
                                fontWeight: 700,
                                cursor: 'pointer'
                            }}
                        >
                            {holdProgress >= 100 ? '✓ Revealed!' : '⏳ Hold to Fill'}
                        </motion.button>
                    </div>
                );
            case 'scratch-reveal':
                return (
                    <div style={{ textAlign: 'center' }}>
                        <motion.div
                            onClick={handleScratch}
                            whileHover={{ scale: 1.02 }}
                            style={{
                                width: '250px',
                                height: '150px',
                                background: scratchProgress >= 100
                                    ? 'linear-gradient(135deg, #ff1744, #d50000)'
                                    : `linear-gradient(135deg, rgba(100,100,100,${1 - scratchProgress / 100}), rgba(80,80,80,${1 - scratchProgress / 100}))`,
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                margin: '0 auto',
                                fontSize: '1.5rem',
                                color: 'white',
                                fontWeight: 600
                            }}
                        >
                            {scratchProgress >= 100 ? '💖 Revealed!' : `✨ Scratch here! ${scratchProgress}%`}
                        </motion.div>
                        <p style={{ marginTop: '15px', color: '#888' }}>Click repeatedly to scratch!</p>
                    </div>
                );
            case 'puzzle-piece':
                return (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 80px)',
                            gap: '10px',
                            justifyContent: 'center',
                            marginBottom: '20px'
                        }}>
                            {puzzlePieces.map((revealed, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handlePuzzlePiece(i)}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        background: revealed ? 'linear-gradient(135deg, #ff1744, #d50000)' : 'rgba(255,255,255,0.1)',
                                        borderRadius: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        fontSize: '2rem'
                                    }}
                                >
                                    {revealed ? '💖' : '🧩'}
                                </motion.div>
                            ))}
                        </div>
                        <p style={{ color: '#888' }}>Complete the puzzle!</p>
                    </div>
                );
            default:
                return (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTapReveal}
                        style={{
                            padding: '20px 50px',
                            fontSize: '1.2rem',
                            background: 'linear-gradient(135deg, #ff1744, #d50000)',
                            border: 'none',
                            borderRadius: '50px',
                            color: 'white',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        Reveal
                    </motion.button>
                );
        }
    };

    if (showFinalReveal) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    textAlign: 'center',
                    padding: '20px',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Confetti />
                <FloatingHearts />

                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                >
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ fontSize: 'clamp(5rem, 20vw, 8rem)', marginBottom: '20px' }}
                    >
                        💖
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{
                            fontSize: 'clamp(2rem, 6vw, 3rem)',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #ff1744, #d50000)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '20px'
                        }}
                    >
                        Will You Be My Valentine?
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        style={{
                            background: 'linear-gradient(145deg, rgba(255,23,68,0.15), rgba(213,0,0,0.1))',
                            border: '2px solid rgba(255,23,68,0.3)',
                            padding: 'clamp(25px, 6vw, 50px)',
                            borderRadius: '25px',
                            maxWidth: '550px',
                            margin: '0 auto'
                        }}
                    >
                        <p style={{
                            fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)',
                            lineHeight: 1.9,
                            marginBottom: '30px',
                            fontStyle: 'italic'
                        }}>
                            "{surprise.finalMessage || surprise.message}"
                        </p>
                        <p style={{
                            color: '#ff1744',
                            fontWeight: 700,
                            fontSize: '1.2rem'
                        }}>
                            Forever yours, {surprise.senderName} 💕
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            style={{ fontSize: '2rem' }}
                        >
                            💝
                        </motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                            style={{ fontSize: '2rem' }}
                        >
                            💖
                        </motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                            style={{ fontSize: '2rem' }}
                        >
                            💕
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                textAlign: 'center',
                padding: '20px',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <FloatingHearts />

            {/* Progress Indicator */}
            <div style={{
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                zIndex: 100
            }}>
                {pages.map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: i === currentPage ? 1.2 : 1,
                            opacity: i <= currentPage ? 1 : 0.3
                        }}
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: i < currentPage || (i === currentPage && pageRevealed[i])
                                ? 'linear-gradient(135deg, #ff1744, #d50000)'
                                : 'rgba(255,255,255,0.3)'
                        }}
                    />
                ))}
            </div>

            {/* Story Page */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    style={{ maxWidth: '500px', width: '100%' }}
                >
                    {/* Chapter Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        style={{
                            display: 'inline-block',
                            padding: '8px 20px',
                            background: 'linear-gradient(135deg, #ff1744, #d50000)',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            marginBottom: '20px'
                        }}
                    >
                        📖 Chapter {currentPage + 1} of {totalPages}
                    </motion.div>

                    <motion.h2
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        style={{
                            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                            fontWeight: 700,
                            marginBottom: '30px',
                            color: '#ff1744'
                        }}
                    >
                        {pages[currentPage]?.title}
                    </motion.h2>

                    {/* Interaction or Revealed Content */}
                    {!pageRevealed[currentPage] ? (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {renderInteraction(pages[currentPage]?.interactionType || 'tap-to-reveal')}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <div style={{
                                background: 'rgba(255,23,68,0.1)',
                                border: '1px solid rgba(255,23,68,0.2)',
                                padding: 'clamp(20px, 5vw, 35px)',
                                borderRadius: '20px',
                                marginBottom: '30px'
                            }}>
                                <p style={{
                                    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                                    lineHeight: 1.8,
                                    fontStyle: 'italic'
                                }}>
                                    "{pages[currentPage]?.content}"
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={goToNextPage}
                                style={{
                                    padding: '16px 40px',
                                    fontSize: '1.1rem',
                                    background: 'linear-gradient(135deg, #ff1744, #d50000)',
                                    border: 'none',
                                    borderRadius: '50px',
                                    color: 'white',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 30px rgba(255, 23, 68, 0.3)'
                                }}
                            >
                                {currentPage < totalPages - 1 ? 'Next Chapter →' : '💖 The Grand Finale'}
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Sender Info */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                    position: 'fixed',
                    bottom: '80px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: '#888',
                    fontSize: '0.9rem'
                }}
            >
                A love story from {surprise.senderName} 💕
            </motion.p>
        </motion.div>
    );
}

// Envelope Reveal
function EnvelopeReveal({ onOpen }: { onOpen: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
            }}
        >
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '40px', textAlign: 'center' }}
            >
                You have a special surprise! 💌
            </motion.h1>

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
                style={{
                    fontSize: 'clamp(6rem, 25vw, 10rem)',
                    cursor: 'pointer',
                    filter: 'drop-shadow(0 20px 40px rgba(255,107,157,0.3))'
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                💝
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ marginTop: '30px', color: '#888', fontSize: '1rem' }}
            >
                Tap to open your surprise!
            </motion.p>
        </motion.div>
    );
}

// Main Page Component
export default function SurprisePage() {
    const params = useParams();
    const id = params.id as string;

    const [surprise, setSurprise] = useState<Surprise | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const fetchSurprise = async () => {
            try {
                const res = await fetch(`/api/surprises?id=${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setSurprise(data);
                } else {
                    setError(true);
                }
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchSurprise();
    }, [id]);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ fontSize: '3rem' }}
                >
                    💖
                </motion.div>
            </div>
        );
    }

    if (error || !surprise) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>😢</div>
                <h1 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Surprise not found</h1>
                <Link href="/" className="btn-gradient">
                    <span>Create Your Own</span>
                </Link>
            </div>
        );
    }

    // Skip envelope reveal - go straight to template

    const handleReveal = () => setRevealed(true);

    // Render appropriate template
    const renderTemplate = () => {
        switch (surprise.templateId) {
            case 'valentine-escape':
                return <EscapingLoveTemplate surprise={surprise} onReveal={handleReveal} />;
            case 'valentine-love-lock':
                return <LoveLockTemplate surprise={surprise} />;
            case 'valentine-heart-explosion':
                return <HeartExplosionTemplate surprise={surprise} />;
            case 'valentine-love-meter':
                return <LoveMeterTemplate surprise={surprise} />;
            case 'valentine-fortune-heart':
                return <FortuneHeartTemplate surprise={surprise} />;
            case 'valentine-spin-wheel':
                return <SpinWheelTemplate surprise={surprise} />;
            case 'valentine-love-story':
                return <LoveStoryTemplate surprise={surprise} />;
            case 'love-letter-reveal':
                return <LoveLetterTemplate surprise={surprise} />;
            case 'roses-bloom':
                return <RosesBloomTemplate surprise={surprise} />;
            default:
                return <DefaultTemplate surprise={surprise} />;
        }
    };

    return (
        <main style={{ minHeight: '100vh' }}>
            <AnimatePresence mode="wait">
                {renderTemplate()}
            </AnimatePresence>

            {/* Music Player - Show immediately when musicUrl exists */}
            {surprise.musicUrl && (
                <MusicPlayer musicUrl={surprise.musicUrl} autoPlay={true} />
            )}

            {/* Create Your Own CTA - Only show after reveal */}
            {revealed && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 100
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            background: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '50px',
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        <Sparkles size={16} />
                        Create your own surprise
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>
            )}
        </main>
    );
}
