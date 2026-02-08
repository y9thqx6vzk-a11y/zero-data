import React from 'react';

const DynamicAlbum = ({ designVector, images, title = "GEN-ALBUM" }) => {
  // אם משום מה לא הגיע וקטור, נשתמש בברירת מחדל כדי שהאפליקציה לא תקרוס
  if (!designVector) return <div>Loading Design...</div>;

  // פירוק הוקטור למשתנים נוחים
  const { 
    chaos,      // 0.0 -> 1.0
    roundness,  // 0.0 -> 1.0
    whiteSpace, // 0.0 -> 1.0
    warmth,     // 0.0 -> 1.0
    strokeWidth // 0.0 -> 1.0
  } = designVector;

  // --- מנוע התרגום (Translator Engine) ---
  
  // חישוב רווחים: ככל ש-whiteSpace גדול יותר, הרווח גדל
  const gapSize = `${whiteSpace * 4}rem`; 
  
  // חישוב עגול פינות: מ-0 עד 50 פיקסלים
  const borderRadius = `${roundness * 50}px`;
  
  // לוגיקה לצבע מסגרת: חם=חום, קר=שחור
  const borderColor = warmth > 0.5 ? '#4a3b32' : '#000';
  const borderStyle = `${strokeWidth * 10}px solid ${borderColor}`;
  
  // לוגיקה לצבע רקע: חם=קרם, קר=לבן/אפור
  const bgColor = warmth > 0.6 ? '#f3e9dc' : (warmth < 0.2 ? '#f8fafc' : '#ffffff');
  
  // פילטר ספיה לתמונות (משפיע רק על הצבע, לא על הקובץ)
  const imageFilter = `sepia(${warmth * 50}%)`;

  // פונקציית סיבוב כאוטית
  const getRotation = (index) => {
    if (chaos === 0) return '0deg';
    // משתמשים באינדקס כדי ליצור כיוון שונה לכל תמונה (אחד ימינה, אחד שמאלה)
    const direction = index % 2 === 0 ? 1 : -1;
    const magnitude = chaos * 15; // מקסימום 15 מעלות סיבוב
    return `${direction * magnitude}deg`;
  };

  return (
    <div 
      className="min-h-screen p-8 transition-all duration-700 ease-in-out"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 
            className="text-5xl font-bold uppercase tracking-widest mb-4"
            style={{ 
              // שינוי פונט לפי פרמטר serif
              fontFamily: designVector.serif > 0.5 ? 'Times New Roman, serif' : 'sans-serif',
              color: warmth > 0.5 ? '#5c4d42' : '#1e293b'
            }}
          >
            {title}
          </h1>
          {/* נתוני דיבוג - כדי שנראה את המספרים בעיניים */}
          <div className="text-[10px] font-mono opacity-50 flex justify-center gap-4">
            <span>CHAOS: {chaos?.toFixed(2)}</span>
            <span>ROUND: {roundness?.toFixed(2)}</span>
            <span>SPACE: {whiteSpace?.toFixed(2)}</span>
          </div>
        </header>

        <div 
          style={{ 
            display: 'grid', 
            // הנוסחה הזו קובעת כמה תמונות יהיו בשורה לפי הצפיפות (density)
            gridTemplateColumns: `repeat(auto-fill, minmax(${200 + (1-designVector.density)*150}px, 1fr))`,
            gap: gapSize,
            padding: gapSize,
          }}
        >
          {images.map((src, i) => (
            <div 
              key={i}
              className="relative bg-white transition-all duration-500 hover:z-10 hover:scale-105"
              style={{
                borderRadius: borderRadius,
                // כאן קורה הקסם של הכאוס והמרווחים
                transform: `rotate(${getRotation(i)}) scale(${1 - (whiteSpace * 0.1)})`,
                border: borderStyle,
                padding: strokeWidth > 0 ? '12px' : '0', // אם יש מסגרת, מוסיפים ריפוד פנימי (כמו פולארויד)
                boxShadow: chaos > 0.3 ? '5px 5px 15px rgba(0,0,0,0.2)' : 'none'
              }}
            >
              <img 
                src={src} 
                className="w-full h-full object-cover"
                style={{ 
                  borderRadius: strokeWidth > 0 ? '0' : borderRadius,
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