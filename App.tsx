import React, { useEffect } from 'react';
import { StatusBar, TextStyle } from 'react-native';
import RootNavigation from './src/navigations/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import theme from './src/shared/theme';
import BottomSheetProvider from './src/contexts/BottomSheet/provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import QueryClients from './src/config/QueryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { palette } from './src/shared/theme/palette';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme.darkTheme}>
        <QueryClientProvider client={QueryClients}>
          <BottomSheetProvider>
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
          </BottomSheetProvider>
          <StatusBar
            translucent
            backgroundColor="transparent"
            animated
            barStyle="dark-content"
          />
          <FlashMessage
            duration={5000}
            position="top"
            statusBarHeight={40}
            titleStyle={
              {
                ...theme.lightTheme.textVariants.regular16,
                color: palette.white,
                lineHeight: 24,
              } as TextStyle
            }
          />
        </QueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
