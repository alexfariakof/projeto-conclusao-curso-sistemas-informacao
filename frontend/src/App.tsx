import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes";
import { Login, MenuLateral } from "./shared/components";
import { AuthProvider, AppThemeProvider, DrawerProvider } from "./shared/contexts";


export const App = () => {
    return (
        <AuthProvider>
            <AppThemeProvider >
                <Login>
                    <DrawerProvider   >
                        <BrowserRouter>
                            <MenuLateral>
                                <AppRoutes />
                            </MenuLateral>
                        </BrowserRouter>
                    </DrawerProvider>
                </Login>
            </AppThemeProvider>
        </AuthProvider>
    );
}