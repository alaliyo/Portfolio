import { Outlet } from "react-router-dom";
import GlobalStyle from "./styles/global.style";
import Header from "./components/Header";
import styled from "styled-components";
import { useAuthStore } from "./store/memberStore";
import { useEffect } from "react";
import { memberInfo } from "./api/members.api";

function App() {
	const { token, setMe } = useAuthStore();

	useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await memberInfo({}); 
        setMe(res.data);
      } catch (error) {
        console.error("자동 로그인 실패", error);
      }
    };

    fetchUser();
    // eslint-disable-next-line
  }, [token]);
	
  return (
    <div>
			<GlobalStyle />
			<Header />
			<OutletLayout>
				<Outlet />
			</OutletLayout>
    </div>
  );
}

export default App;

const OutletLayout = styled.div`
	padding: 60px 0;
`;