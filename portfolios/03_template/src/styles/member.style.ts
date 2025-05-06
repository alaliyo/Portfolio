import { styled } from "styled-components";
import { flexCenterCenter, flexColumnCenterCenter } from "./mixins.style";

export const LoginLayout = styled.div`
	height: calc(80vh - 70px);
	${flexCenterCenter};
`;

export const LoginBox = styled.div`
	padding: 1.5rem;
	border-radius: 0.5rem;
	border: 1px solid #ccc;
`;

export const LoginForm = styled.form`
	${flexColumnCenterCenter};
`;