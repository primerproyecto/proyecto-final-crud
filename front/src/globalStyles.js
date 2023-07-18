import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
.flexContainer-ai-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
a {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.2rem 0.5rem;
    text-decoration: none;
}
  body {
    margin: 0;
    padding: 0;
    background: #eeeeee;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
  .form-wrap{
    input[type="text"],
    input[type="password"],
    input[type="email"],
    input[type="file"],
    button {
        width: 100%;
        border-radius: 4px;
        padding: 0.5rem 1rem;
    }
  }
  .avatar {
    border-radius: 50%;
  }
`;

export default GlobalStyle;
