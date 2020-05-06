import { Stats } from './stats';
import { Sprite } from './Sprite';

export interface Champion {
  id: string,
  key: number,
  name: string,
  title: string,
  tags: Array<string>,
  stats: Stats,
  icon: string,
  sprite: Sprite,
  description: string
}
