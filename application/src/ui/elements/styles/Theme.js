/**
 * Universal Theme Styles
 */


const Theme = {
  colors: {
    primary: '#2089dc',
    secondary: '#8F0CE8',
    grey0: '#393e42',
    grey1: '#43484d',
    grey2: '#5e6977',
    grey3: '#86939e',
    grey4: '#bdc6cf',
    grey5: '#e1e8ee',
    greyOutline: '#bbb',
    searchBg: '#303337',
    success: '#52c41a',
    error: '#ff190c',
    warning: '#faad14',
    disabled: 'hsl(208, 8%, 90%)',
    divider: '#bcbbc1',
    platform: {
      ios: {
        primary: '#007aff',
        secondary: '#5856d6',
        success: '#4cd964',
        error: '#ff3b30',
        warning: '#ffcc00'
      },
      android: {
        primary: '#2196f3',
        secondary: '#9C27B0',
        success: '#4caf50',
        error: '#f44336',
        warning: '#ffeb3b'
      }
    }
  }
};

const styles = {

  header: {
    colors: {
      text: '#ffffff',
      background: Theme.colors.primary
    }
  },

  tabs: {
    colors: {
      activeTint: Theme.colors.grey0,
      inactiveTint: Theme.colors.grey3,
      background: Theme.colors.grey5
    }
  },

  Input: {
    containerStyle: {
      marginBottom: 25,
    }
  },

}


export default {...Theme, ...styles};
