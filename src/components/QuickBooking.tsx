import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, CheckCircle, ArrowRight } from 'lucide-react';

const QuickBooking: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    professional: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('quick-booking');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const services = [
    { id: 'sobrancelhas', name: 'Design de Sobrancelhas', duration: '45 min', price: 'R$ 89' },
    { id: 'limpeza', name: 'Limpeza de Pele Premium', duration: '90 min', price: 'R$ 165' },
    { id: 'massagem', name: 'Massagem Relaxante', duration: '60 min', price: 'R$ 125' },
    { id: 'facial', name: 'Tratamento Facial', duration: '75 min', price: 'R$ 145' }
  ];

  const professionals = [
    { id: 'marina', name: 'Marina Silva', specialties: ['Sobrancelhas', 'Design'] },
    { id: 'ana', name: 'Ana Costa', specialties: ['Pele', 'Facial'] },
    { id: 'yuki', name: 'Yuki Tanaka', specialties: ['Massagem', 'Relaxamento'] }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Implementar lógica de envio do agendamento
    console.log('Agendamento:', formData);
    alert('Agendamento realizado com sucesso! Entraremos em contato para confirmação.');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.service !== '';
      case 2:
        return formData.date !== '' && formData.time !== '' && formData.professional !== '';
      case 3:
        return formData.name !== '' && formData.phone !== '';
      default:
        return false;
    }
  };

  return (
    <section id="quick-booking" className="section-padding bg-primary">
      <div className="container-max">
        <div className={`text-center mb-16 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-accent mb-4">
            Agende em Segundos
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto font-light">
            Processo simples e rápido para garantir seu momento de cuidado
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Steps Indicator */}
          <div className={`flex items-center justify-center mb-12 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step <= currentStep
                      ? 'bg-primary-light border-primary-light text-accent'
                      : 'border-secondary/30 text-secondary'
                  }`}>
                    {step < currentStep ? (
                      <CheckCircle size={20} />
                    ) : (
                      <span className="font-bold">{step}</span>
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`font-medium ${step <= currentStep ? 'text-accent' : 'text-secondary/70'}`}>
                      {step === 1 && 'Serviço'}
                      {step === 2 && 'Data & Horário'}
                      {step === 3 && 'Contato'}
                    </p>
                  </div>
                </div>
                {step < 3 && (
                  <ArrowRight size={20} className="mx-4 text-secondary/30" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Form Card */}
          <div className={`glassmorphism rounded-3xl p-8 md:p-12 border border-secondary/10 shadow-xl ${
            isVisible ? 'fade-in visible' : 'fade-in'
          }`}>
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <Calendar size={48} className="text-primary-light mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-accent mb-2">
                    Escolha seu serviço
                  </h3>
                  <p className="text-secondary">Selecione o cuidado que você deseja receber</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setFormData({ ...formData, service: service.id })}
                      className={`p-6 rounded-2xl border-2 transition-all text-left ${
                        formData.service === service.id
                          ? 'border-primary-light bg-primary-light/10'
                          : 'border-secondary/20 hover:border-primary-light/50'
                      }`}
                    >
                      <h4 className="font-serif font-bold text-accent text-lg mb-2">
                        {service.name}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-secondary text-sm">{service.duration}</span>
                        <span className="font-bold text-accent">{service.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date, Time & Professional */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <Clock size={48} className="text-primary-light mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-accent mb-2">
                    Data, horário e profissional
                  </h3>
                  <p className="text-secondary">Escolha quando e com quem você gostaria de ser atendida</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Date */}
                  <div>
                    <label className="block text-accent font-medium mb-3">Data</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 border border-secondary/20 rounded-xl focus:outline-none focus:border-primary-light"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-accent font-medium mb-3">Horário</label>
                    <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setFormData({ ...formData, time })}
                          className={`p-2 text-sm rounded-lg border transition-colors ${
                            formData.time === time
                              ? 'border-primary-light bg-primary-light/10 text-accent'
                              : 'border-secondary/20 hover:border-primary-light/50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Professional */}
                  <div>
                    <label className="block text-accent font-medium mb-3">Profissional</label>
                    <div className="space-y-3">
                      {professionals.map((prof) => (
                        <button
                          key={prof.id}
                          onClick={() => setFormData({ ...formData, professional: prof.id })}
                          className={`w-full p-3 text-left rounded-xl border-2 transition-all ${
                            formData.professional === prof.id
                              ? 'border-primary-light bg-primary-light/10'
                              : 'border-secondary/20 hover:border-primary-light/50'
                          }`}
                        >
                          <p className="font-medium text-accent">{prof.name}</p>
                          <p className="text-xs text-secondary">{prof.specialties.join(', ')}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <User size={48} className="text-primary-light mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-accent mb-2">
                    Seus dados para contato
                  </h3>
                  <p className="text-secondary">Para confirmarmos seu agendamento</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-accent font-medium mb-3">Nome completo</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-4 border border-secondary/20 rounded-xl focus:outline-none focus:border-primary-light"
                      placeholder="Seu nome"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-accent font-medium mb-3">WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-4 border border-secondary/20 rounded-xl focus:outline-none focus:border-primary-light"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-white/50 rounded-2xl p-6 border border-secondary/10">
                  <h4 className="font-serif font-bold text-accent text-lg mb-4">Resumo do Agendamento</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Serviço:</span> {services.find(s => s.id === formData.service)?.name}</p>
                    <p><span className="font-medium">Data:</span> {formData.date}</p>
                    <p><span className="font-medium">Horário:</span> {formData.time}</p>
                    <p><span className="font-medium">Profissional:</span> {professionals.find(p => p.id === formData.professional)?.name}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  currentStep === 1
                    ? 'text-secondary/50 cursor-not-allowed'
                    : 'text-accent hover:bg-secondary/10'
                }`}
                disabled={currentStep === 1}
              >
                Voltar
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-8 py-3 rounded-full font-medium transition-all flex items-center space-x-2 ${
                  canProceed()
                    ? 'btn-primary'
                    : 'bg-secondary/30 text-secondary cursor-not-allowed'
                }`}
                data-cta="agendar"
              >
                <span>{currentStep === 3 ? 'Confirmar Agendamento' : 'Próximo'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickBooking;