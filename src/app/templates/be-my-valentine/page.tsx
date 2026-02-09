'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { getBeMyValentineTemplates, Template } from '@/lib/templates';

export default function BeMyValentinePage() {
    const templates = getBeMyValentineTemplates();

    return (
        <main className="min-h-screen">
            <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
                {/* Back Button */}
                <Link
                    href="/templates"
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
                    <ArrowLeft size={18} /> Back to Templates
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '50px' }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontSize: '4rem', marginBottom: '20px' }}
                    >
                        💘
                    </motion.div>

                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '12px' }}>
                        Be My <span className="gradient-text">Valentine?</span>
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
                        6 unique and interactive ways to ask that special question. Each template has a fun surprise!
                    </p>
                </motion.div>

                {/* Templates Grid */}
                <div className="templates-grid">
                    {templates.map((template: Template, index: number) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/create/${template.id}`} style={{ textDecoration: 'none' }}>
                                <div
                                    className="glass-card"
                                    style={{
                                        padding: '30px',
                                        cursor: 'pointer',
                                        height: '100%',
                                        borderColor: 'rgba(255, 107, 157, 0.2)'
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
                                        fontSize: '0.7rem',
                                        color: template.primaryColor,
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                        marginBottom: '12px'
                                    }}>
                                        {template.interactionType?.replace('-', ' ')}
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
