import styled from "styled-components";

export const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 12px auto;
  padding: 0 12px;
`;

export const DetailPanel = styled.div`
  padding: 24px; /* Bumped padding slightly for breathing room */
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const TitleGroup = styled.div`
  h2 {
    margin: 0;
    margin-bottom: 4px;
    font-size: 1.5rem;
    color: #fff;
  }
  div {
    color: var(--muted);
    font-size: 0.9rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const InfoGrid = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px 16px; 
`;

export const SectionTitle = styled.div`
  color: var(--muted);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

export const ContentValue = styled.div`
  font-weight: 500;
  font-size: 1rem;
  color: #fff;

  &.capitalize {
    text-transform: capitalize;
  }
`;

export const NotesContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(0, 0, 0, 0.2); 
  padding: 12px;
  border-radius: 8px;
`;

export const LogoContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

export const LogoImage = styled.img`
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1200;
  backdrop-filter: blur(4px);
  padding: 16px;
`;

export const ModalContent = styled.div`
  width: 860px;
  max-width: 100%;
`;
