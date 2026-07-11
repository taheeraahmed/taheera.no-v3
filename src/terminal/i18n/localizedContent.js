import { CV_FILE_NAME } from '../constants'

const joinChunks = (chunks) => chunks.join('')
const joinLines = (lines) => lines.join('\n')
const joinParagraphs = (paragraphs) => paragraphs.join('\n\n')

const localizedContent = {
  en: {
    rootFiles: {
      [CV_FILE_NAME]: `Open with: open ${CV_FILE_NAME}`,
      'card.sh': 'Run: ./card.sh or bash card.sh',
    },
    contactCard: {
      name: 'Taheera Ahmed',
      title: 'Data Scientist',
      organization: 'NINA (Norwegian Institute for Nature Research)',
      website: 'nina.no',
      linkedin: 'https://www.linkedin.com/in/taheera-ahmed-997750158/',
      github: 'github.com/taheeraahmed/',
      tiktok: 'https://www.tiktok.com/@tira.py',
      location: 'Oslo, Norway',
      email: 'taheera.ahmed@gmail.com',
      imageAlt: 'Portrait placeholder for Taheera',
    },
    proudOf: {
      graduation_speech: {
        text: joinParagraphs([
          joinChunks([
            'This honestly felt like a HUGE honor. I was chosen to give the "students\' speech" on ',
            'graduation day for all the other technology students who were graduating too!! There were ',
            'more than 1,000 people there. It was nerve-racking right before we went on, but the moment ',
            'we stepped onto the stage it felt like most of the fear disappeared. Such a fun experience!!',
          ]),
          joinChunks([
            'For anyone especially interested, you can watch it from 55:13 ',
            '[here](https://ntnu.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=8ed6a4e5-71f7-4f93-9bc4-b19',
            '400b4e6c2&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&captions=false&inte',
            'ractivity=all)',
          ]),
          'Ironically enough, I still had not submitted my master\'s thesis yet.',
        ]),
      },
      first_job: {
        text: joinParagraphs([
          joinChunks([
            'I got my first real adult job in 2024 after finishing my master\'s degree. I remember seeing ',
            'the job listing on Finn about two weeks before I was due to submit my thesis and thinking, ',
            '"omg I HAVE to get that job."',
          ]),
          joinChunks([
            'Luckily, it turned out to be a great match from both sides, and I am so happy with my ',
            'workplace. I have lovely colleagues that I get to see every day, and the tasks vary a lot.',
          ]),
          joinChunks([
            'I have done everything from training AI models to detect reindeer in drone imagery, to ',
            'building data pipelines that fetch salmon data from sensors in rivers, to wrestling with how ',
            'to integrate Feide login on a website.',
          ]),
          joinChunks([
            'What I really like about this job is the wide range of tasks. It means I get to learn a ',
            'little bit of everything.',
          ]),
        ]),
      },
      graduation: {
        text: joinParagraphs([
          joinChunks([
            'I was a student for 7 whole years. Seven years. But I did manage to earn two separate ',
            'degrees: a bachelor\'s degree in Electrical Engineering and a master\'s degree in Computer ',
            'Science.',
          ]),
          joinChunks([
            'The master\'s degree is definitely one of the hardest and most demanding things I have done ',
            'so far. I wrote and coded the entire thesis on my own!',
          ]),
        ]),
      },
      my_internships: {
        text: joinParagraphs([
          joinChunks([
            'From 2017 to 2020, during the first three years of my studies, I struggled so much to get a ',
            'summer job. I got rejection after rejection, and it was extremely disappointing.',
          ]),
          joinChunks([
            'Eventually I decided to take matters into my own hands, step out of my comfort zone, and ',
            'apply for a volunteer role at Samfundet in Trondheim as a web developer. Even just applying ',
            'felt scary, and I did not feel ready or good enough to apply in the first place.',
          ]),
          joinChunks([
            'Luckily I got the role, and that is where I learned all the basics. Everything from the ',
            'difference between git and GitHub to development in general and, haha, what a backend ',
            'actually was. I remember that being a huge mystery to me.',
          ]),
          joinChunks([
            'After that role, things started snowballing. I got my first part-time developer job at ',
            'Dreamknit in 2021, and eventually landed my first summer internship at Netlight in 2022!! ',
            'After this a had so much confidence, so I applied for everything I wanted to do, and ended ',
            'up with two different internships, two part-time jobs and one research assistant job (not at ',
            'the same time hehe). The rest is in my CV ;);)',
          ]),
        ]),
        hintCommands: [`open ${CV_FILE_NAME}`],
      },
      first_half_marathon: {
        text: joinParagraphs([
          joinChunks([
            'It is honestly kind of wild that I even started running at all. From the day I was born ',
            'until 2024, I hated running with my whole heart. The only thing I wanted to do was strength ',
            'training.',
          ]),
          joinChunks([
            'Maybe I was a little traumatized after always being the last one on running tests in middle ',
            'school and high school.',
          ]),
          joinChunks([
            'Then one day in 2024 I got peer-pressured into signing up for a half marathon. After I ran ',
            'it, I realized just how slow I was and how bad my cardio actually was, so now my goal is ',
            'basically just to get faster and improve my fitness. ( ͡° ͜ʖ ͡° )',
          ]),
          'And I am actually still running!!',
        ]),
      },
      women_in_tech: {
        text: joinParagraphs([
          joinChunks([
            'During my years as a student, I cared a lot about getting more girls and women to choose ',
            'technology-related studies.',
          ]),
          joinLines([
            joinChunks([
              '- I joined the nationwide Jenter og Teknologi tour, where I, together with other role ',
              'models, gave talks for girls in middle school. We visited more than 20 schools, cultural ',
              'centers, cinemas, and meeting places all over the country. You can read more ',
              '[here](https://www.nho.no/tema/kompetanse-og-utdanning/artikler/jenter-og-teknologi/) and ',
              '[here](https://jenterogteknologi.com/).',
            ]),
            joinChunks([
              '- I was an emcee and also gave talks for TENK Tech Camp in Trondheim in 2020, 2021, and ',
              '2023! TENK Tech Camp is a technology camp for girls with several workshops aimed at showing ',
              'them that technology can absolutely be for them. I tried to keep the attention of 13- to ',
              '15-year-olds, which was not always the easiest job. You can read more about the camp ',
              '[here](https://tenknorge.com/tenk-tech-camp).',
            ]),
            joinChunks([
              '- I took part in a series called "Jævli flink S2". You could compare it to a reality ',
              'series about girls studying technology. The videos are ',
              '[here](https://www.youtube.com/playlist?list=PL4nvO1Mxs-KV8LFXLHPzeTDeMEvQBDS4o).',
            ]),
            joinChunks([
              '- Finally, I had my own TikTok profile where I tried to reach "the youth" (haha, that made ',
              'me sound ancient). I mostly posted relatable content from my everyday life. It is a little ',
              'hard to describe exactly what I did in grown-up language, so I will just point to ',
              '[my account](https://www.tiktok.com/@tira.py) instead.',
            ]),
          ]),
        ]),
      },
    },
    aboutMe: {
      running: {
        text: joinParagraphs([
          joinChunks([
            'I started running because I realized just how bad my cardio was after getting peer-pressured ',
            'into running a half marathon. And I used 2 hours and 38 minutes, EVEN THOUGH my watch told ',
            'me I would finish in 2 hours and 16 minutes. The disappointment was huge... But my first ',
            'half marathon was also a revelation. I really needed cardio. I had done barely any endurance ',
            'training before 2024...',
          ]),
          joinChunks([
            'ANYWAY, now I run three times a week (one easy run, one interval or tempo session, and one ',
            'long run) to try to improve my cardio. Maybe a full marathon would be fun once I get my 10K ',
            'and half-marathon times down?? We will see!! :D',
          ]),
        ]),
        imageAlt: 'Taheera finishing her first half-marathon outdoors',
      },
      knitting: {
        text: joinParagraphs([
          joinChunks([
            'This really started as a pandemic hobby because I wanted a new sweater. My first sweater was ',
            'SO ugly haha, it is honestly wild that I actually kept knitting after that. Maybe I saw the ',
            'potential? Maybe I just saw too many pretty sweater patterns I absolutely "had" to own.',
          ]),
          joinChunks([
            'I have knitted quite a few sweaters, and a lot of mittens too, even though the pair I gave ',
            'my dad had a left mitten that was MUCH longer than the right one. Knitting is hard, but ',
            'fun!!',
          ]),
        ]),
        imageAlt: 'Taheera knitting a bucket hat',
      },
      weightlifting: {
        text: joinParagraphs([
          joinChunks([
            'I have been strength training since high school, and it is one thing I always come back to. ',
            'I love the feeling it gives me and I like feeling strong!! Even though for the last two ',
            'years I have mostly done lifting to focus on injury prevention for running...',
          ]),
          joinChunks([
            'Back in the day I managed a 115 kg squat and a 60 kg bench press, which is kind of wild ',
            'because I weighed around 60 kg at the time. I am also a short person, I am 158 cm "tall".',
          ]),
        ]),
        imageAlt: 'Taheera at the gym',
      },
      reading: {
        text: joinParagraphs([
          joinChunks([
            'I think I mostly added this so it looks like I read. Or, I do read, but it really comes in ',
            'waves and depends on whether I find a book I like. I definitely read the most in summer.',
          ]),
          joinChunks([
            'I love, or at least the idea of, lying in the park with a blanket and enjoying the sun while ',
            'doing something other than scrolling on TikTok... haha that is probably where a lot of my ',
            'reading motivation comes from. I want to spend less time on my phone!',
          ]),
        ]),
        imageAlt: 'Taheera reading',
      },
      in_general: {
        text: joinParagraphs([
          joinChunks([
            'I am the kind of person who stays stubborn when things get tough, whether that means ',
            'difficult bugs and features or a bad half-marathon time. I believe that with hard work and ',
            'dedication, I can solve all the problems I run into. As long as I have good structure around ',
            'me and people who are excited to give me tips on where to find information, whether it is ',
            'about running or squashing bugs.',
          ]),
          joinChunks([
            'I am also a very social person who likes being around other people and helping them ',
            'achieve what they want. I feel like that has to be mentioned mostly because of the ',
            'stereotype about people who studied computer science at NTNU.',
          ]),
        ]),
      },
    },
    welcomeLines: [
      `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣶⡦⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⠟⠉⠉⠉⢿⣇⠀Hellooo there,
⢀⣴⡾⠛⠛⠭⢟⣕⣄⣾⡏⠀⠀⠀⠀⠀⣿⠀⠀My name is Taheera (tahira), and I work as a data scientist
⡎⣿⠀⠀⠀⠀⠀⠈⢏⣿⡇⠀⠀⠀⠀⢀⡟⠀at NINA (Norwegian Institute for Nature Research, [nina.no](https://www.nina.no)).
⠹⡿⡄⠀⠀⠀⠀⠀⠀⣿⣇⠀⠀⠀⣠⣟⡡⠤⢄⣀⠀⠀
⠀⠈⠻⣦⣄⠀⠀⠀⣠⡿⣿⣿⣢⡾⠋⠉⠉⠉⠓⠒⢵⣆⠀I built this page to mimic a terminal, but thought well, 
⠀⠀⣀⣬⠻⠷⢶⣤⡯⠀⠀⠀⢹⡇⠀⠀⠀⠀⠀⠀⠀⠹⣧  I am in a browser after all, 
⢀⣾⠛⠁⠀⠀⠀⢘⣇⣀⣀⣠⣾⠏⠀⠀⠀⠀⠀⠀⠀⢀⡟  so I can add a few extra features :D
⣯⠃⠀⠀⠀⠀⠀⠀⢛⣿⠛⠉⠙⢿⣦⣀⣀⣀⣀⣀⣶⠞⠁  
⣿⡀⠀⠀⠀⠀⠀⠀⣿⡏⠀⠀⠀⠈⢯⢫⡉⠉⠉⠉⠁⠀ I had fun making this hihi
⠙⡷⣄⡀⠀⢀⡤⡺⣿⠀⠀⠀⠀⠀⠈⣇⡇  Hopefully someone sees it <3
⠀⠈⠛⠛⠛⠛⠋⠀⠘⣆⠀⠀⠀⠀⠀⣿⠇⠀ Repo: [github.com/taheeraahmed/taheera.no-v3](https://github.com/taheeraahmed/taheera.no-v3)⠀⠀⠀                                        
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣤⣀⣤⣖⠏⠀⠀
`,
    ],
  },
  no: {
    rootFiles: {
      [CV_FILE_NAME]: `Åpne med: open ${CV_FILE_NAME}`,
      'card.sh': 'Kjør: ./card.sh eller bash card.sh',
    },
    contactCard: {
      name: 'Taheera Ahmed',
      title: 'Data Scientist',
      organization: 'NINA (Norsk institutt for naturforskning)',
      website: 'nina.no',
      linkedin: 'https://www.linkedin.com/in/taheera-ahmed-997750158/',
      github: 'github.com/taheeraahmed/',
      tiktok: 'https://www.tiktok.com/@tira.py',
      location: 'Oslo, Norge',
      email: 'taheera.ahmed@gmail.com',
      imageAlt: 'Portrett av Taheera',
    },
    proudOf: {
      graduation_speech: {
        text: joinParagraphs([
          joinChunks([
            'Akkurat dette synes jeg var MEGA stas. Jeg ble valgt ut til å holde «studentenes tale» på ',
            'utmatrikuleringsdagen for alle de andre teknologistudentene som også var ferdige!! Det var ',
            'flere enn 1.000 mennesker der. Det var nervepirrende rett før, men da vi gikk på scenen var ',
            'det som om mye av frykten forsvant. Veldig gøy opplevelse!!',
          ]),
          joinChunks([
            'Til de spesielt interesserte ligger talen her fra 55:13 ',
            '[her](https://ntnu.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=8ed6a4e5-71f7-4f93-9bc4-b194',
            '00b4e6c2&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&captions=false&inter',
            'activity=all)',
          ]),
          'Ironisk nok hadde jeg fortsatt ikke levert masteroppgaven min enda.',
        ]),
      },
      first_job: {
        text: joinParagraphs([
          joinChunks([
            'Jeg fikk min første ordentlige voksenjobb i 2024 etter at jeg fullførte mastergraden min. ',
            'Jeg husker at jeg så stillingsannonsen på Finn omtrent to uker før jeg skulle levere ',
            'oppgaven min og tenkte «omg den jobben MÅ jeg ha».',
          ]),
          joinChunks([
            'Heldigvis ble det en match fra begge sider, og jeg er så fornøyd med arbeidsplassen min. Jeg ',
            'har fine kollegaer som jeg møter hver dag, og veldig varierte arbeidsoppgaver.',
          ]),
          joinChunks([
            'Jeg har gjort alt fra å trene AI-modeller for å detektere reinsdyr i dronebilder, til å lage ',
            'datapipelines som henter laksedata fra sensorer i elver, til å bryne meg på hvordan man ',
            'integrerer Feide-innlogging på en nettside.',
          ]),
          joinChunks([
            'Det jeg liker godt med denne jobben er det store spennet i arbeidsoppgavene. På den måten ',
            'får jeg litt kunnskap om alt.',
          ]),
        ]),
      },
      graduation: {
        text: joinParagraphs([
          joinChunks([
            'Jeg var student i 7 hele år. 7 år. Men jeg har klart å få to separate grader: en ',
            'bachelorgrad i elektroingeniørfag og en mastergrad i datateknologi.',
          ]),
          joinChunks([
            'Masteren er definitivt noe av det vanskeligste og mest krevende jeg har gjort så langt. Jeg ',
            'skrev og kodet hele oppgaven alene!',
          ]),
        ]),
      },
      my_internships: {
        text: joinParagraphs([
          joinChunks([
            'Fra 2017 til 2020, de tre første årene av studiet mitt, slet jeg skikkelig med å få ',
            'sommerjobb. Jeg fikk avslag på avslag, og det var ekstremt skuffende.',
          ]),
          joinChunks([
            'Til slutt bestemte jeg meg for å ta saken i egne hender, gå ut av komfortsonen min og søke ',
            'på et verv på Samfundet i Trondheim som webutvikler. Bare det å søke føltes skummelt, og jeg ',
            'følte meg verken klar eller flink nok til å søke i det hele tatt.',
          ]),
          joinChunks([
            'Heldigvis fikk jeg vervet, og det var der jeg lærte alt det grunnleggende. Alt fra ',
            'forskjellen på git og GitHub til utvikling generelt og haha hva en backend faktisk var. Jeg ',
            'husker at det var et stort mysterium for meg.',
          ]),
          joinChunks([
            'Etter dette vervet begynte snøballen å rulle. Jeg fikk min første deltidsjobb som utvikler i ',
            'Dreamknit i 2021, og landet til slutt min første sommerjobb i Netlight i 2022!! Etter alt ',
            'dette hadde jeg en høyere selvtillit og tro på meg selv, og søkte på alle jobbene jeg ville ',
            'ha!!! Før endt studie hadde jeg hatt to relevante summer-internships, to relevante ',
            'deltidsjobber, en forskningsassistentjobb (alle jobbene var ikke samtidig hehe). Disse er ',
            'beskrevet nærmere i CV-en min ;);)',
          ]),
        ]),
        hintCommands: [`open ${CV_FILE_NAME}`],
      },
      first_half_marathon: {
        text: joinParagraphs([
          joinChunks([
            'Det er faktisk helt vilt at jeg i det hele tatt begynte å løpe. Fra dagen jeg ble født og ',
            'frem til 2024 hatet jeg løping av hele mitt hjerte. Det eneste jeg ville holde på med var ',
            'styrketrening.',
          ]),
          joinChunks([
            'Kanskje litt traumatisert etter alltid å være sist på løpetester på ungdomsskolen og ',
            'videregående.',
          ]),
          joinChunks([
            'Helt til jeg plutselig en dag i 2024 ble gruppepresset til å melde meg på et halvmaraton. ',
            'Etter at jeg løp det, innså jeg hvor treg jeg faktisk var og hvor dårlig kondis jeg hadde, ',
            'så målet mitt nå er egentlig bare å bli raskere og få bedre kondis. ( ͡° ͜ʖ ͡° )',
          ]),
          'Og jeg holder faktisk fortsatt på med løping!!',
        ]),
      },
      women_in_tech: {
        text: joinParagraphs([
          joinChunks([
            'Gjennom studietiden min engasjerte jeg meg veldig mye for å få flere jenter og kvinner til å ',
            'velge teknologirelaterte studier.',
          ]),
          joinLines([
            joinChunks([
              '- Jeg var med på Norges-turneen til Jenter og Teknologi, hvor jeg sammen med andre ',
              'rollemodeller holdt foredrag for jenter på ungdomsskolen. Vi var på mer enn 20 skoler, ',
              'kulturhus, kinosaler og møteplasser rundt om i hele landet. Du kan lese mer ',
              '[her](https://www.nho.no/tema/kompetanse-og-utdanning/artikler/jenter-og-teknologi/) og ',
              '[her](https://jenterogteknologi.com/).',
            ]),
            joinChunks([
              '- Jeg har vært konferansier og bidratt med innlegg på TENK Tech Camp i Trondheim i 2020, ',
              '2021 og 2023! TENK Tech Camp er en teknologicamp for jenter med flere workshops som har som ',
              'mål å få jentene til å tenke at teknologi også er noe for dem. Jeg prøvde å holde på ',
              'oppmerksomheten til jenter mellom 13 og 15 år, og det var ikke alltid like enkelt. Du kan ',
              'lese mer om campen [her](https://tenknorge.com/tenk-tech-camp).',
            ]),
            joinChunks([
              '- Jeg var med i en serie som heter «Jævli flink S2». Den kan kanskje sammenlignes med en ',
              'realityserie om jenter som studerer teknologi. Youtube-videoene finner du ',
              '[her](https://www.youtube.com/playlist?list=PL4nvO1Mxs-KV8LFXLHPzeTDeMEvQBDS4o).',
            ]),
            joinChunks([
              '- Til slutt hadde jeg en egen TikTok-profil hvor jeg prøvde å nå ut til «ungdommen» (haha, ',
              'det får meg til å høres gammel ut). Jeg postet hovedsakelig relaterbart innhold fra ',
              'hverdagen min. Det er litt vanskelig å beskrive helt presist hva jeg gjorde på voksenspråk, ',
              'så jeg får heller vise til [Tiktok-brukeren min](https://www.tiktok.com/@tira.py).',
            ]),
          ]),
        ]),
      },
    },
    aboutMe: {
      running: {
        text: joinParagraphs([
          joinChunks([
            'Jeg begynte å løpe fordi jeg innså hvor dårlig kondis jeg hadde etter jeg ble gruppepresset ',
            'til å løpe et halvmaraton. Og jeg brukte 2 timer og 38 minutter, TILTROSS for at klokken min ',
            'sa at jeg kom til å bruke 2 timer og 16 minutter. Skuffelsen var stor.. Men det første ',
            'halvmaratonet mitt var også en åpenbaring. Jeg trengte kondis. Hadde trent minimalt med ',
            'kondisjonstrening før 2024...',
          ]),
          joinChunks([
            'UANSETT, nå løper jeg tre ganger i uka (en rolig, en intervall/tempo og en langtur) for å ',
            'prøve å få bedre kondis. Kanskje det hadde vært kult med et helmaraton når jeg har fått ned ',
            'tidene mine på 10K og halvmaraton?? Vi får se!! :D',
          ]),
        ]),
        imageAlt: 'Taheera i mål på sitt første halvmaraton',
      },
      knitting: {
        text: joinParagraphs([
          joinChunks([
            'Dette begynte vel egentlig mest som en corona-hobby fordi jeg ville ha ny genser. Den første ',
            'genseren min ble SÅÅ stygg haha, helt sykt at jeg faktisk fortsatte med strikking etter det. ',
            'Kanskje jeg sa potensialet? Kanskje jeg bare sa mange fine oppskrifter på gensere jeg bare ',
            '"måtte" ha.',
          ]),
          joinChunks([
            'Jeg har strikket en god del gensere, og mange par votter også, selv om det ene paret jeg ga ',
            'til pappa hadde en venstre vott som var MYE lenger enn høyre. Strikking er vanskelig, men ',
            'gøy!!',
          ]),
        ]),
        imageAlt: 'Taheera strikker en bucket hat',
      },
      weightlifting: {
        text: joinParagraphs([
          joinChunks([
            'Har holdt på med styrketrening siden videregående, og det er en ting jeg alltid kommer ',
            'tilbake til. Elsker følelsen det gir meg og liker å føle meg sterk!! Selv om jeg de siste to ',
            'årene har holdt på med styrke mest for å ha fokus på skadeforebygging for løping...',
          ]),
          joinChunks([
            'Back in the days tok jeg 115 kg i knebøy og 60 kg i benk, noe som er vilt fordi jeg veide ',
            'rundt 60 kg på den tiden. Jeg er også et lavt menneske, 158 cm "høy".',
          ]),
        ]),
        imageAlt: 'Taheera på treningssenteret',
      },
      reading: {
        text: joinParagraphs([
          joinChunks([
            'Jeg føler jeg la til dette mest for at det skal virke som om jeg leser. Eller, jeg leser, ',
            'men det går veldig i bolger og kommer an på om jeg finner en bok jeg liker. Leser definitivt ',
            'mest på sommeren.',
          ]),
          joinChunks([
            'Elsker, eller i hvert fall tanken på, å legge meg ned i parken med et pledd og nyte sola ',
            'mens jeg kan gjøre noe annet enn å scrolle på TikTok... haha det er vel der lesemotivasjonen ',
            'min kommer fra. Jeg vil bruke mindre tid på mobilen!',
          ]),
        ]),
        imageAlt: 'Taheera leser',
      },
      in_general: {
        text: joinParagraphs([
          joinChunks([
            'Jeg er en person som er sta i motvind, enten det gjelder vanskelige bugs og features eller ',
            'en treg halvmaratontid. Jeg har troa på at jeg, med hardt arbeid og dedikasjon, kan løse ',
            'alle problemene jeg støter på. Så lenge jeg har en god struktur rundt meg og folk som er ',
            'gira på å gi meg tips om hvor jeg kan finne informasjon, enten det gjelder løping eller bug ',
            'squashing.',
          ]),
          joinChunks([
            'Jeg er også en veldig sosial person som liker å være rundt mennesker og hjelpe andre med å ',
            'få til det de vil. Jeg føler dette må nevnes mest på grunn av stereotypen om folk som gikk ',
            'datateknologi på NTNU :,)',
          ]),
        ]),
      },
    },
    welcomeLines: [
      `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣶⡦⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⠟⠉⠉⠉⢿⣇⠀Heii du,
⢀⣴⡾⠛⠛⠭⢟⣕⣄⣾⡏⠀⠀⠀⠀⠀⣿⠀⠀Jeg heter Taheera (tahira) og jobber som "data scientist"
⡎⣿⠀⠀⠀⠀⠀⠈⢏⣿⡇⠀⠀⠀⠀⢀⡟⠀i NINA (Norsk institutt for naturforskning, [nina.no](https://www.nina.no)).
⠹⡿⡄⠀⠀⠀⠀⠀⠀⣿⣇⠀⠀⠀⣠⣟⡡⠤⢄⣀⠀⠀
⠀⠈⠻⣦⣄⠀⠀⠀⣠⡿⣿⣿⣢⡾⠋⠉⠉⠉⠓⠒⢵⣆⠀Jeg laget denne siden for å etterligne en terminal,
⠀⠀⣀⣬⠻⠷⢶⣤⡯⠀⠀⠀⢹⡇⠀⠀⠀⠀⠀⠀⠀⠹⣧  men tenkte siden det er i en nettleseren,
⢀⣾⠛⠁⠀⠀⠀⢘⣇⣀⣀⣠⣾⠏⠀⠀⠀⠀⠀⠀⠀⢀⡟  kan jeg jo legge til noen ekstra features :D
⣯⠃⠀⠀⠀⠀⠀⠀⢛⣿⠛⠉⠙⢿⣦⣀⣀⣀⣀⣀⣶⠞⠁  
⣿⡀⠀⠀⠀⠀⠀⠀⣿⡏⠀⠀⠀⠈⢯⢫⡉⠉⠉⠉⠁⠀ Jeg koste meg med å lage dette hihi
⠙⡷⣄⡀⠀⢀⡤⡺⣿⠀⠀⠀⠀⠀⠈⣇⡇  håper noen ser den <3
⠀⠈⠛⠛⠛⠛⠋⠀⠘⣆⠀⠀⠀⠀⠀⣿⠇⠀ Repo: [github.com/taheeraahmed/taheera.no-v3](https://github.com/taheeraahmed/taheera.no-v3)
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣤⣀⣤⣖⠏⠀⠀
`,
    ],
  },
}

export default localizedContent
