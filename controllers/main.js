const express = require('express')
const seed = require('../models/seed')
const Episode = require('../models/Episodes')

const main = express.Router()

// Optional seed route for DB
main.get('/seed', async (req, res) => {
  await Episode.deleteMany({})
  await Episode.insertMany(seed, (error, addedSeed) => {
    return error ? res.send(error) : res.send(addedSeed)
  })
})

// Get all the episodes in reverse chronological order
main.get('/all', (req, res) => {
  Episode.aggregate(
    [{ $project: { _id: 0, __v: 0 } }, { $sort: { date: -1 } }],
    (error, data) => {
      return error ? res.json(error) : res.json(data)
    }
  )
})

// Get one episode and send it to front for example of data and format
main.get('/example', async (req, res) => {
  try {
    const e = await Episode.aggregate([
      { $sort: { date: -1 } },
      { $limit: 1 },
      { $project: { _id: 0, __v: 0 } }
    ])
    res.json(e)
  } catch (error) {
    console.log(error)
  }
})

// Fix the 'null' values on older Fight Companion episodes
// main.get('/fixFC', async (req, res) => {
//   try {
//     const data = await Episode.find({
//       isFC: true,
//       episode_id: { $lt: 500 }
//     }).sort({ date: 1 })
//     for (let i = data.length - 1; i >= 0; i--) {
//       await Episode.updateOne(
//         { _id: data[i]._id },
//         { episode_id: i + 1 },
//         (err, changed) => {
//           console.log(changed)
//         }
//       )
//     }
//     const afterCheck = await Episode.find({ isFC: true }).sort({
//       episode_id: 1
//     })
//     res.send(afterCheck)
//   } catch (error) {
//     console.log(error)
//   }
// })

