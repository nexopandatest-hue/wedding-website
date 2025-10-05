import { useState, useEffect } from 'react';
import RSVP from './RSVP';
import { guestList, getGuestByCode, getDisplayName } from './guestData';

interface WeddingData {
  coupleName: string;
  weddingDate: string;
  venue: string;
  message: string;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    ourWedding: "Our Wedding",
    weddingInvitation: "WEDDING INVITATION",
    twoSouls: "Stefan ❤ Gloria",
    enterCode: "Enter Your Invitation Code",
    enterCodeDesc: "Please enter the 6-character code from your invitation",
    enterWedding: "Enter Our Wedding",
    needCode: "Need your invitation code? Please contact us",
    // Navigation
    home: "Home",
    ourStory: "Our Story",
    where: "Where",
    rsvp: "RSVP",
    // Wedding page
    
    daysToGo: "DAYS TO GO!",
    june20: "JUNE 20,",
    year2026: "2026",
    valencia: "VALENCIA",
    spain: "SPAIN",
    // Personalized invitation
    youAreInvited: "You are invited to our wedding. Please fill out the RSVP",
    // Our Story content
    theInterview: "THE INTERVIEW",
    howDidYouMeet: "HOW DID YOU MEET?",
    gloria: "Gloria",
    stefan: "Stefan",
    howWasFirstDate: "HOW WAS YOUR FIRST DATE?",
    andYourSecondDate: "AND YOUR SECOND DATE?",
    wowAndThirdDate: "WOW, AND THE THIRD DATE?",
    okayQuestions: "OKAY, HERE 9 QUESTIONS TO ANSWER FAST",
    // Story content
    storyMeet1: "We met in a bar.",
    storyMeet2: "We met on the beach.",
    storyMeet3: "We met on a cruise ship.",
    storyMeet4: "Tell them the truth.",
    storyMeet5: "Hinge. Yes, online dating. Are you happy now?",
    storyMeet6: "Much better. We chatted for a whole day, which is basically a lifetime in online dating. I hate writing messages on apps, so I gave her two choices: 'Meet for a coffee or bye.'",
    storyMeet7: "And I said yes. Best yes ever.",
    storyFirstDate1: "We met in Cabanyal. My barrio makes me strong, impulsive, temperamental, smart, good-looking, and wonderful.",
    storyFirstDate2: "...and me.",
    storyFirstDate3: "We met at Mercado de Cabanyal, with him getting out of a taxi at one end and her at the other.",
    storyFirstDate4: "Walking towards each other for 20 whole seconds, eyes locked. It was in those 20 seconds that I fall in Love with her.",
    storyFirstDate5: "He was so charming because he complimented me and listened to me.",
    storyFirstDate6: "She was so hot.",
    storyFirstDate7: "Then he bought me a rose while telling me how beautiful I am.",
    storyFirstDate8: "So hot...",
    storyFirstDate9: "He invited me to an Italian restaurant — our first dinner together. We talked for 13 hours straight without stopping.",
    storyFirstDate10: "Have you seen her? Hot.",
    storyFirstDate11: "It was the start of something big.",
    storyFirstDate12: "Huge.",
    storySecondDate1: "Germany vs Spain in the semi-final.",
    storySecondDate2: "Ah yes.",
    storySecondDate3: "It was decided by that IDIOT Cucurella, who handballed in his own box and robbed Germany — the better team, by the way — of their rightful win.",
    storySecondDate4: "He's still bitter.",
    storySecondDate5: "Because it was unfair and undeserved!",
    storySecondDate6: "Anyway, Spain won and... OLEEEE, we are the best, Oleeee!",
    storySecondDate7: "And yet, despite the injustice, it was a great night. We realised we were meant for each other.",
    // Q&A content
    q1: "Who's more stubborn?",
    q1a1: "Definitely Gloria.",
    q1a2: "...I disagree.",
    q1a3: "Case closed.",
    q2: "Who's the better cook?",
    q2a1: "Me. 100%.",
    q2a2: "I can't cook at all, but I love to eat. Does that count?",
    q2a3: "No.",
    q3: "Who's more likely to be late?",
    q3a1: "Gloria.",
    q3a2: "He's annoyingly on time.",
    q4: "What's one thing the other person always says?",
    q4a1: "Stefan always starts with 'Logically...'",
    q4a2: "And Gloria always starts cute. Like dangerously cute.",
    q5: "Who takes longer to get ready?",
    q5a1: "Gloria.",
    q5a2: "...yes.",
    q6: "If the other was a drink, what would they be?",
    q6a1: "Gloria would be some massively funny alcoholic beverage that gets everyone laughing.",
    q6a2: "And Stefan would be tonic water. Reliable. Classic. Maybe a bit bitter.",
    q7: "Who's more likely to get lost?",
    q7a1: "Gloria.",
    q8: "What's one thing you'll never agree on?",
    q8a1: "Where to live in the future.",
    q8a2: "She's wrong, by the way.",
    q9: "Who's the first to say 'let's order dessert'?",
    q9a1: "Both of us. Always.",
    both: "Both"
  },
  es: {
    ourWedding: "Nuestra Boda",
    weddingInvitation: "INVITACIÓN DE BODA",
    twoSouls: "Stefan ❤ Gloria",
    enterCode: "Ingresa Tu Código de Invitación",
    enterCodeDesc: "Por favor ingresa el código de 6 caracteres de tu invitación",
    enterWedding: "Entrar a Nuestra Boda",
    needCode: "¿Necesitas tu código de invitación? Por favor contáctanos",
    // Navigation
    home: "Inicio",
    ourStory: "Nuestra Historia",
    where: "Donde",
    rsvp: "Preguntas a responder",
    // Wedding page
  
    daysToGo: "DÍAS PARA EL GRAN DÍA!",
    june20: "20 DE JUNIO,",
    year2026: "2026",
    valencia: "VALENCIA",
    spain: "ESPAÑA",
    // Personalized invitation
    youAreInvited: "Están invitados a nuestra boda. Por favor completen las preguntas a responder",
    // Our Story content
    theInterview: "LA ENTREVISTA",
    howDidYouMeet: "¿CÓMO OS CONOCISTEIS?",
    gloria: "Gloria",
    stefan: "Stefan",
    howWasFirstDate: "¿CÓMO FUE VUESTRA PRIMERA CITA?",
    andYourSecondDate: "¿Y VUESTRA SEGUNDA CITA?",
    wowAndThirdDate: "¡VAYA, Y LA TERCERA CITA?",
    okayQuestions: "VALE, AQUÍ 9 PREGUNTAS PARA RESPONDER RÁPIDO",
    // Story content
    storyMeet1: "Nos conocimos en un bar.",
    storyMeet2: "Nos conocimos en la playa.",
    storyMeet3: "Nos conocimos en un crucero.",
    storyMeet4: "Diles la verdad.",
    storyMeet5: "Hinge. Sí, citas online. ¿Estás contento ahora?",
    storyMeet6: "Mucho mejor. Chateamos durante todo un día, que es básicamente una eternidad en las citas online. Odio escribir mensajes en apps, así que le di dos opciones: 'Quedamos para un café o adiós.'",
    storyMeet7: "Y dije que sí. El mejor sí de mi vida.",
    storyFirstDate1: "Nos conocimos en Cabanyal. Mi barrio me hace fuerte, impulsiva, temperamental, inteligente, guapa y maravillosa.",
    storyFirstDate2: "...y a mí.",
    storyFirstDate3: "Nos conocimos en el Mercado de Cabanyal, con él bajando de un taxi en un extremo y ella en el otro.",
    storyFirstDate4: "Caminando uno hacia el otro durante 20 segundos enteros, mirándonos a los ojos. Fue en esos 20 segundos que me enamoré de ella.",
    storyFirstDate5: "Era tan encantador porque me halagaba y me escuchaba.",
    storyFirstDate6: "Estaba tan buena.",
    storyFirstDate7: "Luego me compró una rosa mientras me decía lo hermosa que soy.",
    storyFirstDate8: "Tan buena...",
    storyFirstDate9: "Me invitó a un restaurante italiano — nuestra primera cena juntos. Hablamos durante 13 horas seguidas sin parar.",
    storyFirstDate10: "¿La has visto? Buena.",
    storyFirstDate11: "Fue el comienzo de algo grande.",
    storyFirstDate12: "Enorme.",
    storySecondDate1: "Alemania vs España en las semifinales.",
    storySecondDate2: "Ah sí.",
    storySecondDate3: "Lo decidió ese IDIOTA de Cucurella, que hizo mano en su propia área y robó a Alemania — el mejor equipo, por cierto — de su merecida victoria.",
    storySecondDate4: "Todavía está amargado.",
    storySecondDate5: "¡Porque fue injusto e inmerecido!",
    storySecondDate6: "De todas formas, España ganó y... ¡OLEEEE, somos los mejores, Oleeee!",
    storySecondDate7: "Y sin embargo, a pesar de la injusticia, fue una gran noche. Nos dimos cuenta de que estábamos hechos el uno para el otro.",
    // Q&A content
    q1: "¿Quién es más testarudo?",
    q1a1: "Definitivamente Gloria.",
    q1a2: "...no estoy de acuerdo.",
    q1a3: "Caso cerrado.",
    q2: "¿Quién cocina mejor?",
    q2a1: "Yo. 100%.",
    q2a2: "No sé cocinar nada, pero me encanta comer. ¿Eso cuenta?",
    q2a3: "No.",
    q3: "¿Quién es más probable que llegue tarde?",
    q3a1: "Gloria.",
    q3a2: "Es molesto puntual.",
    q4: "¿Qué es una cosa que la otra persona siempre dice?",
    q4a1: "Stefan siempre empieza con 'Lógicamente...'",
    q4a2: "Y Gloria siempre empieza mona. Como peligrosamente mona.",
    q5: "¿Quién tarda más en arreglarse?",
    q5a1: "Gloria.",
    q5a2: "...sí.",
    q6: "Si la otra persona fuera una bebida, ¿qué sería?",
    q6a1: "Gloria sería alguna bebida alcohólica súper divertida que hace reír a todos.",
    q6a2: "Y Stefan sería agua tónica. Confiable. Clásico. Tal vez un poco amargo.",
    q7: "¿Quién es más probable que se pierda?",
    q7a1: "Gloria.",
    q8: "¿En qué cosa nunca estaréis de acuerdo?",
    q8a1: "Dónde vivir en el futuro.",
    q8a2: "Está equivocada, por cierto.",
    q9: "¿Quién es el primero en decir 'pidamos postre'?",
    q9a1: "Los dos. Siempre.",
    both: "Ambos"
  }
};

