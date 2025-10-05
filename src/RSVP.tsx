import { useState, useEffect } from 'react';
import { getGuestByCode } from './guestData';
// import { saveRSVP, checkExistingRSVP, type RSVPData } from './rsvpService';

interface RSVPTranslations {
  en: {
    rsvpTitle: string;
    attending: string;
    yes: string;
    no: string;
    allergies: string;
    allergiesPlaceholder: string;
    transportation: string;
    car: string;
    bus: string;
    busNote: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    thankYou: string;
  };
  es: {
    rsvpTitle: string;
    attending: string;
    yes: string;
    no: string;
    allergies: string;
    allergiesPlaceholder: string;
    transportation: string;
    car: string;
    bus: string;
    busNote: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    thankYou: string;
  };
}

const rsvpTranslations: RSVPTranslations = {
  en: {
    rsvpTitle: "RSVP",
    attending: "Will you be attending the wedding?",
    yes: "Yes, I'll be there!",
    no: "Sorry, I can't make it",
    allergies: "Do you have allergies or a preference (Vegetarian, Vegan, etc.)?",
    allergiesPlaceholder: "Please let us know about allergies or dietary preferences",
    transportation: "Will you be coming by car or join our bus?",
    car: "I'll come by car",
    bus: "I'll join the bus",
    busNote: "Bus is leaving from the Church to the Party at 19:00 and returns at 02:00. Please note this is final, we need to book the bus and changes are not possible",
    email: "Please enter your email address",
    emailPlaceholder: "your.email@example.com",
    message: "Is there anything else you want the couple to know? (You bring children, any questions, etc.)",
    messagePlaceholder: "Share any additional information or questions",
    submit: "Submit RSVP",
    thankYou: "Thank you for your RSVP!"
  },
  es: {
    rsvpTitle: "RSVP",
    attending: "¿Asistirás a la boda?",
    yes: "¡Sí, estaré ahí!",
    no: "Lo siento, no puedo asistir",
    allergies: "¿Tienes alergias o alguna preferencia (Vegetariano, Vegano, etc.)?",
    allergiesPlaceholder: "Por favor infórmanos sobre alergias o preferencias dietéticas",
    transportation: "¿Vendrás en coche o te unirás a nuestro autobús?",
    car: "Vendré en coche",
    bus: "Me uniré al autobús",
    busNote: "El autobús sale de la Iglesia a la Fiesta a las 19:00 y regresa a las 02:00. Ten en cuenta que esto es definitivo, necesitamos reservar el autobús y los cambios no son posibles",
    email: "Por favor ingresa tu dirección de correo electrónico",
    emailPlaceholder: "tu.email@ejemplo.com",
    message: "¿Hay algo más que quieras que la pareja sepa? (Traes niños, alguna pregunta, etc.)",
    messagePlaceholder: "Comparte cualquier información adicional o preguntas",
    submit: "Enviar RSVP",
    thankYou: "¡Gracias por tu RSVP!"
  }
};

interface RSVPProps {
  language: 'en' | 'es';
  guestCode?: string;
}

