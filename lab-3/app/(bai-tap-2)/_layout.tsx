import { Tabs } from 'expo-router';
import { AppState, type AppStateStatus } from 'react-native';
import { SWRConfig } from 'swr';

import { Home } from '~/lib/icons/Home';
import { Settings } from '~/lib/icons/Settings';

export default function BaiTap2LayoutScreen() {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        isVisible: () => {
          return true;
        },
        initFocus(callback) {
          let appState = AppState.currentState;

          const onAppStateChange = (nextAppState: AppStateStatus) => {
            /* If it's resuming from background or inactive mode to active one */
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
              callback();
            }
            appState = nextAppState;
          };

          // Subscribe to the app state change events
          const subscription = AppState.addEventListener('change', onAppStateChange);

          return () => {
            subscription.remove();
          };
        },
      }}>
      <Tabs>
        <Tabs.Screen
          name="notes"
          options={{
            title: 'Notes',
            headerShown: false,
            tabBarIcon: ({ color }) => <Home color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <Settings color={color} />,
          }}
        />
      </Tabs>
    </SWRConfig>
  );
}
