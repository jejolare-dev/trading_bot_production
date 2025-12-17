import { classes } from '@/utils';

import waves from '@/assets/img/bg-items/waves.svg?url';
import PlanetOrange from '@/assets/img/bg-items/planet-orange.svg';
import PlanetPurple from '@/assets/img/bg-items/planet-purple.svg';
import PlanetBlue from '@/assets/img/bg-items/planet-blue.svg';
import Comet from '@/assets/img/bg-items/comet.svg';
import PlanetLightBlueWithBelt from '@/assets/img/bg-items/planet-light-blue-with-belt.svg';
import PlanetOrangePurple from '@/assets/img/bg-items/planet-orange-purple.svg';
import PlanetPurpleWithBelt from '@/assets/img/bg-items/planet-purple-with-belt.svg';
import Roundel from '@/assets/img/bg-items/roundel.svg';
import Star from '@/assets/img/bg-items/star.svg';
import Image from 'next/image';
import styles from './background.module.scss';

// Home page background
export function Background() {
    return (
        <div className={styles.background}>
            <div className={styles.background__shape}></div>
            <Image src={waves} alt="waves" className={styles.background__waves} />

            <PlanetOrange
                className={classes(
                    styles.background__planet_orange,
                    styles.background__cosmo_object,
                    styles.pos_animated,
                )}
            />
            <PlanetPurple
                className={classes(
                    styles.background__planet_purple,
                    styles.background__cosmo_object,
                    styles.pos_animated,
                )}
                style={{ animationDuration: '3.5s' }}
            />
            <PlanetBlue
                className={classes(
                    styles.background__planet_blue,
                    styles.background__cosmo_object,
                    styles.pos_animated,
                )}
            />
            <PlanetLightBlueWithBelt
                className={classes(
                    styles.background__planet_light_blue_with_belt,
                    styles.background__cosmo_object,
                    styles.pos_animated,
                )}
                style={{ animationDuration: '4s' }}
            />
            <PlanetOrangePurple
                className={classes(
                    styles.background__planet_orange_purple,
                    styles.background__cosmo_object,
                    styles.pos_animated,
                    styles.pos_animated_less,
                )}
            />
            <PlanetPurpleWithBelt
                className={classes(
                    styles.background__planet_purple_with_belt,
                    styles.background__cosmo_object,
                    styles.pos_animated,
                )}
            />

            <Roundel
                className={classes(styles.background__crumb1, styles.background__cosmo_object)}
            />
            <Roundel
                className={classes(styles.background__crumb2, styles.background__cosmo_object)}
            />
            <Star className={classes(styles.background__crumb3, styles.background__cosmo_object)} />
            <Star className={classes(styles.background__crumb4, styles.background__cosmo_object)} />
            <Roundel
                className={classes(styles.background__crumb5, styles.background__cosmo_object)}
            />
            <Roundel
                className={classes(styles.background__crumb6, styles.background__cosmo_object)}
            />
            <Star className={classes(styles.background__crumb7, styles.background__cosmo_object)} />
            <Roundel
                className={classes(styles.background__crumb8, styles.background__cosmo_object)}
            />
            <Roundel
                className={classes(styles.background__crumb9, styles.background__cosmo_object)}
            />
            <Star
                className={classes(styles.background__crumb10, styles.background__cosmo_object)}
            />
            <Roundel
                className={classes(styles.background__crumb11, styles.background__cosmo_object)}
            />
            <Star
                className={classes(styles.background__crumb12, styles.background__cosmo_object)}
            />
            <Roundel
                className={classes(styles.background__crumb13, styles.background__cosmo_object)}
            />
            <Roundel
                className={classes(styles.background__crumb14, styles.background__cosmo_object)}
            />
            <Roundel
                className={classes(styles.background__crumb15, styles.background__cosmo_object)}
            />
            <Roundel
                className={classes(styles.background__crumb16, styles.background__cosmo_object)}
            />
            <Roundel
                className={classes(styles.background__crumb17, styles.background__cosmo_object)}
            />
            <Roundel
                className={classes(styles.background__crumb18, styles.background__cosmo_object)}
            />
            <Roundel
                className={classes(styles.background__crumb19, styles.background__cosmo_object)}
            />
            <Star
                className={classes(styles.background__crumb20, styles.background__cosmo_object)}
            />
            <Star
                className={classes(styles.background__crumb21, styles.background__cosmo_object)}
            />

            <Comet
                className={classes(
                    styles.background__comet,
                    styles.background__cosmo_object,
                    styles.fly_animation,
                )}
            />
        </div>
    );
}
