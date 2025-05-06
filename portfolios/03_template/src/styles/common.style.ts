import styled from "styled-components";
import { flexColumnCenterCenter } from "./mixins.style";

export const CommonPageLayout = styled.div`
  ${flexColumnCenterCenter};

  * {
    text-align: center;
  }
  
  h1, h2, h3, h4, h5, h6, p { 
    margin-bottom: 0.5rem;
  }

  form {
    ${flexColumnCenterCenter};
  }

  ul {
    margin: 0;
  }

  hr {
    width: 100%;
  }
`;