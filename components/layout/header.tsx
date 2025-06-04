"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'About', href: '#about', number: '01' },
  { name: 'Experience', href: '#experience', number: '02' },
  { name: 'Projects', href: '#projects', number: '03' },
  { name: 'Skills', href: '#skills', number: '04' },
  { name: 'Contact', href: '#contact', number: '05' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    // Initialize state based on current scroll position after mount
    if (typeof window !== 'undefined') {
      handleScroll()
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <motion.header
      className={cn(
        'fixed top-0 w-full z-[100] transition-all duration-500',
        isScrolled 
          ? 'glass py-4'
          : 'bg-transparent py-6'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link 
          href="/" 
          className="group flex items-center gap-2"
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-background" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
          </motion.div>
          <span className="text-xl font-bold gradient-text hidden sm:block">VH</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                href={item.href}
                className={cn(
                  "group relative text-sm font-medium transition-colors",
                  activeSection === item.href.slice(1) || (activeSection === 'home' && item.href === '#about')
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="text-xs text-primary font-mono mr-1">{item.number}.</span>
                {item.name}
                <span className={cn(
                  "absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300",
                  activeSection === item.href.slice(1) || (activeSection === 'home' && item.href === '#about')
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                )} />
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
          >
            <Button 
              asChild 
              variant="outline" 
              className="group border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300"
            >
              <a href="#contact" className="flex items-center gap-2">
                Let&apos;s Talk
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 top-0 bg-background z-[100] md:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-background" />
                  </div>
                  <span className="text-xl font-bold gradient-text">VH</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <nav className="flex flex-col p-8 gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link 
                      href={item.href}
                      className="flex items-center gap-4 text-lg py-4 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="text-sm text-primary font-mono">{item.number}.</span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                  className="mt-8"
                >
                  <Button 
                    asChild 
                    className="w-full bg-primary text-background hover:bg-primary/90"
                    size="lg"
                  >
                    <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                      Let&apos;s Talk
                    </a>
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}