'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Heart, Cake, Trophy, Gem, Sparkles } from 'lucide-react';
import { templates, Template } from '@/lib/templates';
import { useState } from 'react';

const categories = [
    { id: 'all', name: 'All Templates', icon: Sparkles },
    { id: 'valentine', name: 'Valentine', icon: Heart },
    { id: 'birthday', name: 'Birthday', icon: Cake },
    { id: 'congratulations', name: 'Congrats', icon: Trophy },
    { id: 'anniversary', name: 'Anniversary', icon: Gem },
];

export default function TemplatesPage() {
    const [activeCategory, setActiveCategory] = useState('all');

    // Get templates excluding Be My Valentine sub-templates (those are on their own page)
    const otherTemplates = templates.filter(t => !t.subCategory);

    const getFilteredTemplates = () => {
        if (activeCategory === 'all') {
            return otherTemplates;
        }
        return otherTemplates.filter(t => t.category === activeCategory);
    };

    const filteredTemplates = getFilteredTemplates();
    const showBeMyValentineCard = activeCategory === 'all' || activeCategory === 'valentine';

    return (
        <main className="min-h-screen">
            <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
                {/* Back Button */}
                <Link
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        marginBottom: '40px',
                        fontSize: '0.95rem',
                        transition: 'color 0.3s ease'
                    }}
                >
                    <ArrowLeft size={18} /> Back to Home
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '40px' }}
                >
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '12px' }}>
                        Choose a <span className="gradient-text">Template</span>
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
                        Select a beautiful template to create your personalized surprise
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        display: 'flex',
                        gap: '12px',
                        marginBottom: '40px',
                        flexWrap: 'wrap'
                    }}
                >
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 20px',
                                borderRadius: '50px',
                                border: 'none',
                                background: activeCategory === cat.id
                                    ? 'var(--gradient-primary)'
                                    : 'rgba(255, 255, 255, 0.05)',
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <cat.icon size={16} />
                            {cat.name}
                        </button>
                    ))}
                </motion.div>

                {/* Templates Grid */}
                <div className="templates-grid">
                    {/* Be My Valentine - Special Card (Links to sub-page) */}
                    {showBeMyValentineCard && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Link href="/templates/be-my-valentine" style={{ textDecoration: 'none' }}>
                                <div
                                    className="glass-card"
                                    style={{
                                        padding: '30px',
                                        cursor: 'pointer',
                                        height: '100%',
                                        background: 'linear-gradient(145deg, rgba(255, 107, 157, 0.15) 0%, rgba(233, 30, 99, 0.1) 100%)',
                                        border: '1px solid rgba(255, 107, 157, 0.3)'
                                    }}
                                >
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '20px',
                                        background: 'linear-gradient(135deg, #ff6b9d 0%, #e91e63 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2.5rem',
                                        marginBottom: '20px'
                                    }}>
                                        💘
                                    </div>

                                    <div style={{
                                        display: 'inline-block',
                                        padding: '4px 12px',
                                        background: 'rgba(255, 107, 157, 0.2)',
                                        borderRadius: '20px',
                                        fontSize: '0.7rem',
                                        color: '#ff6b9d',
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                        marginBottom: '12px'
                                    }}>
                                        6 UNIQUE TEMPLATES
                                    </div>

                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        fontWeight: 600,
                                        color: 'white',
                                        marginBottom: '8px'
                                    }}>
                                        Be My Valentine? 💕
                                    </h3>

                                    <p style={{
                                        color: 'var(--color-text-secondary)',
                                        fontSize: '0.95rem',
                                        lineHeight: 1.6
                                    }}>
                                        6 unique interactive ways to ask that special question
                                    </p>

                                    <div style={{
                                        marginTop: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: '#ff6b9d',
                                        fontWeight: 500,
                                        fontSize: '0.9rem'
                                    }}>
                                        Explore Templates <ArrowRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}

                    {/* Other Templates */}
                    {filteredTemplates.map((template: Template, index: number) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (index + 1) * 0.1 }}
                        >
                            <Link href={`/create/${template.id}`} style={{ textDecoration: 'none' }}>
                                <div
                                    className="glass-card"
                                    style={{
                                        padding: '30px',
                                        cursor: 'pointer',
                                        height: '100%'
                                    }}
                                >
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '20px',
                                        background: `linear-gradient(135deg, ${template.primaryColor}30, ${template.secondaryColor}20)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2.5rem',
                                        marginBottom: '20px'
                                    }}>
                                        {template.icon}
                                    </div>

                                    <div style={{
                                        display: 'inline-block',
                                        padding: '4px 12px',
                                        background: `${template.primaryColor}20`,
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        color: template.primaryColor,
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                        marginBottom: '12px'
                                    }}>
                                        {template.category}
                                    </div>

                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        fontWeight: 600,
                                        color: 'white',
                                        marginBottom: '8px'
                                    }}>
                                        {template.name}
                                    </h3>

                                    <p style={{
                                        color: 'var(--color-text-secondary)',
                                        fontSize: '0.95rem',
                                        lineHeight: 1.6
                                    }}>
                                        {template.description}
                                    </p>

                                    <div style={{
                                        marginTop: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: template.primaryColor,
                                        fontWeight: 500,
                                        fontSize: '0.9rem'
                                    }}>
                                        Use Template <ArrowRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
