import React, { useState, useEffect } from 'react';
import { Trophy, Fish, Check, X, ArrowRight, Anchor, Info, Camera, RefreshCw } from 'lucide-react';

// Base de données avec des descriptions visuelles pour simuler les photos si les liens échouent
// Les URLs proviennent de sources stables (Unsplash/Wikimedia) avec des paramètres de secours
const FISH_DATA = [
  {
    id: 'bar',
    name: 'Bar (Loup)',
    scientific: 'Dicentrarchus labrax',
    description: 'Corps fuselé, argenté, deux nageoires dorsales séparées. Ligne latérale sombre.',
    imageUrl: 'https://images.unsplash.com/photo-1534073131758-00504620f321?q=80&w=600&auto=format&fit=crop',
    tip: "Reconnaissable à son opercule piquant et son dos gris-bleu."
  },
  {
    id: 'daurade',
    name: 'Daurade Royale',
    scientific: 'Sparus aurata',
    description: 'Corps haut, argenté avec une tache noire sur l\'opercule et un sourcil doré.',
    imageUrl: 'https://images.unsplash.com/photo-1629134015053-ec541883395b?q=80&w=600&auto=format&fit=crop',
    tip: "Cherchez la couronne dorée entre les deux yeux."
  },
  {
    id: 'sar',
    name: 'Sar Commun',
    scientific: 'Diplodus sargus',
    description: 'Argenté avec des lignes verticales sombres (code-barre) et tache noire sur la queue.',
    imageUrl: 'https://images.unsplash.com/photo-1524704659698-1fd3046597b3?q=80&w=600&auto=format&fit=crop',
    tip: "Il possède souvent des lèvres épaisses et vit dans l'écume."
  },
  {
    id: 'lieu',
    name: 'Lieu Jaune',
    scientific: 'Pollachius pollachius',
    description: 'Ligne latérale très courbée, mâchoire inférieure saillante. Teinte bronze/jaune.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop',
    tip: "La courbure de sa ligne latérale au-dessus de la pectorale est unique."
  },
  {
    id: 'vieille',
    name: 'Vieille Commune',
    scientific: 'Labrus bergylta',
    description: 'Corps massif, lèvres charnues. Robe très variable (vert, rouge ou brun marbré).',
    imageUrl: 'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?q=80&w=600&auto=format&fit=crop',
    tip: "C'est le poisson caméléon de nos côtes bretonnes."
  },
  {
    id: 'mulet',
    name: 'Mulet',
    scientific: 'Mugil cephalus',
    description: 'Tête large et aplatie, grosses écailles, dos sombre et flancs argentés.',
    imageUrl: 'https://images.unsplash.com/photo-1516962080544-eac695c93791?q=80&w=600&auto=format&fit=crop',
    tip: "Nage souvent en bancs près de la surface."
  }
];

export default function App() {
  const [gameState, setGameState] = useState('menu'); // menu, play
  const [currentFish, setCurrentFish] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [imageError, setImageError] = useState(false);

  const startQuiz = () => {
    setScore(0);
    setTotal(0);
    setGameState('play');
    nextQuestion();
  };

  const nextQuestion = () => {
    setImageError(false);
    setSelected(null);
    const target = FISH_DATA[Math.floor(Math.random() * FISH_DATA.length)];
    const distractors = FISH_DATA
      .filter(f => f.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    setOptions([...distractors, target].sort(() => 0.5 - Math.random()));
    setCurrentFish(target);
  };

  const handleSelect = (fish) => {
    if (selected) return;
    setSelected(fish);
    if (fish.id === currentFish.id) setScore(s => s + 1);
    setTotal(t => t + 1);
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-[2rem] p-10 text-center shadow-2xl">
          <div className="inline-flex p-5 bg-blue-600/20 rounded-3xl mb-6 text-blue-500">
            <Anchor size={48} />
          </div>
          <h1 className="text-4xl font-black mb-4 tracking-tighter italic">CHASSE BZH</h1>
          <p className="text-slate-400 mb-10 leading-relaxed text-sm">
            Entraînement visuel pour chasseurs sous-marins bretons. Apprenez à identifier vos prises avant de tirer.
          </p>
          <button 
            onClick={startQuiz}
            className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-lg shadow-blue-900/20"
          >
            DÉBUTER LE QUIZ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-lg flex justify-between items-center mb-6 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/20 p-2 rounded-lg text-blue-400">
            <Trophy size={20} />
          </div>
          <span className="font-bold text-xl">{score} / {total}</span>
        </div>
        <button onClick={() => setGameState('menu')} className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Quitter</button>
      </div>

      <div className="w-full max-w-lg space-y-5">
        {/* Cadre Photo */}
        <div className="relative aspect-video w-full bg-slate-900 rounded-[2rem] overflow-hidden border-2 border-slate-800 shadow-2xl group">
          {imageError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-900/50 p-6 text-center">
              <Camera size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">Image non disponible pour le moment.</p>
              <p className="text-xs mt-2 italic">Utilisez l'indice visuel ci-dessous !</p>
            </div>
          ) : (
            <img 
              src={currentFish.imageUrl} 
              alt="Poisson" 
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40 pointer-events-none" />
          <div className="absolute top-4 right-4 bg-blue-600/80 backdrop-blur-sm p-2 rounded-xl">
             <Camera size={16} />
          </div>
        </div>

        {/* Question */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black uppercase italic tracking-tight">Identification</h2>
          <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Analyse visuelle requise</p>
        </div>

        {/* Choix */}
        <div className="grid grid-cols-1 gap-3">
          {options.map(fish => {
            let color = "bg-slate-900 border-slate-800 hover:border-blue-500 text-slate-300";
            if (selected) {
              if (fish.id === currentFish.id) color = "bg-green-600 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]";
              else if (fish.id === selected.id) color = "bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]";
              else color = "bg-slate-900 opacity-20 border-transparent";
            }

            return (
              <button
                key={fish.id}
                disabled={!!selected}
                onClick={() => handleSelect(fish)}
                className={`py-5 px-8 rounded-2xl border-2 font-black transition-all text-left flex justify-between items-center group ${color}`}
              >
                <span className="uppercase italic tracking-tighter text-lg">{fish.name}</span>
                {selected && fish.id === currentFish.id && <Check size={24} />}
                {selected && fish.id === selected.id && fish.id !== currentFish.id && <X size={24} />}
              </button>
            );
          })}
        </div>

        {/* Result Feedback */}
        {selected && (
          <div className="bg-slate-900 border-2 border-slate-800 p-8 rounded-[2rem] animate-in slide-in-from-bottom-6 duration-500">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-2xl ${selected.id === currentFish.id ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {selected.id === currentFish.id ? <Check size={28} strokeWidth={3} /> : <X size={28} strokeWidth={3} />}
              </div>
              <div>
                <h3 className={`font-black text-2xl tracking-tighter uppercase ${selected.id === currentFish.id ? 'text-green-400' : 'text-red-400'}`}>
                  {selected.id === currentFish.id ? 'Tir Précis !' : 'Cible Manquée !'}
                </h3>
                <p className="text-slate-400 text-xs font-bold uppercase">{currentFish.scientific}</p>
              </div>
            </div>
            
            <p className="text-slate-300 text-sm leading-relaxed mb-6 bg-black/30 p-4 rounded-xl border border-white/5">
              <span className="text-blue-400 font-bold block mb-1">INDICE CHASSE :</span>
              {currentFish.tip} {currentFish.description}
            </p>

            <button 
              onClick={nextQuestion}
              className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg hover:bg-blue-400 transition-colors flex items-center justify-center gap-2"
            >
              SUIVANT <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
