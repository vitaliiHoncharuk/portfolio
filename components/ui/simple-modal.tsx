'use client';

import { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  overlayClassName?: string;
}

export function SimpleModal({
  isOpen,
  onClose,
  children,
  title,
  description,
  className,
  overlayClassName,
}: SimpleModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        overlayClassName
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div
        className={cn(
          'relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-lg border border-border/20 shadow-xl',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || description) && (
          <div className="px-6 py-4 border-b border-border/20">
            <div className="flex items-start justify-between">
              <div>
                {title && (
                  <div className="text-3xl font-bold">{title}</div>
                )}
                {description && (
                  <div className="mt-1">{description}</div>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        
        {/* Body */}
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export const ModalHeader = ({ children }: { children: ReactNode }) => (
  <div className="mb-4">{children}</div>
);

export const ModalTitle = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h3 className={cn('text-2xl font-bold', className)}>{children}</h3>
);

export const ModalDescription = ({ children }: { children: ReactNode }) => (
  <p className="text-muted-foreground mt-1">{children}</p>
);