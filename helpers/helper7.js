const titles = [
  'Joe Rogan Experience #1500 - Barbara Freese',
  'Joe Rogan Experience #1501 - James Lindsay',
  'Joe Rogan Experience #1502 - Russell Peters',
  'Joe Rogan Experience #1503 - Josh Barnett',
  'Joe Rogan Experience #1504 - Alan Levinovitz',
  'Joe Rogan Experience #1505 - Hannibal Buress',
  'Joe Rogan Experience #1506 - James Nestor',
  'Joe Rogan Experience #1507 - Bob Saget',
  'Joe Rogan Experience #1508 - Peter Schiff',
  'Joe Rogan Experience #1509 - Abigail Shrier',
  'Joe Rogan Experience #1510 - George Knapp & Jeremy Corbell',
  'Joe Rogan Experience #1511 - Oliver Stone',
  'Joe Rogan Experience #1512 - Ben Shapiro',
  'Joe Rogan Experience #1513 - Andrew Huberman',
  'Joe Rogan Experience #1514 - Joe De Sena',
  'Joe Rogan Experience #1515 - Dr. Bradley Garrett',
  'Joe Rogan Experience #1516 - Post Malone',
  'Joe Rogan Experience #1517 - Nancy Panza',
  'Joe Rogan Experience #1518 - David Choe',
  'Joe Rogan Experience #1519 - Mike Baker',
  'Joe Rogan Experience #1520 - Dr. Debra Soh',
  'Joe Rogan Experience #1521 - Josh Dubin & Jason Flom',
  'Joe Rogan Experience #1522 - Rob Lowe',
  'Joe Rogan Experience #1523 - Joey Diaz & Brian Redban',
  'Joe Rogan Experience #1524 - Ron Funches',
  'Joe Rogan Experience #1525 - Tim Dillon',
  'Joe Rogan Experience #1526 - Ali Macofsky',
  'Joe Rogan Experience #1527 - David Blaine'
]

const youTube = [
  'https://youtube.com/watch?v=cP0D2_jhqPU&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=2&t=347s',
  'https://youtube.com/watch?v=FtNW3I1FZ5o&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=3&t=4024s',
  'https://youtube.com/watch?v=MNvjRzcfcx0&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=4&t=0s',
  'https://youtube.com/watch?v=VAoo7oXtyy4&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=5&t=0s',
  'https://youtube.com/watch?v=NpOxxzOhZyg&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=6&t=0s',
  'https://youtube.com/watch?v=amyaoTtZaRE&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=7&t=18s',
  'https://youtube.com/watch?v=U5o9b2RVC2E&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=8&t=0s',
  'https://youtube.com/watch?v=BY3CY36WAec&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=9&t=0s',
  'https://youtube.com/watch?v=OK2zgeJLVwU&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=10&t=664s',
  'https://youtube.com/watch?v=CtftWcgXjdg&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=11&t=4791s',
  'https://youtube.com/watch?v=Hc6pbG4wICA&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=12&t=21s',
  'https://youtube.com/watch?v=QOrOYUxzX3o&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=13&t=0s',
  'https://youtube.com/watch?v=hl0iNRXcUbE&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=14&t=4185s',
  'https://youtube.com/watch?v=gLJowTOkZVo&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=15&t=0s',
  'https://youtube.com/watch?v=wCSDF0RNuXY&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=16&t=0s',
  'https://youtube.com/watch?v=_kDKAOncclU&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=17&t=0s',
  'https://youtube.com/watch?v=G42RJ4mKj1k&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=18&t=0s',
  'https://youtube.com/watch?v=6adKh-LYk3s&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=19&t=0s',
  'https://youtube.com/watch?v=j7T6__UbhBI&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=20&t=10775s',
  'https://youtube.com/watch?v=yR-GXnXw2wU&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=21&t=1438s',
  'https://youtube.com/watch?v=j9NeQTkJjIs&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=22&t=6398s',
  'https://youtube.com/watch?v=Trh7YWo2Bmo&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=23&t=0s',
  'https://youtube.com/watch?v=pw8dkF-jotk&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=24&t=1243s',
  'https://youtube.com/watch?v=INSy7D2LBfU&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=25&t=6340s',
  'https://youtube.com/watch?v=PjLW5irADoM&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=26&t=0s',
  'https://youtube.com/watch?v=h9XzuUXj6Gc&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=27&t=4995s',
  'https://youtube.com/watch?v=7eRR7j1OCOs&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=28&t=1131s',
  'https://youtube.com/watch?v=NY3Zg37nIHo&list=PLk1Sqn_f33Kt_vFRd3OyzqQ78Go4c1fyn&index=29&t=5357s'
]

const output = []
for (let i = 0; i < titles.length; i++) {
  let nextNum

  const thisNum = Number(titles[i].match(/\d+/)[0])

  if (i !== titles.length - 1) {
    nextNum = Number(titles[i + 1].match(/\d+/)[0])
  } else {
    nextNum = Number(titles[titles.length - 1].match(/\d+/)[0])
  }

  // console.log(nextNum)
  // console.log(Number(titles[i + 1].match(/\d+/)[0]))
  const diff = nextNum - thisNum

  output.push({ episode_id: thisNum, links: youTube[i] })
  if (diff > 1) {
    // missingNums.push(testNums[i])

    for (let j = 1; j < diff; j++) {
      output.push({ episode_id: thisNum + j, links: '' })
    }
  }
}

console.dir(output, { depth: null, colors: true, maxArrayLength: null })
// console.log(titles.length, youTube.length)
