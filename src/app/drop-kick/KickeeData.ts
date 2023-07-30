import { HowlOptions} from 'howler';
import Coordinate2DList from './Coordinate2DList';

interface KickeeData { 
  image: {
      url: string, 
      width: number, 
      height: number
  }, 
  sound: {
      file: HowlOptions
  },
  outline: Coordinate2DList 
};

export default KickeeData;