export default function RSVP({ language, guestCode }: RSVPProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasRSVPed, setHasRSVPed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [, setExistingRSVP] = useState<RSVPData | null>(null);
  const [formData, setFormData] = useState({
    attending: '',
    bringingPlusOne: false,
    plusOneName: '',
    allergies: '',
    transportation: '',
    email: '',
    message: ''
  });

  // Check Firebase for existing RSVP - temporarily disabled
  // useEffect(() => {
  //   const checkRSVP = async () => {
  //     if (guestCode) {
  //       try {
  //         const existing = await checkExistingRSVP(guestCode);
  //         if (existing) {
  //           setExistingRSVP(existing);
  //           setHasRSVPed(true);
  //           setIsSubmitted(true);
  //           // Pre-fill form with existing data
  //           setFormData({
  //             attending: existing.attending,
  //             bringingPlusOne: existing.bringingPlusOne || false,
  //             plusOneName: existing.plusOneName || '',
  //             allergies: existing.allergies || '',
  //             transportation: existing.transportation || '',
  //             email: existing.email || '',
  //             message: existing.message || ''
  //           });
  //         }
  //       } catch (error) {
  //         console.error('Error checking existing RSVP:', error);
  //       }
  //     }
  //   };
  //   
  //   checkRSVP();
  // }, [guestCode]);

  const t = rsvpTranslations[language];

  // Get guest data to determine if it's a couple or single
  const guest = guestCode ? getGuestByCode(guestCode) : null;
  const isCouple = guest?.name2 && guest.name2 !== '+1';
  const hasPlusOne = guest?.name2 === '+1';

  const questions = [
    {
      id: 'attending',
      title: t.attending,
      type: 'radio',
      options: [
        { value: 'yes', label: isCouple ? (language === 'en' ? 'Yes, we will be there!' : '¡Sí, estaremos ahí!') : (language === 'en' ? 'Yes, I\'ll be there!' : '¡Sí, estaré ahí!') },
        { value: 'no', label: t.no }
      ]
    },
    {
      id: 'allergies',
      title: t.allergies,
      type: 'textarea',
      placeholder: t.allergiesPlaceholder
    },
    {
      id: 'transportation',
      title: t.transportation,
      type: 'radio',
      options: [
        { value: 'car', label: isCouple ? (language === 'en' ? 'We\'ll come by car' : 'Vendremos en coche') : t.car },
        { value: 'bus', label: isCouple ? (language === 'en' ? 'We\'ll join the bus' : 'Nos uniremos al autobús') : t.bus }
      ],
      note: t.busNote
    },
    {
      id: 'email',
      title: t.email,
      type: 'email',
      placeholder: t.emailPlaceholder
    },
    {
      id: 'message',
      title: t.message,
      type: 'textarea',
      placeholder: t.messagePlaceholder
    }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    // If they selected "no" for attending, skip to submit
    if (currentStep === 0 && formData.attending === 'no') {
      handleSubmit();
      return;
    }
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Temporarily disabled Firebase - just show success message
    setIsLoading(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setHasRSVPed(true);
      setIsLoading(false);
    }, 1000);
  };

  const renderQuestion = (question: any) => {
    return (
      <div className="mb-8">
        <h3 className="text-2xl font-serif text-black mb-6 text-center">
          {question.title}
        </h3>
        
        {question.type === 'radio' && (
          <div className="space-y-4">
            {question.options?.map((option: any) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={formData[question.id as keyof typeof formData] === option.value}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  className="mr-4 w-5 h-5 text-black"
                />
                <span className="text-lg font-sans text-black">{option.label}</span>
              </label>
            ))}
            {question.note && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm font-sans text-gray-700 italic">{question.note}</p>
              </div>
            )}
            {/* Show plus one checkbox and name field if attending and has +1 */}
            {question.id === 'attending' && formData.attending === 'yes' && hasPlusOne && (
              <div className="mt-4 space-y-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.bringingPlusOne}
                    onChange={(e) => handleInputChange('bringingPlusOne', e.target.checked)}
                    className="mr-3 w-5 h-5 text-black"
                  />
                  <span className="text-lg font-sans text-black">
                    {language === 'en' ? 'I\'ll bring a plus one' : 'Traeré un acompañante'}
                  </span>
                </label>
                
                {formData.bringingPlusOne && (
                  <div>
                    <label className="block text-lg font-sans text-black mb-2">
                      {language === 'en' ? 'Plus one name:' : 'Nombre del acompañante:'}
                    </label>
                    <input
                      type="text"
                      value={formData.plusOneName}
                      onChange={(e) => handleInputChange('plusOneName', e.target.value)}
                      placeholder={language === 'en' ? 'Enter plus one name' : 'Ingresa el nombre del acompañante'}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-black font-sans"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {question.type === 'textarea' && (
          <textarea
            value={formData[question.id as keyof typeof formData] as string}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-black font-sans"
            rows={4}
          />
        )}
        
        {question.type === 'email' && (
          <input
            type="email"
            value={formData[question.id as keyof typeof formData] as string}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-black font-sans"
          />
        )}
      </div>
    );
  };

  if (isSubmitted) {
    // Show different message if they can't attend
    if (formData.attending === 'no') {
      return (
        <div className="text-center">
          <div className="text-6xl font-serif text-black mb-8">
            <span className="italic">S</span>
            <span className="text-4xl mx-2">&</span>
            <span className="italic">G</span>
          </div>
          <h2 className="text-4xl font-serif text-black mb-8">
            {language === 'en' ? 'Sorry to hear that!' : '¡Lamentamos saberlo!'}
          </h2>
          <p className="text-lg font-sans text-gray-700">
            {language === 'en' ? 'Thank you for filling out the RSVP. We\'ll miss you!' : 'Gracias por completar el RSVP. ¡Te extrañaremos!'}
          </p>
          {hasRSVPed && (
            <p className="text-sm font-sans text-gray-500 mt-4">
              {language === 'en' ? 'Your RSVP has been saved to our database.' : 'Tu RSVP ha sido guardado en nuestra base de datos.'}
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="text-center">
        <div className="text-6xl font-serif text-black mb-8">
          <span className="italic">S</span>
          <span className="text-4xl mx-2">&</span>
          <span className="italic">G</span>
        </div>
        <h2 className="text-4xl font-serif text-black mb-8">
          {t.thankYou}
        </h2>
        <p className="text-lg font-sans text-gray-700">
          {language === 'en' ? 'We can\'t wait to celebrate with you!' : '¡No podemos esperar a celebrar contigo!'}
        </p>
        {/* TODO: Show saved status when Firebase is ready */}
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-sans text-gray-700 mb-2">
          <span>{currentStep + 1} of {questions.length}</span>
          <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gray-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      {renderQuestion(questions[currentStep])}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-sans ${
            currentStep === 0 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-50'
          }`}
        >
          {language === 'en' ? 'Previous' : 'Anterior'}
        </button>
        
        {currentStep === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`px-8 py-3 rounded-lg font-sans transition-colors ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gray-800 hover:bg-gray-900'
            } text-white`}
          >
            {isLoading ? (language === 'en' ? 'Saving...' : 'Guardando...') : t.submit}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg font-sans hover:bg-gray-900 transition-colors"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </button>
        )}
      </div>
    </div>
  );
}
