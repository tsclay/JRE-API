const titles = []

const youTube = []

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
