"use client";

import * as React from "react"
import Link from "next/link"
import { NavCard } from "@/components/nav-card"
import { useDB, NavItem } from "@/lib/db"
import { 
  ExternalLinkIcon, 
} from "@/components/icons"
import { SectionHeader } from "@/components/section-header"
import { Button } from "@/components/ui/button"

export function HomeContent() {
  const { navItems, categories } = useDB();
  const [activeSection, setActiveSection] = React.useState<string | null>(null);
  
  // Group navigation items
  const groupedItems = React.useMemo(() => {
    const grouped: Record<string, NavItem[]> = {};
    
    categories.forEach(category => {
      grouped[category.id] = navItems.filter(item => item.categoryId === category.id)
        .sort((a, b) => {
          return (a.order ?? 0) - (b.order ?? 0);
        });
    });
    
    return grouped;
  }, [navItems, categories]);
  
  // Sort categories
  const sortedCategories = React.useMemo(() => {
    return [...categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [categories]);

  // Handle scroll event to update active section
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = sortedCategories.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + 100;
      
      let foundActive = false;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sortedCategories[i].id);
          foundActive = true;
          break;
        }
      }
      
      if (!foundActive && sortedCategories.length > 0) {
        setActiveSection(sortedCategories[0].id);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sortedCategories]);

  // Handle category click for smooth scrolling
  const handleCategoryClick = (categoryId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(categoryId);
    if (element) {
      const topPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
      });
      setActiveSection(categoryId);
    }
  };

  return (
    <>
      {/* Main content area with sidebar layout */}
      <div className="flex container pt-6 pb-20">
        {/* Fixed sidebar navigation */}
        <div className="hidden lg:block w-64 flex-shrink-0 self-start sticky top-24">
          <nav className="space-y-1 pr-4">
            {sortedCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                onClick={handleCategoryClick(category.id)}
                className={`
                  block px-4 py-3 rounded-xl text-sm font-medium 
                  transition-all duration-200 
                  ${activeSection === category.id 
                    ? 'category-active' 
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary/40'}
                `}
              >
                {category.name}
              </a>
            ))}
          </nav>
        </div>
        
        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Hero section */}
          <section className="mb-16">
            <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 bg-cursor-gradient-light">
              <div className="relative">
                <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
                  Cursor IDE Resources
                </h1>
                <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-8">
                  Collection of Cursor IDE related resources to help developers improve efficiency. From tutorials to plugins, a one-stop navigation platform.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="rounded-full px-6"
                    asChild
                  >
                    <a href={sortedCategories.length > 0 ? `#${sortedCategories[0].id}` : "#"} onClick={sortedCategories.length > 0 ? handleCategoryClick(sortedCategories[0].id) : undefined}>
                      Start Exploring
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-6"
                    asChild
                  >
                    <a 
                      href="https://github.com/328599138"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>GitHub</span>
                      <ExternalLinkIcon className="ml-1.5 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
              
              {/* Decorative background elements */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-cursor-gradient opacity-20 blur-xl"></div>
              <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-cursor-gradient opacity-20 blur-xl"></div>
            </div>
          </section>
          
          {/* Navigation content */}
          <div className="space-y-24">
            {sortedCategories.map((category, index) => (
              <section key={category.id} id={category.id} className="scroll-mt-24">
                <SectionHeader
                  title={category.name}
                  description={category.description}
                  pill={index === 0 ? "Recommended" : undefined}
                  variant={index === 0 ? "large" : "default"}
                />
                <div className="category-grid">
                  {groupedItems[category.id]?.map((item) => (
                    <NavCard 
                      key={item.id} 
                      title={item.title}
                      description={item.description || ""}
                      href={item.url || ""} 
                      category={category.name}
                      isNew={false}
                      icon={item.icon ? (
                        <span className="text-2xl">{item.icon}</span>
                      ) : undefined}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </>
  );
} 