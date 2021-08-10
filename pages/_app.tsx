import { AuthProvider } from "@context/AuthContext";
import 'semantic-ui-css/semantic.min.css'
import "@styles/globals.css";
import { FC } from "react";
import { AppProps } from "next/app";


const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
