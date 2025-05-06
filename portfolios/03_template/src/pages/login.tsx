import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { LoginBox, LoginForm, LoginLayout } from "../styles/member.style";

export default function Login() {
	const {
		formData,
		handleInputChange,
		LoginSubmit,
	} = useLogin();
	
	return (
		<LoginLayout>
			<LoginBox>
				<h2>로그인</h2>
				<LoginForm onSubmit={LoginSubmit}>
					<input 
						type="text"
						name="member_id"
						value={formData.member_id}
						onChange={handleInputChange}
					/>
					<input 
						type="password"
						name="member_pw"
						value={formData.member_pw}
						onChange={handleInputChange}
					/>
					<button type="submit">로그인</button>

					<Link to="/signup">회원가입하러 가기</Link>
				</LoginForm>
			</LoginBox>
		</LoginLayout>
	);
}