import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section relative py-24">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <div className="mb-16 text-center">
        <motion.h2 
          className="gradient-text mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Contattami
        </motion.h2>
        <motion.p 
          className="subtitle max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Sei interessato a collaborazioni di ricerca o hai domande sul mio lavoro? Contattami!
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          className="glass p-8 rounded-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-display text-white mb-6">Inviami un messaggio</h3>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-3 bg-dark-surface-lighter border border-dark-surface-lighter/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-electric-purple/50"
                placeholder="Il tuo nome"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 bg-dark-surface-lighter border border-dark-surface-lighter/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-electric-purple/50"
                placeholder="La tua email"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Messaggio</label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full px-4 py-3 bg-dark-surface-lighter border border-dark-surface-lighter/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-electric-purple/50"
                placeholder="Il tuo messaggio"
              />
            </div>
            
            <motion.button
              type="submit"
              className="btn btn-primary w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Invia Messaggio
            </motion.button>
          </form>
        </motion.div>
        
        <motion.div 
          className="glass p-8 rounded-lg"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-display text-white mb-6">Informazioni di contatto</h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-electric-purple/20 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M22 12H2M12 22C6.47715 22 2 17.5228 2 12M12 22C14.5 19.5 16 16 16 12C16 8 14.5 4.5 12 2M12 22C9.5 19.5 8 16 8 12C8 8 9.5 4.5 12 2M2 12C2 6.47715 6.47715 2 12 2" stroke="#9D4EDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-medium">Sito Web</h4>
                <p className="text-gray-300">www.ai-researcher.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-electric-purple/20 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5 18H17.5L14.5 15H9.5L6.5 18H2.5M21.5 18V15M21.5 18H17.5M2.5 18V15M2.5 18H6.5M14.5 15L17.5 12V6M14.5 15H9.5M6.5 18L9.5 15M17.5 6H14M17.5 6H21.5V9M6.5 12L9.5 15M6.5 12V6H2.5V9" stroke="#9D4EDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-medium">Email</h4>
                <p className="text-gray-300">contact@ai-researcher.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-electric-purple/20 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="#9D4EDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#9D4EDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-medium">Sede</h4>
                <p className="text-gray-300">Dipartimento di Informatica<br />Università di Milano, Italia</p>
              </div>
            </div>
            
            <div className="pt-6">
              <h4 className="text-white font-medium mb-4">Social Media</h4>
              <div className="flex gap-4">
                <motion.a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-dark-surface-lighter flex items-center justify-center"
                  whileHover={{ y: -3, boxShadow: '0 0 10px rgba(157, 78, 221, 0.5)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 9H2V21H6V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-dark-surface-lighter flex items-center justify-center"
                  whileHover={{ y: -3, boxShadow: '0 0 10px rgba(157, 78, 221, 0.5)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3.01006C23 3.01006 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 23 3.01006 23 3.01006Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-dark-surface-lighter flex items-center justify-center"
                  whileHover={{ y: -3, boxShadow: '0 0 10px rgba(157, 78, 221, 0.5)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 8V8.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-dark-surface-lighter flex items-center justify-center"
                  whileHover={{ y: -3, boxShadow: '0 0 10px rgba(157, 78, 221, 0.5)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 22V18C15.1392 16.7473 14.78 15.4901 14 14.5C17 14.5 20 12.5 20 9C20.08 7.75 19.73 6.52 19 5.5C19.28 4.35 19.28 3.15 19 2C19 2 18 2 16 3.5C13.36 3 10.64 3 8 3.5C6 2 5 2 5 2C4.7 3.15 4.7 4.35 5 5.5C4.27 6.52 3.92 7.75 4 9C4 12.5 7 14.5 10 14.5C9.61 14.99 9.32 15.55 9.15 16.15C8.98 16.75 8.93 17.38 9 18V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 18C4.49 20 4 16 2 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
