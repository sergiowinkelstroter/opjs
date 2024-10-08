import * as TabsPrimitive from "@radix-ui/react-tabs";
import styled from "styled-components";

const Tabs = TabsPrimitive.Root;

const TabsList = styled(TabsPrimitive.List)`
  display: inline-flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  background-color: var(--muted-bg); /* Substitua pela cor desejada */
  padding: 0.25rem;
  color: var(--muted-foreground); /* Substitua pela cor desejada */
`;

const TabsTrigger = styled(TabsPrimitive.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  outline: none;
  ring-offset: var(
    --background
  ); /* Ajuste o valor para corresponder ao seu tema */

  &:focus-visible {
    ring: 2px solid var(--ring); /* Defina a cor de foco */
    ring-offset: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-state="active"] {
    background-color: var(--background);
    color: var(--foreground);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const TabsContent = styled(TabsPrimitive.Content)`
  margin-top: 0.5rem;
  ring-offset: var(--background); /* Ajuste conforme o tema */

  &:focus-visible {
    outline: none;
    ring: 2px solid var(--ring);
    ring-offset: 2px;
  }
`;

export { Tabs, TabsList, TabsTrigger, TabsContent };
