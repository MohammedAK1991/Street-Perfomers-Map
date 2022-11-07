import { extendTheme } from '@chakra-ui/react';
import colors from './foundation/colors';
import styles from './foundation/styles';
import components from './components';
const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = {
  config,
  fonts: {
    logo: 'Euclid, system-ui,sans-serif',
    heading: 'Euclid, system-ui, sans-serif',
    body: 'Euclid, system-ui, sans-serif',
    mono: 'monospace',
    input: 'Manrope',
  },
  fontSizes: {
    'xs': '0.75rem',
    'sm': '0.875rem',
    'md': '1rem',
    'lg': '1.125rem',
    'xl': '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  breakpoints: {
    sm: '40em',
    md: '52em',
    lg: '74em',
    xl: '82em',
  },
  colors,
  semanticTokens: {
    colors: {
      primary: {
        default: 'primary.light',
        _dark: 'primary.dark',
      },
      primaryHover: {
        default: 'primaryHover.light',
        _dark: 'primaryHover.dark',
      },
      secondary: {
        default: 'secondary.light',
        _dark: 'secondary.dark',
      },
      secondaryHover: {
        default: 'secondaryHover.light',
        _dark: 'secondaryHover.dark',
      },
      primarySurface: {
        default: 'primarySurface.light',
        _dark: 'primarySurface.dark',
      },
      secondarySurface: {
        default: 'secondarySurface.light',
        _dark: 'secondarySurface.dark',
      },
      surface: {
        default: 'surface.light',
        _dark: 'surface.dark',
      },
      surfaceVariant: {
        default: 'surfaceVariant.light',
        _dark: 'surfaceVariant.dark',
      },
      surfaceTertiary: {
        default: 'surfaceTertiary.light',
        _dark: 'surfaceTertiary.dark',
      },
      onSurface: {
        default: 'onSurface.light',
        _dark: 'onSurface.dark',
      },
      onSurfaceVariant: {
        default: 'onSurfaceVariant.light',
        _dark: 'onSurfaceVariant.dark',
      },
      error: {
        default: 'error.light',
        _dark: 'error.dark',
      },
      errorSurface: {
        default: 'errorSurface.light',
        _dark: 'errorSurface.dark',
      },
      blueAccent: {
        default: 'blueAccent.light',
        _dark: 'blueAccent.dark',
      },
      blueAccentSurface: {
        default: 'blueAccentSurface.light',
        _dark: 'blueAccentSurface.dark',
      },
      followButton: {
        default: 'followButton.light',
        _dark: 'followButton.dark',
      },
      followButtonSurface: {
        default: 'followSurface.light',
        _dark: 'followSurface.dark',
      },
      unfollowButton: {
        default: 'unfollow.light',
        _dark: 'unfollow.dark',
      },
      unfollowButtonSurface: {
        default: 'unfollowSurface.light',
        _dark: 'unfollowSurface.dark',
      },
      progressBarPending: {
        default: 'progressBarPending.light',
        _dark: 'progressBarPending.dark',
      },
      delete: {
        default: 'delete.light',
        _dark: 'delete.dark',
      },
      facebook: {
        default: 'facebook.light',
        _dark: 'facebook.dark',
      },
      google: {
        default: 'google.light',
        _dark: 'google.dark',
      },
      apple: {
        default: 'apple.light',
        _dark: 'apple.dark',
      },
    },
  },
  styles,
  components,
};

export default extendTheme(theme);
