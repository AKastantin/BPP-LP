import { Facebook, Twitter, Linkedin } from "lucide-react";

const footerSections = [
  {
    title: "Solutions",
    links: [
      { label: "Banks & Lenders", href: "#solutions" },
      { label: "Estate Agents", href: "#solutions" },
      { label: "Property Investors", href: "#solutions" },
      { label: "Property Owners", href: "#solutions" },
      { label: "API Access", href: "#solutions" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#resources" },
      { label: "Case Studies", href: "#case-studies" },
      { label: "Whitepapers", href: "#resources" },
      { label: "API Documentation", href: "#resources" },
      { label: "Help Center", href: "#resources" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#contact" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" }
    ]
  }
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-background border-t border-border py-16" data-testid="footer">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">BP</span>
              </div>
              <span className="font-semibold text-lg">Big Picture Property</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Transforming real estate decisions with AI-powered insights, hyper-local market intelligence, and predictive analytics.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors" data-testid="social-twitter">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors" data-testid="social-linkedin">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {footerSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="font-semibold mb-4" data-testid={`footer-section-title-${sectionIndex}`}>
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button 
                      onClick={() => scrollToSection(link.href)}
                      className="hover:text-foreground transition-colors"
                      data-testid={`footer-link-${sectionIndex}-${linkIndex}`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0" data-testid="footer-copyright">
            © 2025 Big Picture Property. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
