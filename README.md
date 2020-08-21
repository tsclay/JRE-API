# JRE API

An API for accessing data on all 1600+ episodes of the most popular podcast in the world.

## Missing Data

- [x] June 28, 2014 FC, parts 1 and 2
- [x] July 11, 2015 FC
- [x] Mayweather vs. McGregor between June 3 and Sept. 2 of 2017
- [x] Joe Rogan Experience - UFC Recap w/ Brendan Schaub

## Broken Dates

- [ ] FC4 on YouTube has July 7, 2014 as date; July 6, 2014 in db
- [ ] FC9 on YouTube has Feb. 14, 2015 as date; Feb. 15, 2015 in db
- [ ] FC41 => Nov. 11 2018 in db | Nov. 10 on YT
- [x] FC episode on April 11, 2015 split into two parts?
- [ ] FC21 on May 30, 2016 in db, but May 29, 2016 on YT
- [ ] FC22 on June 19, 2016 in db, but June 18 on YT
- [ ] FC27 on Oct. 9, 2016 in db, but Oct. 8 on YT
- [ ] FC28 on Oct. 22, 2016 in db, but Oct. 21 on YT
- [ ] FC46 => Jan. 10 2020 in db | Jan. 9 on YT

## JRE Episodes need fixing

- [x] 12 and 10 - only Joe Rogan
- [x] 18 - Brian Redban's name
- [x] 35 - split guests
- [x] Hundreds of episodes missing Redban from title and guest list. Yikes!
  - DO NOT DELETE NUMBERS.TXT
- [x] Fix episode ids with 0 and null
- [x] Guests arrays for FC episodes incorrect
- [x] Incomplete descriptions for FC episodes

## To Do

- [x] Set all FC episodes' titles to format `Fight Companion - ${date}`
- [x] Begin front-end for API info/tutorial
- [ ] Make system that generates and logs API Keys and their users
- [x] Design logic that auto-scrapes the most recent episodes and plug them into db
- [x] Get YouTube links
- [ ] Plug YT links into each doc in db
- [x] Fix guests arrays and isMMA props for MMA Shows

1485 guests names

1405 guests
1393 guests
1389 guests
1393 guests

1356 guests

1336 guests

1305 guests
1255 guests
1246 guests

1101 guests
916 guests
902, 896, 895, 894, 893, 890
827
797
772
682
643
586
568
489
340

313, 182

317
316
254
201, 171