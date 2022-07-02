import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResturantDashboard from "./pages/ResturantDashboard";
import { DataProvider } from "./Context";
import ClientSide from "./pages/ClientSide";
import { CartProvider } from "react-use-cart";
import OrderComing from "./pages/OrderComing";
import { SnackbarProvider } from "notistack";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ErrorPage from "./pages/ErrorPage";
import PageMasterer from "./pages/PageMasterer";

function App() {
  return (
    <CartProvider>
      <DataProvider>
        <SnackbarProvider autoHideDuration={1000}>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* private routes */}
              <Route
                path="/main-menu"
                element={
                  <PageMasterer
                    errorPage={<UnauthorizedPage />}
                    defaultPage={<ResturantDashboard />}
                  />
                }
              />

              <Route path="/menu/:id" element={<ClientSide />} />
              <Route path="/order-coming" element={<OrderComing />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </SnackbarProvider>
      </DataProvider>
    </CartProvider>
  );
}

export default App;
