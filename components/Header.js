import { rgba } from 'polished';
import styled from 'styled-components';
import Content from './Content';

export default function Header({ heading, subheading, body }) {
  console.log(body);
  return (
    <StyledHeader>
      <img className="background" src="blur-gradient.jpg" alt="" />
      <div className="header-content">
        {heading && <h1>{heading}</h1>}
        {subheading && <p className="big">{subheading}</p>}
        {body && <Content>{body}</Content>}
        <a className="button" href="#">
          Book a consultation
        </a>
        <img className="logo" src="cd-logo-h.png" alt="Creative Distillery logo" />
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding: 0 40px 40px;
  position: relative;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .header-content {
    position: relative;
    background: ${rgba('white', 0.5)};
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 18px;
    width: 1000px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    h1 {
      grid-area: 1 / 1 / 2 / 3;
      font-size: 40px;
      margin: 0;
    }
    p {
      line-height: 1.5;
    }
    .big {
      grid-area: 2 / 1 / 3 / 3;
      font-family: ${({ theme }) => theme.font.heading};
      font-weight: 900;
      font-size: 30px;
      line-height: 1.15;
      margin-bottom: 10px;
    }
    p:not(.big) {
      grid-area: 3 / 1 / 4 / 2;
      font-weight: bold;
      font-size: 18px;
    }
    a {
      grid-area: 4 / 1 / 5 / 2;
    }
    .logo {
      grid-area: 5 / 1 / 6 / 2;
    }
  }

  .button {
    background: ${({ theme }) => theme.orange};
    color: white;
    justify-self: center;
    padding: 5px 30px 8px;
    font-weight: bold;
    border-radius: 10rem;
  }
`;
