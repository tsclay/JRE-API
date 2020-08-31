# JRE API

## About

An API for getting data on every episode of the Joe Rogan Experience

Data includes:
  - Guests
  - Date
  - Title
  - YouTube URLs (where available)
  - Podcast URLs
  - Episode description (where available)
  - Episode ID corresponding to numbering used for Podcast
  - Boolean filter properties for MMA Shows, Fight Companions, and JRQE's

Here's an example. Notice the ```isMMA``` property.

```json
[
  {
    "episode_id": 89,
    "title": "#089 - JRE MMA Show #89 with Rafael Lovato Jr.",
    "guests": [
      "Rafael Lovato Jr."
    ],
    "description": "Joe sits down with Bellator Middleweight World Champion Rafael Lovato Jr.",
    "date": "2020-01-29T05:00:00.000Z",
    "isFC": false,
    "isMMA": true,
    "isJRQE": false,
    "video_urls": [
      "https://youtube.com/watch?v=nZ7j2KFd0D4&list=PLk1Sqn_f33KuQyLE4RjEOdJ_-0epbcBb4&index=10&t=0s"
    ],
    "podcast_url": "https://traffic.libsyn.com/joeroganexp/mmashow089.mp3"
  }
]
```

Data is returned as an array of objects.

## Relevant Links

Visit the [helper site](https://jre-api.vercel.app/) to learn how to interact with the API.

See the helper site source code [here](https://github.com/tsclay/jre-ui).