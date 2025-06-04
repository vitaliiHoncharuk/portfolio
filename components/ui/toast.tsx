'use client';

import * as React from 'react';

export type ToastProps = {
  variant?: 'default' | 'destructive';
  className?: string;
  children?: React.ReactNode;
};

export type ToastActionElement = React.ReactElement;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
ToastProvider.displayName = 'ToastProvider';

export const ToastViewport = () => null;
ToastViewport.displayName = 'ToastViewport';

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>((_props, _ref) => null);
Toast.displayName = 'Toast';

export const ToastTitle = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>((_props, _ref) => null);
ToastTitle.displayName = 'ToastTitle';

export const ToastDescription = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>((_props, _ref) => null);
ToastDescription.displayName = 'ToastDescription';

export const ToastClose = React.forwardRef<HTMLButtonElement, { children?: React.ReactNode }>((_props, _ref) => null);
ToastClose.displayName = 'ToastClose';

export const ToastAction = React.forwardRef<HTMLButtonElement, { children?: React.ReactNode }>((_props, _ref) => null);
ToastAction.displayName = 'ToastAction';
