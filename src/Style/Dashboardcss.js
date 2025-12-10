import styled from "styled-components";

export const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 12px auto;
  padding: 0 12px;
`;

export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeaderTitle = styled.div`
  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    color: #fff;
  }
  div {
    color: var(--muted);
    font-size: 14px;
    margin-top: 4px;
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentColumn = styled.div`
  display: grid;
  gap: 24px;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

export const SidebarColumn = styled.aside`
  display: grid;
  gap: 24px;
  position: sticky;
  top: 24px;
  height: fit-content; 
`;

export const Panel = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 18px;

  h4 {
    margin: 0;
    margin-bottom: 12px;
    font-size: 1.1rem;
    color: #fff;
  }
`;

export const EmptyState = styled(Panel)`
  text-align: center;
  color: var(--muted);
  padding: 32px;
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
