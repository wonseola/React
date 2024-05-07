import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import './App.css'
import { Login } from "./pages/Login";
import { Layout } from "./pages/layout";
import { Messages } from "./pages/message";
import { Welcome } from "./components/welcome";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/chat", element: <Layout />,
    children: [
      { path: "*", element: <Messages /> },
      { path: "", element: <Welcome /> }
    ]
  },
]);


const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body{

    background-color: rgba(250, 248, 237, 0.4);
  background-image:
    linear-gradient(90deg, rgba(255, 213, 165, 0.3) 50%, transparent 50%),
    linear-gradient(rgba(255, 252, 165, 0.3) 50%, transparent 50%);
  background-size: 40px 40px;
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

const Wrapper = styled.div`
  width:100%;
  height: 100vh;
  display:flex;
  margin:auto;
`;


function App() {


  return (
    <>
      <Wrapper>
        <GlobalStyles />
        <RouterProvider router={router} />
      </Wrapper>

    </>
  )
}

export default App
