import React, { useEffect } from 'react';
import { StatusBar, TextStyle } from 'react-native';
import RootNavigation from './src/navigations/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import theme from './src/shared/theme';
import BottomSheetProvider from './src/contexts/BottomSheet/provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import { palette } from './src/shared/theme/palette';
import SplashScreen from 'react-native-splash-screen';
import store from './src/store';
import { Provider } from 'react-redux';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <ThemeProvider theme={theme.darkTheme}>
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
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
