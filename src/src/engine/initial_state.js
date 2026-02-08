/**
 * THE DESIGN VECTOR ($m$)
 * המקור היחיד לאמת. כל ערך הוא בין 0.0 ל-1.0.
 */

export const initialDesignVector = {
  // --- רגש (Kansei) ---
  chaos: 0.0,        // 0.0 = ישר פלס, 1.0 = מסובב ומבולגן
  warmth: 0.5,       // 0.0 = כחול/קר, 1.0 = כתום/ספיה
  density: 0.5,      // 0.0 = מרווח מאוד, 1.0 = צפוף מאוד
  
  // --- צורה (Form) ---
  roundness: 0.0,    // 0.0 = פינות חדות, 1.0 = עיגול מלא
  strokeWidth: 0.0,  // 0.0 = ללא קו, 1.0 = מסגרת עבה
  
  // --- טיפוגרפיה ---
  serif: 0.0,        // 0.0 = מודרני (Sans), 1.0 = קלאסי (Serif)
  scale: 0.5,        // 0.0 = טקסטים בגודל אחיד, 1.0 = פערים גדולים (כותרת ענקית)
  
  // --- מבנה ---
  whiteSpace: 0.5,   // 0.0 = תמונה על כל המסך, 1.0 = מסגרת לבנה עבה
  symmetry: 1.0      // 1.0 = סימטרי, 0.0 = א-סימטרי
};

/**
 * ארכיטיפים מוכנים מראש ($N$)
 * אלו נקודות ההתחלה לפני שהמשתמש עונה על שאלות.
 */
export const ARCHETYPES = {
  minimalist: {
    chaos: 0.0,
    warmth: 0.2,
    density: 0.2,
    roundness: 0.0,
    strokeWidth: 0.0,
    serif: 0.0,
    whiteSpace: 0.8,
    symmetry: 1.0
  },
  vintage: {
    chaos: 0.3,       // קצת עקום
    warmth: 0.9,      // צבעים חמים
    density: 0.6,
    roundness: 0.1,   // פינות מעט שחוקות
    strokeWidth: 0.4, // מסגרת דקה
    serif: 1.0,       // פונט קלאסי
    whiteSpace: 0.4,
    symmetry: 0.6
  }
};