import React, { useState, useEffect } from 'react';
import { Trophy, Fish, Check, X, ArrowRight, Anchor, Ruler, Camera, Info, Lightbulb, Waves } from 'lucide-react';

// Base de données avec emplacements pour plusieurs images par poisson
const FISH_BASE_DATA = [
  { 
    id: 'bar', 
    name: 'Bar (Loup)', 
    scientific: 'Dicentrarchus labrax',
    size: '42 cm',
    desc: 'Argenté, fuselé, opercule piquant.', 
    imageUrls: [
      "https://www.mer-littoral.org/34/photos/dicentrarchus-labrax-0m.jpg", // Lien Image 1 (ex: Profil)
      "https://www.mer-littoral.org/34/photos/dicentrarchus-labrax-0m.jpg", // Lien Image 2 (ex: Dans les algues)
      "https://www.mer-littoral.org/34/photos/dicentrarchus-labrax-0m.jpg"  // Lien Image 3 (ex: Vue de face)
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
    imageUrls: ["https://www.fishipedia.fr/wp-content/uploads/2019/06/Sparus-aurata-Daurade-Costa-Smeralda-Sardaigne-6102_00001.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGQzvK0UkhFnzJPAffJPckEiQAHNWagC3o3A&s",
                "https://www.normandie-appats.com/medias/Articles/comment_mange_la_daurade/1.jpg"
               ],
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
    imageUrls: ["https://upload.wikimedia.org/wikipedia/commons/b/ba/Diplodus_sargus_01.jpg",
                "https://www.fishipedia.fr/wp-content/uploads/2019/06/Diplodus_sargus_sargus_TMe_Esp_SanJose_CalaHiguera_9928-725x483.jpg",
                "https://www.lechasseursousmarin.com/wp-content/uploads/2022/10/photo-bandeau-sar-commun-nicolas-barraque-scaled.jpg"
               ],
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
    size: '42 cm',
    desc: 'Ligne latérale courbe, mâchoire inférieure saillante.', 
    imageUrls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_jqSx1sbreFqvwIJkort8beinGfiLN7M06g&s",
                "https://upload.wikimedia.org/wikipedia/commons/8/8e/Pollachius_pollachius_aquarium.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XQsXIDKYYc5FHPeEnSh1en-BbI57D3FNSA&s",
                "https://upload.wikimedia.org/wikipedia/commons/8/84/Pollachius_pollachius_Saint-Quay.JPG",
                "https://www.mer-littoral.org/34/photos/pollachius-pollachius-0m.jpg"],
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
    imageUrls: ["https://www.lechasseursousmarin.com/wp-content/uploads/2022/06/photo-bandeau-vieille-commune-marc-andre-mounier.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/6/6d/Labrus_bergylta_Brest.jpg",
                "https://doriscdn.ffessm.fr/var/doris/storage/images/images/grande-vieille-mais-curieuse-19972/172785-1-fre-FR/Labrus_bergylta_D.Blin011_image1200.jpg"]
    ,
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
    imageUrls: ["https://www.francebleu.fr/pikapi/images/13363818-a4b2-46c9-bbce-5ba0d1a0540e/1200x680?webp=false",
                "https://www.fishipedia.fr/wp-content/uploads/2022/08/Chelon-auratus-2-scaled.jpg",
                "https://www.lechasseursousmarin.com/wp-content/uploads/2024/09/photo-bandeau-mulet-dore-credit-photo-claude-mayet-scaled.jpg?v=1726166058"
               ],
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
    imageUrls: ["https://www.fishipedia.fr/wp-content/uploads/2020/06/Solea-solea.jpg",
                "https://www.aquariumbcn.com/wp-content/uploads/2022/08/Solea-solea.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3IO3Lm6uUoyzn0QUy-FhNnaoQ3uZWDmr8PA&s",
                "https://doriscdn.ffessm.fr/var/doris/storage/images/images/en-bretagne-22570/193569-1-fre-FR/solea_solea-db21_image600.jpg",
                "https://www.fishipedia.fr/wp-content/uploads/2020/06/Buglossidium-luteum-400x267.jpg",
                "https://image.ifremer.fr/data/00558/67035/ld/20670.jpg",
                "https://lh6.googleusercontent.com/proxy/EkjTvLe-qDpdSXBoV0NUqJ7Haci6CxhEPAaeE_QHP09DrKB4sPqvQVtVFhSnMzgtYpGyWzsvSij8XhDJRVI6CJDMiA"],
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
    imageUrls: ["https://eleau.org/wp-content/uploads/2018/06/petite-roussette-1.jpg",
                "https://images-ca-1-0-1-eu.s3-eu-west-1.amazonaws.com/photos/original/2112/roussette-produit-AdobeStock_310276255.jpeg",
                "https://www.notrenature.be/media/cache/strip/uploads/media/62eba42d0fae1/shutterstock-154993202.jpg"
               ],
    tips: [
      "Sable & Dalles : Souvent posée ou dormant sous une roche.",
      "Elle ne bouge pas : tu peux l'observer de très près.",
      "Attention à la peau rugueuse comme du papier de verre."
    ]
  },
  { 
    id: 'maquereau', 
    name: 'Maquereau', 
    scientific: 'Scomber scombrus',
    size: '20 cm',
    desc: 'Dos zébré bleu-vert, corps fuselé, nageur très rapide.', 
    imageUrls: ["https://doriscdn.ffessm.fr/var/doris/storage/images/images/scomber_colias-scombrus-thme2013/4919030-1-fre-FR/Scomber_colias-scombrus-thme2013_image600.jpg",
                "https://www.fishipedia.fr/wp-content/uploads/2020/06/Scomber-scombrus-2-725x483.jpg",
               "https://lh6.googleusercontent.com/proxy/Jw5jZj4ft8QjPPxgc_6tYWE1FyNzlOE0h_DXjKF-U7PZhhvtNL0QSD4Cbc7sOPUs-GOetWSmUeuq4OWYUz2YpVdMG1vUFY5sFYXT4NoSEM6wpEck31PictegnadzxXw8xtoVJo15huGFbC4"
               ],
    tips: [
      "Observation : Cherche les bouillonnements ou les oiseaux, signes d'un banc en chasse.",
      "Approche : Il est craintif, préfère une indienne lente plutôt que de foncer dans le tas.",
      "Conservation : Poisson à sang chaud qui s'abîme vite, mets-le vite au frais après marquage.",
      "Comportement : Souvent en mouvement perpétuel, il faut anticiper sa trajectoire."
    ]
  },
  { 
    id: 'congre', 
    name: 'Congre', 
    scientific: 'Conger conger',
    size: '60 cm',
    desc: 'Corps serpentiforme gris/noir, peau lisse et très puissante.', 
    imageUrls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiIhLaRzHJyBI36tXmW0YF6AP3OkMSoXGTqA&s",
               "https://upload.wikimedia.org/wikipedia/commons/9/93/Conger_eel01.jpg",
               "https://www.fishipedia.fr/wp-content/uploads/2024/02/Conger-conger-725x483.jpeg",
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDR1FPYJFnSBFTnJq11yTPX7Q2gDwbx7WOBw&s",
               "https://bioobs.fr/blog/src/mes_photos/user_1923/030209C1-9EC7-0C43-F4AB-AF7C94C58E22/00003.jpg",
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmw1VYaJSK-qkY84PwYL7zSwAcVGZPsdkj9A&s"
               ],
    tips: [
      "Matériel : Utilise une flèche robuste et un moulinet pour contrer sa force de torsion.",
      "Tir de tête : Vise impérativement entre les deux yeux pour l'assommer immédiatement.",
      "Sécurité : Attention aux mâchoires, les réflexes nerveux peuvent mordre même après la prise.",
      "Éthique : Il protège souvent les homards des poulpes, réfléchis avant de prélever le 'gardien'."
    ]
  },
  { 
    id: 'barracuda', 
    name: 'Barracuda', 
    scientific: 'Sphyraena sphyraena',
    size: 'Conseillé 30-40 cm',
    desc: 'Corps allongé, grandes dents, allure de brochet des mers.', 
    imageUrls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrWdHQ5aixfK0vsmANU_V_4IxVlQkmjTQVhw&s",
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJRztpwYwsndABg7mozpl8zCXDF8U8SzpeQ&s",
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJnFsWy-mC72_uh8St0DXzks58dNKrUIwVw&s",
               "https://doriscdn.ffessm.fr/var/doris/storage/images/images/belle-taille-27711/234697-1-fre-FR/sphyraena_barracuda-vl11_image600.jpg"
               ],
    tips: [
      "Zone : On le trouve surtout en fin d'été sur les pointes rocheuses exposées au courant.",
      "Technique : Très curieux, l'agachon immobile au fond le fera venir à toi.",
      "Tir : Sa peau est fragile, vise derrière les ouïes pour assurer une bonne tenue.",
      "Dents : Très acérées, utilise une pince pour décrocher ta flèche en toute sécurité."
    ]
  },
  { 
    id: 'homard', 
    name: 'Homard Européen', 
    scientific: 'Homarus gammarus',
    size: '9 cm (Carapace)',
    desc: 'Bleu sombre, deux grosses pinces asymétriques. Le roi des trous.', 
    imageUrls: ["https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/KreeftbijDenOsse.jpg/1280px-KreeftbijDenOsse.jpg",
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdQQVyFEdpYGNSAxiTG8Hho1OYILWQfKlXiQ&s",
               "https://www.fishipedia.it/wp-content/uploads/2021/03/Homarus-gammarus-725x483.jpg",
               "https://www.fishipedia.it/wp-content/uploads/2022/06/Homarus-gammarus-2.jpg"
               ],
    tips: [
      "Repérage : Cherche les antennes qui dépassent. Il sort souvent à l'entrée du trou à l'étale.",
      "Technique : Utilise une baguette pour gratouiller derrière lui, il avancera vers la sortie par réflexe.",
      "Saisie : Attrape-le fermement par le thorax. S'il donne un coup de queue, il créera un nuage de sable.",
      "Sécurité : Sa pince broyeuse peut sectionner un gant. Garde tes mains loin des articulations."
    ]
  },
  { 
    id: 'araignee', 
    name: 'Araignée de Mer', 
    scientific: 'Maja brachydactyla',
    size: '12 cm',
    desc: 'Corps bombé, couverte d\'algues, pattes pointues. Très commune au printemps.', 
    imageUrls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw_xr3SVECwQcLX3DD36npEhw5D-V7JbAefg&s",
               "https://www.marlin.ac.uk/assets/images/marlin/species/web/o_majsqu.jpg",
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQHEJs3OBV-XSA8RDjggXnORJLu-RO-KKhCA&s",
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPO_o3V8np9s75nieoiHV9OeljiqBbEDF3XA&s"
               ],
    tips: [
      "Camouflage : Repère les formes bombées 'poilues' au milieu des algues laminaires.",
      "Saison : Le pic est d'avril à juin quand elles remontent par milliers vers la côte.",
      "Tri : Privilégie les mâles (tablier étroit sous le ventre) et laisse les femelles pour la repro.",
      "Transport : Ne la mets pas avec tes poissons, ses pattes pourraient les abîmer."
    ]
  },
  { 
    id: 'tourteau', 
    name: 'Tourteau (Dormeur)', 
    scientific: 'Cancer pagurus',
    size: '15 cm (Largeur)',
    desc: 'Large carapace lisse, pinces à bouts noirs. Adore les failles étroites.', 
    imageUrls: ["https://doriscdn.ffessm.fr/var/doris/storage/images/images/sous-un-surplomb-16939/148521-1-fre-FR/cancer_pagurus-71_image600.jpg",
               "https://www.mer-littoral.org/24/photos/cancer-pagurus-0m.jpg",
               "https://www.marlin.ac.uk/assets/images/marlin/species/web/o_canpag.jpg",
               "https://images.reeflifesurvey.com/1/species_17_686343f958d8c.w1000.h666.jpg"
               ],
    tips: [
      "Nouvelle Maille : Attention, la taille minimale est passée de 14 à 15 cm !",
      "Pression : S'il t'attrape, pose-le au fond. Il finira par lâcher prise pour s'enfuir.",
      "Qualité : Appuie sur le dessous, s'il est mou, il vient de muer et contient peu de chair. Relâche-le.",
      "Saisie : Place tes doigts à l'arrière de la carapace, les pinces ne peuvent pas t'atteindre là."
    ]
  },
  { 
    id: 'grondin', 
    name: 'Grondin Rouge', 
    scientific: 'Chelidonichthys lucerna',
    size: '20 cm',
    desc: 'Corps rouge vif, grandes pectorales bleues. Il semble marcher sur le fond.', 
    imageUrls: ["https://www.fishipedia.fr/wp-content/uploads/2020/06/Chelidonichthys-lucerna-scaled.jpg",
               "https://inaturalist-open-data.s3.amazonaws.com/photos/108401984/original.jpeg",
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBap7_80RRLRfXfHDni4YZU2-xHXkusf53Ag&s",
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTq2IxVF9liGlyK29KUn-3JQiwpE047w0jkw&s",
               "https://bioobs.fr/blog/src/mes_photos/user_1877/67B01ED8-2258-B52A-379C-84B393EF8E3C/00011.jpg",
               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9SlnWT3OCH5loz6p_k0fL7Gzv6nHaF4K9HQ&s"
               ],
    tips: [
      "Habitat : On le trouve sur le sable ou le gravier en lisière de roche.",
      "Comportement : Il se croit bien camouflé et ne bouge pas si l'approche est douce.",
      "Le cri : Ne sois pas surpris, il émet un grognement une fois sorti de l'eau !",
      "Manipulation : Attention aux épines sur sa tête osseuse et sa dorsale."
    ]
  },
  { 
    id: 'coquette', 
    name: 'Vieille Coquette', 
    scientific: 'Labrus mixtus',
    size: 'Conseillé 25 cm',
    desc: 'Mâle bleu électrique / Femelle orange. Très colorée.', 
    imageUrls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH2v82K16o0IneqzLgRwccvvAw9Y9Vbhkcxg&s",
               "https://upload.wikimedia.org/wikipedia/commons/1/11/Labrus_bimaculatus.jpg",
               "https://www.mer-littoral.org/34/photos/labrus-mixtus-0m.jpg",
               "https://upload.wikimedia.org/wikipedia/commons/d/d4/Labrus_mixtus_2_by_Line1.jpg",
               "https://www.fishipedia.fr/wp-content/uploads/2021/05/Labrus-mixtus-female-725x483.jpg",
               "https://upload.wikimedia.org/wikipedia/commons/e/ec/Labrus_mixtus_%28bimaculatus%29F_-_Stefano_Guerrieri.jpg"
               ],
    tips: [
      "Dimorphisme : Le mâle est bleu et orange, la femelle est orange avec 2 taches noires.",
      "Profondeur : Elle vit souvent un peu plus bas que la vieille commune (> 10m).",
      "Éthique : Le mâle bleu est essentiel à la colonie (protogynie), évite de trop le prélever.",
      "Réflexe : Très farouche, elle s'enfarague au moindre signe de danger."
    ]
  },
  { 
    id: 'turbot', 
    name: 'Turbot', 
    scientific: 'Scophthalmus maximus',
    size: '30 cm',
    desc: 'Forme circulaire, peau rugueuse avec des tubercules osseux. Le Graal du sable.', 
    imageUrls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJA69oSQ2xlLrp-XmlOs5Uw3dUYcvDqjmm1g&s",
               "https://www.mer-littoral.org/34/photos/scophthalmus-maximus-0m.jpg",
               "https://static.inaturalist.org/photos/59056007/medium.jpeg",
               "https://upload.wikimedia.org/wikipedia/commons/0/0e/Scophthalmidae_Scophthalmus_maximus_2.jpg",
               "https://www.demonsunglasses.com/cdn/shop/articles/complete-guide-to-turbot-fishing-techniques-equipment-seasons-and-tips_82418b5a-8855-4ec2-b950-b74332788ebd_large.jpg?v=1761120250"
               ],
    tips: [
      "Repérage : Cherche uniquement le contour circulaire ou les deux yeux sur le sable.",
      "Poste : Il adore les zones de fort courant (passes) pour guetter ses proies.",
      "Technique : Laisse-toi dériver sans palmer pour ne pas l'alerter.",
      "Le doublé : Ouvre l'œil, un deuxième individu est souvent posté juste à côté !"
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
