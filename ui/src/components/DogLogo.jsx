import React from 'react';
import { SvgIcon } from '@mui/material';

const DogLogo = ({ fontSize = 'medium', ...props }) => {
  return (
    <SvgIcon
      viewBox="0 0 200 200"
      fontSize={fontSize}
      {...props}
      sx={{
        width: fontSize === 'large' ? 48 : fontSize === 'small' ? 24 : 32,
        height: fontSize === 'large' ? 48 : fontSize === 'small' ? 24 : 32,
        ...props.sx
      }}
    >
      {/* Cuerpo del perro */}
      <path
        d="M100 160 C80 160, 65 145, 65 125 L65 90 C65 70, 80 55, 100 55 C120 55, 135 70, 135 90 L135 125 C135 145, 120 160, 100 160 Z"
        fill="white"
        stroke="#1a3b2e"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Orejas */}
      <ellipse cx="80" cy="65" rx="18" ry="30" fill="white" stroke="#1a3b2e" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-20 80 65)"/>
      <ellipse cx="120" cy="65" rx="12" ry="25" fill="white" stroke="#1a3b2e" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" transform="rotate(30 120 65)"/>
      
      {/* Ojos */}
      <circle cx="90" cy="85" r="4" fill="#1a3b2e"/>
      <circle cx="110" cy="85" r="4" fill="#1a3b2e"/>
      
      {/* Nariz */}
      <circle cx="100" cy="95" r="3" fill="#1a3b2e"/>
      
      {/* Sonrisa */}
      <path
        d="M85 105 Q100 115 115 105"
        fill="none"
        stroke="#1a3b2e"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Brazos */}
      <circle cx="75" cy="120" r="8" fill="white" stroke="#1a3b2e" strokeWidth="6"/>
      <circle cx="125" cy="120" r="8" fill="white" stroke="#1a3b2e" strokeWidth="6"/>
      
      {/* Piernas */}
      <ellipse cx="85" cy="155" rx="6" ry="12" fill="white" stroke="#1a3b2e" strokeWidth="4"/>
      <ellipse cx="115" cy="155" rx="6" ry="12" fill="white" stroke="#1a3b2e" strokeWidth="4"/>
      
      {/* Cola */}
      <path
        d="M135 130 Q150 125 155 135 Q150 145 140 140"
        fill="none"
        stroke="#1a3b2e"
        strokeWidth="6"
        strokeLinecap="round"
      />
      
      {/* Cristal verde (simulando la app/pantalla) */}
      <path
        d="M110 100 L140 100 L145 130 L110 135 Z"
        fill="#4CAF50"
        stroke="#1a3b2e"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Brillo en el cristal */}
      <path
        d="M115 105 L130 105 L132 120 L115 122 Z"
        fill="#81C784"
        opacity="0.7"
      />
      
      {/* Pequeño círculo en el cristal */}
      <circle cx="138" cy="108" r="2" fill="white"/>
    </SvgIcon>
  );
};

export default DogLogo;