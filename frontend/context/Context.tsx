import { AuthProvider } from "./AuthContext";
import { ExplainerProvider } from "./ExplainerContext";
import { LayoutProvider } from "./LayoutContext";

export const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <LayoutProvider>
        <ExplainerProvider>{children}</ExplainerProvider>
      </LayoutProvider>
    </AuthProvider>
  );
};
