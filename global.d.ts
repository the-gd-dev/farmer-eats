declare module '*.style.ts' {
  import {StyleSheet} from 'react-native';
  const content: {[key: string]: StyleSheet.NamedStyles<any>};
  export default content;
}
