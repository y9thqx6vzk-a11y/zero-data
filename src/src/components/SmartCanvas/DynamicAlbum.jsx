import React from 'react';

const DynamicAlbum = ({ designVector, images, title }) => {
  if (!designVector) return <div className="p-10 text-white">Loading...</div>;

  const { chaos, roundness, whiteSpace, warmth, strokeWidth, density, serif } = designVector;

  const gapSize = `${whiteSpace * 3}rem`;
  const borderRadius = `${roundness * 30}px`;
  const borderColor = warmth > 0.5 ? '#5D4037' : '#000';
  const borderStyle = `${strokeWidth * 8}px solid ${borderColor}`;
  const bgColor = warmth > 0.6 ? '#F5F5DC' : (warmth < 0.3 ? '#F0F4F8' : '#FFFFFF');
  const imageFilter = `sepia(${warmth * 60}%) contrast(${100 - (warmth * 10)}%)`;
  const fontFamily = serif > 0.5 ? '"Times New Roman", serif' : 'system-ui, sans-serif';

  const getRotation = (i) => chaos > 0 ? `${(i % 2 === 0 ? 1 : -1) * chaos * 10}deg` : '0deg';
  const minColumnWidth = 300 - (density * 150);

  return (
    <div className="min-h-full p-8 transition-colors duration-500 ease-in-out" 
         style={{ backgroundColor: bgColor, fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 tracking-widest uppercase" 
            style={{ color: borderColor }}>
          {title}
        </h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnWidth}px, 1fr))`, 
          gap: gapSize,
          padding: gapSize 
        }}>
          {images.map((src, i) => (
            <div key={i} 
                 className="relative transition-all duration-500 hover:z-10 hover:scale-105"
                 style={{
                    borderRadius: strokeWidth > 0 ? '0px' : borderRadius,
                    transform: `rotate(${getRotation(i)}) scale(${1 - whiteSpace * 0.05})`,
                    border: borderStyle,
                    padding: strokeWidth > 0 ? '10px' : '0',
                    backgroundColor: '#fff',
                    boxShadow: chaos > 0 ? '0 10px 20px rgba(0,0,0,0.1)' : 'none'
                 }}>
              <img src={src} className="w-full h-full object-cover block" 
                   style={{ 
                     borderRadius: strokeWidth > 0 ? '0px' : borderRadius, 
                     filter: imageFilter 
                   }} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicAlbum;