// Wedding invitation data - each code corresponds to a guest/couple
// Generate wedding data for each guest
const weddingCodes: Record<string, WeddingData> = {};

// Populate wedding codes from guest list
guestList.forEach(guest => {
  weddingCodes[guest.code] = {
    coupleName: 'Sara & Juan',
    weddingDate: '20.06.2026',
    venue: 'Valencia',
    message: `Dear ${getDisplayName(guest)}, we can't wait to celebrate our special day with you!`
  };
});

// Debug: Log available codes (remove this in production)
console.log('Available guest codes:', Object.keys(weddingCodes));

// Countdown component
function Countdown({ language }: { language: 'en' | 'es' }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const t = translations[language];

  useEffect(() => {
    const weddingDate = new Date('2026-06-20T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-lg font-sans font-light tracking-wider text-black uppercase">
      {timeLeft.days} {t.daysToGo}
    </div>
  );
}

// Navigation component
function Navigation({ language, currentPage, onPageChange }: { 
  language: 'en' | 'es';
  currentPage: 'home' | 'story' | 'where' | 'rsvp';
  onPageChange: (page: 'home' | 'story' | 'where' | 'rsvp') => void;
}) {
  const t = translations[language];
  
  return (
    <nav className="flex justify-center space-x-8 text-black font-sans font-medium">
      <button 
        onClick={() => onPageChange('home')}
        className={`transition-all ${currentPage === 'home' ? 'border-b border-black pb-1' : 'hover:border-b hover:border-black hover:pb-1'}`}
      >
        {t.home}
      </button>
      <button 
        onClick={() => onPageChange('story')}
        className={`transition-all ${currentPage === 'story' ? 'border-b border-black pb-1' : 'hover:border-b hover:border-black hover:pb-1'}`}
      >
        {t.ourStory}
      </button>
      <button 
        onClick={() => onPageChange('where')}
        className={`transition-all ${currentPage === 'where' ? 'border-b border-black pb-1' : 'hover:border-b hover:border-black hover:pb-1'}`}
      >
        {t.where}
      </button>
      <button 
        onClick={() => onPageChange('rsvp')}
        className={`transition-all ${currentPage === 'rsvp' ? 'border-b border-black pb-1' : 'hover:border-b hover:border-black hover:pb-1'}`}
      >
        {t.rsvp}
      </button>
    </nav>
  );
}

// Main date and location section
function DateLocationSection({ language }: { language: 'en' | 'es' }) {
  const t = translations[language];
  
  return (
    <div className="flex items-center justify-center space-x-8 my-16">
      {/* Date */}
      <div className="text-right">
        <div className="text-6xl font-serif text-black leading-none">
          <div>{t.june20}</div>
          <div>{t.year2026}</div>
        </div>
      </div>
      
      {/* Vertical separator */}
      <div className="w-px h-20 bg-amber-900"></div>
      
      {/* Location */}
      <div className="text-left">
        <div className="text-6xl font-serif text-black leading-none">
          <div>{t.valencia}</div>
          <div>{t.spain}</div>
        </div>
      </div>
    </div>
  );
}


// Where page component
function WherePage({ language }: { language: 'en' | 'es' }) {
  return (
    <div className="max-w-4xl mx-auto px-8 py-2">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Church Location */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <div className="mb-6">
            <img 
              src="/photos/Church.jpg" 
              alt="Church" 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          </div>
          <h2 className="text-2xl font-serif text-black mb-4">
            {language === 'en' ? 'SANCTUARY OF THE VIRGIN OF MONTOLIVET' : 'SANTUARIO DE LA VIRGEN DE MONTOLIVET'}
          </h2>
          <p className="text-black font-sans mb-4">
            {language === 'en' 
              ? 'Plaza Monteolivete, 3, Quatre Carreres, 46004 València, Valencia, Spain' 
              : 'Plaza Monteolivete, 3, Quatre Carreres, 46004 València, Valencia, España'
            }
          </p>
          <div className="border-t border-amber-200 pt-4">
            <div className="space-y-3">
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-lg font-sans text-black">
                  <strong>{language === 'en' ? 'Wedding Ceremony:' : 'Ceremonia:'}</strong> 17:00
                </p>
                <p className="text-sm text-gray-600 italic">
                  {language === 'en' ? '(Please arrive 20 minutes before)' : '(Por favor llegar 20 minutos antes)'}
                </p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-lg font-sans text-black">
                  <strong>{language === 'en' ? 'Ceremony Ends:' : 'Fin de Ceremonia:'}</strong> 18:15
                </p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-lg font-sans text-black">
                  <strong>{language === 'en' ? 'Bus Departure:' : 'Salida del Autobús:'}</strong> 18:30
                </p>
                <p className="text-sm text-gray-600 italic">
                  {language === 'en' ? '(If not attending church, be here by 18:15)' : '(Si no asistes a la iglesia, estar aquí a las 18:15)'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Finca Location */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <div className="mb-6">
            <img 
              src="/photos/Finca.jpeg" 
              alt="Finca" 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          </div>
          <h2 className="text-2xl font-serif text-black mb-4">
            FINCA EL PORTÓN
          </h2>
          <p className="text-black font-sans mb-4">
            {language === 'en' 
              ? 'Partida de Calabarra, Nº 1100, 46389 Turís, Valencia, Spain' 
              : 'Partida de Calabarra, Nº 1100, 46389 Turís, Valencia, España'
            }
          </p>
          <div className="border-t border-amber-200 pt-4">
            <div className="space-y-3">
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-lg font-sans text-black">
                  <strong>{language === 'en' ? 'Reception Start:' : 'Inicio de Recepción:'}</strong> 18:45
                </p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-lg font-sans text-black">
                  <strong>{language === 'en' ? 'Reception End:' : 'Fin de Recepción:'}</strong> 02:00
                </p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-lg font-sans text-black">
                  <strong>{language === 'en' ? 'Return Bus Departure:' : 'Salida del Autobús de Regreso:'}</strong> 02:15
                </p>
                <p className="text-sm text-gray-600 italic">
                  {language === 'en' ? '(Back to Valencia center)' : '(De regreso al centro de Valencia)'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeEntryPage({ onCodeSubmit, language, setLanguage }: { 
  onCodeSubmit: (code: string) => void;
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
}) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (code.length !== 6) {
      setError('Please enter a 6-character code');
      return;
    }

    if (!weddingCodes[code]) {
      setError('Invalid guest code. Please check the code you received and try again.');
      return;
    }

    onCodeSubmit(code);
  };

  return (
    <div className="min-h-screen bg-white relative flex items-center justify-end p-4 overflow-hidden">
      {/* Romantic Couple Photo Background */}
      <div className="absolute inset-0 pointer-events-none">
      {/* Background Image with Soft Fade */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-60"
        style={{
          backgroundImage: 'url(/photos/couple-background.jpg)',
          backgroundPosition: 'left center'
        }}
      />
        
        {/* Light Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-white/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-white/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15" />
      </div>

      {/* Language Switcher */}
      <div className="absolute top-4 right-4 flex items-center space-x-3 z-30">
        <div className="text-base font-sans font-bold text-gray-700 hidden md:block">
          {language === 'en' ? (
            <span className="flex items-center">
              Si quieres español, cambia el idioma aquí
              <span className="ml-2">→</span>
            </span>
          ) : (
            <span className="flex items-center">
              If you want English, change the language here
              <span className="ml-2">→</span>
            </span>
          )}
        </div>
        <button
          onClick={() => setLanguage('en')}
          className={`p-2 rounded-full border-2 transition-all ${
            language === 'en' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-2xl font-bold">EN</span>
        </button>
        <button
          onClick={() => setLanguage('es')}
          className={`p-2 rounded-full border-2 transition-all ${
            language === 'es' 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-2xl">🇪🇸</span>
        </button>
      </div>

      <div className="max-w-lg w-full relative z-30 mr-8">
        {/* S&G Monogram */}
        <div className="text-center mb-12">
          <div className="text-6xl md:text-8xl font-serif text-white mb-4 drop-shadow-lg" style={{ fontFamily: 'serif' }}>
            <span className="italic">S</span>
            <span className="text-4xl md:text-6xl mx-2">❤</span>
            <span className="italic">G</span>
          </div>
        </div>

        {/* Code Input Section */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/30 p-8 shadow-xl rounded-2xl">
          <div className="text-center mb-6">
            <div className="mb-6">
              <div className="inline-block border-t border-b border-gray-300 py-2 px-6 mb-3">
                <h1 className="text-2xl font-serif text-gray-800 tracking-wide">
                  {t.ourWedding}
                </h1>
              </div>
              <div className="flex items-center justify-center space-x-3 text-gray-600 mb-3">
                <div className="w-6 h-px bg-gray-300"></div>
                <span className="text-xs tracking-widest">{t.weddingInvitation}</span>
                <div className="w-6 h-px bg-gray-300"></div>
              </div>
              <p className="text-gray-600 text-sm font-light italic mb-4">
                "{t.twoSouls}"
              </p>
            </div>
            
            <h2 className="text-xl font-serif text-gray-800 mb-2">{t.enterCode}</h2>
            <p className="text-gray-600 text-sm">{t.enterCodeDesc}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* 6 Square Input Boxes */}
            <div className="flex justify-center space-x-3 mb-6">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={code[index] || ''}
                  onChange={(e) => {
                    const newCode = code.split('');
                    // Allow both letters and numbers, convert to uppercase
                    newCode[index] = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                    const updatedCode = newCode.join('').slice(0, 6);
                    setCode(updatedCode);
                    
                    // Auto-focus next input
                    if (e.target.value && index < 5) {
                      const nextInput = e.target.parentElement?.children[index + 1] as HTMLInputElement;
                      nextInput?.focus();
                    }
                  }}
                  className="w-12 h-12 border border-gray-300 text-center text-xl font-light focus:border-gray-500 focus:outline-none"
                  style={{ fontFamily: 'serif' }}
                />
              ))}
            </div>

            {error && (
              <div className="text-center mb-4">
                <p className="text-red-600 text-sm italic">{error}</p>
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="bg-transparent border border-gray-400 text-gray-700 py-3 px-8 hover:bg-gray-50 transition-colors duration-200 font-light tracking-wide"
                style={{ fontFamily: 'serif' }}
              >
                {t.enterWedding}
              </button>
            </div>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-400 text-xs">
              {t.needCode}
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-gray-300">
            <span className="text-2xl">❦</span>
            <span className="text-sm">❦</span>
            <span className="text-2xl">❦</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeddingHomePage({ code, language, setLanguage, currentPage, onPageChange }: { 
  code: string;
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
  currentPage: 'home' | 'story' | 'where' | 'rsvp';
  onPageChange: (page: 'home' | 'story' | 'where' | 'rsvp') => void;
}) {
  const weddingData = weddingCodes[code];
  const t = translations[language];

  if (!weddingData) {
    return <div>Invalid code</div>;
  }

  // Get background image based on current page
  const getBackgroundImage = () => {
    let imagePath = '';
    switch (currentPage) {
      case 'home':
        imagePath = '/photos/Pic 1.jpeg';
        break;
      case 'story':
        imagePath = '/photos/Pic 2.jpeg';
        break;
      case 'where':
        imagePath = '/photos/Pic 3.jpeg';
        break;
      case 'rsvp':
        imagePath = '/photos/Pic 4.jpeg';
        break;
      default:
        imagePath = '/photos/Pic 1.jpeg';
    }
    return imagePath;
  };

  // RSVP is now handled in the main content area, not as a separate page

  const backgroundImage = getBackgroundImage();
  
  return (
    <div className="min-h-screen relative">
      {/* Fixed Background Image */}
      <img 
        src={backgroundImage}
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0"
        style={{
          opacity: 0.6
        }}
      />
      
      {/* Light Fade Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/30 via-white/20 to-white/30 pointer-events-none z-1" />
      <div className="fixed inset-0 bg-gradient-to-t from-white/25 via-transparent to-white/25 pointer-events-none z-1" />
      <div className="fixed inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15 pointer-events-none z-1" />
      
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 flex items-center space-x-3 z-30">
        <div className="text-base font-sans font-bold text-gray-700 hidden md:block">
          {language === 'en' ? (
            <span className="flex items-center">
              Si quieres español, cambia el idioma aquí
              <span className="ml-2">→</span>
            </span>
          ) : (
            <span className="flex items-center">
              If you want English, change the language here
              <span className="ml-2">→</span>
            </span>
          )}
        </div>
        <button
          onClick={() => setLanguage('en')}
          className={`p-2 rounded-full border-2 transition-all ${
            language === 'en' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-2xl font-bold">EN</span>
        </button>
        <button
          onClick={() => setLanguage('es')}
          className={`p-2 rounded-full border-2 transition-all ${
            language === 'es' 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-2xl">🇪🇸</span>
        </button>
      </div>

      {/* FIXED HEADER - Always stays in the same position */}
      <div className="absolute top-0 left-0 w-full flex flex-col items-center justify-center px-8 z-20" style={{height: '70vh'}}>
        <div className="max-w-4xl w-full text-center bg-white/80 backdrop-blur-sm border border-white/30 p-8 shadow-xl rounded-2xl">
          {/* Top Section */}
          <div className="mb-12">
            {/* Couple Names */}
            <div className="mb-6">
              <div className="inline-block border-t border-b border-gray-300 py-2 px-6 mb-3">
                <h1 className="text-6xl md:text-7xl font-serif text-black tracking-wide">
                  S ❤ G
                </h1>
              </div>
            </div>
            
            {/* Event Details */}
            <div className="mb-4">
              <div className="flex items-center justify-center space-x-3 text-gray-600 mb-3">
                <div className="w-6 h-px bg-gray-300"></div>
                <span className="text-xl font-sans font-light tracking-wider text-black uppercase">{t.june2026}</span>
                <div className="w-6 h-px bg-gray-300"></div>
              </div>
            </div>
            
            {/* Countdown */}
            <Countdown language={language} />
            
            {/* Personalized Invitation */}
            <div className="mt-8">
              <div className="text-2xl font-serif text-black mb-2" style={{ fontFamily: 'serif' }}>
                <span dangerouslySetInnerHTML={{
                  __html: getDisplayName(getGuestByCode(code) || { code, name1: 'Guest' }).replace(/ & /g, ' <span style="font-family: serif; font-style: italic; font-weight: normal;">&</span> ')
                }} />
              </div>
              <div className="text-lg font-sans font-light text-black">
                {t.youAreInvited}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mb-16">
            <Navigation language={language} currentPage={currentPage} onPageChange={onPageChange} />
          </div>
        </div>
      </div>

      {/* CONTENT AREA - Positioned below the fixed header */}
      <div className="absolute z-20" style={{top: '65vh', left: '0', right: '0'}}>
        {currentPage === 'home' ? (
          <div className="max-w-4xl mx-auto px-8 py-2">
            <div className="bg-white/80 backdrop-blur-sm border border-white/30 p-8 shadow-xl rounded-2xl">
              {/* Date & Location Section */}
              <DateLocationSection language={language} />
            </div>
          </div>
        ) : currentPage === 'where' ? (
          <WherePage language={language} />
        ) : currentPage === 'rsvp' ? (
          <div className="max-w-4xl mx-auto px-8 py-2">
            <div className="bg-white/80 backdrop-blur-sm border border-white/30 p-8 shadow-xl rounded-2xl">
              <RSVP language={language} guestCode={code} />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-8 py-2">
            <div className="bg-white/80 backdrop-blur-sm border border-white/30 p-8 shadow-xl rounded-2xl">
              {/* Title */}
              <div className="text-center mb-12">
                <div className="inline-block border-t border-b border-gray-300 py-2 px-6 mb-3">
                  <h1 className="text-4xl font-serif text-black tracking-wide">
                    {t.theInterview}
                  </h1>
                </div>
              </div>

          {/* How did you meet section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 text-gray-600 mb-3">
                <div className="w-6 h-px bg-gray-300"></div>
                <span className="text-2xl font-serif text-black">{t.howDidYouMeet}</span>
                <div className="w-6 h-px bg-gray-300"></div>
              </div>
            </div>
            
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.gloria}:</span>
                <span className="text-black">{t.storyMeet1}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.stefan}:</span>
                <span className="text-black">No.</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.gloria}:</span>
                <span className="text-black">{t.storyMeet2}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.stefan}:</span>
                <span className="text-black">No.</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.gloria}:</span>
                <span className="text-black">{t.storyMeet3}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.stefan}:</span>
                <span className="text-black">{t.storyMeet4} (eye roll)</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.gloria}:</span>
                <span className="text-black">{t.storyMeet5}</span>
                  </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.stefan}:</span>
                <span className="text-black">{t.storyMeet6}</span>
                </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.gloria}:</span>
                <span className="text-black">{t.storyMeet7}</span>
              </div>
            </div>
                </div>
                
          {/* Separator */}
          <div className="border-t border-black my-12"></div>

          {/* First Date section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 text-gray-600 mb-3">
                <div className="w-6 h-px bg-gray-300"></div>
                <span className="text-2xl font-serif text-black">{t.howWasFirstDate}</span>
                <div className="w-6 h-px bg-gray-300"></div>
              </div>
            </div>
            
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.gloria}:</span>
                <span className="text-black">{t.storyFirstDate1}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.stefan}:</span>
                <span className="text-black">{t.storyFirstDate2}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.gloria}:</span>
                <span className="text-black">{t.storyFirstDate3}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.stefan}:</span>
                <span className="text-black">{t.storyFirstDate4}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.gloria}:</span>
                <span className="text-black">{t.storyFirstDate5}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.stefan}:</span>
                <span className="text-black">{t.storyFirstDate6}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.gloria}:</span>
                <span className="text-black">{t.storyFirstDate7}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.stefan}:</span>
                <span className="text-black">{t.storyFirstDate8}</span>
                    </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.gloria}:</span>
                <span className="text-black">{t.storyFirstDate9}</span>
                    </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.stefan}:</span>
                <span className="text-black">{t.storyFirstDate10}</span>
                  </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.gloria}:</span>
                <span className="text-black">{t.storyFirstDate11}</span>
                    </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.stefan}:</span>
                <span className="text-black">{t.storyFirstDate12}</span>
                    </div>
                  </div>
                </div>

          {/* Separator */}
          <div className="border-t border-black my-12"></div>

          {/* Second Date section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 text-gray-600 mb-3">
                <div className="w-6 h-px bg-gray-300"></div>
                <span className="text-2xl font-serif text-black">{t.andYourSecondDate}</span>
                <div className="w-6 h-px bg-gray-300"></div>
              </div>
            </div>
            
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.stefan}:</span>
                <span className="text-black">{t.storySecondDate1}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.gloria}:</span>
                <span className="text-black">{t.storySecondDate2}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.stefan}:</span>
                <span className="text-black">{t.storySecondDate3}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.gloria}:</span>
                <span className="text-black">(laughing) {t.storySecondDate4}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.stefan}:</span>
                <span className="text-black">{t.storySecondDate5}</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.gloria}:</span>
                <span className="text-black">{t.storySecondDate6}</span>
                </div>
              <div className="flex">
                <span className="font-bold text-black mr-4">{t.stefan}:</span>
                <span className="text-black">{t.storySecondDate7}</span>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-black my-12"></div>

          {/* Q&A Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 text-gray-600 mb-3">
                <div className="w-6 h-px bg-gray-300"></div>
                <span className="text-2xl font-serif text-black">{t.okayQuestions}</span>
                <div className="w-6 h-px bg-gray-300"></div>
              </div>
            </div>
            
            <div className="space-y-8 max-w-3xl mx-auto">
              {/* Q1 */}
              <div>
                <p className="font-serif text-black mb-3"><strong>Q: {t.q1}</strong></p>
                <div className="space-y-2 ml-4">
                  <div><strong>{t.stefan}:</strong> {t.q1a1}</div>
                  <div><strong>{t.gloria}:</strong> {t.q1a2}</div>
                  <div><strong>{t.stefan}:</strong> {t.q1a3}</div>
          </div>
        </div>

              {/* Q2 */}
              <div>
                <p className="font-serif text-black mb-3"><strong>Q: {t.q2}</strong></p>
                <div className="space-y-2 ml-4">
                  <div><strong>{t.gloria}:</strong> {t.q2a1}</div>
                  <div><strong>{t.stefan}:</strong> {t.q2a2}</div>
                  <div><strong>{t.gloria}:</strong> {t.q2a3}</div>
                </div>
                  </div>

              {/* Q3 */}
              <div>
                <p className="font-serif text-black mb-3"><strong>Q: {t.q3}</strong></p>
                <div className="space-y-2 ml-4">
                  <div><strong>{t.stefan}:</strong> {t.q3a1}</div>
                  <div><strong>{t.gloria}:</strong> {t.q3a2}</div>
                </div>
            </div>

              {/* Q4 */}
              <div>
                <p className="font-serif text-black mb-3"><strong>Q: {t.q4}</strong></p>
                <div className="space-y-2 ml-4">
                  <div><strong>{t.gloria}:</strong> {t.q4a1}</div>
                  <div><strong>{t.stefan}:</strong> {t.q4a2}</div>
              </div>
            </div>

              {/* Q5 */}
              <div>
                <p className="font-serif text-black mb-3"><strong>Q: {t.q5}</strong></p>
                <div className="space-y-2 ml-4">
                  <div><strong>{t.stefan}:</strong> {t.q5a1}</div>
                  <div><strong>{t.gloria}:</strong> {t.q5a2}</div>
                  </div>
                </div>
                
              {/* Q6 */}
              <div>
                <p className="font-serif text-black mb-3"><strong>Q: {t.q6}</strong></p>
                <div className="space-y-2 ml-4">
                  <div><strong>{t.stefan}:</strong> {t.q6a1}</div>
                  <div><strong>{t.gloria}:</strong> {t.q6a2}</div>
          </div>
        </div>

              {/* Q7 */}
              <div>
                <p className="font-serif text-black mb-3"><strong>Q: {t.q7}</strong></p>
                <div className="space-y-2 ml-4">
                  <div><strong>{t.both}:</strong> {t.q7a1}</div>
                    </div>
              </div>

              {/* Q8 */}
              <div>
                <p className="font-serif text-black mb-3"><strong>Q: {t.q8}</strong></p>
                <div className="space-y-2 ml-4">
                  <div><strong>{t.gloria}:</strong> {t.q8a1}</div>
                  <div><strong>{t.stefan}:</strong> {t.q8a2}</div>
                  </div>
                </div>
                
              {/* Q9 */}
              <div>
                <p className="font-serif text-black mb-3"><strong>Q: {t.q9}</strong></p>
                <div className="space-y-2 ml-4">
                  <div><strong>{t.both}:</strong> {t.q9a1}</div>
                </div>
              </div>
            </div>
          </div>
            </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [weddingCode, setWeddingCode] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [currentPage, setCurrentPage] = useState<'home' | 'story' | 'where' | 'rsvp'>('home');

  return (
    <div className="App">
      {weddingCode ? (
        <WeddingHomePage code={weddingCode} language={language} setLanguage={setLanguage} currentPage={currentPage} onPageChange={setCurrentPage} />
      ) : (
        <CodeEntryPage onCodeSubmit={setWeddingCode} language={language} setLanguage={setLanguage} />
      )}
    </div>
  );
}