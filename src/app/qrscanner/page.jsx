'use client';
import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Image from 'next/image';

export default function QRCodeGenerator() {
  const [text, setText] = useState('https://raasid.com/');

  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#047244',
      minHeight: '100vh',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
     

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL"
        style={{
          padding: '0.5rem',
          width: '90%',
          maxWidth: '400px',
          fontSize: '1rem',
          marginBottom: '1.5rem',
          borderRadius: '6px',
          border: 'none',
          outline: 'none'
        }}
      />

      <div style={{ position: 'relative', display: 'inline-block', padding: '1rem', backgroundColor: '#fff', borderRadius: '16px' }}>
             <Image
            src="https://res.cloudinary.com/daflot6fo/image/upload/v1750746433/020a63d10fa8da53dcf5754403c84115fdada494_w0oddy.png"
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        <QRCodeCanvas
          value={text}
          size={220}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin={true}
        />
        {/* Center logo over QR */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50px',
          height: '50px',
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
        </div>
      </div>
    </div>
  );
}
