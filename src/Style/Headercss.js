import styled from "styled-components";
import { Link } from "react-router-dom";

export const WrapperHeader = styled.header`
  padding: 16px 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 24px;

  /* UX Fix: Keep header visible while scrolling */
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* UX Fix: Prevent content from touching screen edges on mobile */
  padding: 0 16px;
`;

export const Logo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const LogoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const LogoText = styled.div`
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--accent);
  font-size: 20px;
  text-transform: uppercase;
`;

export const Tagline = styled.div`
  color: var(--muted);
  font-size: 13px;

  border-left: 1px solid rgba(255, 255, 255, 0.15);
  padding-left: 12px;
  height: 20px;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const NavbarSection = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const UserInfoSection = styled.div`
  color: var(--muted);
  font-size: 14px;
  margin-right: 8px;
  font-weight: 500;

  @media (max-width: 600px) {
    display: none;
  }
`;
