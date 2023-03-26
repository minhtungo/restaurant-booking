import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import "react-calendar/dist/Calendar.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
