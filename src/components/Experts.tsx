import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Award, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Mail, 
  Linkedin,
  ChevronRight,
  Star,
  Building,
  Globe
} from 'lucide-react';

const Experts: React.FC = () => {
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);

  const founder = {
    id: 0,
    name: 'Dr. John Doe',
    title: 'Founder & CEO',
    image: 'https://i.imgur.com/kN9Hsyh.png',
    location: 'New York, USA',
    email: 'sarah.johnson@azurebusinesssolution.com',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    experience: '20+ Years',
    specialization: 'Strategic Business Development',
    education: [
      'PhD in Business Administration - Harvard Business School',
      'MBA in International Business - Wharton School',
      'BSc in Economics - London School of Economics'
    ],
    achievements: [
      'Founded 3 successful companies with combined valuation of $500M+',
      'Named "Business Leader of the Year" by Global Business Magazine',
      'Advisor to Fortune 500 companies across 15+ countries',
      'Published author of "Global Business Strategies for the Digital Age"'
    ],
    expertise: [
      'Strategic Planning & Execution',
      'International Market Expansion',
      'Digital Transformation',
      'Mergers & Acquisitions',
      'Leadership Development'
    ],
    bio: 'Dr. Sarah Johnson is a visionary leader with over two decades of experience in global business development. She founded Azure Business Solution with the mission to democratize access to world-class business consulting services. Her innovative approach has helped hundreds of companies achieve sustainable growth and operational excellence.'
  };

  const experts = [
    {
      id: 1,
      name: 'Michael Chen',
      title: 'Senior Consultant - Asia Pacific',
      image: 'https://i.imgur.com/2iWaPBf.jpeg',
      location: 'Singapore',
      email: 'michael.chen@azurebusinesssolution.com',
      linkedin: 'https://linkedin.com/in/michaelchen',
      experience: '15+ Years',
      specialization: 'Market Entry & Expansion',
      expertise: ['Market Research', 'Regulatory Compliance', 'Partnership Development', 'Cultural Integration'],
      bio: 'Michael specializes in helping Western companies enter Asian markets with deep understanding of local business cultures and regulatory environments.'
    },
    {
      id: 2,
      name: 'Emma Rodriguez',
      title: 'Director of Operations',
      image: 'https://i.imgur.com/2iWaPBf.jpeg',
      location: 'Madrid, Spain',
      email: 'emma.rodriguez@azurebusinesssolution.com',
      linkedin: 'https://linkedin.com/in/emmarodriguez',
      experience: '12+ Years',
      specialization: 'Operational Excellence',
      expertise: ['Process Optimization', 'Quality Management', 'Supply Chain', 'Digital Transformation'],
      bio: 'Emma leads our operational consulting practice, helping organizations streamline processes and achieve operational excellence through innovative methodologies.'
    },
    {
      id: 3,
      name: 'David Thompson',
      title: 'Financial Advisory Lead',
      image: 'https://i.imgur.com/2iWaPBf.jpeg',
      location: 'London, UK',
      email: 'david.thompson@azurebusinesssolution.com',
      linkedin: 'https://linkedin.com/in/davidthompson',
      experience: '18+ Years',
      specialization: 'Financial Strategy & Planning',
      expertise: ['Financial Modeling', 'Investment Strategy', 'Risk Management', 'Corporate Finance'],
      bio: 'David brings extensive experience in corporate finance and investment banking, helping clients optimize their financial strategies and capital structure.'
    },
    {
      id: 4,
      name: 'Priya Patel',
      title: 'Technology Integration Specialist',
      image: 'https://i.imgur.com/2iWaPBf.jpeg',
      location: 'Mumbai, India',
      email: 'priya.patel@azurebusinesssolution.com',
      linkedin: 'https://linkedin.com/in/priyapatel',
      experience: '10+ Years',
      specialization: 'Digital Transformation',
      expertise: ['Cloud Migration', 'AI Implementation', 'Cybersecurity', 'Data Analytics'],
      bio: 'Priya leads our technology practice, helping organizations leverage cutting-edge technologies to drive innovation and competitive advantage.'
    },
    {
      id: 5,
      name: 'James Wilson',
      title: 'Marketing & Brand Strategist',
      image: 'https://i.imgur.com/2iWaPBf.jpeg',
      location: 'Toronto, Canada',
      email: 'james.wilson@azurebusinesssolution.com',
      linkedin: 'https://linkedin.com/in/jameswilson',
      experience: '14+ Years',
      specialization: 'Brand Development & Marketing',
      expertise: ['Brand Strategy', 'Digital Marketing', 'Content Strategy', 'Market Positioning'],
      bio: 'James specializes in building powerful brands and marketing strategies that resonate with global audiences and drive business growth.'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      title: 'HR & Organizational Development',
      image: 'https://i.imgur.com/2iWaPBf.jpeg',
      location: 'Sydney, Australia',
      email: 'lisa.anderson@azurebusinesssolution.com',
      linkedin: 'https://linkedin.com/in/lisaanderson',
      experience: '16+ Years',
      specialization: 'Human Resources & Culture',
      expertise: ['Talent Management', 'Organizational Design', 'Change Management', 'Leadership Development'],
      bio: 'Lisa helps organizations build high-performing teams and cultures that drive sustainable success and employee engagement.'
    }
  ];

  const allExperts = [founder, ...experts];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-azure-dark mb-6">Our Experts</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Meet our world-class team of experts who bring decades of experience and 
          deep industry knowledge to help transform your business.
        </p>
      </motion.div>

      {/* Founder Section */}
      <motion.div 
        className="mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-azure-dark mb-4">Meet Our Founder</h3>
          <div className="w-24 h-1 bg-azure-medium mx-auto"></div>
        </div>

        <div className="bg-gradient-to-br from-white to-azure-light/30 rounded-3xl p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '500px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-azure-dark/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating badge */}
              <motion.div
                className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-azure-dark">Founder</span>
                </div>
              </motion.div>
            </motion.div>

            <div className="space-y-6">
              <div>
                <h4 className="text-3xl font-bold text-azure-dark mb-2">{founder.name}</h4>
                <p className="text-xl text-azure-medium font-semibold mb-4">{founder.title}</p>
                <p className="text-gray-600 leading-relaxed">{founder.bio}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-azure-medium" />
                  <span className="text-gray-700">{founder.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-azure-medium" />
                  <span className="text-gray-700">{founder.experience}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-azure-medium" />
                  <span className="text-gray-700">{founder.specialization}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-azure-medium" />
                  <a href={`mailto:${founder.email}`} className="text-azure-dark hover:text-azure-medium transition-colors">
                    Contact
                  </a>
                </div>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-azure-dark mb-3">Education</h5>
                <ul className="space-y-2">
                  {founder.education.map((edu, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <GraduationCap className="w-4 h-4 text-azure-medium mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-azure-dark mb-3">Key Achievements</h5>
                <ul className="space-y-2">
                  {founder.achievements.slice(0, 2).map((achievement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expert Team Grid */}
      <div className="mb-12">
        <h3 className="text-3xl font-bold text-azure-dark text-center mb-4">Our Expert Team</h3>
        <div className="w-24 h-1 bg-azure-medium mx-auto mb-12"></div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {experts.map((expert, index) => (
          <motion.div
            key={expert.id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => setSelectedExpert(expert.id)}
          >
            <div className="relative mb-6">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-azure-medium rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </motion.div>
            </div>

            <div className="text-center">
              <h4 className="text-xl font-bold text-azure-dark mb-2 group-hover:text-azure-medium transition-colors">
                {expert.name}
              </h4>
              <p className="text-azure-medium font-semibold mb-3">{expert.title}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{expert.bio}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="w-4 h-4 text-azure-medium" />
                  <span className="text-gray-700">{expert.location}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Briefcase className="w-4 h-4 text-azure-medium" />
                  <span className="text-gray-700">{expert.experience}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-azure-dark font-semibold">{expert.specialization}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Expert Detail Modal */}
      <AnimatePresence>
        {selectedExpert && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExpert(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const expert = allExperts.find(e => e.id === selectedExpert);
                if (!expert) return null;

                return (
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
                          <img
                            src={expert.image}
                            alt={expert.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-azure-dark">{expert.name}</h3>
                          <p className="text-azure-medium font-semibold">{expert.title}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedExpert(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        ×
                      </button>
                    </div>

                    <div className="space-y-6">
                      <p className="text-gray-600 leading-relaxed">{expert.bio}</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-azure-medium" />
                          <span className="text-gray-700">{expert.location}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Briefcase className="w-5 h-5 text-azure-medium" />
                          <span className="text-gray-700">{expert.experience}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-azure-dark mb-3">Areas of Expertise</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {expert.expertise.map((skill, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-azure-medium rounded-full"></div>
                              <span className="text-gray-700 text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-4 pt-4 border-t border-gray-100">
                        <a
                          href={`mailto:${expert.email}`}
                          className="flex items-center space-x-2 bg-azure-dark text-white px-4 py-2 rounded-lg hover:bg-azure-medium transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Contact</span>
                        </a>
                        <a
                          href={expert.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 border border-azure-medium text-azure-dark px-4 py-2 rounded-lg hover:bg-azure-light transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experts;
