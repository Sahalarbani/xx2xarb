import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ArbSkinz - Premium Livery Hub';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 40px',
            border: '4px solid #00f0ff',
            backgroundColor: 'rgba(0,0,0,0.8)',
            boxShadow: '0 0 50px rgba(0,240,255,0.4)',
            borderRadius: '20px',
          }}
        >
          <h1
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: 'white',
              margin: 0,
              fontFamily: 'sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            ARB<span style={{ color: '#00f0ff' }}>SKINZ</span>
          </h1>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 30,
            color: '#9ca3af',
            fontFamily: 'sans-serif',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Premium Livery & Skin Hub
        </div>
        
        {/* Hiasan Bawah */}
        <div style={{ position: 'absolute', bottom: 40, display: 'flex', gap: 20 }}>
           <div style={{ width: 100, height: 4, background: '#00f0ff' }} />
           <div style={{ width: 10, height: 4, background: '#00f0ff' }} />
           <div style={{ width: 100, height: 4, background: '#00f0ff' }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
