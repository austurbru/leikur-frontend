import { AuthProvider } from "@context/AuthContext";
import "@styles/globals.css";
import { FC } from "react";
import { AppProps } from "next/app";
import 'semantic-ui-css/semantic.min.css'

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
