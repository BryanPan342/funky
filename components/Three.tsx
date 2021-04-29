import React, {useEffect, useRef} from 'react';
import styles from '../styles/Three.module.scss';
import NightSkyScene from './scenes/NightSkyScene';

function Three(): JSX.Element {
  const scene = useRef(null);

  useEffect(() => {
    scene.current = new NightSkyScene();
  }, []);

  return (
    <div id={styles.nightSky}>
      <canvas id={styles.scene}/>
    </div>
  );
}

export default Three;