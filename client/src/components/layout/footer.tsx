export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8" data-testid="footer">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img 
              src="/logo.png" 
              alt="Big Picture Property Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="font-semibold text-lg">Big Picture Property</span>
          </div>
          <p className="text-sm text-muted-foreground" data-testid="footer-copyright">
            © 2025 Big Picture Property. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
