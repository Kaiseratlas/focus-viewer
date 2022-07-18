import { Release } from '../typings';

const RELEASES: Release[] = [
  // 0.9: 'Aurora Borealis'
  {
    name: 'Aurora Borealis',
    version: '0.9.3',
    date: new Date('2019-07-19'),
    isFinal: true,
  },
  {
    name: 'Aurora Borealis',
    version: '0.9.2',
    date: new Date('2019-06-13'),
  },
  {
    name: 'Aurora Borealis',
    version: '0.9.1',
    date: new Date('2019-05-23'),
  },
  {
    name: 'Aurora Borealis',
    version: '0.9.0',
    date: new Date('2019-05-16'),
  },
  // 0.8.5: 'Return of the Kaiser'
  {
    name: 'Return of the Kaiser',
    version: '0.8.6',
    date: new Date('2019-04-22'),
    isFinal: true,
  },
  {
    name: 'Return of the Kaiser',
    version: '0.8.5',
    date: new Date('2019-04-14'),
  },
  // 0.8.4: 'La Bella Antillana'
  {
    name: 'La Bella Antillana',
    version: '0.8.4a',
    date: new Date('2019-02-19'),
    isFinal: true,
  },
  {
    name: 'La Bella Antillana',
    version: '0.8.4',
    date: new Date('2019-02-18'),
  },
  // 0.8.3: 'Christmas Truce'
  {
    name: 'Christmas Truce',
    version: '0.8.3a',
    date: new Date('2018-12-22'),
    isFinal: true,
  },
  {
    name: 'Christmas Truce',
    version: '0.8.3',
    date: new Date('2018-12-20'),
  },
  // 0.8: 'Divided States'
  {
    name: 'Divided States',
    version: '0.8.2',
    date: new Date('2018-11-08'),
    isFinal: true,
  },
  {
    name: 'Divided States',
    version: '0.8.1',
    date: new Date('2018-10-25'),
  },
  {
    name: 'Divided States',
    version: '0.8.0',
    date: new Date('2018-10-19'),
  },
  // 0.7: 'El Condor Pasa'
  {
    name: 'El Condor Pasa',
    version: '0.7.2a',
    date: new Date('2018-09-24'),
    isFinal: true,
  },
  {
    name: 'El Condor Pasa',
    version: '0.7.2',
    date: new Date('2018-08-09'),
  },
  {
    name: 'El Condor Pasa',
    version: '0.7.1',
    date: new Date('2018-07-26'),
  },
  {
    name: 'El Condor Pasa',
    version: '0.7.0a',
    date: new Date('2018-07-16'),
  },
  {
    name: 'El Condor Pasa',
    version: '0.7.0',
    date: new Date('2018-07-15'),
  },
  // 0.6.2: 'Podcat's Gift'
  {
    name: "Podcat's Gift",
    version: '0.6.3a',
    date: new Date('2018-05-17'),
    isFinal: true,
  },
  {
    name: "Podcat's Gift",
    version: '0.6.3',
    date: new Date('2018-05-07'),
  },
  {
    name: "Podcat's Gift",
    version: '0.6.2',
    date: new Date('2018-04-24'),
  },
  // 0.6: 'Garibaldi's Nightmare'
  {
    name: "Garibaldi's Nightmare",
    version: '0.6.1c',
    date: new Date('2018-04-21'),
    isFinal: true,
  },
  {
    name: "Garibaldi's Nightmare",
    version: '0.6.1b',
    date: new Date('2018-04-14'),
  },
  {
    name: "Garibaldi's Nightmare",
    version: '0.6.1a',
    date: new Date('2018-04-14'),
  },
  {
    name: "Garibaldi's Nightmare",
    version: '0.6.1',
    date: new Date('2018-04-14'),
  },
  {
    name: "Garibaldi's Nightmare",
    version: '0.6.0',
    date: new Date('2018-04-11'),
  },
  // 0.5.4: 'Birthday Cake'
  {
    name: 'Birthday Cake',
    version: '0.5.4b',
    date: new Date('2017-12-16'),
    isFinal: true,
  },
  {
    name: 'Birthday Cake',
    version: '0.5.4a',
    date: new Date('2017-12-04'),
  },
  {
    name: 'Birthday Cake',
    version: '0.5.4',
    date: new Date('2017-12-04'),
  },
  // 0.5.3: 'Third Strike'
  {
    name: 'Third Strike',
    version: '0.5.3',
    date: new Date('2017-11-17'),
    isFinal: true,
  },
  // 0.5.2h: 'Spooky Scary Skeletons'
  {
    name: 'Spooky Scary Skeletons',
    version: '0.5.2h',
    date: new Date('2017-10-30'),
    isFinal: true,
  },
  // 0.5.2: 'Second Strike'
  {
    name: 'Second Strike',
    version: '0.5.2',
    date: new Date('2017-10-23'),
    isFinal: true,
  },
  // 0.5.1: 'Hot Safarix'
  {
    version: '0.5.1a',
    date: new Date('2017-10-09'),
    isFinal: true,
  },
  {
    name: 'Hot Safarix',
    version: '0.5.1',
    date: new Date('2017-10-09'),
  },
  // 0.5: 'Heia Safari'
  {
    name: 'Heia Safari',
    version: '0.5.0',
    date: new Date('2017-09-30'),
    isFinal: true,
  },
  // 0.4.8: 'To Russia With Love'
  {
    name: 'To Russia With Love',
    version: '0.4.8',
    date: new Date('2017-06-28'),
    isFinal: true,
  },
  // 0.4.7: 'Cherry's Maiden Voyage'
  {
    name: "Cherry's Maiden Voyage",
    version: '0.4.7',
    date: new Date('2017-06-27'),
    isFinal: true,
  },
  // 0.4.6: 'CTD No More?'
  {
    name: 'CTD No More?',
    version: '0.4.6a',
    date: new Date('2017-06-27'),
    isFinal: true,
  },
  {
    name: 'CTD No More?',
    version: '0.4.6',
    date: new Date('2017-06-26'),
  },
  // 0.4.5: 'Danube, Alps and Adria'
  {
    name: 'Danube, Alps and Adria',
    version: '0.4.5',
    date: new Date('2017-06-22'),
    isFinal: true,
  },
  // 0.4.3: 'PDXCON'
  {
    name: 'PDXCON',
    version: '0.4.4a',
    date: new Date('2017-05-16'),
    isFinal: true,
  },
  {
    name: 'PDXCON',
    version: '0.4.4',
    date: new Date('2017-05-16'),
  },
  {
    name: 'PDXCON',
    version: '0.4.3',
    date: new Date('2017-05-16'),
  },
  // 0.4.1: 'Stars and Fixes'
  {
    name: 'Stars and Fixes',
    version: '0.4.2',
    date: new Date('2017-05-07'), // TODO: fix date
    isFinal: true,
  },
  {
    name: 'Stars and Fixes',
    version: '0.4.1',
    date: new Date('2017-05-10'),
  },
  // 0.4: 'Pax Americana'
  {
    name: 'Pax Americana',
    version: '0.4.0',
    date: new Date('2017-05-07'),
    isFinal: true,
  },
  // 0.3.3: 'For real this is the last one'
  {
    name: 'For real this is the last one',
    version: '0.3.6a',
    date: new Date('2017-04-02'),
    isFinal: true,
  },
  {
    name: 'For real this is the last one',
    version: '0.3.6',
    date: new Date('2017-04-02'),
  },
  {
    name: 'For real this is the last one',
    version: '0.3.5',
    date: new Date('2017-04-01'),
  },
  {
    name: 'For real this is the last one',
    version: '0.3.4',
    date: new Date('2017-03-11'),
  },
  {
    name: 'For real this is the last one',
    version: '0.3.3a',
    date: new Date('2017-03-05'),
  },
  {
    name: 'For real this is the last one',
    version: '0.3.3',
    date: new Date('2017-03-04'),
  },
  // 0.3.1: 'It was optimistic to think we wouldn't need one'
  {
    name: "It was optimistic to think we wouldn't need one",
    version: '0.3.2a',
    date: new Date('2017-02-28'),
    isFinal: true,
  },
  {
    name: "It was optimistic to think we wouldn't need one",
    version: '0.3.2',
    date: new Date('2017-02-28'),
  },
  {
    name: "It was optimistic to think we wouldn't need one",
    version: '0.3.1',
    date: new Date('2017-02-28'),
  },
  // 0.3: 'Eternal Peace'
  {
    name: 'Eternal Peace',
    version: '0.3.0',
    date: new Date('2017-02-26'),
    isFinal: true,
  },
  {
    version: '0.2.1',
    date: new Date('2017-01-08'),
    isFinal: true,
  },
  {
    version: '0.2.0',
    date: new Date('2017-01-04'),
  },
  {
    version: '0.1.6c',
    date: new Date('2016-12-17'),
    isFinal: true,
  },
  {
    version: '0.1.6a',
    date: new Date('2016-12-15'),
  },
  {
    version: '0.1.6',
    date: new Date('2016-12-15'),
  },
  {
    version: '0.1.5a',
    date: new Date('2016-12-06'),
  },
  {
    version: '0.1.5',
    date: new Date('2016-12-05'),
  },
  {
    version: '0.1.4',
    date: new Date('2016-12-02'),
  },
  {
    version: '0.1.3',
    date: new Date('2016-12-12'),
  },
  {
    version: '0.1.2',
    date: new Date('2016-12-01'),
  },
  {
    version: '0.1.1',
    date: new Date('2016-12-01'),
  },
  {
    version: '0.1.0',
    date: new Date('2016-12-01'),
  },
];

export const ALPHA_RELEASES: Release[] = RELEASES.map((release) => ({
  ...release,
  tags: ['alpha'].concat(...(release.tags ? release.tags : [])),
}));
