import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout/Layout";

import { trpc } from "../utils/trpc";

import { Input, Theme, ThemeProvider } from "react-creme";
import "react-creme/dist/react-creme.css";

import "../styles/globals.css";

const AppTheme = {
  colors: {
    primary: "#0074B7",
    secondary: "#BFD7ED",
    tertiary: "#003B73",
    text: "#003B73",
    textSelection: "#003B73",
  },
  fontSizes: {
    lg: 18,
    md: 16,
    sm: 14,
  },
  iconSizes: {
    lg: 24,
    md: 20,
    sm: 16,
    xs: 12,
  },
  zIndexes: {
    dialog: 999999,
    drawer: 99999,
    globalNotification: 9999,
    menu: 999,
    notification: 9999,
  },
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider theme={AppTheme}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
