import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1216px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 100vh;
  padding: 0 16px; /* Adicione padding lateral para espaços menores */

  @media (max-width: 768px) {
    padding: 0 8px; /* Diminua o padding em telas menores */
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 16px; /* Diminua o espaçamento em telas menores */
  }
`;

export const Separator = styled.div`
  width: 2px;
  height: 400px; /* Defina a altura que deseja para o separador */
  background: #d7d7d7;
  margin: 0 32px;
`;

import * as TabsPrimitive from "@radix-ui/react-tabs";

const Tabs = TabsPrimitive.Root;

const TabsList = styled(TabsPrimitive.List)`
  display: inline-flex;
  height: 40px;
  gap: 2px;
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
  border: 0;
  background-color: transparent;
  color: #6b7280;

  &:focus-visible {
    ring: 2px solid #d73035; /* Defina a cor de foco */
    ring-offset: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-state="active"] {
    background-color: #fff;
    color: #d73035;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const TabsContent = styled(TabsPrimitive.Content)`
  margin-top: 0.5rem;
  padding: 1.5rem;
  border-radius: 0.375rem;
  background-color: #ffffff; /* Substitua pela cor desejada */
  ring-offset: var(--background); /* Ajuste conforme o tema */

  &:focus-visible {
    outline: none;
    ring: 2px solid var(--ring);
    ring-offset: 2px;
  }
`;

export { Tabs, TabsList, TabsTrigger, TabsContent };

// Tabela com largura total e texto pequeno
const Table = styled.table`
  width: 100%;
  caption-side: bottom;
  font-size: 0.875rem;
  border-collapse: collapse;
  table-layout: auto;
`;

// Header da tabela com borda inferior
const TableHeader = styled.thead`
  & tr {
    border-bottom: 1px solid #e5e7eb;
  }
`;

// Corpo da tabela com última linha sem borda
const TableBody = styled.tbody`
  & tr:last-child {
    border: 0;
  }
`;

// Footer da tabela com borda superior e fundo levemente diferente
const TableFooter = styled.tfoot`
  border-top: 1px solid #e5e7eb;
  background-color: #ffff;
  font-weight: 500;

  & tr:last-child {
    border-bottom: 0;
  }
`;

// Linha da tabela com borda inferior e hover para mudar cor
const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fff;
  }
`;

// Cabeçalho da tabela com altura e padding definidos, alinhado à esquerda
const TableHead = styled.th`
  height: 3rem;
  padding: 0 1rem;
  text-align: left;
  font-weight: 500;
  color: #6b7280;
`;

// Célula da tabela com padding
const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;
`;

// Caption da tabela com margem e texto pequeno
const TableCaption = styled.caption`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

// Exportando os componentes
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};

export const HeaderTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const HeaderTableTitle = styled.h3`
  font-size: 1.425rem;
  font-weight: 600;
  line-height: 1.25;
  margin: 0;
  color: #d73035;
`;
