import React, { useState } from 'react';

// 1. ייבוא המנהל (ה-Context) - זה מה שמחבר את המנוע לאפליקציה
import { DesignProvider, useDesignEngine } from './state/DesignContext';

// 2. ייבוא התצוגה (הקנבס החכם) - זה מה שמצייר את האלבום
import DynamicAlbum from './components/SmartCanvas/DynamicAlbum';

// 3. ייבוא הנתונים (ה-Engine) - רק בשביל הכפתורים והסליידרים בסרגל הצד
import { ARCHETYPES, initialDesignVector } from './engine/initial_state';

// תמונות דמו (כדי שיהיה מה לראות)
const INITIAL_IMAGES = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d"
];

/**
 * רכיב הסטודיו הפנימי
 * חייב להיות בתוך רכיב נפרד כדי שיוכל להשתמש ב-useDesignEngine
 * (כי אי אפשר להשתמש ב-Hook בתוך אותו רכיב שיוצר את ה-Provider)
 */
const AlbumStudio = () => {
  const { designVector, updateParameter, loadArchetype } = useDesignEngine();
  const [images] = useState(INITIAL_IMAGES);

  return (
    <div className="flex h-screen w-full bg-gray-900 text-white overflow-hidden font-sans">
      
      {/* --- סרגל צד (לוח בקרה) --- */}
      <aside className="w-80 bg-gray-800 p-6 flex flex-col gap-6 border-r border-gray-700 overflow-y-auto z-20 shadow-2xl">
        <div>
          <h2 className="text-xl font-bold text-blue-400">Generative Engine</h2>
          <p className="text-xs text-gray-400">v2.0 Modular Architecture</p>
        </div>

        {/* כפתורי ארכיטיפים (Presets) */}
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(ARCHETYPES).map(name => (
            <button 
              key={name} 
              onClick={() => loadArchetype(name)} 
              className="px-2 py-2 bg-gray-700 hover:bg-gray-600 rounded text-xs uppercase font-bold tracking-wider transition-colors border border-gray-600 hover:border-blue-400"
            >
              {name}
            </button>
          ))}
        </div>
        
        <hr className="border-gray-700" />
        
        {/* סליידרים לשינוי פרמטרים ($m) בזמן אמת */}
        <div className="space-y-6">
          {Object.keys(initialDesignVector).map(key => (
            <div key={key}>
              <div className="flex justify-between text-xs mb-2 uppercase text-gray-400 font-semibold tracking-wider">
                <span>{key}</span>
                <span className="text-blue-300 font-mono">{designVector[key]?.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={designVector[key]} 
                onChange={(e) => updateParameter(key, e.target.value)}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
              />
            </div>
          ))}
        </div>
      </aside>

      {/* --- אזור התצוגה המרכזי (Canvas) --- */}
      <main className="flex-1 overflow-y-auto relative bg-neutral-900 shadow-inner">
        <DynamicAlbum 
          designVector={designVector} 
          images={images} 
          title="My Professional Album" 
        />
      </main>
    </div>
  );
};

/**
 * הרכיב הראשי (Entry Point)
 * תפקידו היחיד הוא לספק את ההקשר (Context) לשאר האפליקציה
 */
export default function App() {
  return (
    <DesignProvider>
      <AlbumStudio />
    </DesignProvider>
  );
}