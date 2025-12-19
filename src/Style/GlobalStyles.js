import styled, { css, createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`
  :root{
    --bg: #0b0b0b;
    --panel-bg: rgba(255,255,255,0.03);
    --panel-border: rgba(255,255,255,0.06);
    --muted: rgba(255,255,255,0.7);
    --accent: #00d4ff;
    --success: #00c853;
    --danger: #ff3b30;
    --btn-bg: rgba(255,255,255,0.06);
    --input-border: rgba(255,255,255,0.12);
  }

  *,*::before,*::after{box-sizing:border-box}
  html,body,#root{height:100%;}
  body{
    margin:0;
    background: var(--bg);
    color: #fff;
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
  }
  a{color:inherit}

  .btn {
    padding: 10px 16px;
    border-radius: 8px;
    background: var(--btn-bg);
    border: 1px solid var(--panel-border);
    cursor: pointer;
    color: #fff;
    font-weight: 600;
    transition: all 0.15s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;

    &:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.2);
    }

    &:active {
      transform: scale(0.97);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
  }
`;


export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 900px) {
    padding: 14px;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
  }
`;



export const BasePanel = styled.div`
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  border-radius: 12px;
  padding: 16px;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
`;

export const Button = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  background: var(--btn-bg);
  border: 1px solid var(--panel-border);
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  transition: all 0.15s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;


const inputStyles = css`
  width: 100%;
  background: transparent;
  border: 1px solid var(--input-border);
  border-radius: 8px;
  padding: 10px 12px;
  color: #fff;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.25);
  }
`;

export const Input = styled.input`
  ${inputStyles}
`;
export const Select = styled.select`
  ${inputStyles}
`;
export const TextArea = styled.textarea`
  ${inputStyles}
`;



const getStatusColor = (status) => {
  switch ((status || "").toLowerCase()) {
    case "applied":
      return "var(--muted)";
    case "phone":
    case "interview":
      return "var(--accent)";
    case "offer":
      return "var(--success)";
    case "rejected":
      return "var(--danger)";
    case "ghosted":
      return "#666";
    default:
      return "var(--muted)";
  }
};

const getStatusBg = (status) => {
  switch ((status || "").toLowerCase()) {
    case "applied":
      return "rgba(255, 255, 255, 0.1)";
    case "phone":
    case "interview":
      return "rgba(0, 212, 255, 0.15)";
    case "offer":
      return "rgba(0, 200, 83, 0.15)";
    case "rejected":
      return "rgba(255, 59, 48, 0.15)";
    case "ghosted":
      return "rgba(255, 255, 255, 0.05)";
    default:
      return "rgba(255, 255, 255, 0.1)";
  }
};

export const StatusChip = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  color: ${(props) => getStatusColor(props.status)};
  background: ${(props) => getStatusBg(props.status)};
`;
