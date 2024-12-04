import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export const hp = (percent: number) => {
  return (percent * deviceHeight) / 100;
};

export const wp = (percent: number) => {
  return (percent * deviceWidth) / 100;
};

export const stripHtmlTags = (html) => {
  return html.replace(/<[^>]*>?/gm, '');
};
