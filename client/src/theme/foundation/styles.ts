export const styles = {
  global: () => ({
    'html, body, #__next, #root': {
      lineHeight: 'tall',
      backgroundColor: 'white',
      letterSpacing: '0.2px',
      display: 'flex',
      minHeight: '100vh',
      flex: 1,
      width: '100%',
      margin: '0px',
      fontWeight: 400,
      alignItems: 'stretch',
      flexDirection: 'column',
    },
    '*:focus': {
      boxShadow: 'none !important',
    },
    'ul': {
      margin: '0px',
      listStyleType: 'none',
    },
    'a': {
      textDecoration: 'none !important',
    },
    'a:link': {
      textDecoration: 'none !important',
    },
    'a:hover': {
      textDecoration: 'none !important',
    },
    'a:visited': {
      textDecoration: 'none !important',
    },
  }),
};

export default styles;
