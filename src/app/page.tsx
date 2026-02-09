'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Gift, Sparkles, ArrowRight, Star } from 'lucide-react';
import { templates } from '@/lib/templates';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              background: 'rgba(255, 107, 157, 0.15)',
              borderRadius: '50px',
              marginBottom: '24px',
              border: '1px solid rgba(255, 107, 157, 0.3)'
            }}
          >
            <Sparkles size={16} color="#ff6b9d" />
            <span style={{ fontSize: '0.9rem', color: '#ff6b9d' }}>Create Magical Moments</span>
          </motion.div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '24px'
          }}>
            Send <span className="gradient-text">Personalized</span><br />
            Surprises to Your<br />
            <span className="gradient-text">Loved Ones</span> 💕
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Create beautiful surprise pages for Valentine&apos;s Day, Birthdays, Anniversaries,
            and more. Share a unique link and make someone&apos;s day special!
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/templates" className="btn-gradient">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Create Surprise <ArrowRight size={18} />
              </span>
            </Link>
            <Link
              href="#templates"
              style={{
                padding: '14px 32px',
                borderRadius: '50px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease'
              }}
            >
              View Templates
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '60px',
            marginTop: '80px',
            flexWrap: 'wrap'
          }}
        >
          {[
            { icon: Heart, label: 'Surprises Sent', value: '10K+' },
            { icon: Star, label: 'Happy Users', value: '5K+' },
            { icon: Gift, label: 'Templates', value: '6+' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <stat.icon size={24} color="#ff6b9d" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stat.value}</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Templates Preview Section */}
      <section id="templates" className="container" style={{ paddingBottom: '100px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '50px' }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>
            Choose Your <span className="gradient-text">Template</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
            Beautiful templates for every occasion
          </p>
        </motion.div>

        <div className="templates-grid">
          {templates.slice(0, 6).map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
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
                  {/* Template Icon */}
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

                  {/* Category Badge */}
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

                  {/* Template Name */}
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    color: 'white',
                    marginBottom: '8px'
                  }}>
                    {template.name}
                  </h3>

                  {/* Description */}
                  <p style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6
                  }}>
                    {template.description}
                  </p>

                  {/* Use Template Button */}
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

        {/* View All Templates Link */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/templates" className="btn-gradient">
            <span>View All Templates</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '40px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <Heart size={24} color="#ff6b9d" fill="#ff6b9d" />
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>SocialBee</span>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Made with 💕 for spreading joy
          </p>
        </div>
      </footer>
    </main>
  );
}
