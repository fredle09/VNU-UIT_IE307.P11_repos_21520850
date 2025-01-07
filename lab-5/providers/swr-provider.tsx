import { AppState, type AppStateStatus } from 'react-native';
import { SWRConfig } from 'swr';

export const SWRConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        isVisible: () => true,
        initFocus: (callback: any) => {
          let appState = AppState.currentState;
          const onAppStateChange = (nextAppState: AppStateStatus) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') callback();
            appState = nextAppState;
          };

          const subscription = AppState.addEventListener('change', onAppStateChange);
          return () => subscription.remove();
        },
      }}>
      {children}
    </SWRConfig>
  );
};
