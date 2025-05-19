import "dotenv/config";
import { Pinecone } from "@pinecone-database/pinecone";
import { pineconeApiKey } from "../utils/environment/index.js";

const movies: {
  id: string;
  title: string;
  text: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}[] = [
  {
    id: "f736423d-57d8-4e95-8e3c-5d40ea3279c3",
    title: "Tech News",
    text: "Open AI 4o-mini is a super-hit",
    userId: "U6EgNGErGcLOUjouCcYgiP9OzS4rr6rd",
    createdAt: "2025-05-18 16:40:44.955",
    updatedAt: "2025-05-18 16:40:44.955",
  },
  {
    id: "d446cdf0-ee44-46e3-b83f-07955c59dc9f",
    title: "🚀 Lovable.dev: AI-Powered Full-Stack Development Made Simple",
    text: "Lovable.dev is an AI-driven platform that enables users to create full-stack web applications by simply describing their ideas in natural language. Whether you're a seasoned developer or someone with no coding experience, Lovable.dev translates your concepts into functional applications swiftly and efficiently.\r\n\r\nKey Features:\r\n\r\nNatural Language Processing: Describe your app idea in plain English, and Lovable.dev's AI interprets and generates the corresponding code.\r\n\r\nFull-Stack Generation: From frontend interfaces to backend logic, the platform covers all aspects of app development.\r\n\r\nSupabase Integration: Leverage Supabase for real-time databases, authentication, and storage solutions.\r\n\r\nCollaboration Tools: Work with team members in real-time, making the development process more interactive and efficient.\r\n\r\nExportable Code: Once your app is ready, export the code to GitHub or download it for further customization.\r\n\r\nOriginating from the open-source project GPT Engineer, Lovable.dev has evolved into a comprehensive platform that democratizes software development. By lowering the barriers to entry, it empowers entrepreneurs, designers, and developers to bring their ideas to life without the traditional complexities of coding.",
    userId: "hvs9yOC0TNSAshRnXb17tRWl7hVD8Jut",
    createdAt: "2025-05-18 07:57:41.766",
    updatedAt: "2025-05-18 07:57:41.766",
  },
  {
    id: "b4ce67ad-2524-47eb-a7f9-2a02ef180a08",
    title: "🧑‍💻 “Cursor: Your Code Editor Just Got a Brain Upgrade”",
    text: "Cursor isn't your average VS Code mod — it's a full-blown AI-native IDE. If GitHub Copilot is a helpful parrot, Cursor is a code-savvy colleague who also drinks coffee and reads your mind. Built on the bones of VS Code, it adds AI-first features like chat-driven refactors, inline completion with awareness of your codebase, and context-preserving instructions.\n\nThe killer feature? Chat context awareness. You don't have to keep reminding Cursor which file you're working in — it knows, and it autoscopes to your active file, project directory, and even version control diffs.\n\nNeed to rename a function across multiple files? Just ask. Want a test suite generated for a new component? It'll do it, and explain the logic. You can talk to it like a senior dev who happens to never sleep and never judges your syntax.\n\nIf you're serious about productivity and already living in VS Code, Cursor is worth the switch. It turns your editor from a tool into a teammate.",
    userId: "U6EgNGErGcLOUjouCcYgiP9OzS4rr6rd",
    createdAt: "2025-05-11 18:14:02.815",
    updatedAt: "2025-05-11 18:14:02.815",
  },
  {
    id: "2aef2067-bed8-492e-998f-5b6340c41e3b",
    title: "🧠 MCP: The Secret Sauce Behind Smarter AI Context Handling",
    text: "If you've ever whispered “why doesn't the model remember that?” into the void, Model Context Protocol (MCP) is here to answer your pain. MCP isn't just a protocol — it's the backend whisperer that brings memory, context continuity, and structured reasoning into AI systems.\n\nIn traditional stateless models, each prompt is like talking to someone with amnesia. MCP flips the script. It gives structure to the chaos by allowing developers to organize, persist, and dynamically inject context into AI interactions. Think versioned memory modules, role-based context switching, scoped memory — all baked into a single, coherent protocol.\n\nThe result? Fewer prompts that feel like you're gaslighting the model into remembering what just happened. More consistency. More personalization. And, yes, fewer facepalms.\n\nMCP is becoming crucial in building agents, copilots, and assistant-like systems that feel less robotic and more relational. If you're working on AI workflows that require long-term memory or multi-turn interaction — get MCP into your stack yesterday.",
    userId: "U6EgNGErGcLOUjouCcYgiP9OzS4rr6rd",
    createdAt: "2025-05-11 18:05:59.581",
    updatedAt: "2025-05-11 18:05:59.581",
  },
  {
    id: "2f90038d-8c7b-49c7-abc5-c406ed0471e2",
    title: "🎖️ Dear John: The One With Maximum Miscommunication",
    text: "Dear John is what happens when a love story is constantly delayed by war, trauma, and terrible timing. John (Channing Tatum), a stoic soldier with a heart full of backstory, falls for Savannah (Amanda Seyfried), an idealistic college student with the handwriting of an angel. They spend two weeks together and fall in love—classic Sparks velocity.\n\nThen he's deployed. Letters fly. Feelings deepen. But—plot twist—she marries someone else. You can hear every viewer scream “WHY?!” across time zones.\n\nBut the real drama isn't the love triangle—it's the weight of duty versus desire. John serves. Savannah waits. Life happens. And somewhere in between, the notebook gets metaphorically burned.\n\nThis movie doesn't tie things in a neat bow. It leaves you wondering: can love survive too much life? And can we ever go back to people who moved on without us?\n\nIt's a painful, poetic reminder that timing isn't just everything—it's everything.",
    userId: "hvs9yOC0TNSAshRnXb17tRWl7hVD8Jut",
    createdAt: "2025-05-11 15:44:08.683",
    updatedAt: "2025-05-11 15:44:08.683",
  },
  {
    id: "0f55e280-52f6-4779-9ee4-25f113428e35",
    title: "🧙 The Lord of the Rings: One Plot to Rule Them All",
    text: "Middle Earth isn't just a fantasy land—it's a metaphor for burnout. Frodo's got one task: destroy a ring. But between Nazgûls, giant spiders, and extended hiking montages, it's the most exhausting to-do list in film history.\n\nWhat sets The Lord of the Rings apart isn't just the battles or the CGI. It's the friendship. Samwise Gamgee, the true MVP, carries Frodo (literally and emotionally) when Frodo's ready to chuck the ring and apply for permanent Mordor citizenship. This trilogy is about loyalty, sacrifice, and how power corrupts—even the smallest hands.\n\nAnd Aragorn? He's proof that reluctant leadership is still leadership. He didn't want the crown, but he earned it. It's like watching a startup dev become CEO just because everyone else rage-quit.\n\nTL;DR: It's long. It's legendary. And it taught us that even second breakfasts and hairy feet can be heroic.",
    userId: "hvs9yOC0TNSAshRnXb17tRWl7hVD8Jut",
    createdAt: "2025-05-11 15:43:14.166",
    updatedAt: "2025-05-11 15:43:14.166",
  },
  {
    id: "d4c97568-96ef-40d4-b2ae-8cd55ebdd333",
    title: "🎬 Interstellar - Time Travel, Tesseracts, and Tissues",
    text: "Interstellar isn't just a sci-fi movie. It's a quantum gut-punch. On the surface, it's about saving humanity. Deep down, it's about a dad who really wants to get back in time for his daughter's science fair.\n\nChristopher Nolan took every physics lecture you ever skipped, packaged it into a cosmic rollercoaster, and told Hans Zimmer to score it like a cathedral in space. The result? A film where time is relative, gravity's emotional, and bookshelves are portals to fifth-dimensional love.\n\nMatthew McConaughey's Cooper is every desi dad with good intentions but terrible communication. He leaves Earth with a promise—\"I'll be back\"—and comes home decades later, aged the same, daughter now a grandma, and still somehow not saying “I told you so.”\n\nMurph, the daughter, becomes the film's true north. Her belief in science, her grief, and her rage give the film its weight. She cracks the gravity equation, solves interstellar travel, and still has emotional bandwidth to be mad at her dad. Icon.\n\nIn the end, Interstellar doesn't solve everything. It just reminds us that time bends, love transcends, and maybe—just maybe—don't underestimate the power of a crying father floating near Saturn.",
    userId: "6iNB7mzmewRuY9WszrS87c6EaYypfoZD",
    createdAt: "2025-05-11 09:13:31.611",
    updatedAt: "2025-05-11 09:13:31.611",
  },
  {
    id: "fdad99a2-c9c1-43f3-8ba0-a1de58185ac0",
    title:
      "📝 The Notebook: When Love is Wet, Worn Out, and Wonderfully Unreasonable",
    text: "Let's talk about *The Notebook*. Yes, the Nicholas Sparks emotional rollercoaster that your older cousin cried over, your college roommate mocked, and deep down—*you also kinda loved*. Don't deny it. If you've ever stared out a rain-soaked window waiting for a text back, you've basically lived this movie in 240p.\n\nBut *The Notebook* isn't just a love story. It's a masterclass in memory, time, sacrifice, and how many tears Ryan Gosling can pull from your face with one beard and one boat.\n\nLet's rewind.\n\n---\n\n🌿 The Setup: A Summer Fling with an Expiration Date\n\nSet in the 1940s, the story follows Noah Calhoun, a working-class lumberjack with Shakespearean monologues and emotional stability, and Allie Hamilton, a rich girl with overbearing parents and a closet full of curated trauma. They meet. They fall in love. It's loud, reckless, passionate, and involves a Ferris wheel stunt that would land any modern man in a lawsuit.\n\nTheir love is short-lived because, surprise surprise, class warfare ruins everything. Allie's parents think Noah's too poor, too unrefined, too… *real*. So they whisk her away, because that's what 1940s rich parents do when they see a man in flannel.\n\n---\n\n💌 The Letters: Blue Ink and Broken Hearts\n\nNoah writes her 365 letters—one for every day of the year. That's more consistency than your college friends showed replying to a group project.\n\nBut Allie never gets them. Why? Her mom, who has a PhD in villainy, intercepts every one like a Gmail spam filter on overdrive. The result? Years of silence, confusion, and ultimately, a sad, incomplete chapter in their young lives.\n\nFast forward a few years—Allie's engaged to Lon, a charming soldier-lawyer hybrid who looks like he flosses with Harvard degrees. Everything should be fine. But this is a Sparks story. *Fine* is just the space between \"bad\" and \"emotional implosion\".\n\n---\n\n🛶 The Rain Scene: Cinematic Hydrotherapy\n\nNow we arrive at *the scene*. You know the one. It's raining. Noah and Allie are in a boat. Birds are flying. Emotions are higher than the humidity. And then—boom. The kiss.\n\nThis is the kind of romantic moment that launched a thousand Pinterest quotes. It's also physically unrealistic unless you enjoy kissing while dripping like a garden hose. But who cares? It's peak drama. It's wet. It's raw. It's two people clinging to each other like they're trying to reverse climate change with passion alone.\n\nNoah's line here—“It wasn't over. It still isn't over.”—isn't just dialogue. It's war. It's poetry. It's the emotional sledgehammer that demolishes the walls Allie spent years building. And when they finally get together, it feels earned. Stupidly reckless, yes. But earned.\n\n---\n\n⏳ The Twist: When Memory Becomes the Villain\n\nSo far, this has all been flashbacks, courtesy of an elderly man reading from a notebook to a woman with dementia in a nursing home. And yes, by now you've figured it: it's Noah and Allie. The notebook is Noah's Hail Mary, his weapon against the slow, cruel erosion of memory.\n\nThis is where the film goes from romantic to *existentially devastating*. Watching Noah patiently retell their love story every day, just for the hope of a fleeting flicker of recognition, is both beautiful and brutal. It's like watching someone try to rebuild a sandcastle in a rising tide. And occasionally—*occasionally*—it works. She remembers. They cry. We cry. The Earth pauses.\n\nBut it never lasts.\n\nThat's the tragedy and the triumph. Love doesn't cure everything. But it *tries*. And sometimes, even when the mind fades, love hangs on.\n\n---\n\n🪦 The Ending: Heartbreak. Hand-holding. Heaven?\n\nWhen Noah and Allie die together in their sleep, hands clasped, it's almost too much. It's soft. It's kind. It's the fantasy that our generation, riddled with commitment phobia and ghosting, desperately wants to believe: that someone, somewhere, will choose you—even when you forget who you are.\n\nThe film doesn't end with triumph or tragedy. It ends with surrender. To time. To love. To the idea that sometimes, the biggest win isn't staying together through everything—but coming back together *anyway*.\n\n---\n\n🎭 The Emotional ROI: Why It Hits So Hard\n\nThe Notebook resonates for one reason: it *romanticizes effort*. In an era of swipe-left dating and three-second attention spans, Noah wrote 365 letters. He rebuilt an entire house, plank by plank, just in case she came back. He told their story every day, hoping for a flicker of connection.\n\nIs it a little unrealistic? Sure. Do most relationships crash before you even hit “Read More”? Definitely.\n\nBut it reminds us that love isn't just sparks—it's maintenance. It's routine. It's showing up even when it's inconvenient, uncomfortable, and unlikely. Especially then.\n\n---\n\n🧠 Final Thoughts: Don't Mock the Melodrama\n\nSure, it's cheesy. The dialogue leans heavy. The plot throws subtlety off a cliff. But *The Notebook* endures because it gives us permission to feel things fully. To cry. To hope. To scream into a pillow while yelling, “WHY DIDN'T YOU JUST TELL HER ABOUT THE LETTERS!?”\n\nIt's not about being realistic. It's about being *idealistic*, for just long enough to believe that maybe, maybe, love really can last forever—even if just for a few minutes at a time.\n\nSo next time someone rolls their eyes at *The Notebook*, smile. Because deep down, they want someone who'd build a house for them too.\n\nAnd hey, maybe you'd do it—with slightly better plumbing.\n",
    userId: "84hBSO5IuEOHXAXI5p6rAHdKRu3Elvib",
    createdAt: "2025-05-10 04:10:07.384",
    updatedAt: "2025-05-10 04:10:07.384",
  },
  {
    id: "e48e8672-a927-4c66-bd8b-3b68904f6a2c",
    title: "Harry Potter Was Just EdTech with VFX",
    text: "When you really look at it, Harry Potter is just a glorified ed-tech story set in a magical world. Hogwarts is essentially a school with a ridiculously powerful legacy system (hello, magic books and enchanted quills) and professors who rarely explain things. Dumbledore might be the head of the curriculum, but he's more of a ‘show up and solve problems as they arise' type, and that's the real magic.\n\nThe students are just like every other bunch of overachievers in any modern school. Harry, the \"new kid\" on a scholarship, gets involved in the world's most complicated extracurricular activities. Meanwhile, Letty's the lone instructor who's too tough for her own good, and Snape's a teaching assistant with a chip on his shoulder. The moral of the story? Hogwarts may have wizards, but it's still just a school with a bunch of dysfunctional systems, filled with students trying to figure it out as they go.",
    userId: "84hBSO5IuEOHXAXI5p6rAHdKRu3Elvib",
    createdAt: "2025-05-09 18:28:15.334",
    updatedAt: "2025-05-09 18:28:15.334",
  },
  {
    id: "e55aed99-0460-490b-bda6-a524a960049c",
    title: "Batman Is Just Tech Support With Trauma",
    text: "Let's be real: Batman is a tech support agent with a lot of unresolved issues. He doesn't have superpowers—just gadgets, a tragic backstory, and some impressive coding skills. Gotham City, the dark and dysfunctional metropolis he protects, is basically an old legacy system that needs constant attention. Bruce Wayne is the sysadmin, trying to fix vulnerabilities with his fists, all while managing a broken system and dealing with his trauma.\n\nAlfred is the DevSecOps, making sure everything runs smoothly behind the scenes. And the Joker? He's the untested production code that always breaks at the worst possible time. But Batman does what any good system admin would do—he adapts, improvises, and finds a way to keep the city running despite all the chaos. In the end, Batman might not be a superhero in the traditional sense, but when you think about it, he's just a guy trying to patch the biggest bug of all: his own past.",
    userId: "hvs9yOC0TNSAshRnXb17tRWl7hVD8Jut",
    createdAt: "2025-05-09 18:18:30.436",
    updatedAt: "2025-05-09 18:18:30.436",
  },
  {
    id: "4c0a5c40-3ede-4a14-a97e-99ea63f6f6f4",
    title: "Fast & Furious Is Just Founders With Muscle Cars",
    text: "The Fast & Furious franchise is basically about startup founders—except, instead of tech, they're driving muscle cars and dodging explosions. Dom Toretto and his crew may not be pitching to VCs, but they sure are making bold moves. Dom is the visionary founder, always rallying his crew, keeping them motivated, and somehow keeping the engine running even when things go haywire. Every sequel is a new venture, and every plot twist feels like a new product launch.\n\nLetty, the tough-as-nails driver, is the designer, always tweaking things to make them better. Roman, the comic relief, is the QA guy who constantly questions everything. Tej, the tech genius, is the hacker who makes sure the tech doesn't fail under pressure. And, of course, there's Dom—the fearless leader who doesn't stop until he's completed the mission. The takeaway here? No matter how many crashes or plot holes there are, the crew always pulls together because they're family.",
    userId: "hvs9yOC0TNSAshRnXb17tRWl7hVD8Jut",
    createdAt: "2025-05-09 18:18:11.406",
    updatedAt: "2025-05-09 18:18:11.406",
  },
  {
    id: "e8f8e687-a732-44e5-b6b2-2e5eff515548",
    title: "The Real Risk of AI? Becoming Mentally Lazy",
    text: "The real danger with AI isn't a world dominated by killer robots. It's the potential for us to become mentally lazy. AI already handles so much of our daily lives—from writing emails to generating summaries and even crafting the perfect tweet. It's made life easier, but at what cost? When was the last time you solved a problem without checking your phone or asking Google?\n\nThe issue isn't with AI itself. It's how we might become overly reliant on it. How much longer will we make decisions, solve problems, or learn new things on our own if AI can do it for us? Imagine a future where the simple act of thinking is replaced by machine intelligence. The convenience of AI is undeniable, but we should be careful not to let it take over our cognitive skills. Use AI, but don't lose your curiosity. That's the real key to keeping your mind sharp.",
    userId: "hvs9yOC0TNSAshRnXb17tRWl7hVD8Jut",
    createdAt: "2025-05-09 18:17:49.938",
    updatedAt: "2025-05-09 18:17:49.938",
  },
  {
    id: "1f46ca18-8ee1-4791-8f52-9c437a848187",
    title: "Swaksham: You Were Built for This. You Just Forgot.",
    text: "We hear it everywhere—“impostor syndrome”, “not ready yet”, “just lucky”.\nBut here's a reminder no one's giving out loud: you are Swaksham.\nCapable. Competent. Not in some mystical, motivational-poster way—but real. Built by experience. Trained by failure. Polished by pressure.\n\nSwaksham doesn't mean you know everything—it means you know you'll figure it out.\nIt's not bravado. It's self-trust. It's what keeps devs shipping, students iterating, founders building, artists creating—even when the outcome is chaos.\n\nBeing Swaksham isn't about having proof.\nIt's about having resolve.\n\nSo next time your mind tries to gaslight you into shrinking, remember:\nCapability isn't given. It's activated.",
    userId: "U6EgNGErGcLOUjouCcYgiP9OzS4rr6rd",
    createdAt: "2025-05-09 14:42:25.802",
    updatedAt: "2025-05-09 14:42:25.802",
  },
  {
    id: "3cb529d3-d984-466f-8125-de33c07457c6",
    title: "Pirates of the Caribbean: A Masterclass in Plot Confusion and Drip",
    text: "Let's just say it—Pirates of the Caribbean is the only franchise where the plot actively resists being understood.\n\nEvery film starts simple: “Find treasure.”\nTwo hours later, you're knee-deep in undead sea captains, time loops, secret bloodlines, and a giant octopus with abandonment issues.\n\nAnd through it all sails Captain Jack Sparrow—part pirate, part philosopher, part drunk flamingo. He staggers around spouting nonsense, betraying everyone, including physics, and somehow ends up the most powerful man on the ocean.\n\nWhy does anyone trust him? Unclear. Why is the monkey undead? Don't ask. How is this a Disney movie? Because branding is strong, mate.\n\nBut despite the cursed gold, zombie sailors, and nautical betrayal spreadsheets, one thing remains true:\nYou will never be as effortlessly cool as Jack Sparrow rowing a sinking boat like it's business as usual.\n\nNo map, no plan, just vibes and eyeliner.\nThat's leadership.",
    userId: "6iNB7mzmewRuY9WszrS87c6EaYypfoZD",
    createdAt: "2025-05-08 10:12:47.774",
    updatedAt: "2025-05-08 10:12:47.774",
  },
  {
    id: "774e69e7-ef29-4320-be7c-f2e65ce73835",
    title: "Rambo: The Man, The Myth, The Muscle That Reloaded War Cinema",
    text: "Rambo is not just a movie. Rambo is a lifestyle. It's a cinematic universe where one man with one knife and zero backup defeats entire military regimes powered by rage, abs, and unresolved trauma.\n\nThe first movie? A deep, brooding take on PTSD and the American military complex.\nThe next four? John Rambo goes full “human tank” mode, takes off his shirt, and starts solving geopolitical crises by violating every Geneva Convention.\n\nHe doesn't talk much. He doesn't smile. But he will build a bamboo spike trap in five minutes and stare into the rain like it's a motivational poster for vengeance.\n\nRambo doesn't reload—he reincarnates. Every sequel, he gets older, angrier, and somehow even more shredded. By the final film, he's practically a protein shake with a vengeance arc.\n\nAnd yet, we cheer. Because sometimes, cinema doesn't need nuance. Sometimes it needs a bandana, a bow, and an explosion every 14 seconds.\n\nRambo isn't a hero. He's a warning label.",
    userId: "6iNB7mzmewRuY9WszrS87c6EaYypfoZD",
    createdAt: "2025-05-08 10:12:15.905",
    updatedAt: "2025-05-08 10:12:15.905",
  },
  {
    id: "6b653bc8-dbe3-40bd-b9e6-51e3a596bc36",
    title: "Transformers: The Franchise That Made Us Care About Truck Feelings",
    text: "Let's be honest: the Transformers franchise is pure chaos in disguise. What started as a toy line turned into a cinematic saga where alien robots speak perfect English, punch each other across continents, and somehow always land in small American towns.\n\nWe've got Optimus Prime—Shakespeare with six-pack abs and a trailer hitch—giving motivational speeches mid-battle like he's running for intergalactic president.\nThen there's Bumblebee: mute, adorable, and somehow cooler than 90% of Hollywood's human actors.\n\nThe plot? Oh, that's optional. One minute we're protecting Earth, next minute there's a sword, then King Arthur shows up, then it's in space, then Mark Wahlberg is involved for some reason.\n\nAnd yet… we love it.\nBecause at its core, Transformers teaches us one thing:\nEven if you're a 30-foot robot with a built-in flamethrower, you can still have feelings.\n\nAlso, explosions. Lots of explosions.\n10/10, would convert my Maruti into a Decepticon.",
    userId: "6iNB7mzmewRuY9WszrS87c6EaYypfoZD",
    createdAt: "2025-05-08 10:09:45.975",
    updatedAt: "2025-05-08 10:09:45.975",
  },
  {
    id: "1a214d01-2295-4723-9cef-ea548d7f6e5d",
    title: "Remote Work Isn't Dying—It's Just Being Rebranded",
    text: "While headlines scream \"return to office,\" the truth is more nuanced. Remote work isn't disappearing—it's evolving.\n\nEnter hybrid, flex, async-first—new labels for a reality we've already embraced. The tools are maturing (see: Linear, Notion, Tuple), but the cultural shift is deeper: trust over time-tracking, output over presence.\n\nFor Indian developers, this is a moment of leverage. Global startups are hiring remote-first teams across India—not just to cut costs, but to tap into serious engineering talent.\n\nThe future isn't just location-agnostic. It's borderless by design. Remote isn't a perk. It's the new default—if you know how to navigate it.",
    userId: "6iNB7mzmewRuY9WszrS87c6EaYypfoZD",
    createdAt: "2025-05-08 10:09:01.775",
    updatedAt: "2025-05-08 10:09:01.775",
  },
  {
    id: "b4152946-be0d-4b25-857b-719659950de3",
    title:
      "The GitHub Copilot Lawsuit Isn't Just About Code—It's About Ownership",
    text: "The class-action lawsuit against GitHub Copilot and OpenAI could be one of the most consequential legal battles in tech history.\n\nAt the core is a pressing question: If an AI model is trained on open-source code, does it owe attribution or licensing compliance?\n\nDevelopers who built the modern internet with free, shared code now face a future where their work trains systems that generate profits—with no recognition, no credit, and no consent.\n\nThis case will define the legal landscape for AI-generated software. It's not just about licenses—it's about labor, value, and the future of intellectual ownership in the age of synthetic creation.\n\nAnd yes, it's time every dev took an active interest in this.\n\n",
    userId: "84hBSO5IuEOHXAXI5p6rAHdKRu3Elvib",
    createdAt: "2025-05-08 10:08:36.41",
    updatedAt: "2025-05-08 10:08:36.41",
  },
  {
    id: "7a2dd36e-9e03-4fac-ab5b-24c1340bea4a",
    title: "AI Is Moving Faster Than Policy—That's a Problem",
    text: "While developers race to ship the next GPT-powered app, regulators are struggling to even define what \"responsible AI\" means.\n\nThe gap between innovation and legislation is widening. Deepfakes, hallucinated facts, and automated decision-making systems are already impacting finance, hiring, and healthcare. Yet, most nations—including India—lack robust, enforceable AI governance frameworks.\n\nAs builders, we can't wait for lawmakers to catch up. Ethical defaults must be baked into our codebases. Bias mitigation, explainability, and consent architecture aren't features—they're obligations.\n\nThe AI gold rush is here. But without guardrails, we're not scaling innovation—we're scaling risk.",
    userId: "84hBSO5IuEOHXAXI5p6rAHdKRu3Elvib",
    createdAt: "2025-05-08 10:04:11.552",
    updatedAt: "2025-05-08 10:04:11.552",
  },
  {
    id: "6d525a68-274f-4da7-bae0-0cef4099b541",
    title: "Reddit IPO'd. Now It's Just a Paid Forum With Memes.",
    text: "Reddit went public and instantly became less fun. Now every meme post feels like it's being monitored by an MBA with a spreadsheet.\n\nThey're monetizing harder than a desi uncle renting out the guest room. Premium subscriptions, NFT avatars, paid API access—it's like Orkut left and capitalism entered.\n\nStill, the dev subreddits? Gold. From r/webdev to r/indianprogrammer, it's still the only place where strangers will debug your code at 2 AM and insult you with love.\n\nLet's just hope Wall Street doesn't turn it into another Facebook clone with engagement metrics and dead silence.",
    userId: "84hBSO5IuEOHXAXI5p6rAHdKRu3Elvib",
    createdAt: "2025-05-08 10:03:52.539",
    updatedAt: "2025-05-08 10:03:52.539",
  },
  {
    id: "f1f8518e-4579-4793-9401-21ad42d621aa",
    title: "Jio's Cloud Platform Is Getting Real—and That's No Small Talk",
    text: "Mukesh Bhai isn't just building telecom towers anymore—he's coming for AWS and GCP. Jio's new cloud infra push is aimed at startups, SMEs, and yes, developers like us who are sick of dollar billing shocks from US-based providers.\n\nWith Bharat Stack, UPI APIs, and local infra, India's tech sovereignty is no longer a meme—it's a playbook.\n\nImagine deploying a full-stack AI app without getting a heart attack when the invoice drops. Dreams? Maybe. But with Jio stepping in, that might just be Tuesday.\n\nKeep an eye on this space—especially if you're building for Bharat, not just from it.",
    userId: "84hBSO5IuEOHXAXI5p6rAHdKRu3Elvib",
    createdAt: "2025-05-08 10:03:39.227",
    updatedAt: "2025-05-08 10:03:39.227",
  },
  {
    id: "36dc0bbc-3578-4c3a-b08d-5ecd150c93b4",
    title:
      "Apple Wants You to Buy Another Dongle—Vision Pro Hits India (Soon-ish)",
    text: "Apple Vision Pro is like that rich cousin who shows up at weddings with Gucci shoes and doesn't make eye contact with anyone earning below 7 figures.\n\nIt's slick. It's futuristic. It's priced like a downpayment for an apartment in Indiranagar. Rumor has it the India launch might happen in late 2025—but only for those with kidneys to spare.\n\nWill it revolutionize spatial computing? Probably. Will it make Zoom calls even more awkward? Absolutely. Will your desi parents call it “useless goggles”? 100%.\n\nEither way, the metaverse is coming. And Apple's betting you'll wear it on your face—with pride (and EMI).",
    userId: "84hBSO5IuEOHXAXI5p6rAHdKRu3Elvib",
    createdAt: "2025-05-08 10:03:19.365",
    updatedAt: "2025-05-08 10:03:19.365",
  },
  {
    id: "161ad3e5-bcfa-46c9-b000-62b0dc85a0c2",
    title: "Every Indian Dev's Backup Plan is... Wedding Photography",
    text: "Let's be honest—if the tech world ever collapses, half of us are ready to become freelance photographers. Why? Because every Indian dev either owns a DSLR or knows how to fake depth-of-field with a phone.\n\nOne day we're fixing bugs. Next day, we're clicking aesthetic shots of chai glasses and calling it “text.”\n\nAnd our LinkedIn bios? “Engineer | Creator | Dreamer | Cinematic Vibes Enthusiast.” Sir, just say you're broke but artsy.\n\nStill, there's something beautiful about it. We code. We create. We capture. And when the server's down? At least the lighting's good.",
    userId: "U6EgNGErGcLOUjouCcYgiP9OzS4rr6rd",
    createdAt: "2025-05-08 10:02:31.809",
    updatedAt: "2025-05-08 10:02:31.809",
  },
  {
    id: "d509712e-1cea-4b1c-88d9-a78afb63313f",
    title: "Error 404: Brain Not Found After 2 AM",
    text: "They say great things happen at night. Lies. After 2 AM, I'm not coding—I'm possessed. Variables stop making sense. TypeScript screams. Tailwind looks like gibberish. And somehow, console.log(\"why\") starts sounding personal.\n\nStill, there's something romantic about it. The soft glow of the screen. The silence of the house. The sweet delusion that this bug will be fixed before sunrise. Spoiler: It won't.\n\nBut that one lucky run when it does work at 3:17 AM? Feels like winning the IPL. Or finding your long-lost pen drive with old college projects.\n\nIt's chaos. But it's my kind of chaos.",
    userId: "U6EgNGErGcLOUjouCcYgiP9OzS4rr6rd",
    createdAt: "2025-05-08 10:02:11.457",
    updatedAt: "2025-05-08 10:02:11.457",
  },
  {
    id: "3a96496d-22fd-427d-954c-1d79d7c3c776",
    title: "The True Indian Tech Stack: Dosa, Chai, and Debugging",
    text: "No productivity tool can beat a good filter coffee, one crispy dosa, and your laptop running VSCode with 17 tabs open.\n\nPair that with lo-fi beats, a ceiling fan spinning on hope, and your mom checking in every hour to say, “Laptop ke saamne mat baith itna.” And you've got the ultimate desi dev environment.\n\nSure, people abroad have standing desks and dual monitors. But have they ever pushed a feature live while dodging a power cut and eating samosas with one hand? Didn't think so.\n\nWe may not always have stable internet, but we have resilience. And also—hot snacks.",
    userId: "U6EgNGErGcLOUjouCcYgiP9OzS4rr6rd",
    createdAt: "2025-05-08 10:01:57.395",
    updatedAt: "2025-05-08 10:01:57.395",
  },
  {
    id: "10a20314-96e6-45f6-9647-e29c0b0d57b1",
    title: "Git Push - But Make It Emotional",
    text: "Every time I type git push origin main, I feel like I'm launching a rocket—with zero QA and a hope that I didn't accidentally commit the node_modules folder.\n\nIt's not just code. It's hours of trial, error, and emotional damage. That push carries the weight of every chai break, every “just five more minutes” lie, and every Google search that started with “how to fix…” and ended with “...pls help urgent.”\n\nAnd if CI/CD fails? Time to refresh Vercel logs like it owes you money.\n\nTech isn't for the faint-hearted. It's for those of us who dream in JSON and cry in YAML.\n\n",
    userId: "U6EgNGErGcLOUjouCcYgiP9OzS4rr6rd",
    createdAt: "2025-05-08 10:01:36.233",
    updatedAt: "2025-05-08 10:01:36.233",
  },
  {
    id: "31185331-d56f-4949-aea3-f60605554df3",
    title: "I Don't Need Coffee. I Have Production Bugs.",
    text: "Who needs caffeine when your code is throwing undefined is not a function at 3 AM and you swore it was working literally five minutes ago? You pray to Google, Stack Overflow, and that one guy from a Reddit thread in 2017.\n\nAnd then—miraculously—it works. But you don't know why. And now you're afraid to touch anything.\n\nThe code runs. The tests pass. But your soul? Cracked. Your chai? Cold. Your mom? Yelling because dinner got cold 3 hours ago.\n\nThis isn't debugging. This is spiritual warfare. And somehow… I love it.",
    userId: "6iNB7mzmewRuY9WszrS87c6EaYypfoZD",
    createdAt: "2025-05-08 10:00:34.939",
    updatedAt: "2025-05-08 10:00:34.939",
  },
  {
    id: "619e983f-5893-4f8f-8f07-72756efbd7a3",
    title: "React, Zustand, and the Power of Controlled Chaos",
    text: "React is beautiful chaos. Zustand is controlled chaos. When I combined the two, state management finally stopped being that uninvited guest breaking everything at runtime.\n\nZustand's API is tiny but mighty. I love how it lets me manage complex UI flows without turning my components into spaghetti. It fits seamlessly with the hooks-based mindset React developers live in—no ceremony, just state where and when you need it.\n\nThis combo has helped me ship faster and sleep better. And let's be honest—nothing says “growth” like refactoring your old Redux logic and realizing how much cleaner life can be.",
    userId: "6iNB7mzmewRuY9WszrS87c6EaYypfoZD",
    createdAt: "2025-05-08 10:00:03.295",
    updatedAt: "2025-05-08 10:00:03.295",
  },
  {
    id: "5c51e4f4-ae25-43c2-af69-d1d09e20f631",
    title: "Backend Zen with Hono and Prisma",
    text: "There's something oddly satisfying about clean APIs. Hono.js brought that minimalist expressiveness I didn't realize I was craving. Lightweight, fast, and TypeScript-native—it's been the backbone of my recent backend builds. Pair it with Prisma, and suddenly I'm not writing SQL—I'm crafting data flows.\n\nWorking with Neondb and Supabase has only added fuel to the fire. From scalable cloud storage to real-time updates, the tooling has matured, and we devs get to reap the rewards.\n\nThe goal? Backend systems that are intuitive, secure, and lightning fast. With Hono and Prisma, I'm getting closer to that North Star every sprint.",
    userId: "6iNB7mzmewRuY9WszrS87c6EaYypfoZD",
    createdAt: "2025-05-08 09:59:42.462",
    updatedAt: "2025-05-08 09:59:42.462",
  },
  {
    id: "b5ee0992-0338-4262-8f8a-6a1d0dec1c4d",
    title: "From CSS Struggles to Tailwind Flow State",
    text: "Remember when styling used to feel like wrestling a bear in the dark? Same. Switching to Tailwind CSS wasn't just a productivity shift—it was a mindset reset. Utility-first classes gave me the freedom to build with clarity and speed. No more toggling between CSS files and components—just pure flow. Combined with Radix UI, I finally feel like I'm crafting UIs with precision and polish, not guesswork.\n\nIt's wild how much time I save now, and more importantly, how consistent the design feels across my projects. If you're a dev still skeptical about Tailwind, here's my advice: just build one real project with it. You'll never go back.",
    userId: "6iNB7mzmewRuY9WszrS87c6EaYypfoZD",
    createdAt: "2025-05-08 09:59:24.562",
    updatedAt: "2025-05-08 09:59:24.562",
  },
];

const pc = new Pinecone({
  apiKey: pineconeApiKey,
});

try {
  //1.Create a new index
  const index = pc.index("hackernews-lemonisland");
  const namespace = index.namespace("movieArticles");

  await namespace.upsertRecords(movies);

  //2. Read/Search
  const movieArticles = await namespace.searchRecords({
    query: {
      inputs: { text: "Top 10 Movie Articles" },
      topK: 10,
    },
    rerank: {
      model: "text-embedding-3-large",
      topN: 5,
      rankFields: ["text"],
    },
  });

  movieArticles.result.hits.forEach((hit) => {
    console.log(hit._score, hit);
  });

  //3.Update

  // await namespace.upsertRecords([
  //   {
  //     id: "4",
  //     text: "Nelson Mandela was an anti-apartheid hero and the first Black president of South Africa",
  //   },
  // ]);

  //4.Delete

  // await namespace.deleteOne("30");
} catch (e) {
  console.log(e);
}
