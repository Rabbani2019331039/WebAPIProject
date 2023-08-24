import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
const LandingPage = () => {
  const navigate = useNavigate();

  const onSignUpButtonClick = useCallback(() => {
    navigate("/signup-page");
  }, [navigate]);

  const onLoginButtonClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  const onSignUpClick = useCallback(() => {
    navigate("/signup-page");
  }, [navigate]);

  const onLoginTextClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  return (
    <div className="landing-page">
      <main className="body">
        <h1 className="vintage-verbe">
          <p className="vintage">{`Vintage `}</p>
          <p className="vintage">Verbe</p>
        </h1>
        <h4 className="buy-and-decorate">Buy And Decorate</h4>
        <div className="frame">
          <button className="sign-up-button" onClick={onSignUpButtonClick}>
            <div className="sign-up">Sign UP</div>
          </button>
          <button className="sign-up-button" onClick={onLoginButtonClick}>
            <div className="log-in">Log In</div>
          </button>
        </div>
      </main>
      <header className="navbar-l">
        <h2 className="vintage-verb">Vintage Verb</h2>
        <form className="button-section">
          <a className="about-us">About Us</a>
          <a className="sign-up1" onClick={onSignUpClick}>
            Sign Up
          </a>
          <div className="login" onClick={onLoginTextClick}>
            Login
          </div>
        </form>
      </header>
    </div>
  );
};

export default LandingPage;
