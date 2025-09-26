import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
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

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de envio
    console.log('Formulário enviado:', formData);
    alert('Mensagem enviada com sucesso! Retornaremos em breve.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Olá! Gostaria de agendar um horário no AMENA.');
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="section-padding bg-primary">
      <div className="container-max">
        <div className={`text-center mb-16 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-accent mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto font-light">
            Estamos aqui para cuidar de você. Fale conosco!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`space-y-8 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            <div>
              <h3 className="text-2xl font-serif font-bold text-accent mb-6">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-2xl border border-secondary/10">
                  <div className="bg-primary-light/20 p-3 rounded-full">
                    <MapPin size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-accent mb-1">Endereço</h4>
                    <p className="text-secondary font-light">
                      Rua das Flores, 123<br />
                      Jardim Botânico, São Paulo - SP<br />
                      CEP: 04038-001
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-2xl border border-secondary/10">
                  <div className="bg-primary-light/20 p-3 rounded-full">
                    <Phone size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-accent mb-1">Telefone</h4>
                    <p className="text-secondary font-light">
                      +55 (51) 994822044
                      WhatsApp: +55 (51) 994822044
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-2xl border border-secondary/10">
                  <div className="bg-primary-light/20 p-3 rounded-full">
                    <Mail size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-accent mb-1">E-mail</h4>
                    <p className="text-secondary font-light">
                      contato@amenasalon.com.br<br />
                      agendamentos@amenasalon.com.br
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-2xl border border-secondary/10">
                  <div className="bg-primary-light/20 p-3 rounded-full">
                    <Clock size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-accent mb-1">Horário de Funcionamento</h4>
                    <div className="text-secondary font-light space-y-1">
                      <p>Segunda a Sexta: 9h às 19h</p>
                      <p>Sábado: 8h às 17h</p>
                      <p>Domingo: Fechado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleWhatsApp}
                  className="btn-primary flex items-center justify-center space-x-2 flex-1"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={() => window.open('tel:+551134567890')}
                  className="btn-secondary flex items-center justify-center space-x-2 flex-1"
                >
                  <Phone size={18} />
                  <span>Ligar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            <div className="glassmorphism rounded-3xl p-8 border border-secondary/10 shadow-xl">
              <h3 className="text-2xl font-serif font-bold text-accent mb-6 text-center">
                Envie sua Mensagem
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-accent font-medium mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-secondary/20 rounded-xl focus:outline-none focus:border-primary-light bg-white/80"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label className="block text-accent font-medium mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-secondary/20 rounded-xl focus:outline-none focus:border-primary-light bg-white/80"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-accent font-medium mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border border-secondary/20 rounded-xl focus:outline-none focus:border-primary-light bg-white/80"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-accent font-medium mb-2">
                    Mensagem
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full p-4 border border-secondary/20 rounded-xl focus:outline-none focus:border-primary-light bg-white/80 resize-none"
                    placeholder="Conte-nos como podemos ajudar você..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-4 text-lg"
                >
                  <Send size={20} />
                  <span>Enviar Mensagem</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className={`mt-16 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <div className="bg-white/50 rounded-3xl border border-secondary/10 overflow-hidden">
            <div className="h-64 bg-gradient-to-r from-primary-light/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-accent mx-auto mb-4" />
                <h4 className="text-xl font-serif font-bold text-accent mb-2">
                  Nossa Localização
                </h4>
                <p className="text-secondary">
                  Rua das Flores, 123 - Jardim Botânico, São Paulo
                </p>
                <button
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                  className="mt-4 btn-secondary text-sm"
                >
                  Ver no Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;