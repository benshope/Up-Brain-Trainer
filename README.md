UP Brain Trainer
===============

This app is a cross-platform mobile app written with Steroids.  My goal was to make a minimalist, friendly space for a user to perform n-back brain training.

N-back is a mental exercise/game that improves working memory (short term memory) and fluid intelligence.

Something particularly interesting about this app is it's horizontal and vertical fluid layout.  Both the text, and the block-level elements scale seamlessly to any size/shape of screen.  A totally fluid layout is an interesting idea because it is based more on the constant nature of human vision, and less on the ever-changing sizes of rectangles that are placed in front of human vision.

To Do
=====
 - Female Voice
 - Add Timed-Game Option (separate app?)
 - Internationalization
 - Persist High-Scores Locally
 - Tracking Progress
 - Leaderboards
 - Responsive Emotional Feedback
 - Respond to Bug Reviews on Android (when appgyver fixes their build service)
 Hey Ryan, apologies for the bug!  Could you give it another try and maybe edit your review?  Also, thanks for checking out my app.  - Ben

Test in a Browser
 - ionic serve

Test on a Mobile Device
 - steroids connect --watch

Publish to Web and Mobile
 - git commit -am 'Commit' && git push && steroids deploy && appcfg.py --oauth2 update .

