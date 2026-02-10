import React, { useState, useEffect } from 'react';
import { Trophy, Fish, Check, X, ArrowRight, Anchor, Ruler, Camera, Info, Lightbulb, Waves } from 'lucide-react';

// Base de données avec emplacements pour plusieurs images par poisson
const FISH_BASE_DATA = [
  { 
    id: 'bar', 
    name: 'Bar (Loup)2', 
    scientific: 'Dicentrarchus labrax',
    size: '42 cm',
    desc: 'Argenté, fuselé, opercule piquant.', 
    imageUrls: [
      "https://www.lechasseursousmarin.com/faune/bar-commun-ou-loup/", // Lien Image 1 (ex: Profil)
      "https://www.mer-littoral.org/34/photos/dicentrarchus-labrax-0m.jpg", // Lien Image 2 (ex: Dans les algues)
    ],
    tips: [
      "Écume & Bordure : On le trouve dans très peu d'eau (1-2m) là où les vagues cassent.",
      "Demande de la discrétion : Ne fais pas de bruit avec tes palmes en surface.",
      "Vérifie bien la réglementation (périodes de no-kill) avant de sortir.",
      "L'indienne est la meilleure technique pour le surprendre."
    ]
  },
  { 
    id: 'daurade', 
    name: 'Daurade Royale', 
    scientific: 'Sparus aurata',
    size: '23 cm',
    desc: 'Sourcil doré et tache noire sur l\'ouïe.', 
    imageUrls: ["https://www.fishipedia.fr/wp-content/uploads/2019/06/Sparus-aurata-Daurade-Costa-Smeralda-Sardaigne-6102_00001.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGQzvK0UkhFnzJPAffJPckEiQAHNWagC3o3A&s", "https://www.normandie-appats.com/medias/Articles/comment_mange_la_daurade/1.jpg",],
    tips: [
      "Un chasseur éthique tire rarement en dessous de 30-35cm.",
      "Elle broie les coquillages : cherche-la près des parcs à huîtres.",
      "C'est un poisson très puissant au démarrage.",
      "La tache dorée entre les yeux est son signe distinctif."
    ]
  },
  { 
    id: 'sar', 
    name: 'Sar Commun', 
    scientific: 'Diplodus sargus',
    size: '25 cm',
    desc: 'Rayures verticales et tache caudale.', 
    imageUrls: ["https://upload.wikimedia.org/wikipedia/commons/b/ba/Diplodus_sargus_01.jpg
", "https://www.fishipedia.fr/wp-content/uploads/2019/06/Diplodus_sargus_sargus_TMe_Esp_SanJose_CalaHiguera_9928-725x483.jpg
", "https://www.lechasseursousmarin.com/wp-content/uploads/2022/10/photo-bandeau-sar-commun-nicolas-barraque-scaled.jpg
"],
    tips: [
      "Failles & Zones agitées : Il adore les trous sombres et le ressac.",
      "Il rentre vite à trou : Il faut être très rapide pour le tirer.",
      "Le 'pépère' (gros sar) est souvent seul.",
      "Sa chair est excellente mais doit être vidée rapidement."
    ]
  },
  { 
    id: 'lieu', 
    name: 'Lieu Jaune', 
    scientific: 'Pollachius pollachius',
    size: '30 cm',
    desc: 'Ligne latérale courbe, mâchoire inférieure saillante.', 
    imageUrls: ["", "", ""],
    tips: [
      "Il se tient souvent 'entre deux eaux' face au courant.",
      "Regarde bien au-dessus des champs d'algues brunes.",
      "Il est curieux mais garde ses distances.",
      "Sa mâchoire inférieure dépasse nettement la supérieure."
    ]
  },
  { 
    id: 'vieille', 
    name: 'Vieille', 
    scientific: 'Labrus bergylta',
    size: 'Conseillé 30 cm',
    desc: 'Robuste, lèvres épaisses, couleurs variables.', 
    imageUrls: ["https://www.lechasseursousmarin.com/wp-content/uploads/2022/06/photo-bandeau-vieille-commune-marc-andre-mounier.jpg
", "https://upload.wikimedia.org/wikipedia/commons/6/6d/Labrus_bergylta_Brest.jpg", "https://doriscdn.ffessm.fr/var/doris/storage/images/images/grande-vieille-mais-curieuse-19972/172785-1-fre-FR/Labrus_bergylta_D.Blin011_image1200.jpg"],
    tips: [
      "Elle adore se cacher dans les failles ou les laminaires.",
      "Très curieuse : elle finit souvent par ressortir la tête du trou.",
      "Sa chair est fragile : évite de la tirer dans le ventre.",
      "Elle change de couleur selon le fond (caméléon)."
    ]
  },
  { 
    id: 'mulet', 
    name: 'Mulet', 
    scientific: 'Mugil cephalus',
    size: '30 cm',
    desc: 'Tête large et plate, grosses écailles.', 
    imageUrls: ["https://www.francebleu.fr/pikapi/images/13363818-a4b2-46c9-bbce-5ba0d1a0540e/1200x680?webp=false
", "https://www.fishipedia.fr/wp-content/uploads/2022/08/Chelon-auratus-2-scaled.jpg
", "https://www.lechasseursousmarin.com/wp-content/uploads/2024/09/photo-bandeau-mulet-dore-credit-photo-claude-mayet-scaled.jpg?v=1726166058"],
    tips: [
      "Il circule souvent en bancs compacts près de la surface.",
      "Idéal pour s'entraîner au tir (moins farouche).",
      "Regarde sa bouche : elle est petite et plate.",
      "Excellent fumé ou en carpaccio."
    ]
  },
  { 
    id: 'sole', 
    name: 'Sole Commune', 
    scientific: 'Solea solea',
    size: '24 cm',
    desc: 'Plate, ovale, se confond avec le sable.', 
    imageUrls: ["", ""],
    tips: [
      "Le maître du camouflage : on ne voit souvent que les yeux.",
      "Elle démarre en ondulant. Tire devant la tête.",
      "Cherche les empreintes ou les bosses dans le sable."
    ]
  },
  { 
    id: 'roussette', 
    name: 'Roussette', 
    scientific: 'Scyliorhinus canicula',
    size: 'Conseillé ~50 cm',
    desc: 'Petit requin de fond, peau tachetée.', 
    imageUrls: ["https://eleau.org/wp-content/uploads/2018/06/petite-roussette-1.jpg
", "https://images-ca-1-0-1-eu.s3-eu-west-1.amazonaws.com/photos/original/2112/roussette-produit-AdobeStock_310276255.jpeg
","https://www.notrenature.be/media/cache/strip/uploads/media/62eba42d0fae1/shutterstock-154993202.jpg"],
    tips: [
      "Sable & Dalles : Souvent posée ou dormant sous une roche.",
      "Elle ne bouge pas : tu peux l'observer de très près.",
      "Attention à la peau rugueuse comme du papier de verre."
    ]
  }
];

export default function App() {
  const [gameState, setGameState] = useState('menu');
  const [currentFish, setCurrentFish] = useState(null);
  const [currentTip, setCurrentTip] = useState("");
  const [fishImage, setFishImage] = useState("");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const nextQuestion = () => {
    setSelected(null);
    const target = FISH_BASE_DATA[Math.floor(Math.random() * FISH_BASE_DATA.length)];
    const distractors = FISH_BASE_DATA
      .filter(f => f.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    // Sélection aléatoire d'une image parmi la liste
    const availableImages = target.imageUrls.filter(url => url !== "");
    const selectedImg = availableImages.length > 0 
      ? availableImages[Math.floor(Math.random() * availableImages.length)]
      : "https://via.placeholder.com/800x600?text=Image+en+attente";

    setCurrentFish(target);
    setCurrentTip(target.tips[Math.floor(Math.random() * target.tips.length)]);
    setFishImage(selectedImg);
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
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 text-center shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
          <div className="inline-flex p-5 bg-blue-600 rounded-3xl mb-8">
            <Anchor size={40} />
          </div>
          <h1 className="text-4xl font-black mb-3 italic uppercase tracking-tighter italic">AGACHON BZH</h1>
          <p className="text-slate-400 mb-10 text-sm font-medium">
            L'appli pour réviser tes mailles et tes techniques de chasse avant la saison.
          </p>
          <button 
            onClick={() => { setGameState('play'); nextQuestion(); }}
            className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            <Waves size={24} /> COMMENCER
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 flex flex-col items-center">
      {/* Barre de progression / Score */}
      <div className="w-full max-w-lg flex justify-between items-center mb-6 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 sticky top-4 z-20">
        <div className="flex items-center gap-3">
          <Trophy className="text-blue-500" size={20} />
          <span className="font-black text-lg">{score} / {total}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-lg">
           <Ruler size={14} className="text-blue-400" />
           <span className="text-[10px] font-bold uppercase tracking-wider">Maille Atlantique</span>
        </div>
      </div>

      <div className="w-full max-w-lg space-y-6">
        {/* Cadre Photo */}
        <div className="relative aspect-[4/3] w-full bg-slate-900 rounded-[2.5rem] overflow-hidden border-2 border-slate-800 shadow-2xl flex items-center justify-center">
          <img 
            src={fishImage} 
            alt="Cible" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "https://via.placeholder.com/800x600?text=Image+Bientôt+Disponible"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Grille de réponses */}
        <div className="grid grid-cols-1 gap-3 pb-4">
          {options.map(fish => {
            let style = "bg-slate-900 border-slate-800 text-slate-300 hover:border-blue-500 hover:bg-slate-800";
            if (selected) {
              if (fish.id === currentFish.id) style = "bg-emerald-600 border-emerald-500 text-white shadow-lg";
              else if (fish.id === selected.id) style = "bg-rose-600 border-rose-500 text-white";
              else style = "bg-slate-900 opacity-20 border-transparent grayscale";
            }

            return (
              <button
                key={fish.id}
                disabled={!!selected}
                onClick={() => handleChoice(fish)}
                className={`py-5 px-6 rounded-2xl border-2 font-black text-left flex justify-between items-center transition-all ${style}`}
              >
                <div className="flex flex-col">
                   <span className="uppercase text-lg italic tracking-tight">{fish.name}</span>
                </div>
                {selected && fish.id === currentFish.id && <Check size={24} />}
                {selected && fish.id === selected.id && fish.id !== currentFish.id && <X size={24} />}
              </button>
            );
          })}
        </div>

        {/* Panneau de conseils après sélection */}
        {selected && (
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-[2.5rem] shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
            <div className="flex justify-between items-start mb-6">
               <div>
                  <h3 className={`text-2xl font-black uppercase italic ${selected.id === currentFish.id ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {selected.id === currentFish.id ? 'Correct !' : 'Oups...'}
                  </h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase">{currentFish.scientific}</p>
               </div>
               <div className="bg-slate-800 p-2 px-4 rounded-xl text-center">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Maille</p>
                  <p className="text-lg font-black text-white">{currentFish.size}</p>
               </div>
            </div>
            
            <div className="bg-black/30 p-5 rounded-2xl border border-white/5 mb-6">
              <div className="flex items-center gap-2 mb-2 text-yellow-500">
                  <Lightbulb size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Conseil de Chasse</span>
              </div>
              <p className="text-slate-200 text-sm italic leading-relaxed">
                 "{currentTip}"
              </p>
            </div>

            <button 
              onClick={nextQuestion}
              className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-lg hover:bg-blue-400 transition-colors flex items-center justify-center gap-2 active:scale-95 transform"
            >
              CIBLE SUIVANTE <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
      
      {/* Espace pour le scroll en bas */}
      {selected && <div className="h-20"></div>}
    </div>
  );
}
