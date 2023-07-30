import Coordinate2DList from './Coordinate2DList';
import Coordinate2D from './Coordinate2D';

interface KickerData {
  image: {
    url: string,
    width: number,
    height: number
  },
  body: {
    outline: Coordinate2DList,
    kicker: {
        outline: Coordinate2DList,
        pivot: {
            x: Coordinate2D["x"],
            y: Coordinate2D["y"],
            rotate: number,
            width: number,
            height: number
        }
    }
  },
  drop: {
    kick: {
        start: number,
        end: number
    },
    path: Coordinate2DList
  }
};

export default KickerData;