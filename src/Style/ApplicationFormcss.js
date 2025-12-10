import styled from "styled-components";

export const WrapperForm = styled.form`
  display: grid;
  gap: 16px;
  padding: 24px;
  background: #1a1a1a;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  &.panel {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
  }
`;

export const ShowRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;


export const ActionGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
`;

export const StyledInput = styled.input`
  flex: 1;
`;

export const StyledSelect = styled.select`
  flex: 1;
`;

export const HelperText = styled.span`
  color: var(--muted);
  font-size: 13px;
`;
