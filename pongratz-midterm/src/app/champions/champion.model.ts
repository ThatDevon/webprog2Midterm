import { Stats } from './stats.model';
import { Sprite } from './sprite.model';

export interface Champion {
  _id: string
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
