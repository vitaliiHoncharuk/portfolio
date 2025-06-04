'use client';

import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItemData {
  id: string;
  trigger: ReactNode;
  content: ReactNode;
}

interface SimpleAccordionProps {
  items: AccordionItemData[];
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export function SimpleAccordion({
  items,
  type = 'single',
  collapsible = true,
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
}: SimpleAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    if (type === 'single') {
      if (openItems.includes(itemId)) {
        setOpenItems(collapsible ? [] : [itemId]);
      } else {
        setOpenItems([itemId]);
      }
    } else {
      setOpenItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        
        return (
          <div key={item.id} className={cn('', itemClassName)}>
            <button
              onClick={() => toggleItem(item.id)}
              className={cn(
                'w-full flex items-center justify-between text-left transition-colors',
                triggerClassName
              )}
              aria-expanded={isOpen}
            >
              <div className='flex-1'>{item.trigger}</div>
              <ChevronDown 
                className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className={cn('pt-2', contentClassName)}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}