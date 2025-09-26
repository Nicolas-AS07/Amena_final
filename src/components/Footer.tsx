import React from 'react';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent text-white section-padding">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
              <img
              src="/src/imagens/Amena.png"
              alt="Logo AMENA"
              className="w-8 h-8 object-contain"
              />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold">AMENA</h3>
                <p className="text-sm text-primary-light font-light">Beleza que acalma</p>
              </div>
            </div>
            <p className="text-primary-light/80 font-light leading-relaxed">
              Salão de beleza especializado em técnicas orientais, 
              proporcionando cuidados estéticos com leveza e bem-estar.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-light/20 rounded-full flex items-center justify-center hover:bg-primary-light/30 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-light/20 rounded-full flex items-center justify-center hover:bg-primary-light/30 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-light/20 rounded-full flex items-center justify-center hover:bg-primary-light/30 transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4">Links Rápidos</h4>
            <div className="space-y-3">
              {[
                { label: 'Agendar', href: '#quick-booking' },
                { label: 'Serviços', href: '#services' },
                { label: 'Portfólio', href: '#portfolio' },
                { label: 'Equipe', href: '#team' },
                { label: 'Depoimentos', href: '#testimonials' },
                { label: 'FAQ', href: '#faq' }
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-primary-light/80 hover:text-primary-light transition-colors font-light"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4">Principais Serviços</h4>
            <div className="space-y-3">
              {[
                'Design de Sobrancelhas',
                'Limpeza de Pele Premium',
                'Massagem Relaxante',
                'Micropigmentação',
                'Tratamentos Faciais',
                'Terapias Corporais'
              ].map((service) => (
                <p key={service} className="text-primary-light/80 font-light">
                  {service}
                </p>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary-light mt-1 flex-shrink-0" />
                <div>
                  <p className="text-primary-light/80 font-light">
                    Rua das Flores, 123<br />
                    Jardim Botânico, São Paulo - SP<br />
                    CEP: 04038-001
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-primary-light flex-shrink-0" />
                <div>
                  <p className="text-primary-light/80 font-light">+55 (51) 994822044</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-primary-light flex-shrink-0" />
                <p className="text-primary-light/80 font-light">
                  contato@amenasalon.com.br
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-light/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-primary-light/60 font-light text-sm">
                © {currentYear} AMENA. Todos os direitos reservados.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <button className="text-primary-light/60 hover:text-primary-light transition-colors font-light text-sm">
                Política de Privacidade
              </button>
              <button className="text-primary-light/60 hover:text-primary-light transition-colors font-light text-sm">
                Termos de Uso
              </button>
              <button className="text-primary-light/60 hover:text-primary-light transition-colors font-light text-sm">
                Cookies
              </button>
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 opacity-30">
            <div className="w-8 h-8 bg-primary-light/20 rounded-full flex items-center justify-center">
              <img
              src="/src/imagens/Amena.png"
              alt="Logo AMENA"
              className="w-8 h-8 object-contain"/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;