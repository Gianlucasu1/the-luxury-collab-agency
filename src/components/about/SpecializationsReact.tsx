import { useState, useEffect } from 'react';
import { 
  Heart, 
  Sparkles, 
  Crown, 
  Diamond,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import heroJet from '@/assets/hero-jet.jpg';
import luxuryCar from '@/assets/luxury-car.jpg';
import resortLuxury from '@/assets/resort-luxury.jpg';
import yachtNight from '@/assets/yacht-night.jpg';

const SpecializationsReact = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const [instantHide, setInstantHide] = useState(false);

  const niches = [
    {
      icon: Heart,
      title: "Private Aviation",
      description: "Exclusive access to the world's most prestigious private jets and helicopter services.",
      image: heroJet
    },
    {
      icon: Sparkles,
      title: "Luxury Transportation",
      description: "Bespoke ground transportation with exotic cars and chauffeured services.",
      image: luxuryCar
    },
    {
      icon: Crown,
      title: "Premium Resorts",
      description: "Curated selection of the world's most exclusive hotels and resorts.",
      image: resortLuxury
    },
    {
      icon: Diamond,
      title: "Yacht Experiences",
      description: "Private yacht charters and maritime adventures in pristine waters.",
      image: yachtNight
    }
  ];

  const handleCardClick = (index: number) => {
    setInstantHide(true);
    setExpandedIndex(index);
  };

  const handlePrevious = () => {
    setInstantHide(true);
    setExpandedIndex((prev) => (prev - 1 + niches.length) % niches.length);
  };

  const handleNext = () => {
    setInstantHide(true);
    setExpandedIndex((prev) => (prev + 1) % niches.length);
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
    }, 1000);

    return () => clearTimeout(timerId);
  }, [expandedIndex]);

  return (
    <>
      {/* Desktop Card Slider */}
      <div className="hidden lg:block relative">
        <div className="relative h-[500px] max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-[#2a6781]/80 hover:bg-[#2a6781] text-[#efb958] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-[#efb958]/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-[#2a6781]/80 hover:bg-[#2a6781] text-[#efb958] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-[#efb958]/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div className="relative h-full flex items-center justify-center">
            {niches.map((niche, index) => {
              const isExpanded = index === expandedIndex;
              const Icon = niche.icon;

              return (
                <div
                  key={niche.title}
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
                      style={{ backgroundImage: `url(${niche.image.src})` }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 transition-all duration-500 ${
                      isExpanded 
                        ? 'bg-gradient-to-t from-black via-black/70 via-black/30 to-transparent' 
                        : 'bg-gradient-to-t from-black via-black/80 via-black/50 to-transparent'
                    }`} />
                    
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
                            <div className="w-16 h-16 bg-[#efb958]/20 rounded-full flex items-center justify-center mb-6">
                              <Icon className="w-8 h-8 text-[#efb958]" />
                            </div>
                            <h3 className="text-3xl font-sans font-bold text-white mb-4 italic">
                              {niche.title}
                            </h3>
                            <p className="text-lg text-white font-sans leading-relaxed">
                              {niche.description}
                            </p>
                          </div>
                        )
                      ) : (
                        // Collapsed Card Content
                        <div className="h-full flex flex-col justify-between items-center">
                          <div className="flex-1 flex items-center justify-center">
                            <p className="text-white font-sans font-semibold text-center text-sm">
                              {niche.title}
                            </p>
                          </div>
                          <div className="mb-6">
                            <div className="w-12 h-12 bg-[#efb958]/20 hover:bg-[#efb958]/40 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 border border-[#efb958]/30">
                              <Icon className="w-6 h-6 text-[#efb958]" />
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
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-4 w-max">
            {niches.map((niche, index) => {
              const Icon = niche.icon;
              return (
                <div
                  key={niche.title}
                  className="w-80 h-96 rounded-2xl overflow-hidden shadow-xl relative flex-shrink-0"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${niche.image})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 via-black/30 to-transparent" />
                  
                  <div className="relative h-full p-6 flex flex-col justify-end">
                    <div className="w-12 h-12 bg-[#efb958]/20 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#efb958]" />
                    </div>
                    <div className="mb-4">
                      <h3 className="text-2xl font-sans font-bold text-white mb-3 italic">
                        {niche.title}
                      </h3>
                      <p className="text-white font-sans text-sm leading-relaxed">
                        {niche.description}
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
        {niches.map((_, index) => (
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
    </>
  );
};

export default SpecializationsReact;