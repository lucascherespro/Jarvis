import {Composition} from 'remotion';
import {ReelRebobina} from './reel/ReelRebobina';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ReelRebobina"
      component={ReelRebobina}
      durationInFrames={960}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{logoFile: ''}}
    />
  );
};
