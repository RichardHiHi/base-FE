import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import type { ReactNode } from 'react';

interface CommonDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showClose?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  hideFooter?: boolean;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full',
};

export function CommonDialog({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  className = '',
  size = 'md',
  onConfirm,
  onCancel,
  confirmText = 'Đồng ý',
  cancelText = 'Hủy bỏ',
  hideFooter = false,
}: CommonDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${sizeClasses[size]} ${className}`}
        onInteractOutside={(e) => {
          // Ngăn đóng khi click bên ngoài nếu cần
          // e.preventDefault();
        }}
      >
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        <div className='py-4'>{children}</div>

        {!hideFooter && (
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline' onClick={onCancel}>
                {cancelText}
              </Button>
            </DialogClose>
            <Button type='button' variant='default' onClick={onConfirm}>
              {confirmText}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
