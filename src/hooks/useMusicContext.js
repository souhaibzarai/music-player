import { createContext, useContext } from "react";

export const MusicContext = createContext();

export const useMusic = () => {
  const contextValue = useContext(MusicContext);
  if (!contextValue) {
    throw new Error("MusicProvider not found - do not call useMusic hook outside of the provider scope!");
  }
  return contextValue;
}