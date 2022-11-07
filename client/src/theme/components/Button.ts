import { ComponentStyleConfig } from '@chakra-ui/react';

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontSize: 'md',
    fontFamily: 'heading',
    fontWeight: '500',
    textDecoration: 'none',
  },
  variants: {
    primary: {
      color: 'surface',
      bgColor: 'primary',
      _hover: {
        bgColor: 'lightgrey',
      },
      _active: {
        bgColor: 'primaryHover',
      },
      borderRadius: '50px',
    },
    primarySurface: {
      color: 'onSurface',
      bgColor: 'primarySurface',
      _hover: {
        bgColor: 'primarySurface',
      },
      _active: {
        bgColor: 'primarySurface',
      },
    },
    secondary: {
      color: 'surface',
      bgColor: 'secondary',
      _hover: {
        bgColor: 'secondaryHover',
      },
      _active: {
        bgColor: 'secondaryHover',
      },
    },
    secondaryOutline: {
      color: 'onSurface',
      bgColor: 'surface',
      borderColor: 'secondary',
      borderWidth: '1px',
      _hover: {
        bgColor: 'surfaceVariant',
      },
      _active: {
        bgColor: 'surfaceVariant',
      },
    },
    surface: {
      color: 'onSurface',
      bgColor: 'surface',
      _hover: {
        bgColor: 'surfaceTertiary',
      },
      _active: {
        bgColor: 'surfaceTertiary',
      },
    },
    surfaceVariant: {
      color: 'onSurface',
      bgColor: 'surfaceVariant',
      _hover: {
        bgColor: 'surfaceTertiary',
      },
      _active: {
        bgColor: 'surfaceVariant',
      },
    },
    ghost: {
      color: 'onSurface',
      bgColor: 'none',
      borderRadius: '50px',
      _hover: {
        bgColor: 'grey',
      },
      _active: {
        bgColor: 'surfaceVariant',
      },
    },
    delete: {
      color: 'surface',
      bgColor: 'delete',
      _hover: {
        bgColor: 'delete',
      },
      _active: {
        bgColor: 'delete',
      },
    },
  },
};

export default Button;
