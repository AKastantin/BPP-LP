import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useState, useEffect } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const sections = ['data-methodology', 'solution-overview', 'solutions', 'interactive-tools', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better UX
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Set initial active section
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="Big Picture Property Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="font-semibold text-lg">Big Picture Property</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('data-methodology')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'data-methodology' 
                  ? 'text-primary font-semibold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid="nav-methodology"
            >
              Data Sources
            </button>
            <button 
              onClick={() => scrollToSection('solution-overview')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'solution-overview' 
                  ? 'text-primary font-semibold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid="nav-solution"
            >
              Our Approach
            </button>
            <button 
              onClick={() => scrollToSection('solutions')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'solutions' 
                  ? 'text-primary font-semibold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid="nav-services"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('interactive-tools')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'interactive-tools' 
                  ? 'text-primary font-semibold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid="nav-tools"
            >
              Try Tools
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`text-sm font-medium transition-colors ${
                activeSection === 'contact' 
                  ? 'text-primary font-semibold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid="nav-contact"
            >
              Contact
            </button>
          </nav>
        </div>
        
      </div>
    </header>
  );
}
