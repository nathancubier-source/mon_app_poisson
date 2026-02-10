import React, { useState } from 'react';
import { Trophy, Check, X, ArrowRight, Anchor, Ruler, Camera, Info, Lightbulb } from 'lucide-react';

// ==============================================================================
// CONFIGURATION DES POISSONS
// Remplace les liens dans 'image' par tes propres photos.
// ==============================================================================

const FISH_DATA = [
  { 
    id: 'bar', 
    name: 'Bar (Loup)', 
    scientific: 'Dicentrarchus labrax',
    size: '42 cm',
    desc: 'Argenté, fuselé, opercule piquant. Le roi de la côte.', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Dicentrarchus_labrax.jpg/800px-Dicentrarchus_labrax.jpg',
    tips: [
      "Écume & Bordure : On le trouve dans très peu d'eau (1-2m) là où les vagues cassent.",
      "Discrétion absolue : Ne fais pas de bruit avec tes palmes en surface, il capte tout.",
      "Au nord du 48ème parallèle, vérifie bien la réglementation (périodes de no-kill).",
      "Technique : L'indienne est redoutable pour le surprendre dans les sargasses."
    ]
  },
  { 
    id: 'daurade', 
    name: 'Daurade Royale', 
    scientific: 'Sparus aurata',
    size: '23 cm',
    desc: 'Sourcil doré (couronne) et tache noire sur l\'ouïe.', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sparus_aurata.jpg/800px-Sparus_aurata.jpg',
    tips: [
      "Éthique : Bien que la maille soit 23cm, évite de tirer en dessous de 30-35cm.",
      "Alimentation : Elle broie les coquillages, cherche-la près des moulières.",
      "Tir : C'est un poisson puissant au démarrage, assure bien ton tir (colonne).",
      "Signe distinctif : La tache dorée entre les yeux est visible de face."
    ]
  },
  { 
    id: 'sar', 
    name: 'Sar Commun', 
    scientific: 'Diplodus sargus',
    size: '25 cm',
    desc: 'Rayures verticales (code-barre) et tache noire caudale.', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Diplodus_sargus_sargus.jpg/800px-Diplodus_sargus_sargus.jpg',
    tips: [
      "Habitat : Très présent en Bretagne Sud, il adore les failles et l'écume.",
      "Comportement : Il rentre vite à trou. Sois rapide avant qu'il ne s'enfonce.",
      "Solitaire vs Banc : Les gros 'pépères' sont souvent seuls, les petits en bancs.",
      "Cuisine : Vide-le rapidement après la capture, sa chair fermente vite."
    ]
  },
  { 
    id: 'lieu', 
    name: 'Lieu Jaune', 
    scientific: 'Pollachius pollachius',
    size: '30 cm',
    desc: 'Ligne latérale courbe, mâchoire inférieure saillante.', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pollachius_pollachius.jpg/800px-Pollachius_pollachius.jpg',
    tips: [
      "Poste : Il se tient souvent 'entre deux eaux' au-dessus des laminaires, face au courant.",
      "Repérage : Regarde bien au-dessus des champs d'algues, il est souvent stationnaire.",
      "Approche : Une coulée lente et silencieuse est souvent la meilleure technique.",
      "Identification : Sa mâchoire inférieure dépasse nettement la supérieure."
    ]
  },
  { 
    id: 'vieille', 
    name: 'Vieille', 
    scientific: 'Labrus bergylta',
    size: 'Conseillé 30 cm',
    desc: 'Robuste, lèvres épaisses, couleurs variables (vert/rouge).', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Labrus_bergylta.jpg/800px-Labrus_bergylta.jpg',
    tips: [
      "Cachette : Elle adore se cacher dans les failles ou sous les laminaires.",
      "Curiosité : Si elle rentre dans un trou, attends un peu, elle ressort souvent pour regarder.",
      "Tir : Ne la tire pas dans le ventre (chair fragile), vise la tête.",
      "Couleur : C'est le caméléon breton, sa couleur s'adapte au fond."
    ]
  },
  { 
    id: 'mulet', 
    name: 'Mulet', 
    scientific: 'Mugil cephalus',
    size: '30 cm',
    desc: 'Tête large et plate, grosses écailles argentées.', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Mugil_cephalus.jpg/800px-Mugil_cephalus.jpg',
    tips: [
      "Zone : Il circule souvent en bancs compacts près de la surface ou sur le sable.",
      "Entraînement : Idéal pour débuter car souvent moins farouche que le bar.",
      "Détail : Sa bouche est petite et plate, contrairement à la grande gueule du bar.",
      "Gastronomie : Excellent fumé ou en carpaccio."
    ]
  },
  { 
    id: 'sole', 
    name: 'Sole Commune', 
    scientific: 'Solea solea',
    size: '24 cm',
    desc: 'Plate, ovale, se confond parfaitement avec le sable.', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Solea_solea.jpg/800px-Solea_solea.jpg',
    tips: [
      "Camouflage : On ne voit souvent que le contour ou les petits yeux sur le sable.",
      "Fuite : Elle démarre en ondulant. Tire juste devant la tête si elle bouge.",
      "Indice : Cherche les empreintes ovales dans le sable, elle s'enterre souvent."
    ]
  },
  { 
    id: 'roussette', 
    name: 'Roussette', 
    scientific: 'Scyliorhinus canicula',
    size: 'Conseillé ~50 cm',
    desc: 'Petit requin de fond, peau beige tachetée, rugueuse.', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Scyliorhinus_canicula_Sardinia.jpg/800px-Scyliorhinus_canicula_Sardinia.jpg',
    tips: [
      "Repos : Souvent posée sur le fond de sable ou dormant sous une roche.",
      "Comportement : Elle ne bouge pas. Tu peux l'observer de très près.",
      "Pratique : Facile à tirer pour les débutants, mais attention à la préparation (peau dure)."
    ]
  }
];

