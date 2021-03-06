let companyName = 'example';
if (process.env.NODE_ENV !== 'production') {
  companyName += ` - ${process.env.NODE_ENV}`;
}
export const branding = {
  companyName,
  softwareBrothers: false,
  theme: {
    colors: {
      primary20: '#4268F6',
      primary40: '#6483F8',
      primary60: '#879FFA',
      primary80: '#A9BAFA',
      primary100: '#CBD5FD',
      accent: '#0A7794',
      love: '#e6282b',
      grey20: '#23294E',
      grey40: '#454655',
      grey60: '#C0C0CA',
      grey80: '#C0C0CA',
      grey100: '#F6F7FB',
      white: '#0C0C0C',
      errorDark: '#DE405D',
      error: '#FF4567',
      errorLight: '#FFA5B5',
      successDark: '#32A887',
      success: '#70C9B0',
      successLight: '#DBF0F1',
      infoDark: '#4268F6',
      info: '#879FFA',
      infoLight: '#CBD5FD',
      filterBg: '#B7BABF',
      hoverBg: '#535B8E',
      border: '#454655',
      inputBorder: '#898A9A',
      separator: '#C0C0CA',
      highlight: '#18191B',
      filterInputBorder: 'rgba(255,255,255,0.15)',
      filterDisabled: 'rgba(83,91,142,0.05)',
      bg: '#18191B',
    },
    borders: {
      input: '1px solid #C0C0CA',
      filterInput: ' 1px rgba(255,255,255,0. solid15)',
      bg: '1px solid #F6F7FB',
      default: '1px solid #454655',
    },
    shadows: {
      login: '0 15px 24px 0 rgba(50,50,50,0.22)',
      cardHover: '0 4px 12px 0 rgba(50,50,50,0.5)',
      drawer: '-2px 0 8px 0 rgba(50,50,50,0.25)',
      card: '0 1px 6px 0 rgba(50,50,50,0.5)',
      inputFocus: '0 2px 4px 0 rgba(8,47,198,0.4)',
      buttonFocus: '0 4px 6px 0 rgba(10,119,148,0.3)',
    },
    sizes: {
      navbarHeight: '64px',
      sidebarWidth: '300px',
    },
  },
};
