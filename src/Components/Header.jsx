import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import {
  WrapperHeader,
  HeadContainer,
  Logo,
  LogoLink,
  LogoText,
  Tagline,
  NavbarSection,
  UserInfoSection,
} from "../Style/Headercss";

export default function AppHeader() {
  const { user, setUser, token, setToken, setApplications } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setApplications([]);
    toast.info("Logged out");
    navigate("/login");
  };

  return (
    <WrapperHeader>
      <HeadContainer className="container">
        <Logo>
          <LogoLink to="/">
            <LogoText>InternTrack</LogoText>
          </LogoLink>
          <Tagline>track every step — apply smarter</Tagline>
        </Logo>

        <NavbarSection>
          {token ? (
            <>
              
              <Link to="/analytics" className="btn">
                Analytics
              </Link>
              <Link to="/" className="btn">
                Dashboard
              </Link>

              <UserInfoSection>{user?.name}</UserInfoSection>
              <button
                className="btn"
                onClick={handleLogout}
                title="Sign out"
                aria-label="Sign out"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">
                Login
              </Link>
              <Link to="/signup" className="btn">
                Signup
              </Link>
            </>
          )}
        </NavbarSection>
      </HeadContainer>
    </WrapperHeader>
  );
}