// All Fight Companion episodes
main.get('/fc', async (req, res) => {
  try {
    const data = await Episode.find({ isFC: true }).sort({ date: -1 })

    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

// Get all MMA Shows ordered by date
main.get('/mma', async (req, res) => {
  try {
    const data = await Episode.find({ isMMA: true }).sort({ date: -1 })
    console.log(data.length)
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

// main.get('/mma/select', async (req, res) => {
//   try {
//     const data = await Episode.find({
//       $text: { $search: '"MMA Show"' },
//       episode_id: { $lte: 19 }
//     }).sort({ episode_id: 1 })
//     // for (let i = 0; i < data.length; i++) {
//     //   await Episode.updateOne({_id: data[i]._id}, {isMMA: true})
//     // }
//     // const check = await Episode.find({$text: {$search: "\"MMA Show\""}, episode_id: {$lte: 19}}).sort({episode_id: 1})
//     res.json(data)
//   } catch (error) {
//     console.log(error)
//   }
// })

// Edit the non-fight episodes
// main.get('/no-fight-edits', async (req, res) => {
//   try {
//     const data = await Episode.find({
//       isMMA: false,
//       isFC: false,
//       episode_id: { $gte: 1 },
//       guests: { $size: 1 }
//     }).sort({ episode_id: 1 })
//     for (let i = 0; i < data.length; i++) {
//       const firstIndex = data[i].guests[0]
//       if (
//         firstIndex.includes(',') &&
//         (firstIndex.includes('from Buddhist Geeks') ||
//           firstIndex.includes('PhD') ||
//           firstIndex.includes('from Unbox Therapy') ||
//           firstIndex.includes('from Speedweed') ||
//           firstIndex.includes('from VSauce') ||
//           firstIndex.includes('from Float Lab'))
//       ) {
//         const splitGuests = data[i].guests[0].split(', ')
//         // splitGuests.pop()
//         // Episode.updateOne(
//         //   { _id: data[i]._id },
//         //   { guests: splitGuests },
//         //   (err, changed) => {
//         //     console.log(changed)
//         //   }
//         // )
//         console.log(splitGuests, data[i].episode_id)
//       }
//     }
//     res.json(data)
//   } catch (error) {
//     console.log(error)
//   }
// })

main.get('/no-fight', async (req, res) => {
  try {
    const data = await Episode.find({
      isMMA: false,
      isFC: false,
      episode_id: { $gte: 1 }
    }).sort({ episode_id: 1 })
    for (let i = 0; i < data.length; i++) {
      const firstIndex = data[i].guests[0]
      if (
        firstIndex.includes(',') &&
        (firstIndex.includes('from Buddhist Geeks') ||
          firstIndex.includes('PhD') ||
          firstIndex.includes('from Unbox Therapy') ||
          firstIndex.includes('from Speedweed') ||
          firstIndex.includes('from VSauce') ||
          firstIndex.includes('from Float Lab'))
      ) {
        const splitGuests = data[i].guests[0].split(', ')
        // splitGuests.pop()
        // Episode.updateOne(
        //   { _id: data[i]._id },
        //   { guests: splitGuests },
        //   (err, changed) => {
        //     console.log(changed)
        //   }
        // )
        console.log(splitGuests, data[i].episode_id)
      }
    }
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

// main.get('/redban', async (req, res) => {
//   const data = await Episode.find({
//     guests: 'Brian Redban',
//     isMMA: false,
//     isFC: false
//   }).sort({ episode_id: 1 })

//   const filter = [
//     300,
//     301,
//     302,
//     303,
//     304,
//     305,
//     306,
//     307,
//     308,
//     310,
//     311,
//     313,
//     314,
//     315,
//     317,
//     318,
//     319,
//     320,
//     321,
//     322,
//     323,
//     324,
//     325,
//     326,
//     327,
//     328,
//     329,
//     330,
//     331,
//     332,
//     333,
//     334,
//     335,
//     336,
//     337,
//     338,
//     339,
//     340,
//     341,
//     342,
//     343,
//     344,
//     346,
//     353,
//     389
//   ]

//   let i = 0
//   while (i < filter.length) {
//     if (data[i].episode_id !== filter[i]) {
//       data.splice(i, 1)
//     } else {
//       i++
//     }
//   }

//   res.json(data)
// })

// main.get('/redban-edit', async (req, res) => {
//   const data = await Episode.find({
//     episode_id: { $gte: 200, $lte: 299 },
//     isMMA: false,
//     isFC: false
//   }).sort({ episode_id: 1 })

//   let i = 0
//   let j = 0
//   const newData = []
//   while (i < data.length) {
//     while (j < filter.length) {
//       console.log(`episode: ${data[i].episode_id} | filter: ${filter[j]}`)
//       if (data[i].episode_id === filter[j]) {
//         console.log(`episode: ${data[i].episode_id} | filter: ${filter[j]}`)
//         data[i].guests.push('Brian Redban')
//         data[i].title = `${data[i].title}, Brian Redban`
//         Episode.updateOne(
//           { _id: data[i]._id },
//           { guests: data[i].guests, title: data[i].title },
//           (err, changed) => {
//             console.log(changed)
//           }
//         )
//         newData.push(data[i])
//       }
//       j++
//     }
//     if (data[i].guests.indexOf('Brian Redban') !== -1) console.log(data[i])
//     i++
//     j = 0
//   }

//   console.log(
//     `data.length is ${newData.length} and filter.length is ${filter.length}`
//   )
//   res.json(newData)
// })

// main.get('/make-redban', async (req, res) => {
//   await Episode.create({
//     guests: ['Joey Diaz', 'Brian Redban'],
//     title: '#128 - Joey Diaz, Brian Redban',
//     episode_id: 128,
//     isMMA: false,
//     isFC: false,
//     description: 'No description available.',
//     date: '2011-05-30T04:00:00.000Z'
//   })
//   const data = await Episode.find({ episode_id: 128 })

//   res.json(data)
// })

main.get('/get-recent', async (req, res) => {
  try {
    const data = await Episode.aggregate([
      { $sort: { date: -1 } },
      { $limit: 1 }
    ])

    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = main
