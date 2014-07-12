Up Brain Trainer
===============

This app is a cross-platform mobile app written with Steroids.  My goal is to make a minimalist, friendly space for a user to perform n-back brain training.

N-back is a mental exercise/game that improves working memory (short term memory) and fluid intelligence.  This is important because, with about 25 minutes of rigorous training a day, healthy adults can increase their mental capacities.  N-back exercises are not just some game like Lumosity.  These exercises have the potential to make a significant positive impact on people's lives.

Something particularly interesting about this app is it's horizontal and vertical fluid layout.  Both the text, and the block-level elements scale seamlessly to any size/shape of screen (so cool).  A totally fluid layout is an interesting idea because it is based more on the constant nature of human vision, and less on the ever-changing sizes of rectangles that are placed in front of human vision.

To Do
=====
 - Female Voice
 - Add Timed-Game Option (separate app?)
 - Internationalization
 - Persist Last Settings Locally
 - Persist High-Score Locally
 - Tracking Progress
 - Leaderboards
 - Responsive Emotional Feedback


Test in Browser
 - ionic serve

Test on Mobile Device
 - steroids connect --watch

Publish to Web and Mobile
 - git commit -am 'Commit' && git push && steroids deploy && appcfg.py --oauth2 update .
