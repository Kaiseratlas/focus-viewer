import { Release } from '../typings';

const RELEASES: Release[] = [
  // 0.21 'A World Aflame'
  // {
  //   name: 'A World Aflame',
  //   version: '0.21.2',
  //   date: new Date('2022-06-26'),
  //   isFinal: true,
  // },
  {
    name: 'Not Yet Lost',
    version: '0.23',
    date: new Date('2022-11-11'),
    isFinal: true,
  },
  {
    name: 'Shattered Crescent',
    version: '0.22',
    date: new Date('2022-08-27'),
  },
  {
    name: 'A World Aflame',
    version: '0.21.1',
    date: new Date('2022-06-18'),
  },
  {
    name: 'A World Aflame',
    version: '0.21.0',
    date: new Date('2022-06-17'),
  },
  // 0.20: 'Railway of Liberty'
  {
    name: 'Railway of Liberty',
    version: '0.20.1',
    date: new Date('2022-02-19'),
    isFinal: true,
  },
  {
    name: 'Railway of Liberty',
    version: '0.20.0',
    date: new Date('2022-01-21'),
  },
  // 0.19: 'March on the Drina'
  {
    name: 'March on the Drina',
    version: '0.19.2',
    date: new Date('2021-10-18'),
    isFinal: true,
  },
  {
    name: 'March on the Drina',
    version: '0.19.1',
    date: new Date('2021-09-12'),
  },
  {
    name: 'March on the Drina',
    version: '0.19.0',
    date: new Date('2021-08-30'),
  },
  // 0.18: 'Forest Brothers'
  {
    name: 'Forest Brothers',
    version: '0.18.1',
    date: new Date('2021-07-24'),
    isFinal: true,
  },
  {
    name: 'Forest Brothers',
    version: '0.18.0',
    date: new Date('2021-07-14'),
  },
  // 0.17: 'Springtime for Kaiser'
  {
    name: 'Springtime for Kaiser',
    version: '0.17.1',
    date: new Date('2021-04-25'),
    isFinal: true,
  },
  {
    name: 'Springtime for Kaiser',
    version: '0.17.0',
    date: new Date('2021-04-17'),
  },
  // 0.16: 'Hindsight is 2020'
  {
    name: 'Hindsight is 2020',
    version: '0.16.1',
    date: new Date('2021-01-31'),
    isFinal: true,
  },
  {
    name: 'Hindsight is 2020',
    version: '0.16.0',
    date: new Date('2021-01-17'),
  },
  // 0.15: 'Leaving for Syria'
  {
    name: 'Leaving for Syria',
    version: '0.15.2',
    date: new Date('2020-11-30'),
    isFinal: true,
  },
  {
    name: 'Leaving for Syria',
    version: '0.15.1',
    date: new Date('2020-11-16'),
  },
  {
    name: 'Leaving for Syria',
    version: '0.15.0',
    date: new Date('2020-11-09'),
  },
  // 0.14: 'The Duke and the Hertzog'
  // {
  //   name: 'The Duke and the Hertzog',
  //   version: '0.14.2a',
  //   date: new Date('2020-10-19'),
  // },
  {
    name: 'The Duke and the Hertzog',
    version: '0.14.2',
    date: new Date('2020-09-11'),
    isFinal: true,
  },
  {
    name: 'The Duke and the Hertzog',
    version: '0.14.1',
    date: new Date('2020-08-28'),
  },
  {
    name: 'The Duke and the Hertzog',
    version: '0.14.0',
    date: new Date('2020-08-21'),
  },
  // 0.13: 'A King and his Captain'
  {
    name: 'A King and his Captain',
    version: '0.13.2',
    date: new Date('2020-07-31'),
    isFinal: true,
  },
  {
    name: 'A King and his Captain',
    version: '0.13.1',
    date: new Date('2020-07-29'),
  },
  {
    name: 'A King and his Captain',
    version: '0.13.0',
    date: new Date('2020-07-19'),
  },
  // 0.12: 'Stay at Home'
  {
    name: 'Stay at Home',
    version: '0.12.2',
    date: new Date('2020-06-05'),
    isFinal: true,
  },
  {
    name: 'Stay at Home',
    version: '0.12.1',
    date: new Date('2020-05-24'),
  },
  {
    name: 'Stay at Home',
    version: '0.12.0',
    date: new Date('2020-05-11'),
  },
  // 0.11: 'The Long Road Home'
  {
    name: 'The Long Road Home',
    version: '0.11.2',
    date: new Date('2020-03-16'),
    isFinal: true,
  },
  {
    name: 'The Long Road Home',
    version: '0.11.1',
    date: new Date('2020-03-05'),
  },
  {
    name: 'The Long Road Home',
    version: '0.11',
    date: new Date('2020-02-18'),
  },
  // 0.10: 'Blood on the Yangtze'
  {
    name: 'Blood on the Yangtze',
    version: '0.10.1',
    date: new Date('2020-01-07'),
    isFinal: true,
  },
  {
    name: 'Blood on the Yangtze',
    version: '0.10.0a',
    date: new Date('2019-12-28'),
  },
  {
    name: 'Blood on the Yangtze',
    version: '0.10',
    date: new Date('2019-12-27'),
  },
];

export const BETA_RELEASES: Release[] = RELEASES.map((release) => ({
  ...release,
  tags: ['beta'].concat(...(release.tags ? release.tags : [])),
}));
