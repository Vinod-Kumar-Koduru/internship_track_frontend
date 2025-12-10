import styled from "styled-components";

export const TimelineContainer = styled.div`
  height: 520px;
  width: 100%; 
  padding: 0;


  .chrono-controls {
    display: none !important;
  }


  .my-card {
    background: rgba(255, 255, 255, 0.03) !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    backdrop-filter: blur(10px);
    border-radius: 12px !important;
    box-shadow: none !important;
    padding: 16px !important; 
  }

  .my-card-title {
    color: #fff !important;
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    margin-bottom: 4px !important;
  }

  .my-card-subtitle {
    color: var(--accent) !important;
    font-size: 0.85rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .my-card-text {
    color: var(--muted) !important;
    font-size: 0.9rem !important;
    margin-top: 8px !important;
    line-height: 1.5 !important;
  }


  .my-title {
    color: var(--muted) !important;
    font-size: 0.85rem !important;
    font-weight: 500 !important;
  }
`;
