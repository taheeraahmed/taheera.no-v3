import { CV_FILE_NAME } from './constants'

export const DEFAULT_LANGUAGE = 'en'
export const SUPPORTED_LANGUAGES = ['en', 'no']

const localizedContent = {
  en: {
    rootFiles: {
      'CV_taheera_en.pdf': 'Open with: open CV_taheera_en.pdf',
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
        text: `This honestly felt like a HUGE honor. I was chosen to give the "students' speech" on graduation day for all the other technology students who were graduating too!! There were more than 1,000 people there. It was nerve-racking right before we went on, but the moment we stepped onto the stage it felt like most of the fear disappeared. Such a fun experience!!

For anyone especially interested, you can watch it from 55:13 [here](https://ntnu.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=8ed6a4e5-71f7-4f93-9bc4-b19400b4e6c2&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&captions=false&interactivity=all)

Ironically enough, I still had not submitted my master's thesis yet.`,
        image: '/proud_of/graduation_speech/graduation-speech.JPG',
        images: ['/proud_of/graduation_speech/graduation-speech.JPG', '/proud_of/graduation_speech/graduation-speech-2.JPEG'],
        imageAlt: 'Taheera holder tale på sin egen avgangsseremoni',
      },
      first_job: {
        text: `I got my first real adult job in 2024 after finishing my master's degree. I remember seeing the job listing on Finn about two weeks before I was due to submit my thesis and thinking, "omg I HAVE to get that job."

Luckily, it turned out to be a great match from both sides, and I am so happy with my workplace. I have lovely colleagues that I get to see every day, and the tasks vary a lot.

I have done everything from training AI models to detect reindeer in drone imagery, to building data pipelines that fetch salmon data from sensors in rivers, to wrestling with how to integrate Feide login on a website.

What I really like about this job is the wide range of tasks. It means I get to learn a little bit of everything.`,
        image: '/proud_of/first_job/first-job-1.JPG',
        images: ['/proud_of/first_job/first-job-1.JPG', '/proud_of/first_job/first-job-2.JPG'],
        imageAlt: 'Taheera på sin første dag i sin første jobb',
      },
      graduation: {
        text: `I was a student for 7 whole years. Seven years. But I did manage to earn two separate degrees: a bachelor's degree in Electrical Engineering and a master's degree in Computer Science.

The master's degree is definitely one of the hardest and most demanding things I have done so far. I wrote and coded the entire thesis on my own!`,
        image: '/proud_of/graduation/graduation-1.jpg',
        images: ['/proud_of/graduation/graduation-1.jpg', '/proud_of/graduation/graduation-2.JPEG', '/proud_of/graduation/graduation-3.JPEG', '/proud_of/graduation/graduation-4.jpg', '/proud_of/graduation/graduation-5.JPEG', '/proud_of/graduation/graduation-6.JPEG', '/proud_of/graduation/graduation-7.JPEG', '/proud_of/graduation/graduation-8.JPEG'],
        imageAlt: 'Taheera på sin egen avgangsseremoni',
      },
      my_internships: {
        text: `From 2017 to 2020, during the first three years of my studies, I struggled so much to get a summer job. I got rejection after rejection, and it was extremely disappointing.

Eventually I decided to take matters into my own hands, step out of my comfort zone, and apply for a volunteer role at Samfundet in Trondheim as a web developer. Even just applying felt scary, and I did not feel ready or good enough to apply in the first place.

Luckily I got the role, and that is where I learned all the basics. Everything from the difference between git and GitHub to development in general and, haha, what a backend actually was. I remember that being a huge mystery to me.

After that role, things started snowballing. I got my first part-time developer job at Dreamknit in 2021, and eventually landed my first summer internship at Netlight in 2022!! The rest is in my CV ;);)`,
        image: '/proud_of/internships/internships-1.JPEG',
        images: ['/proud_of/internships/internships-1.JPEG', '/proud_of/internships/internships-2.png'],
        imageAlt: 'Taheera på sin første dag i sin første internship',
      },
      first_half_marathon: {
        text: `It is honestly kind of wild that I even started running at all. From the day I was born until 2024, I hated running with my whole heart. The only thing I wanted to do was strength training.

Maybe I was a little traumatized after always being the last one on running tests in middle school and high school.

Then one day in 2024 I got peer-pressured into signing up for a half marathon. After I ran it, I realized just how slow I was and how bad my cardio actually was, so now my goal is basically just to get faster and improve my fitness. ( ͡° ͜ʖ ͡° )

And I am actually still running!!`,
        image: '/proud_of/first_half_marathon/first-half-marathon-1.jpg',
        images: ['/proud_of/first_half_marathon/first-half-marathon-1.jpg', '/proud_of/first_half_marathon/first-half-marathon-2.JPEG'],
        imageAlt: 'Taheera i mål på sitt første halvmaraton',
      },
      women_in_tech: {
        text: `During my years as a student, I cared a lot about getting more girls and women to choose technology-related studies.

- I joined the nationwide Jenter og Teknologi tour, where I, together with other role models, gave talks for girls in middle school. We visited more than 20 schools, cultural centers, cinemas, and meeting places all over the country.
- I was an emcee and also gave talks for TENK Tech Camp in Trondheim in 2020, 2021, and 2023! TENK Tech Camp is a technology camp for girls with several workshops aimed at showing them that technology can absolutely be for them. I tried to keep the attention of 13- to 15-year-olds, which was not always the easiest job.
- I took part in a series called "Jævli flink S2". You could compare it to a reality series about girls studying technology.
- Finally, I had my own TikTok profile where I tried to reach "the youth" (haha, that made me sound ancient). I mostly posted relatable content from my everyday life. It is a little hard to describe exactly what I did in grown-up language, so I will just point to [my account](https://www.tiktok.com/@tira.py) instead.`,
        image: '/about_me/women_in_tech/women-in-tech-1.JPEG',
        images: ['/about_me/women_in_tech/women-in-tech-1.JPEG', '/about_me/women_in_tech/women-in-tech-2.JPEG', '/about_me/women_in_tech/women-in-tech-3.JPEG', '/about_me/women_in_tech/women-in-tech-4.JPEG', '/about_me/women_in_tech/women-in-tech-5.JPEG', '/about_me/women_in_tech/women-in-tech-6.JPG', '/about_me/women_in_tech/women-in-tech-7.JPEG', '/about_me/women_in_tech/women-in-tech-8.JPEG'],
        imageAlt: 'Taheera på Women in Tech-konferansen i Oslo',
      },
    },
    aboutMe: {
      running: {
        text: "I hated running in 2024, but I was group-pressured into signing up for a half marathon (it was in Italy, so I thought why not?). I finished it, but used SO much time, it was humbling. This is what has fueled my running motivation :) I've ran three half-marathons since, and I'm still running. Hopefully I will manage to run a half-marathon in under two hours? We will see.",
        image: '/about_me/running/running-1.JPG',
        images: ['/about_me/running/running-1.JPG', '/about_me/running/running-2.JPG', '/about_me/running/running-3.JPG', '/about_me/running/running-4.JPG'],
        imageAlt: 'Taheera finishing her first half-marathon outdoors',
      },
      knitting: {
        text: 'I started knitting during the pandemic, there was so little to do... Now I love knitting, and I have knitted many sweaters, hehe sweaters are my favorite thing to knit!!',
        image: '/about_me/knitting/buckethat.jpg',
        imageAlt: 'Taheera knitting a bucket hat',
      },
      weightlifting: {
        text: 'Strength training has been part of my routine since high school, I still remember how scary it was entering the gym the first few times. My PR in squats is 115kg (and I weighed 60kg at the time!!)',
        image: '/about_me/weightlifting/weightlifting-1.jpg',
        images: ['/about_me/weightlifting/weightlifting-1.jpg', '/about_me/weightlifting/weightlifting-2.JPG', '/about_me/weightlifting/weightlifting-3.png'],
        imageAlt: 'Taheera at the gym',
      },
      reading: {
        text: 'Okei I have to admit, yes, I do like reading, but if I do it often?? Or regularly?? I tend to read more in the summer though. I also like to listen to NRK Leseklubben podcast WHILE I read!! this gives me a lot of motivation for finishing my book :D',
        image: '/about_me/reading/lese.jpg',
        imageAlt: 'Taheera reading',
      },
    },
    welcomeLines: [
      `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣶⡦⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⠟⠉⠉⠉⢿⣇⠀Hellooo there,
⢀⣴⡾⠛⠛⠭⢟⣕⣄⣾⡏⠀⠀⠀⠀⠀⣿⠀⠀My name is Taheera (tahira), and I work as a data scientist
⡎⣿⠀⠀⠀⠀⠀⠈⢏⣿⡇⠀⠀⠀⠀⢀⡟⠀at NINA (Norwegian Institute for Nature Research, nina.no).
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
      'CV_taheera_en.pdf': 'Åpne med: open CV_taheera_en.pdf',
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
        text: `Akkurat dette synes jeg var MEGA stas. Jeg ble valgt ut til å holde «studentenes tale» på utmatrikuleringsdagen for alle de andre teknologistudentene som også var ferdige!! Det var flere enn 1.000 mennesker der. Det var nervepirrende rett før, men da vi gikk på scenen var det som om mye av frykten forsvant. Veldig gøy opplevelse!!

Til de spesielt interesserte ligger talen her fra 55:13 [her](https://ntnu.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=8ed6a4e5-71f7-4f93-9bc4-b19400b4e6c2&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&captions=false&interactivity=all)

Ironisk nok hadde jeg fortsatt ikke levert masteroppgaven min enda.`,
        image: '/proud_of/graduation_speech/graduation-speech.JPG',
        images: ['/proud_of/graduation_speech/graduation-speech.JPG', '/proud_of/graduation_speech/graduation-speech-2.JPEG'],
        imageAlt: 'Taheera holder tale på sin egen avgangsseremoni',
      },
      first_job: {
        text: `Jeg fikk min første ordentlige voksenjobb i 2024 etter at jeg fullførte mastergraden min. Jeg husker at jeg så stillingsannonsen på Finn omtrent to uker før jeg skulle levere oppgaven min og tenkte «omg den jobben MÅ jeg ha».

Heldigvis ble det en match fra begge sider, og jeg er så fornøyd med arbeidsplassen min. Jeg har fine kollegaer som jeg møter hver dag, og veldig varierte arbeidsoppgaver.

Jeg har gjort alt fra å trene AI-modeller for å detektere reinsdyr i dronebilder, til å lage datapipelines som henter laksedata fra sensorer i elver, til å bryne meg på hvordan man integrerer Feide-innlogging på en nettside.

Det jeg liker godt med denne jobben er det store spennet i arbeidsoppgavene. På den måten får jeg litt kunnskap om alt.`,
        image: '/proud_of/first_job/first-job-1.JPG',
        images: ['/proud_of/first_job/first-job-1.JPG', '/proud_of/first_job/first-job-2.JPG'],
        imageAlt: 'Taheera på sin første dag i sin første jobb',
      },
      graduation: {
        text: `Jeg var student i 7 hele år. 7 år. Men jeg har klart å få to separate grader: en bachelorgrad i elektroingeniørfag og en mastergrad i datateknologi.

Masteren er definitivt noe av det vanskeligste og mest krevende jeg har gjort så langt. Jeg skrev og kodet hele oppgaven alene!`,
        image: '/proud_of/graduation/graduation-1.jpg',
        images: ['/proud_of/graduation/graduation-1.jpg', '/proud_of/graduation/graduation-2.JPEG', '/proud_of/graduation/graduation-3.JPEG', '/proud_of/graduation/graduation-4.jpg', '/proud_of/graduation/graduation-5.JPEG', '/proud_of/graduation/graduation-6.JPEG', '/proud_of/graduation/graduation-7.JPEG', '/proud_of/graduation/graduation-8.JPEG'],
        imageAlt: 'Taheera på sin egen avgangsseremoni',
      },
      my_internships: {
        text: `Fra 2017 til 2020, de tre første årene av studiet mitt, slet jeg skikkelig med å få sommerjobb. Jeg fikk avslag på avslag, og det var ekstremt skuffende.

Til slutt bestemte jeg meg for å ta saken i egne hender, gå ut av komfortsonen min og søke på et verv på Samfundet i Trondheim som webutvikler. Bare det å søke føltes skummelt, og jeg følte meg verken klar eller flink nok til å søke i det hele tatt.

Heldigvis fikk jeg vervet, og det var der jeg lærte alt det grunnleggende. Alt fra forskjellen på git og GitHub til utvikling generelt og haha hva en backend faktisk var. Jeg husker at det var et stort mysterium for meg.

Etter dette vervet begynte snøballen å rulle. Jeg fikk min første deltidsjobb som utvikler i Dreamknit i 2021, og landet til slutt min første sommerjobb i Netlight i 2022!! Resten kan sees i CV-en min ;);)`,
        image: '/proud_of/internships/internships-1.JPEG',
        images: ['/proud_of/internships/internships-1.JPEG', '/proud_of/internships/internships-2.png'],
        imageAlt: 'Taheera på sin første dag i sin første internship',
      },
      first_half_marathon: {
        text: `Det er faktisk helt vilt at jeg i det hele tatt begynte å løpe. Fra dagen jeg ble født og frem til 2024 hatet jeg løping av hele mitt hjerte. Det eneste jeg ville holde på med var styrketrening.

Kanskje litt traumatisert etter alltid å være sist på løpetester på ungdomsskolen og videregående.

Helt til jeg plutselig en dag i 2024 ble gruppepresset til å melde meg på et halvmaraton. Etter at jeg løp det, innså jeg hvor treg jeg faktisk var og hvor dårlig kondis jeg hadde, så målet mitt nå er egentlig bare å bli raskere og få bedre kondis. ( ͡° ͜ʖ ͡° )

Og jeg holder faktisk fortsatt på med løping!!`,
        image: '/proud_of/first_half_marathon/first-half-marathon-1.jpg',
        images: ['/proud_of/first_half_marathon/first-half-marathon-1.jpg', '/proud_of/first_half_marathon/first-half-marathon-2.JPEG'],
        imageAlt: 'Taheera i mål på sitt første halvmaraton',
      },
      women_in_tech: {
        text: `Gjennom studietiden min engasjerte jeg meg veldig mye for å få flere jenter og kvinner til å velge teknologirelaterte studier.

- Jeg var med på Norges-turneen til Jenter og Teknologi, hvor jeg sammen med andre rollemodeller holdt foredrag for jenter på ungdomsskolen. Vi var på mer enn 20 skoler, kulturhus, kinosaler og møteplasser rundt om i hele landet.
- Jeg har vært konferansier og bidratt med innlegg på TENK Tech Camp i Trondheim i 2020, 2021 og 2023! TENK Tech Camp er en teknologicamp for jenter med flere workshops som har som mål å få jentene til å tenke at teknologi også er noe for dem. Jeg prøvde å holde på oppmerksomheten til jenter mellom 13 og 15 år, og det var ikke alltid like enkelt.
- Jeg var med i en serie som heter «Jævli flink S2». Den kan kanskje sammenlignes med en realityserie om jenter som studerer teknologi.
- Til slutt hadde jeg en egen TikTok-profil hvor jeg prøvde å nå ut til «ungdommen» (haha, det får meg til å høres gammel ut). Jeg postet hovedsakelig relaterbart innhold fra hverdagen min. Det er litt vanskelig å beskrive helt presist hva jeg gjorde på voksenspråk, så jeg får heller vise til [brukeren min](https://www.tiktok.com/@tira.py).`,
        image: '/about_me/women_in_tech/women-in-tech-1.JPEG',
        images: ['/about_me/women_in_tech/women-in-tech-1.JPEG', '/about_me/women_in_tech/women-in-tech-2.JPEG', '/about_me/women_in_tech/women-in-tech-3.JPEG', '/about_me/women_in_tech/women-in-tech-4.JPEG', '/about_me/women_in_tech/women-in-tech-5.JPEG', '/about_me/women_in_tech/women-in-tech-6.JPG', '/about_me/women_in_tech/women-in-tech-7.JPEG', '/about_me/women_in_tech/women-in-tech-8.JPEG'],
        imageAlt: 'Taheera på Women in Tech-konferansen i Oslo',
      },
    },
    aboutMe: {
      running: {
        text: 'Jeg hatet løping i 2024, men ble gruppepresset til å melde meg på et halvmaraton (det var i Italia, så jeg tenkte hvorfor ikke?). Jeg fullførte, men brukte VELDIG lang tid.... Det er egentlig dette som har vært hovedgrunnen til at jeg har fortsatt: vil bare ha bedre kondis :,) Siden Italia har jeg løpt tre halvmaraton. Jeg håper jeg klarer å løpe på under 2 timer en dag :)',
        image: '/about_me/running/running-1.JPG',
        images: ['/about_me/running/running-1.JPG', '/about_me/running/running-2.JPG', '/about_me/running/running-3.JPG', '/about_me/running/running-4.JPG'],
        imageAlt: 'Taheera i mål på sitt første halvmaraton',
      },
      knitting: {
        text: 'Jeg begynte å strikke under pandemien, det var så lite å finne på... Nå elsker jeg strikking, og har strikket mange gensere. Hehe, gensere er favoritten min å strikke!!',
        image: '/about_me/knitting/buckethat.jpg',
        imageAlt: 'Taheera strikker en bucket hat',
      },
      weightlifting: {
        text: 'Jeg har holdt på med styrketrening siden videregående. Jeg husker fortsatt hvor skummelt det var å gå inn på treningssenteret de første gangene. PR i knebøy er 115kg (og jeg veide 60kg da!!).',
        image: '/about_me/weightlifting/weightlifting-1.jpg',
        images: ['/about_me/weightlifting/weightlifting-1.jpg', '/about_me/weightlifting/weightlifting-2.JPG', '/about_me/weightlifting/weightlifting-3.png'],
        imageAlt: 'Taheera på treningssenteret',
      },
      reading: {
        text: 'Okei, så jeg liker å lese, ja, men om jeg gjør det ofte?? eller regelmessig?? Jeg leser nok mest om sommeren. Jeg liker også å høre på NRK Leseklubben-podkasten MENS jeg leser!! Det gjør at jeg faktisk fullfører bøkene jeg starter på hehe :D',
        image: '/about_me/reading/lese.jpg',
        imageAlt: 'Taheera leser',
      },
    },
    welcomeLines: [
      `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣶⡦⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⠟⠉⠉⠉⢿⣇⠀Heii du,
⢀⣴⡾⠛⠛⠭⢟⣕⣄⣾⡏⠀⠀⠀⠀⠀⣿⠀⠀Jeg heter Taheera (tahira) og jobber som "data scientist"
⡎⣿⠀⠀⠀⠀⠀⠈⢏⣿⡇⠀⠀⠀⠀⢀⡟⠀i NINA (Norsk institutt for naturforskning, nina.no).
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

export const getLocalizedContent = (language = DEFAULT_LANGUAGE) =>
  localizedContent[language] ?? localizedContent[DEFAULT_LANGUAGE]


const languageLabels = {
  en: 'English',
  no: 'Norsk',
}

const normalizeMap = {
  en: 'en',
  english: 'en',
  no: 'no',
  nb: 'no',
  nn: 'no',
  norsk: 'no',
  norwegian: 'no',
}

const uiMessages = {
  en: {
    contactCardAriaLabel: 'Contact card',
    cvPreviewAriaLabel: 'CV preview',
    activateCvWindowAriaLabel: 'Activate CV window',
    cvFrameTitle: 'Taheera CV',
    closeButtonAriaLabel: 'Close',
    escapePrefix: 'Press',
    closeTerminalSuffix: 'to return to the terminal.',
    closeDialogSuffix: 'to close',
    contactCardLabels: {
      role: 'Role',
      organization: 'Organization',
      website: 'Website',
      location: 'Location',
      email: 'Email',
    },
    socialTitles: {
      linkedin: 'LinkedIn profile',
      github: 'GitHub profile',
      email: 'Send an email',
      tiktok: 'TikTok profile',
    },
  },
  no: {
    contactCardAriaLabel: 'Kontaktkort',
    cvPreviewAriaLabel: 'CV-forhåndsvisning',
    activateCvWindowAriaLabel: 'Aktivér CV-vindu',
    cvFrameTitle: 'Taheera CV',
    closeButtonAriaLabel: 'Lukk',
    escapePrefix: 'Trykk',
    closeTerminalSuffix: 'for å gå tilbake til terminalen.',
    closeDialogSuffix: 'for å lukke',
    contactCardLabels: {
      role: 'Rolle',
      organization: 'Organisasjon',
      website: 'Nettside',
      location: 'Sted',
      email: 'E-post',
    },
    socialTitles: {
      linkedin: 'LinkedIn-profil',
      github: 'GitHub-profil',
      email: 'Send e-post',
      tiktok: 'TikTok-profil',
    },
  },
}

const terminalMessages = {
  en: {
    windowTitle: 'simple-but-enhanced-cool-shell',
    inputPlaceholder: 'Type a command...',
    shellInputAria: 'Shell command input',
    terminalAria: 'Interactive shell portfolio',
    contactCardAria: 'Contact card',
    emptyDirectory: '(empty)',
    openingCv: `Opening ${CV_FILE_NAME}...`,
    commandNotFound: (command) => `${command}: command not found`,
    lsCannotAccess: (target) => `ls: cannot access '${target}': No such file or directory`,
    cdNoSuchDirectory: (target) => `cd: no such file or directory: ${target}`,
    cdNotDirectory: (target) => `cd: not a directory: ${target}`,
    catMissingOperand: 'cat: missing file operand',
    catNoSuchFile: (target) => `cat: ${target}: No such file or directory`,
    catIsDirectory: (target) => `cat: ${target}: Is a directory`,
    openMissingOperand: 'open: missing file operand',
    openCannotOpen: (target) => `open: cannot open '${target}'`,
    openNoPreview: (target) => `open: '${target}' does not support browser preview`,
    bashNoSuchFile: (target) => `bash: ${target}: No such file or directory`,
    langUsage: 'Usage: lang <en|no> or lang list',
    langCurrent: (lang) =>
      `Current language: ${languageLabels[lang] ?? lang} (${lang})\nAvailable languages: ${SUPPORTED_LANGUAGES.join(', ')}`,
    langChanged: (lang) => `Language switched to ${languageLabels[lang] ?? lang} (${lang}).`,
    langAlreadySet: (lang) => `Language is already ${languageLabels[lang] ?? lang} (${lang}).`,
    langUnsupported: (value) =>
      `Unsupported language '${value}'. Available languages: ${SUPPORTED_LANGUAGES.join(', ')}`,
    hintCommands: ['help', 'ls', 'bash card.sh', `open ${CV_FILE_NAME}`, 'lang no'],
    helpText: [
      'Commands:',
      '  help              Show available commands',
      '  welcome           Quick intro about me',
      '  ls [path]         List files and folders',
      '  cd <path>         Change directory',
      '  pwd               Print current path',
      '  cat <file>        Read a file',
      '  open <file>       Open a .pdf file',
      '  bash <file>       Run a shell script',
      '  lang <code>       Switch language (en/no)',
      '  clear             Clear terminal output',
      '  chat <message>    Chat with an AI (runs in browser)',
    ].join('\n'),
  },
  no: {
    windowTitle: 'simple-but-enhanced-cool-shell',
    inputPlaceholder: 'Skriv en kommando...',
    shellInputAria: 'Shell kommando input',
    terminalAria: 'Interaktivt shell-portfolio',
    contactCardAria: 'Kontaktkort',
    emptyDirectory: '(tom)',
    openingCv: `Åpner ${CV_FILE_NAME}...`,
    commandNotFound: (command) => `${command}: kommando ikke funnet`,
    lsCannotAccess: (target) => `ls: kan ikke åpne '${target}': filen eller mappen finnes ikke`,
    cdNoSuchDirectory: (target) => `cd: mappen finnes ikke: ${target}`,
    cdNotDirectory: (target) => `cd: ikke en mappe: ${target}`,
    catMissingOperand: 'cat: manglende fil-argument',
    catNoSuchFile: (target) => `cat: ${target}: filen finnes ikke`,
    catIsDirectory: (target) => `cat: ${target}: er en mappe`,
    openMissingOperand: 'open: manglende fil-argument',
    openCannotOpen: (target) => `open: kan ikke åpne '${target}'`,
    openNoPreview: (target) => `open: '${target}' støtter ikke nettleserforhåndsvisning`,
    bashNoSuchFile: (target) => `bash: ${target}: filen finnes ikke`,
    langUsage: 'Bruk: lang <en|no> eller lang list',
    langCurrent: (lang) =>
      `Gjeldende språk: ${languageLabels[lang] ?? lang} (${lang})\nTilgjengelige språk: ${SUPPORTED_LANGUAGES.join(', ')}`,
    langChanged: (lang) => `Språk byttet til ${languageLabels[lang] ?? lang} (${lang}).`,
    langAlreadySet: (lang) => `Språk er allerede ${languageLabels[lang] ?? lang} (${lang}).`,
    langUnsupported: (value) =>
      `Støtter ikke språk '${value}'. Tilgjengelige språk: ${SUPPORTED_LANGUAGES.join(', ')}`,
    hintCommands: ['help', 'ls', 'bash card.sh', `open ${CV_FILE_NAME}`, 'lang en'],
    helpText: [
      'Kommandoer:',
      '  help              Vis tilgjengelige kommandoer',
      '  welcome           Kort intro om meg',
      '  ls [path]         List filer og mapper',
      '  cd <path>         Bytt mappe',
      '  pwd               Vis gjeldende sti',
      '  cat <file>        Les en fil',
      '  open <file>       Åpne en .pdf fil',
      '  bash <file>       Kjør et shell-script',
      '  lang <code>       Bytt språk (en/no)',
      '  clear             Tøm terminalutskriften',
      '  chat <melding>    Chat med en AI (kjøres i nettleseren)',
    ].join('\n'),
  },
}

export const normalizeLanguage = (value) => normalizeMap[value?.toLowerCase()] ?? null

export const getTerminalStrings = (language) => {
  if (terminalMessages[language]) {
    return terminalMessages[language]
  }

  return terminalMessages[DEFAULT_LANGUAGE]
}

export const getUiStrings = (language) => {
  if (uiMessages[language]) {
    return uiMessages[language]
  }

  return uiMessages[DEFAULT_LANGUAGE]
}
