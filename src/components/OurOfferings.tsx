import { useEffect, useState } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import resortLuxury from '../assets/resort-luxury.jpg';
import luxuryCar from '../assets/luxury-car.jpg';
import yachtNight from '../assets/yacht-night.jpg';
import jet2 from '../assets/jet-2.jpg';
import luxuryEscape2 from '../assets/luxury escape2.jpg';
import yacht2 from '../assets/yacht2.jpg';


const OurOfferings = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const [instantHide, setInstantHide] = useState(false);

  const offerings = [
    {
      title: 'Luxury Yachts',
      description: 'Exclusive yacht charters for unforgettable maritime experiences with private crew, custom itineraries, and gourmet dining aboard the world\'s finest vessels.',
      image: yacht2,
      href: '/yacht-services'
    },
    {
      title: 'Private Jets',
      description: 'Access to the world\'s most exclusive fleet of private aircraft with on-demand availability, global destinations, and luxury amenities for the discerning traveler.',
      image: jet2,
      href: '/private-jets'
    },
    {
      title: 'Luxury Getaways',
      description: 'Curated escapes to the world\'s most breathtaking destinations featuring 5-star stays, exclusive suites, and personal concierge service for an unforgettable experience.',
      image: luxuryEscape2,
      href: '/luxury-getaways'
    }
  ];

  const handleCardClick = (index: number) => {
    setInstantHide(true);
    setExpandedIndex(index);
  };

  const handlePrevious = () => {
    setInstantHide(true);
    setExpandedIndex((prev) => (prev - 1 + offerings.length) % offerings.length);
  };

  const handleNext = () => {
    setInstantHide(true);
    setExpandedIndex((prev) => (prev + 1) % offerings.length);
  };

  // Show expanded card content with a delayed fade-in
  useEffect(() => {
    setContentVisible(false);
    setInstantHide(true);
    const timerId = setTimeout(() => {
      setInstantHide(false);
      // Add a small delay to ensure the element is rendered before starting fade-in
      setTimeout(() => {
        setContentVisible(true);
      }, 50);
    }, 500);

    return () => clearTimeout(timerId);
  }, [expandedIndex]);

  return (
    <section id="offerings" className="py-24 bg-[#11353e] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-primary font-bold text-white mb-6">
            Our <span className="text-[#efb958]">Premium</span> Offerings
          </h2>
          <p className="text-xl text-[#ead4b7] font-secondary max-w-2xl mx-auto">
            Discover a world of unparalleled luxury and exclusive experiences
          </p>
        </div>

        {/* Desktop Card Slider */}
        <div className="hidden lg:block">
          <div className="relative h-[500px] max-w-7xl mx-auto">
            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-[#2a6781]/80 hover:bg-[#2a6781] text-[#efb958] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-[#efb958]/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-[#2a6781]/80 hover:bg-[#2a6781] text-[#efb958] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-[#efb958]/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Cards Container */}
            <div className="relative h-full flex items-center">
              {offerings.map((offering, index) => {
                const isExpanded = index === expandedIndex;

                return (
                  <div
                    key={offering.title}
                    onClick={() => handleCardClick(index)}
                    className={`flex-shrink-0 transition-all duration-500 ease-in-out cursor-pointer ${
                      isExpanded 
                        ? 'flex-[0_0_60%] h-full z-10' 
                        : 'flex-[0_0_20%] h-full z-0'
                    }`}
                  >
                    <div className="relative h-full rounded-2xl overflow-hidden shadow-xl group">
                      {/* Background Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${offering.image.src})` }}
                      />
                      
                      {/* Gradient Overlay - Only show when expanded */}
                      {isExpanded && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 via-black/30 to-transparent transition-all duration-500" />
                      )}
                      
                      {/* CTA Button - Top Right */}
                      <div className="absolute top-4 right-4 z-20">
                        <a href={offering.href} className="premium-cta px-4 py-2 text-sm">
                          Explore
                        </a>
                      </div>
                      
                      {/* Content */}
                      <div className="relative h-full p-8 flex flex-col justify-end">
                        {isExpanded ? (
                          // Expanded Card Content
                          !instantHide && (
                            <div
                              className={`transition-all ease-out mb-4 duration-1000 ${
                                contentVisible
                                  ? 'opacity-100 translate-y-0'
                                  : 'opacity-0 translate-y-4'
                              }`}
                              style={{
                                transitionProperty: 'opacity, transform',
                                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                              }}
                            >
                              <h3 className="text-3xl font-primary font-bold text-white mb-4 italic">
                                {offering.title}
                              </h3>
                              <p className="text-lg text-white font-secondary leading-relaxed">
                                {offering.description}
                              </p>
                            </div>
                          )
                        ) : (
                          // Collapsed Card Content
                          <div className="h-full flex flex-col justify-between items-center">
                            <div className="flex-1 flex items-center justify-center">
                              <p className="text-white font-secondary font-semibold text-center text-sm">
                                {offering.title}
                              </p>
                            </div>
                            <div className="mb-6">
                              <div className="w-12 h-12 bg-[#efb958]/20 hover:bg-[#efb958]/40 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 border border-[#efb958]/30">
                                <Plus className="w-6 h-6 text-[#efb958]" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Card Slider */}
        <div className="lg:hidden">
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex space-x-4 w-max min-w-0">
              {offerings.map((offering, index) => {
                return (
                  <div
                    key={offering.title}
                    className="w-80 h-96 rounded-2xl overflow-hidden shadow-xl relative flex-shrink-0"
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${offering.image})` }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 via-black/30 to-transparent" />
                    
                    {/* CTA Button - Top Right */}
                    <div className="absolute top-4 right-4 z-20">
                      <a href={offering.href} className="premium-cta text-xs px-3 py-2">
                        Explore
                      </a>
                    </div>
                    
                    <div className="relative h-full p-6 flex flex-col justify-end">
                      <div className="mb-4">
                        <h3 className="text-2xl font-primary font-bold text-white mb-3 italic">
                          {offering.title}
                        </h3>
                        <p className="text-white font-secondary text-sm leading-relaxed">
                          {offering.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {offerings.map((_, index) => (
            <button
              key={index}
              onClick={() => setExpandedIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === expandedIndex 
                  ? 'bg-[#efb958] scale-125' 
                  : 'bg-[#ead4b7]/50 hover:bg-[#ead4b7]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurOfferings;