var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];

var startTimestamp = Date.now(); 

var slideTextPosition = 0;

var startFromSlidePosition = 0;

var slideText = [{slide:1, text:"test", sleep:1},
                 {slide:1, text:"Hi!  I'm Adam.", sleep:1},
                 {slide:1, text:"I spent so much time talking with All Things Open attendees that I lost my voice.  So I did what any developer would do.  I wrote some code to give my talk for me.", sleep:1},
                 {slide:1, text:"What could go wrong?", sleep:2},
                 {slide:2, text:"I hope that you've been having a great time at All Things Open.  I'm sure you've been learning about new ideas, new tools, and new technology.  I'm sure you'd love to go home and try some of these new things.  But that requires time for learning.  It requires time for doing.", sleep:1},
                 {slide:2, text:"This talk is about finding more time to focus and get shit done", sleep:2},
                 {slide:3, text:"I want to make an impact.", sleep:1},
                 {slide:3, text:"My time is valuable to me.  Perhaps my most important asset.", sleep:1},
                 {slide:3, text:"By a show of hands, does this resonate for anyone?", sleep:3},
                 {slide:4, text:"I'm a Developer Advocate for Waffle.io and a maker.  These are some ways to contact me by email, Twitter, or GitHub to keep the conversation going.", sleep:1},
                 {slide:4, text:"As a Developer Advocate, I talk with thousands of developers every year.  And I have found that time for focus is in short supply.  This talk is about options to find more time to focus and do meaningful work.", sleep:1},
                 {slide:5, text:"Most of us work on teams.", sleep:1},
                 {slide:6, text:"And something I've learned from working on many many teams is that most of the people on those teams are makers.  So who are makers?.", sleep:2},
                 {slide:7, text:"For purposes of this talk, makers are people who require significant time and context to do their work.  Significant time and significant context to do their work.  And don't worry, we'll go a bit deeper into both time and context in a few minutes.", sleep:2},
                 {slide:8, text:"Let's consider some examples.  I've worked on many teams that maintain software products.  On these teams, makers are developers.  Makers are testers.  Makers are designers.  Perhaps in your situation, there are other roles that are makers.", sleep:2},
                 {slide:9, text:"This talk is for makers.  To help them find more time to focus and do meaningful work.", sleep:2},
                 {slide:10, text:"And this talk is also for people who work with Makers.  People that have have an impact on how much time makers have to focus and do meaningful work.  If you work with a maker, this talk can help you understand how to be supportive of a maker's needs.", sleep:2},
                 {slide:11, text:"A few disclaimers.", sleep:1},
                 {slide:11, text:"This is not a talk about doing the right thing, although that's important.", sleep:2},
                 {slide:12, text:"This is not a talk about doing the thing well, although that's also important.", sleep:2},
                 {slide:13, text:"This is a talk about having time to do the thing.  With minimal waste.  Because at the end of the day, you need time to do the work.  You need to do the work.", sleep:2},
                 {slide:14, text:"Makers need lots of time without interruptions for making.", sleep:1},
                 {slide:14, text:"Why, you might ask?", sleep:2},
                 {slide:15, text:"To understand the why, let's look at the example of a software developer since I'm very familiar with them.", sleep:2},
                 {slide:16, text:"Why does a developer need significant time?", sleep:2},
                 {slide:17, text:"Developers need time because it takes time to do the work.  Even with the best plans and great tools, development is still a time-intensive activity.", sleep:2},
                 {slide:18, text:"And in today's market, you're likely competing with other companies for the same idea and the same users.  Which means that the ability to get to those users first matters.  Because once a user has selected your competition, it's really hard to win them over to your product.", sleep:2},
                 {slide:19, text:"And it's not just about the time it takes to complete the work, it matters how quickly you can complete that work.  Does 4 hours of work take 4 hours?  Or do 4 hours of work take 2 weeks?", sleep:1},
                 {slide:19, text:"This is the difference between effort and cycle time.  Effort is the amount of time it takes to do the work.  But cycle time is the elapsed time it takes to complete that effort including all of the delays, handoffs, and queuing that happens in between active effort.", sleep:2},
                 {slide:20, text:"What is context?  And why does a developer need significant context?", sleep:2},
                 {slide:21, text:"This is your brain.  And for makers, they need to load a lot of context into their brain to do their work.", sleep:2},
                 {slide:22, text:"Content is information in your consciousness that you need to complete the work at hand.  Let's explore some examples.", sleep:2},
                 {slide:23, text:"Prospective memory are reminders to perform future actions.  For a developer, an example of this is remembering to come back to a section of code and add error handling.", sleep:1},
                 {slide:24, text:"That context that needs to be loaded into the developer's brain.", sleep:2},
                 {slide:25, text:"Attentive memory are reminders about the current task.  For a developer, an example of this is remembering to change the name of a variable in location B and C after changing it in location A.", sleep:1},
                 {slide:26, text:"That context that needs to be loaded into the developer's brain.", sleep:2},
                 {slide:27, text:"Conceptual memory is recollection of concepts.  For a developer, an example of this is remembering how functions work in JavaScript.", sleep:1},
                 {slide:28, text:"That context that needs to be loaded into the developer's brain.", sleep:2},
                  {slide:29, text:"Associative memory is recollection of links between information.  For a developer, an example of this is remembering how function Foo relates to function Bar.", sleep:1},
                 {slide:30, text:"That context that needs to be loaded into the developer's brain.", sleep:2},
                  {slide:31, text:"Episodic memory is recollection of past events.  For a developer, an example of this is remembering a lesson learned from a preview code review and apply it to the current situation.", sleep:1},
                 {slide:32, text:"That context that needs to be loaded into the developer's brain.", sleep:2},
                 {slide:33, text:"As you can see, gaining context is expensive.  it takes a lot of time.", sleep:2},
                 {slide:34, text:"But context switching is also expensive.", sleep:2},
                 {slide:34, text:"As humans, when we switch contexts our brains start to pruge our previous context.", sleep:1},
                 {slide:35, text:"And purge.  And purge.  And purge.", sleep:1},
                 {slide:38, text:"And so the cycle of loading and purging context happens over and over and over.  And it's expensive.", sleep:2},
                 {slide:39, text:"So what is the state of focus in 2018?", sleep:2},
                 {slide:40, text:"I propose that our time is being stolen!", sleep:2},
                 {slide:41, text:"Stolen by other people.", sleep:2},
                 {slide:42, text:"Stolen by our tools.  The tools that are supposed to help us.", sleep:2},
                 {slide:43, text:"And being stolen by ourselves.", sleep:2},
                 {slide:44, text:"To better understand this, let's explore where does our time go.", sleep:2},
                 {slide:45, text:"Luckily there is are some great research studies about time in modern workplaces.  About 15% of our time goes towards being a human.  Eating lunch.  Taking breaks.  Pooping.  We're human after all.  And that's ok.  But it does consume some of our time.", sleep:2},
                 {slide:46, text:"Another 10% of our times goes towards metawork.  Metawork are activities we perform to stay organized like planning our day, making a to-do list.  This is another cost of being a human.", sleep:2},
                 {slide:47, text:"Another 15% of our times goes towards meetings.  This is a conservative estimate.  In some companies and for people in leadership roles, this can be 50% to 75% of their time.", sleep:2},
                 {slide:48, text:"And so we really only have about 50% of our time remaining for making.", sleep:2},
                 {slide:49, text:"Within that 50%, 60% of us experience an opportunity for interruption every 12 minutes.  And that's not just switching tools.  That's switching contexts.  And when we do get interrupted, it takes 25 minutes on average for us to return to the context we were working on before being interrupted.", sleep:2},
                 {slide:50, text:"Development in 2018 is awesome.  There are many tools and services that we use to accomplish more then we could without them.  Yet each of these tools takes time to learn, time to use, and also sometimes try to interrupt us.", sleep:2},
                 {slide:51, text:"These are two examples from my world.  On the left is a screenshot of notifications from GitHub in my email.  Not necessarily the best way to consume a lot of information and also from a lot of different contexts.  On the right is a screenshot of notifications from Slack, inviting me to interrupt myself and switch contexts.", sleep:2},
                 {slide:52, text:"Although they often have the best of intentions, people often interrupt us.  Hey, do you have a second?  And we interrupt ourselves.  We're human.  We eat.  We might want to go for a bike ride.  We poop.  Some interruptions need to happen.", sleep:2},
                 {slide:53, text:"This is what it looks like when we get interrupted.  We're working in our original context, we get interrupted, we switch to another context.  And then oddly enough we often switch contexts yet again.  Think about it, perhaps you are walking back from the bathroom and you see a coworker so you stop by to chat.  You're already interrupted, so why not?  Eventually you get back to your original context.  But it takes time to reload the context that you purged.  And then you get back to your work.", sleep:2},
                 {slide:54, text:"This is the Focus Interrupt Cycle.  And it happens over and over and over.  And each time it happens, there's a cost.", sleep:2},
                 {slide:55, text:"When this happens, a developer spends an average of 10 to 15 minutes regaining context before returning to editing code.  In studies, developers are navigating to several tools and locations to reload context before resuming coding.", sleep:2},
                 {slide:56, text:"This is really the story of Developer, Interrupted.  What often happens to the 50% of our time that we have for making is that it becomes fragmented with interruptions.", sleep:2},
                 {slide:57, text:"And so for many developers, they only get 1 to 2 hours of focused time without interruptions per day.  Hopefully this is better where you work.", sleep:2},
                 {slide:58, text:"So what can we do about it?", sleep:2},
                 {slide:59, text:"One option is to avoid being interrupted.", sleep:2},
                 {slide:60, text:"Another option is to get good at being interrupted and recovering from it.  After all, as we've seen, some interruptions need to happen.", sleep:2},
                 {slide:61, text:"First, we'll explore options for getting good at being interrupted.", sleep:2},
                 {slide:62, text:"Getting good at being interrupted is really about finding ways to preserve your context so that your time to recover it is faster after an interruption.", sleep:2},
                 {slide:63, text:"There's a really interesting concept called recovery notes.  The idea is that before you switching contexts during an interruption, you should write down notes to help you remember where you left off.  To help you recover your context.  And while you can use a pen and a pad of paper to do this, let's explore some other options as well.", sleep:2},
                 {slide:64, text:"One of my favorite ways to do this is using a project board.  Since I work on Waffle.io, I of course use Waffle.io.", sleep:2},
                 {slide:65, text:"It's really helpful to be able to check my Waffle.io board after an interruption to read any notes I left on the issue.  I also frequently use checklists to keep track of to-dos I encounter as I'm working.", sleep:2},
                 {slide:66, text:"Another really useful feature of Waffle.io is the ability to quickly see the status of PR merges, code reviews, CI jobs, and deployments at a glance.", sleep:2},
                 {slide:67, text:"Another pattern frequently used by developers is to leave to-do comments in their code as reminders to come back and do something later.", sleep:2},
                 {slide:68, text:"My favorite way to do this is to write automated tests before writing code.  This way your TO DO fails unless you fix it!", sleep:2},
                 {slide:69, text:"Even simple things like using multiple desktops to organize applications into different contexts can reduce the time it takes to regain context.", sleep:2},
                 {slide:70, text:"Now that we've explored some options for getting good at being interrupted, let's explore some options for avoiding interruptions.", sleep:2},
                 {slide:71, text:"Part 1.  Avoiding interruptions from others.", sleep:2},
                 {slide:72, text:"Also known as.  Are you part of the problem or part of the solution?", sleep:2},
                 {slide:73, text:"For many of us, this is what our office looks like.  Open offices are great for collaboration, but not necessarily great for focusing and do the work of making.", sleep:2},
                 {slide:74, text:"In fact, there's been quite a bit of backlash about open offices in the media recently.  I'd propose what we really need are varied spaces, not just open spaces.", sleep:2},
                 {slide:75, text:"Spaces for small groups.", sleep:3},
                 {slide:76, text:"Spaces that block out distractions.", sleep:3},
                 {slide:77, text:"Spaces for focus.  In this photo, you can see some small spaces on the right which can be blocked off with curtains.", sleep:3},
                 {slide:78, text:"Spaces for sharing.", sleep:3},
                 {slide:79, text:"And spaces for getting to know each other.", sleep:3},
                 {slide:80, text:"One of the byproducts from open offices has been more people working from home.  And for some people, this choice is about being able to control interruptions and have more time for doing meaningful work.", sleep:2},
                 {slide:81, text:"But for many people in open offices, the solution is headphones.  Wearing headphones in an open office environment can provide a good way to block out audio distractions, although visual distractions may still interrupt you.", sleep:2},
                 {slide:82, text:"It can be helpful to establish a headphone rule as a team so that everyone has a common expectation that you don't want to be interrupted when you're wearing your headphones unless it's critical.  You can also use a different indicator - like something you hang on your monitor - to indicate that you'd prefer to not be interrupted.", sleep:2},
                 {slide:83, text:"I also recommend ambient music for your headphones.  Spotify has a great selection of playlists in their focus genre.", sleep:2},
                 {slide:84, text:"But what do you do if you're remote and your teammates cannot see that you're wearing headphones.  Slack has a nice feature that lets you set a status, including an emoji - such as headphones - and a message to indicate that you'd prefer to not be disturbed.  You can even set a timeframe to auto remove the status, which let's you schedule a block of time for focus.", sleep:2},
                 {slide:85, text:"On my team, we sometimes use the headphone emoji to quickly let a teammate know that we're focusing on something and would prefer to not be interrupted.  However you approach the headphone rule, it's helpful to talk about interruptions as a team to create a shared understanding of how you can help your teammates have more time for focus and avoid interruptions.", sleep:2},
                 {slide:86, text:"And really what we're talking about is synchronous versus asynchronous communication.  Does communication always need to happen in real time or could you wait until it's a good time for the other person to respond?  Not all communication needs to happen right now.", sleep:2},
                 {slide:87, text:"I encourage you to ask yourself this question before you at mention someone in Slack.  In the first example, Ana can find the first message when she's ready to catch up on her missed Slack messages.  A time that's good for her.  But in the second example, Ana will likely receive a notification immediately and get interrupted.  It's your choice.", sleep:2},
                 {slide:88, text:"Out tools often let us express our interruption preferences.  This is an example from my Slack settings for notifications.  I choose to receive direction messages, mentions, and keywords.  It also helps that my teammates try to not at mention each other unless it's critical.", sleep:2},
                 {slide:89, text:"This applies to lots of tools.  This is an example from my phone.  Personally, I don't display the number of unread emails on my mail app.  I'm too weak to resist the urge to check the latest new email.  And while I still check my email way too frequently, removing the number of unread emails has reduced my checking by about 50 percent.  It's your choice.", sleep:2},
                 {slide:90, text:"Another way to avoid interrupting other people is trying to find the answer yourself.  In this example, I was looking for a link to our retention metrics.  I was going to ask someone on my team where to find them, but I decided to search Slack's history.  I found the answer I needed without interrupting any of my teammates.", sleep:2},
                 {slide:91, text:"This example also shows the potential value of sharing notes in Slack so that your teammates can find them in the future and avoid interrupting you.  It will also likely help you too when you need to refer back to your notes.", sleep:2},
                 {slide:92, text:"All of these examples are really about asking yourself the question - can it wait?  Can it wait until your teammate sees your message?  Can it wait until your daily team standup?  Can it wait until your next weekly planning meeting?", sleep:2},
                 {slide:93, text:"You need to make time for interruptions.  You need to plan time for interruptions.  Some examples of time for interruptions are daily standup meetings, weekly planning meetings, weekly retrospectives.  Even a time when you check your email - I recommend maybe once or twice a day at set times.  The point is that if you have a predictable cadence for when you are interrupted, you can plan around those interruption.  Having a cadence is also important because it allows people to wait until those times to interrupt each other.  For example, if you have a team standup meeting every day, then you can save a non time sensitive interruption until the standup meeting.  The key is that the cadence must be predictable so that your teammates trust that it will happen on a recurring basis and trust that they can wait until the next time for interruption.", sleep:2},
                 {slide:94, text:"Because we are sometimes forgetful, my team has a place to add reminders for these planned interruptions.  In this example, my team uses Instant Agenda to keep track of meeting topics for our weekly planning meeting.  At the beginning of each meeting, we vote on topics and discuss the most important topics.  Other topics wait until the next weekly planning meeting or are deleted over time if they are no longer relevant.", sleep:2},
                 {slide:95, text:"Another example.  In this example, my team uses a Slack channel to keep track of retrospective topics to discuss at our weekly retrospective.  It's also a great place to appreciate teammates.", sleep:2},
                 {slide:96, text:"Now I know what you're probably thinking.  This all sounds great, but everything in my world is always on fire!", sleep:2},
                 {slide:97, text:"Don't worry there's options for that too.  Just like we have firefighters, you can have a person of the week.  The person of the week is responsible for trying to put our fires, manage interruptions, and generally protect the team.  It's a rotating position - for example weekly - so that everyone gets a chance to be the person of the week.", sleep:2},
                 {slide:98, text:"Another great option to avoid interruptions is to limit your work in progress.  This is an example of my team's Waffle.io board which supports work in progress limits.  For each step in my team's process, we limit the number of items that we work on at the same time.  This reduces the likelihood of context switching, helping us to get to done faster.", sleep:2},
                 {slide:99, text:"Part 2.  Avoiding interruptions from yourself.", sleep:2},
                 {slide:100, text:"Over 50% of interruptions are from ourselves.  Things we choose to be interrupted by.  Making commitments with yourself can help you avoid these interruptions because you've committed to focusing on a particular context.  Let's look at some options to do this.", sleep:2},
                 {slide:101, text:"The Pomodoro technique is a great way to make commitments with yourself.  You basically work in increments of focused time followed by break time.  Each one of these work and break periods is called a Pomodoro.  Most people start with a 25 minutes of focused time followed by a 5 minute break.  During the 25 minutes of focused time, you focus on a single context until the work is complete.  Some work requires multiple Pomodoros.  After a few Pomodoros, most people take a longer break - perhaps 30 minutes.  There are many great apps that help with the Pomodoro technique, but it's as easy as setting a timer.", sleep:2},
                 {slide:102, text:"My number one technique for staying focused in writing down my goals for tomorrow the night before.  I try to pick 1 or 2 or 3 things.  Things that are important and valuable things, hopefully aligned to my desired outcomes.", sleep:2},
                 {slide:103, text:"It's really important to only pick a few goals for tomorrow.  Normally I get 1 or 2 of those things done, so I wouldn't suggest picking more then 3.  You can always pick more things tomorrow.", sleep:2},
                 {slide:104, text:"And here's the trick.  After you pick those 1 or 2 or 3 things to focus on tomorrow, try as hard a possible to ignore everything else.  Seriously.  Your job for tomorrow is to focus on number 1.  And then number 2.  And then maybe number 3.", sleep:2},
                 {slide:105, text:"Really, ignore the rest!", sleep:2},
                 {slide:106, text:"To have time to focus on these 1 or 2 or 3 daily goals, it can be helpful to block time on your calendar.  In this example, you can see my planned time for interruptions - daily standups, weekly planning - and also see blocks for focused work.  I use these blocks to work on my top 1 or 2 or 3 daily goals, ensuring that my teammates don't schedule over these times.", sleep:2},
                 {slide:107, text:"As with most things, it's important to inspect and adapt.  While I've offered some options for avoiding interruptions, your situation is different from mine and will change over time.  Having a recurring cadence of inspection and adaption will help you understand the pain points and conduct experiments to try to improve them.", sleep:2},
                 {slide:108, text:"This brings us to a really important point.  Avoiding interruptions is a team sport.", sleep:2},
                 {slide:109, text:"To avoid interruptions as a member of a team, teams need to apply these techniques as a team.  Teams need to align to the top things so that everyone is working in similar contexts.  Teams need to make time for interruptions so that everyone is being interrupted at the same time.  Teams need to inspect and adapt together, because everyone works as part of a system that either promotes interruptions or focus for meaningful work.", sleep:2},
                 {slide:110, text:"Apply these patterns as a team amplifies the ability of the team to make an impact and focus on meaningful work!", sleep:2},
                  {slide:111, text:"Which brings us to a surprising twist.  Your team can help you focus.  Focus isn't just about working by yourself.  It's about working on a single context, quickly producing high quality work.  Let's explore how your teammates can help you do this.", sleep:2},
                 {slide:112, text:"Most common in software development, pairing is a technique where two people work together on the same context.  Each person has unique skills, experience, and perspectives that can often help the work to happen more quickly and with more quality.  And often when there's an opportunity for an interruption, the other person can help you stay focused on the current context.", sleep:2},
                 {slide:113, text:"Getting feedback from your teammates early and often can also help you stay focused and have a clear vision of your goal.  Some interruptions occur because we get stuck when working by ourselves.  Our teammates can help us get unstuck and keep moving forward in our current context.", sleep:2},
                 {slide:114, text:"It's time to take back our time!", sleep:2},
                 {slide:115, text:"Waffle.io helps developers to stay focused and quickly regain context after interruptions.  Sign up for free at Waffle.io!", sleep:2}]

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function sleep(sleepSeconds) {
  console.log("waiting " + sleepSeconds + " seconds");
  await timeout(sleepSeconds * 1000);
  console.log("waited " + sleepSeconds + " seconds");
}