export default function App() {
  const [gameState, setGameState] = useState('menu');
  const [currentFish, setCurrentFish] = useState(null);
  const [currentTip, setCurrentTip] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const nextQuestion = () => {
    setSelected(null);
    
    // 1. Choisir le poisson cible
    const target = FISH_DATA[Math.floor(Math.random() * FISH_DATA.length)];
    
    // 2. Choisir 3 distracteurs
    const distractors = FISH_DATA
      .filter(f => f.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    // 3. Choisir un conseil aléatoire
    const randomTip = target.tips[Math.floor(Math.random() * target.tips.length)];
    
    setCurrentFish(target);
    setCurrentTip(randomTip);
    setOptions([...distractors, target].sort(() => 0.5 - Math.random()));
  };

  const handleChoice = (fish) => {
    if (selected) return;
    setSelected(fish);
    if (fish.id === currentFish.id) setScore(s => s + 1);
    setTotal(t => t + 1);
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-400"></div>
          <div className="inline-flex p-5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl mb-8 shadow-lg shadow-blue-900/40">
            <Anchor size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-black mb-3 italic uppercase tracking-tighter">Chasse & Mailles</h1>
          <p className="text-slate-400 mb-10 text-sm font-medium leading-relaxed">
            Version Alpha 1.0<br/>
            Identifie les poissons et apprends les tailles réglementaires.
          </p>
          <button 
            onClick={() => { setGameState('play'); nextQuestion(); }}
            className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3"
          >
            <Camera size={24} /> JOUER
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 flex flex-col items-center">
      {/* HUD SCORE */}
      <div className="w-full max-w-lg flex justify-between items-center mb-6 bg-slate-900/90 backdrop-blur p-4 rounded-2xl border border-slate-800 sticky top-4 z-20 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg shadow-inner">
            <Trophy size={18} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg leading-none">{score} / {total}</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Score</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
           <Ruler size={14} className="text-emerald-400" />
           <span className="text-[10px] font-bold uppercase text-slate-300">Réglementation</span>
        </div>
      </div>

      <div className="w-full max-w-lg space-y-6">
        
        {/* CADRE PHOTO */}
        <div className="relative aspect-[4/3] w-full bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 shadow-2xl flex items-center justify-center group">
            <img 
                src={currentFish.image} 
                alt="Poisson à identifier" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            {/* Vignetage */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 pointer-events-none"></div>
        </div>

        {!selected && (
          <div className="text-center animate-pulse slide-in-from-bottom-2">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-1">Cible en vue</p>
            <h2 className="text-2xl font-black italic text-white">Identification ?</h2>
          </div>
        )}

        {/* GRILLE OPTIONS */}
        <div className="grid grid-cols-1 gap-3 pb-8">
          {options.map(fish => {
            let style = "bg-slate-900 border-slate-800 text-slate-300 hover:border-blue-500 hover:bg-slate-800";
            if (selected) {
              if (fish.id === currentFish.id) style = "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/40 transform scale-[1.02]";
              else if (fish.id === selected.id) style = "bg-rose-600 border-rose-500 text-white opacity-90";
              else style = "bg-slate-900 opacity-20 border-transparent grayscale";
            }

            return (
              <button
                key={fish.id}
                disabled={!!selected}
                onClick={() => handleChoice(fish)}
                className={`relative py-5 px-6 rounded-2xl border-2 font-black text-left flex justify-between items-center transition-all duration-300 ${style}`}
              >
                <div className="flex flex-col">
                   <span className="uppercase text-lg italic tracking-tight">{fish.name}</span>
                   {selected && fish.id === currentFish.id && (
                       <div className="flex items-center gap-1 mt-1 text-emerald-200 text-xs font-bold animate-pulse">
                           <Ruler size={12} /> Maille : {fish.size}
                       </div>
                   )}
                </div>
                
                {selected && fish.id === currentFish.id && <Check size={28} className="text-white drop-shadow-md" />}
                {selected && fish.id === selected.id && fish.id !== currentFish.id && <X size={28} className="text-white drop-shadow-md" />}
              </button>
            );
          })}
        </div>

        {/* PANNEAU RÉSULTAT */}
        {selected && (
          <div className="fixed inset-x-0 bottom-0 p-4 z-50 flex justify-center pointer-events-none">
            <div className="w-full max-w-lg bg-slate-900/95 backdrop-blur-xl border-t border-x border-slate-700 p-6 rounded-t-[2.5rem] shadow-2xl pointer-events-auto animate-in slide-in-from-bottom-full duration-500">
              
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <h3 className={`text-2xl font-black uppercase italic tracking-tighter mb-1 ${selected.id === currentFish.id ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {selected.id === currentFish.id ? 'Bien joué !' : 'Raté !'}
                    </h3>
                    <p className="text-slate-400 text-xs font-bold uppercase">{currentFish.scientific}</p>
                 </div>
                 
                 <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 text-center min-w-[90px]">
                    <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Maille</p>
                    <p className="text-lg font-black text-white leading-none">{currentFish.size}</p>
                 </div>
              </div>
              
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-3xl border border-white/5 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Info size={64} />
                </div>
                
                <p className="text-white font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Lightbulb size={14} className="text-yellow-400" /> 
                    Conseil de Chasse
                </p>
                <p className="text-slate-200 text-sm leading-relaxed italic border-l-2 border-blue-500 pl-3">
                   "{currentTip}"
                </p>
              </div>

              <button 
                onClick={nextQuestion}
                className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95 transform"
              >
                POISSON SUIVANT <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Espace vide pour que le footer ne cache pas le bas de la liste */}
      {selected && <div className="h-72"></div>}
    </div>
  );
}
