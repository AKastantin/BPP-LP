import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export default function Header() {

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

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
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-methodology"
            >
              Our Data
            </button>
            <button 
              onClick={() => scrollToSection('interactive-tools')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-tools"
            >
              Try Tools
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
