import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainContainer = styled.div`
  max-width: 500px; /* Reduced width to look better for a form */
  margin: 60px auto;
  padding: 0 20px;
`;

// Fixed typo: CardContai -> CardContainer
export const CardContainer = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08); /* Fixed weird reddish border color */
  padding: 32px;
  border-radius: 14px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h2`
  margin: 0 0 24px;
  font-weight: 700;
  color: #fff;
  text-align: center;
`;

export const Form = styled.form`
  display: grid;
  gap: 16px;
`;

export const Input = styled.input`
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 12px 14px;
  color: #fff;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box; 

  &:focus {
    border-color: var(--accent, #00d4ff);
    background: rgba(0, 0, 0, 0.4);
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const Button = styled.button`
  background: var(--accent, #fff);
  color: #000; 
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const LinkText = styled(Link)`
  color: var(--muted, #9aa0a6);
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;
