import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaUserMd, FaSyringe, FaTooth, FaCapsules, FaHeart, FaAmbulance } from 'react-icons/fa';
import heroImage from '../../assets/heroImage.jpg'
import dog from '../../assets/dog.jpg'
import { AuthContext } from '../../contexts/AuthContext';


const Navbar = () => {

    const {user, logout} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log('Navbar user context:', user);
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return(
        <nav className="bg-white shadow-md py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
                
                <div>
                <h1 className="text-xl font-bold text-blue-700">Pet Care</h1>
                <p className="text-sm text-gray-500">Veterinary Clinic</p>
                </div>
            </div>
            <div className="space-x-6 text-gray-700 font-medium">
                <a href="#" className="hover:text-blue-600">Home</a>
                <a href="#services" className="hover:text-blue-600">Services</a>
                <a href="#contact" className="hover:text-blue-600">Contact</a>
                 {user ? (
                <>
                    {
                        user.role === 'doctor' && (
                            <>
                            <Link to="/doctor-dashboard" className="hover:text-blue-600">Doctor Dashboard</Link>
                            <Link to="/appointment-summary" className="hover:text-blue-600">Appointment Summary</Link>
                            </>
                        )
                    }
                
                <span>Hello, {user.name}</span>
                    <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-1 rounded">Logout</button>
                    </>) : (<Link to="/login" className="bg-blue-600 text-white px-4 py-1 rounded">Login</Link>
                    )}
            </div>
            </div>
        </nav>
            );
};

const HeroSection = () => (
  <section className="bg-blue-50 py-20">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Compassionate Care for Your Beloved Pets</h2>
        <p className="text-gray-600 mb-6">Professional veterinary services with a gentle touch. We provide comprehensive healthcare for your furry family members in a calm, caring environment.</p>
        <div className="flex space-x-4">
          <Link to={'/book-appointment'} className="bg-blue-600 text-white px-6 py-2 rounded flex items-center space-x-2">
            <FaUserMd /> <span>Book Appointment</span>
          </Link>
        </div>
      </div>
      <div className="mt-10 md:mt-0">
        <img src={dog} alt="hero" className="rounded-lg shadow-lg h-80 w-160" />
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="services" className="py-20 bg-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Comprehensive Services</h2>
      <p className="text-gray-600 mb-10">From routine wellness exams to emergency care, we provide complete veterinary services for pets of all ages.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <FaUserMd />, title: 'Wellness Exams', description: 'Regular health checkups to keep your pet healthy and catch potential issues early.', color: 'bg-blue-100', link: 'Learn More →' },
          { icon: <FaSyringe />, title: 'Vaccinations', description: 'Complete vaccination programs to protect your pet from preventable diseases.', color: 'bg-green-100', link: 'Learn More →' },
          { icon: <FaTooth />, title: 'Surgery', description: 'Advanced surgical procedures performed by experienced veterinary professionals.', color: 'bg-orange-100', link: 'Learn More →' },
          { icon: <FaCapsules />, title: 'Pharmacy', description: '', color: 'bg-purple-100', link: 'Learn More →' },
          { icon: <FaHeart />, title: 'Dental Care', description: '', color: 'bg-pink-100', link: 'Learn More →' },
          { icon: <FaAmbulance />, title: 'Emergency Care', description: '', color: 'bg-red-100', link: 'Learn More →' }
        ].map((service, idx) => (
          <div key={idx} className={`p-6 rounded-lg ${service.color} text-left`}>
            <div className="text-2xl mb-4 text-blue-600">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-2">{service.description}</p>
            <a href="#" className="text-blue-500 font-medium">{service.link}</a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="py-10 bg-gray-50">
    <div className="container mx-auto px-4 flex flex-col md:flex-row gap-10 items-center">
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6">We're here to help your pet live their healthiest, happiest life. Contact us today to schedule an appointment.</p>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3"><FaPhoneAlt className="text-blue-600" /> <span>(+91) 7859 854 854</span></li>
          <li className="flex items-center space-x-3"><FaEnvelope className="text-green-600" /> <span>petcare@gmail.com</span></li>
          <li className="flex items-center space-x-3"><FaMapMarkerAlt className="text-orange-600" /> <span>123, ABC Street, Chennai, India</span></li>
          <li className="flex items-center space-x-3"><FaClock className="text-red-600" /> <span>Mon–Sun: 8AM–7PM, Emergency: 24/7</span></li>
        </ul>
      </div>
      <div className="flex-1 bg-white shadow-md rounded-lg overflow-hidden">
        <img src={heroImage} alt="pets" className="w-180 h-56 object-contain object-center mt-5" />
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Schedule Your Visit</h3>
          <p className="text-gray-600 mb-4">Ready to give your pet the best care possible? Contact us today to schedule an appointment.</p>
          <Link to={'/book-appointment'} className=" text-white  rounded flex items-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded">Book Appointment Now</button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => {
  return(

  <footer className="bg-gray-800 text-gray-300 py-4 mt-12">
    <div className="container mx-auto text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} - <strong>Pet Care</strong>. All rights reserved.
      </p>
    </div>
  </footer>
  )
};

const HomePage = () => (


  <div className='flex flex-col min-h-screen'>
    <Navbar />
    <main className='flex-grow'>
      <HeroSection />
      <ServicesSection />
      <ContactSection />
    </main>
    <Footer/>
  </div>

);

export default HomePage;
