import { BuildingType } from '../Building3D';

export const getBuildingColors = (
  type: BuildingType
): {
  main: string;
  secondary: string;
  roof: string;
  windows: string;
} => {
  const palette = {
    house: {
      main: '#F5E6CA',
      secondary: '#E8D1A4',
      roof: '#A55C55',
      windows: '#88C0D0',
    },

    skyscraper: {
      main: '#E0E0E0',
      secondary: '#C0C0C0',
      roof: '#A0A0A0',
      windows: '#5E81AC',
    },

    office: {
      main: '#4DB6AC',
      secondary: '#26A69A',
      roof: '#00695C',
      windows: '#B2DFDB',
    },
    shop: {
      main: '#FFE0B2',
      secondary: '#FFB74D',
      roof: '#FF9800',
      windows: '#ECEFF4',
    },

    cottage: {
      main: '#A1887F',
      secondary: '#8D6E63',
      roof: '#6D4C41',
      windows: '#BBDEFB',
    },
    factory: {
      main: '#A1887F',
      secondary: '#8D6E63',
      roof: '#3E2723',
      windows: '#D7CCC8',
    },
    hospital: {
      main: '#FFFFFF',
      secondary: '#F5F5F5',
      roof: '#B3E5FC',
      windows: '#1976D2',
    },

    simple_house: {
      main: '#FFCCBC',
      secondary: '#FFAB91',
      roof: '#E64A19',
      windows: '#BBDEFB',
    },
    stadium: {
      main: '#7CB342',
      secondary: '#689F38',
      roof: '#2E7D32',
      windows: '#DCEDC8',
    },
    modern_skyscraper: {
      main: '#E0E0E0',
      secondary: '#C0C0C0',
      roof: '#A0A0A0',
      windows: '#5E81AC',
    },

    park: {
      main: '#66BB6A',
      secondary: '#43A047',
      roof: '#388E3C',
      windows: '#A5D6A7',
    },
    road: {
      main: '#BDBDBD',
      secondary: '#9E9E9E',
      roof: '#757575',
      windows: '#EEEEEE',
    },
  };

  return palette[type];
};