function populateVoiceList() {
  voices = synth.getVoices();
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speakNext() {
  
  console.log("startFromSlidePosition" + startFromSlidePosition);
  console.log("slideTextPosition" + slideTextPosition);
  
  
    while (slideText[slideTextPosition].slide < startFromSlidePosition) {
      slideTextPosition++
    }
    
    
  
    speak(slideTextPosition);
    
    slideTextPosition++;

}

function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
  
    var utterThis = new SpeechSynthesisUtterance(slideText[slideTextPosition].text);
  
    document.getElementById('slideNumber').innerHTML = "Currently speaking slide #" + slideText[slideTextPosition].slide + ".";
  
    document.getElementById('playingSlideNumber').value = slideText[slideTextPosition].slide;
  
    utterThis.onend = async function (event) {
        console.log('SpeechSynthesisUtterance.onend');
      
        console.log("running for array index: " + slideTextPosition)
        console.log("minutes since start: " + (((Date.now() - startTimestamp)/1000)/60));
        
        await sleep(slideText[slideTextPosition].sleep);       
      
        if (slideTextPosition < (slideText.length + 1)) {
          speakNext()
        }
    }

    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
        console.log(event);
    }
    
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);

}

play.onclick = function(event) {
  event.preventDefault();
  
  startFromSlidePosition = document.getElementById('playingSlideNumber').value;
  
  speakNext();

}

stop.onclick = function(event) {
  synth.cancel()
}

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}

voiceSelect.onchange = function(){
  speak();
}