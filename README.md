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
- [ ] FC episode on April 11, 2015 split into two parts?
- [ ] FC21 on May 30, 2016 in db, but May 29, 2016 on YT
- [ ] FC22 on June 19, 2016 in db, but June 18 on YT
- [ ] FC27 on Oct. 9, 2016 in db, but Oct. 8 on YT
- [ ] FC28 on Oct. 22, 2016 in db, but Oct. 21 on YT
- [ ] FC46 => Jan. 10 2020 in db | Jan. 9 on YT

## To Do

- [x] Set all FC episodes' titles to format `Fight Companion - ${date}`
- [ ] Begin front-end for API info/tutorial
- [ ] Make system that generates and logs API Keys and their users
- [ ] Design logic that auto-scrapes the most recent episodes and plug them into db
- [x] Get YouTube links
- [ ] Plug YT links into each doc in db