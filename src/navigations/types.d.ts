export type RootStacksParameterList = RootStackParameterList & {
  LoginScreen: undefined;
  CreateAccount: undefined;
  Intro: undefined;
};

export type RootNavigationProps<Screen extends keyof RootStacksParameterList> =
  CompositeScreenProps<NativeStackScreenProps<RootStacksParameterList, Screen>>;

export type AppRootStackParameterList = RootStackParameterList & {
  BottomTabs: undefined;
  // TrustFeatures: undefined;
};

// Tab routes
type MyTabRoutes = {
  DashboardScreen: undefined;
  HistoryScreen: undefined;
  ProfileScreen: undefined;
  HistoryScreen: undefined;
  SellfxScreen: undefined;
  ChangePassword: undefined;
};
export type AuthStacksParameterList = RootStackParameterList & {
  Login: undefined;
  CreateAccount: undefined;
};
export type ProfileStacksParameterList = RootStackParameterList & {
  ChangePassword: undefined;
};

export type AppNavigationProps<Screen extends keyof AppRootStackParameterList> =
  CompositeScreenProps<
    NativeStackScreenProps<AppRootStackParameterList, Screen>,
    BottomTabScreenProps<MyTabRoutes>
  >;
