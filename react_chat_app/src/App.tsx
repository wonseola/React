import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import './App.css'
import { Rooms } from "./pages/chat/rooms";
import { Login } from "./pages/Login";
import { Menu } from "./pages/chat/menu";
import { Layout } from "./pages/chat/layout";
import { Chat } from "./pages/chat/chat";



const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "chat", element: <Chat /> },
      { path: "menu", element: <Menu /> },
      { path: "rooms", element: <Rooms /> },
    ]
  },
]);


const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body{
  background-color:#ffffff;
  color:black;
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
