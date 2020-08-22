# JRE API

An API for accessing data on all 1600+ episodes of the most popular podcast in the world.

## Missing Data

- [x] June 28, 2014 FC, parts 1 and 2
- [x] July 11, 2015 FC
- [x] Mayweather vs. McGregor between June 3 and Sept. 2 of 2017
- [x] Joe Rogan Experience - UFC Recap w/ Brendan Schaub

## Broken Dates

- [x] FC4 on YouTube has July 7, 2014 as date; July 6, 2014 in db
- [x] FC9 on YouTube has Feb. 14, 2015 as date; Feb. 15, 2015 in db
- [x] FC41 => Nov. 11 2018 in db | Nov. 10 on YT
- [x] FC episode on April 11, 2015 split into two parts?
- [x] FC21 on May 30, 2016 in db, but May 29, 2016 on YT
- [x] FC22 on June 19, 2016 in db, but June 18 on YT
- [x] FC27 on Oct. 9, 2016 in db, but Oct. 8 on YT
- [x] FC28 on Oct. 22, 2016 in db, but Oct. 21 on YT
- [x] FC46 => Jan. 10 2020 in db | Jan. 9 on YT

## JRE Episodes need fixing

- [x] 12 and 10 - only Joe Rogan
- [x] 18 - Brian Redban's name
- [x] 35 - split guests
- [x] Hundreds of episodes missing Redban from title and guest list. Yikes!
  - DO NOT DELETE NUMBERS.TXT
- [x] Fix episode ids with 0 and null
- [x] Guests arrays for FC episodes incorrect
- [x] Incomplete descriptions for FC episodes
- [x] Broken guests arrays

## Data-Mine To Do

- [x] Set all FC episodes' titles to format `Fight Companion - ${date}`
- [x] Begin front-end for API info/tutorial
- [x] Design logic that auto-scrapes the most recent episodes and plug them into db
- [x] Get YouTube links
- [x] Plug YT links into each doc in db
  - [x] Plug FC links
  - [x] Plug MMA links
  - [x] Plug general links
  - [x] episode_id: null folks
- [x] Fix guests arrays and isMMA props for MMA Shows
- [ ] Automate fetching of YT links after scraping recent episodes
- [ ] Automate server to scrape at certain point of day

## API To Do

- [ ] Make system that generates and logs API Keys and their users
- [ ] Secure endpoints with limiters and caching
- [ ] Edit the urls to allow for params and queries
- [ ] Create DB for API_KEYS and their users
- [ ] Create middleware that checks for valid API_KEY

## Client To Do

- [ ] Set up routes => React Router?
- [ ] Styling!
- [ ] Write up README and Tutorial for interfacing with API
- [ ] Compose API key request form
- [ ] Compose Contact form
