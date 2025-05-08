import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { LoginBox, LoginForm, LoginLayout } from "../styles/member.style";
import CommonInput from "../components/common/CommonInput";
import CommonBtn from "../components/common/CommonBtn";

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
					<CommonInput
						type="text"
						name="member_id"
						value={formData.member_id}
						onChange={handleInputChange}
					/>
					<CommonInput
						type="password"
						name="member_pw"
						value={formData.member_pw}
						onChange={handleInputChange}
					/>
					<CommonBtn type="submit">로그인</CommonBtn>

					<Link to="/signup">회원가입하러 가기</Link>
				</LoginForm>
			</LoginBox>
		</LoginLayout>
	);
}