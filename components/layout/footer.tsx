export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © 2025 Vitalii Honcharuk. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="mailto:vitaliihoncharuk@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              Email
            </a>
            <a href="https://linkedin.com/in/honcharukv" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}