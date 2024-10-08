import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  font-size: 16px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 118px;
  padding: 8px 16px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  font-size: 16px;
`;

export const Select = styled.select`
  width: 100%;
  height: 48px;
  padding: 8px 16px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
`;

export const Button = styled.button`
  width: 100%;
  height: 48px;
  padding: 8px 16px;
  background: #d73035;
  border-radius: 8px;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  border: 0;
  cursor: pointer;
  margin-top: 16px;
`;

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = styled(DialogPrimitive.Trigger)`
  border: none;
`;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.8);
  &[data-state="open"] {
    animation: fadeIn 0.3s ease;
  }
  &[data-state="closed"] {
    animation: fadeOut 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const DialogContent = styled(DialogPrimitive.Content)`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  display: grid;
  width: 100%;
  max-width: 440px;
  padding: 1.5rem;
  background: #ffffff;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
  border-radius: 0.375rem;

  &[data-state="open"] {
    animation: zoomIn 0.3s ease;
  }
  &[data-state="closed"] {
    animation: zoomOut 0.3s ease;
  }

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.95) translate(-50%, -50%);
    }
    to {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%);
    }
  }

  @keyframes zoomOut {
    from {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%);
    }
    to {
      opacity: 0;
      transform: scale(0.95) translate(-50%, -50%);
    }
  }
`;

const CloseButton = styled(DialogPrimitive.Close)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border-radius: 0.25rem;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--ring);
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const CloseIcon = styled(X)`
  height: 1rem;
  width: 1rem;
`;

const DialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  text-align: center;
  @media (min-width: 640px) {
    text-align: left;
  }
`;

const DialogFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: 0.5rem;
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const DialogTitle = styled(DialogPrimitive.Title)`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.25;
  margin: 0;
`;

const DialogDescription = styled(DialogPrimitive.Description)`
  font-size: 0.875rem;
  color: var(--text-muted);
`;

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  CloseButton as DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  CloseIcon,
};
