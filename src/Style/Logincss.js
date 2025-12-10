import styled from "styled-components";

export const LoginContainer = styled.div`
  max-width: 450px;
  margin: 80px auto;
  padding: 0 16px;
`;

export const LoginPanel = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 32px; 
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); 
`;

export const LoginTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 24px;
  color: #fff;
  font-size: 1.8rem;
  text-align: center;
  font-weight: 700;
`;

export const LoginForm = styled.form`
  display: grid;
  gap: 16px;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

export const AuthLink = styled.span`
  a {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;

    &:hover {
      color: var(--accent);
      text-decoration: underline;
    }
  }
`;
