import React from "react";
import styled from "styled-components/native";
import { Text, TextInput, View } from "react-native";

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
}

const Container = styled.View`
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.Text<{ labelClasses?: string }>`
  font-size: 14px;
  color: black;
  ${(props) => props.labelClasses || ""}
`;

const StyledTextInput = styled.TextInput<{ inputClasses?: string }>`
  border: 1px solid white;
  padding: 10px 16px;
  border-radius: 8px;
  color: white;
  ${(props) => props.inputClasses || ""}
`;

export function Input({
  label,
  labelClasses,
  inputClasses,
  ...props
}: InputProps) {
  return (
    <Container>
      {label && <Label labelClasses={labelClasses}>{label}</Label>}
      <StyledTextInput inputClasses={inputClasses} {...props} />
    </Container>
  );
}
