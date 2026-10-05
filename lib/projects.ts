export type Project = {
  /** URL segment for the case-study page, e.g. /work/creative-leadership */
  slug: string
  title: string
  role: string
  meta: string
  image: string
  alt: string
  /** Tailwind object-position class for the hero banner image, e.g. 'object-[50%_85%]' */
  imagePosition?: string
  /** Tailwind object-position class for the homepage thumbnail image, e.g. 'object-bottom' */
  thumbPosition?: string
  /** Larger emphasis for lead projects in the editorial grid */
  feature?: boolean
  /** Marks the piece as a video so the card shows a play cue */
  video?: boolean
  /** Overlays a motion-capture software HUD along the banner seams */
  captureHud?: boolean
  /** Renders a pile of card-stock print cutouts in the banner (external development hero) */
  heroScatter?: boolean
  /**
   * Renders a layered art collage in the banner instead of the single image.
   * portrait = full-height backdrop, device = tilted framed card, sticker = floating transparent PNG.
   */
  heroCollage?: {
    portrait: { src: string; alt: string }
    device: { src: string; alt: string }
    sticker: { src: string; alt: string }
  }
  /**
   * Renders two overlapping "film still" frames on a dark stage.
   * wide = landscape action frame, portrait = tall close-up inset.
   */
  heroDuo?: {
    wide: { src: string; alt: string }
    portrait: { src: string; alt: string }
  }
  /** Optional outbound film / reel link surfaced on the detail page */
  videoHref?: string
  /**
   * Inline video players shown near the top of the case-study body.
   * Each clip can be a YouTube embed (youTubeId) OR a self-hosted file (src).
   * Leave both empty to render a labeled "footage coming" placeholder.
   */
  clips?: {
    label: string
    caption?: string
    /** YouTube video id, e.g. 'y1dqY897UTc' */
    youTubeId?: string
    /** Start time in seconds for a YouTube embed */
    start?: number
    /** Path to a self-hosted file, e.g. '/videos/mocap.mp4' */
    src?: string
  }[]

  /* ---- Case-study page content ---- */
  /** Short line beneath the title on the detail page */
  tagline: string
  /** Franchises / studios / context line */
  context?: string
  /** Narrative paragraphs for the overview */
  overview?: string[]
  /** Major sub-areas within a case study, each a heading, paragraph, and optional image group */
  sections?: {
    title: string
    /** Optional short introductory sentence; omit for bullet-only capability sections */
    body?: string
    images?: { src?: string; alt: string; caption?: string; wide?: boolean; aspect?: string; embedUrl?: string; embedTitle?: string; crop?: string; contain?: boolean; transparent?: boolean; logo?: 'codm' }[]
  /** Share one column split across paired image rows so their outer and inner edges line up */
  alignColumns?: boolean
    /** Up to ~4 short, scannable supporting points */
    bullets?: string[]
    /**
     * A code-based left-to-right process sequence (e.g. Concept → Process → Final → In-Game).
     * kind 'asset' renders an image when src is set, otherwise a labeled placeholder; 'process' renders understated text.
     */
    pipeline?: {
      label: string
      note?: string
      /** Stacked bullet points for a 'process' stage */
      notes?: string[]
      kind?: 'asset' | 'process'
      src?: string
      alt?: string
    }[]
    /** Optional single visual that represents the full pipeline story */
    pipelineHero?: { src: string; alt: string }
    /** Optional short line describing what the pipeline sequence illustrates */
    pipelineCaption?: string
    /** Renders the section as two columns: title/body/bullets beside a single tall (portrait) image */
    aside?: boolean
  }[]
  /** Eyebrow label above the sections block (defaults to "Areas of Direction") */
  sectionsLabel?: string
  /** Discipline tags shown as a quick-scan list */
  disciplines: string[]
  /** Concrete contributions, each a short label + supporting detail */
  contributions?: { label: string; detail: string }[]
  /** Supporting image examples for the case-study gallery */
  gallery?: { src: string; alt: string; caption: string; wide?: boolean; aspect?: string; transparent?: boolean }[]
  /** Small attribution note shown at the end of the case study (e.g. external-vendor imagery) */
  disclaimer?: string
}

export const projects: Project[] = [
  {
    slug: 'creative-leadership',
    title: 'Creative Leadership',
    role: 'Translating Direction & Team Alignment',
    meta: '',
    image: '/images/work-03.jpg',
    alt: 'Imagery representing creative leadership and visual direction',
    feature: true,
    heroCollage: {
      portrait: {
        src: '/images/cl-teenage-hacker.jpg',
        alt: 'Cyberpunk character avatar — a youth with magenta-streaked hair and glowing circuitry across the neck, from Call of Duty: Mobile',
      },
      device: {
        src: '/images/cl-used-pc.jpg',
        alt: 'Retro-futuristic computer avatar reading LEET haxor, from Call of Duty: Mobile',
      },
      sticker: {
        src: '/images/cl-garand-sticker.png',
        alt: 'Stylized M1 Garand rifle sticker firing with its en-bloc clip ejecting, from Call of Duty: Mobile',
      },
    },
    tagline: 'Creative leadership for live-service content, informed by hands-on production experience.',
    sectionsLabel: '',
    sections: [
      {
        title: 'Creative Direction & Content Design',
        body: 'Help ensure assets are creatively strong and aligned with seasonal goals, including MTX considerations, player expectations, and production realities.',
        pipelineHero: {
          src: '/images/snoop-partnership-composite-nologo.jpeg',
          alt: 'Snoop Dogg Call of Duty: Mobile partnership composite showing finished 3D character views transitioning into an in-game action image',
        },
        pipelineCaption: 'Snoop Dogg - The Doggfather',
        pipeline: [
          {
            label: 'Concept',
            kind: 'asset',
            src: '/images/snoop-concept.jpg',
            alt: 'Snoop Dogg operator concept key art: front and back views in a gold-and-black floral coat, staged in a garage with a yellow classic car',
          },
          {
            label: 'Final 3D Asset',
            kind: 'asset',
            src: '/images/snoop-3d-turnaround.jpg',
            alt: 'Four-angle turnaround of the finished Snoop Dogg 3D character model on a black background',
          },
          {
            label: 'In-Game',
            kind: 'asset',
            src: '/images/snoop-ingame.jpg',
            alt: 'Call of Duty: Mobile in-game shot of the Snoop Dogg operator aiming a golden pistol',
          },
        ],
  bullets: [
'Contribute to keeping seasonal content aligned creatively and commercially across art, design, and production.',
          'Give internal teams and vendors a shared reference by authoring and maintaining SOPs, technical pipeline documentation, presentations, and vendor briefs.',
          'Sped up reference and ideation by introducing AI-assisted workflows, with presentations and guidance adopted by the content team.',
  'Took on content design across multiple live-service seasons in addition to managing outsource art production.',
  ],
        aside: true,
        images: [
          {
            src: '/images/mtx-2d-collage-v2.webp',
            alt: 'Collage of Call of Duty: Mobile 2D content: a blue gas mask spray wreathed in green smoke, a concept of a hamster in a space helmet and suit for a weapon charm, and three calling cards showing a red-armored warrior mid-slide, a diver facing a giant red-eyed sea creature, and a masked wrestler leaping in a ring',
            caption: 'Spray, Charm Concept & Calling Cards',
            aspect: '1600/2095',
            transparent: true,
          },
        ],
      },
      {
        title: 'Character Development',
        body: 'Help characters reach players true to their concept and the franchise, through creative input across development and art direction on select assets.',
        images: [
          {
            src: '/images/character-reaper-assassin.jpg',
            alt: 'Sci-fi character turnaround: a chrome skull-faced figure in an armored formal suit with a red tie and flowing red cape, shown from four angles',
            caption: 'Reaper - Style Assassin',
            wide: true,
            aspect: '7069/3573',
          },
        ],
  bullets: [
  'Contribute to translating franchise guidelines into production-ready assets, partnering with design leads and the art director to balance visual quality, technical constraints, gameplay, and player experience.',
  'Led character concept and asset direction on select assets, carrying them from initial concept through final execution.',
  ],
      },
    ],
    disciplines: [
  'Creative Problem Solving',
  'Cross-Discipline Alignment',
  'Briefing & Documentation',
  'Live-Service Content Design',
  'AI-Assisted Workflows',
      'Character Development',
    ],
    disclaimer:
      'Unless otherwise noted, all artwork shown was produced by external vendors. My involvement varied by asset and included stakeholder collaboration, creative briefing, and, on select assets, concept and asset direction.',
  },
  {
    slug: 'external-development',
    title: 'External Development',
    role: 'Outsource Management & Partner Collaboration',
    meta: '',
  heroScatter: true,
  image: '/images/production-collaboration-collage.png',
  imagePosition: 'object-contain [image-rendering:auto]',
  alt: 'Collage of externally-produced Call of Duty: Mobile and Volta assets — two Volta environment scenes (a beached red seaplane and a ruined carnival), a blue starry weapon skin, a wendigo emblem, a cartoon pigeon charm, and a red masked character',
    tagline: 'Managing external partners at AAA scale and quality.',
    disciplines: ['Partner Management', 'Creative Problem Solving', 'Milestone Tracking', 'Delivery Coordination'],
    sectionsLabel: '',
    sections: [
      {
  title: 'Partner Direction',
  body: 'Set external partners up to succeed from the start through onboarding, clear direction, and consistent communication.',
  bullets: [
      'Help external teams operate as effective extensions of the core development group.',
      'Get new partners up to speed quickly by onboarding external studios and independent artists on franchise guidelines, technical specs, and review expectations.',
      'Build productive partner relationships through clear expectations and consistent communication.',
        ],
        images: [
          {
            src: '/images/external-partner-direction.jpg',
            alt: 'Three masked armored operator character development views, including a turnaround and an in-environment weapon pose',
            caption: 'Kryptis - Refraction',
            aspect: '2000/1000',
            wide: true,
          },
        ],
      },
      {
  title: 'Production Collaboration',
  body: 'Keep outsourced work moving in step with internal schedules through close coordination with vendors, partner studios, and internal teams.',
  bullets: [
          'Coordinate with vendors, Tencent/TiMi production partners, internal stakeholders, and cross-disciplinary teams.',
          'Track assets through each round of iteration to help keep overlapping seasonal schedules on track.',
          'Protect quality and delivery by resolving creative and production issues before they escalate.',
        ],
        images: [
          {
            src: '/images/external-development-collage.png',
            alt: 'Collage of externally-produced Call of Duty: Mobile and Volta assets — a snow sniper scene with a rabbit, alien and cold-weather operator turnarounds, a fiery dragon weapon, gold winged weapon concepts, a voltage-meter prop, gingerbread and skull emblems, a red mask, and a robot-lineup scene',
            caption: 'Cross-Sample of Live Ops Content',
            aspect: '2400/1080',
            wide: true,
            contain: true,
          },
        ],
      },
      {
        title: '3D Asset Review & Approval',
        body: 'Help vendor assets arrive on-concept, consistent, and game-ready through structured review and approval.',
        bullets: [
          'Hold multiple parallel vendors to one quality bar through review checklists and approval checkpoints.',
      'Review character assets for parity with concept, anatomy, silhouette, proportions, materials, technical accuracy, and franchise consistency.',
      'Review weapons and hard-surface assets for parity with concept, readability, proportion, detail, materials, and engine readiness.',
'Support a clear feedback pipeline between internal teams and vendors so that creative intent holds up through each revision.',
          'Avoid late rework by flagging key creative decisions and issues to the right stakeholders early.',

        ],
        aside: true,
        images: [
          {
            src: '/images/extdev/rivas-neon-front.png',
            alt: 'Front view of the finished Rivas neon 3D character model: an operator in glowing purple LED shades, an iridescent magenta jacket over a tactical vest, neon glow sticks and bracelets, and paint-splattered white cargo pants',
            caption: 'Rivas - Neon',
            aspect: '768/1376',
            transparent: true,
          },
          {
  src: '/images/quality-oversight-weapon-trim.png',
  alt: 'Ornate black, gold, and ivory winged rifle shown in profile',
  caption: 'Legendary AK117 - Molting Mauler',
  aspect: '3273/1021',
            transparent: true,
          },
        ],
      },
    ],
    disclaimer:
      'Unless otherwise noted, all artwork shown was produced by external vendors. My involvement included various levels of stakeholder collaboration, creative briefing and direction, production oversight, and 3D review and QA.',
  },
  {
    slug: 'visual-design-rock-band',
    title: 'Visual Design',
    role: 'Gameplay & Concept Development',
    meta: '',
    image: '/images/visual-design-rb-track.jpg',
    alt: 'Rock Band 4 note highway with diamond note gems, gold-bordered lanes, and green glowing amp housings firing hit VFX',
    imagePosition: 'object-[50%_88%]',
    thumbPosition: 'object-bottom',
    feature: true,
    tagline: 'HUD, VFX, and Freestyle Solo design for a shipped music franchise.',
    disciplines: ['HUD Design', 'Gameplay VFX', 'Gameplay Feedback', 'Concept & Visual Development'],
    sectionsLabel: '',
    sections: [
      {
        title: 'HUD & VFX — Primary Artist',
        body: "Kept rhythm gameplay readable at a glance while extending Rock Band's established look, working with UI, art direction, and tech on the track HUD and VFX.",
        bullets: [
  'Designed and created gameplay track HUD elements and VFX through engine integration.',

          'Designed timing, hit, and reward feedback that stayed clear without adding visual noise.',
        ],
        images: [
          {
            src: '/images/rock-band-gameplay.jpg',
            alt: 'Rock Band 4 gameplay scene with three note highways, a live band, crowd, and score UI',
            caption: 'Shipped gameplay: HUD and VFX built for readable rhythm play with a music-forward identity.',
            wide: true,
            aspect: '2880/1620',
          },
        ],
      },
      {
        title: 'Freestyle Solo — Primary Artist',
        body: 'Gave players a clear, learnable way to play freestyle solos as primary artist on the visual development of the track-symbol language used in the shipped feature.',
        bullets: [
          'Worked with the Solo Team and audio lead to design symbols for beat lengths, techniques, and feedback states.',
          'Explored and validated the visual language through concept development.',
          'Carried the approved patterns into the final in-game designs.',
        ],
        images: [
          {
            src: '/images/rock-band-sustain-concept.jpg',
            alt: 'Freestyle Solo track-symbol concept sheet with 8-beat and 1-beat wood-grain panels, a feedback state, and the note highway',
            caption: 'One of my Freestyle Solo concept pieces — this track-symbol pattern became the design used in the shipped game.',
            aspect: '1792/1696',
          },
          {
            src: '/images/rock-band-freestyle-legend.jpg',
            alt: 'Freestyle Guitar Solo quick-start legend showing sustain, strum 2x/4x, tapping, feedback, and free states with low and high lanes',
            caption: 'The Freestyle Solo symbol legend — sustain, strum, tapping, and feedback states built from the visual language I developed in collaboration with the Solo Team.',
            aspect: '1472/1920',
          },
          {
            src: '/images/rock-band-freestyle-ingame.jpg',
            alt: 'In-game Rock Band 4 freestyle solo screenshot with a curving blue note highway, purple and orange feedback trails, and a band on stage',
            caption: 'Freestyle Solo live in-engine — the track symbols and feedback trails in action during gameplay.',
            wide: true,
            aspect: '1408/768',
          },
        ],
      },
      {
        title: 'Additional Visual Development',
        body: 'Helped expand the Rock Band world beyond the note highway through instrument, hardware, and prop design.',
        bullets: [
          'Developed concepts from early exploration through finished presentation.',
          'Designed selected assets that were produced and shipped in-game.',
          'Created additional exploratory work to investigate new forms and gameplay surfaces.',
        ],
        alignColumns: true,
        images: [
          {
            src: '/images/rock-band-axe-concept.jpg',
            alt: 'Concept render of a battle-axe-shaped Rock Band 4 guitar with a black body, axe-blade lower bout, and gold strings',
            caption: 'Axe guitar concept for eventual use in game.',
            aspect: '2912/2304',
          },
          {
            src: '/images/rock-band-axe-ingame.jpg',
            alt: 'In-game Rock Band 4 screenshot of a character on stage playing the axe-shaped guitar under purple lighting with Fender amps',
            caption: 'The same axe guitar in-engine — the concept realized in gameplay.',
            aspect: '2560/1417',
          },
          {
            src: '/images/rock-band-arc-amp-concept.jpg',
            alt: 'Retro Rock Band Arc-Amp hardware concept sheet showing multiple views and a gameplay surface',
            caption: 'Retro “Arc-Amp” — hardware I designed and modeled; an exploratory concept piece.',
            aspect: '2048/1920',
          },
          {
            src: '/images/rock-band-pedalboard.jpg',
            alt: 'In-game Rock Band 4 render of a guitar effects pedalboard with Highway Metal, British Rock, British Classic, Echo, Chorus, and Vibe pedals on a stage floor',
            caption: 'Positive Grid pedalboard — designed and modeled by me, shown in-game.',
            aspect: '1920/1151',
          },
        ],
      },
    ],
  },
  {
    slug: 'performance-direction',
    title: 'Performance Direction',
    role: 'Writing & Talent Direction',
    meta: '',
    image: '/images/work-mocap-hero.jpg',
    alt: 'Motion-capture performers in marker suits on stage alongside the resulting Call of Duty: Mobile in-game character',
    heroDuo: {
      wide: {
        src: '/images/performance-mocap-stage.jpg',
        alt: 'Two performers in motion-capture marker suits acting out a fight beat on a mocap stage for Call of Duty: Mobile',
      },
      portrait: {
        src: '/images/performance-mocap-actor.jpg',
        alt: 'Close-up of a performer in a motion-capture suit and marker beanie mid-take on the capture stage',
      },
    },
    video: true,
    videoHref: 'https://youtu.be/y1dqY897UTc',
    clips: [
      {
        label: 'Motion Capture to Gameplay',
        caption: 'Motion-capture session with the resulting Call of Duty: Mobile performance.',
        youTubeId: 'y1dqY897UTc',
        start: 21,
      },
    ],
    tagline: 'Guiding writing, capture, and on-set talent to bring characters to life.',
    sectionsLabel: '',
    sections: [
      {
        title: 'Performance-Capture Writing & Direction',
        body: 'I write and direct emotes for Call of Duty: Mobile, developing action beats and guiding performers through motion capture. The video below highlights a session for the WWE collaboration featuring Alexa Bliss, in which we captured takedowns and an emote.',
        bullets: [
      'Develop scripts and action beats broken down into shootable moments.',
      'Direct on-set talent alongside the capture crew.',
      'Work with the capture team to preserve character intent through final implementation.',
        ],
      },
    ],
    disciplines: ['Script & Beat Development', 'Motion Capture Direction', 'Talent Direction'],
    contributions: [
      { label: 'Pre-production', detail: 'Scripts broken into shootable beats.' },
      { label: 'On-set direction', detail: 'Directing talent with the capture crew.' },
      { label: 'Post & integration', detail: 'Protecting intent through to the engine.' },
    ],
  },
  {
    slug: 'photogrammetry-innovation',
    title: 'Creative Exploration',
    role: 'Photogrammetry & VR Sculpting',
    meta: '',
    image: '/images/work-06.jpg',
    alt: 'Imagery representing photogrammetry and production-technology experimentation',
    tagline: 'Exploring new capture and sculpting tools — personal experiments driven by curiosity and creative play.',
    disciplines: ['Photogrammetry', 'VR Sculpting', 'Technical Exploration', 'Creative Problem Solving'],
    sectionsLabel: '',
    sections: [
      {
        title: 'Photogrammetry',
        body: 'Capturing real-world subjects as usable 3D data — working through lighting, coverage, cleanup, and retopology to turn scans into production-ready assets.',
        images: [
          {
            embedUrl: 'https://sketchfab.com/models/162de983e7de4724a4a0720d8a4fbffc/embed',
            embedTitle: 'Grave Memorial',
            alt: 'Interactive 3D photogrammetry scan of a grave memorial',
            caption: 'Memorial — my photogrammetry capture of a large grave memorial, viewable in 3D.',
            wide: true,
          },
        ],
      },
      {
        title: 'VR Sculpting',
        body: 'Sculpting directly in VR to explore form and silhouette quickly, iterating on shapes faster than traditional workflows allow.',
        images: [
          {
            embedUrl: 'https://sketchfab.com/models/4bbf79395d6644bbb03bdbcfd1a9ee29/embed',
            embedTitle: 'Ancient Alien - Medium VR and Substance Painter',
            alt: 'Interactive 3D VR sculpt of an ancient alien, made in Medium and Substance Painter',
            caption: 'Ancient Alien — sculpted in VR (Medium) and textured in Substance Painter.',
            aspect: '16/10',
          },
          {
            embedUrl: 'https://sketchfab.com/models/f756908c91a74b0abafbd9eb693a983c/embed',
            embedTitle: 'ICA Demo Pumpkin - Medium to Painter - VR Sculpt',
            alt: 'Interactive 3D VR sculpt of a demo pumpkin, made in Medium and Substance Painter',
            caption: 'ICA Demo Pumpkin — VR sculpt taken from Medium into Substance Painter.',
            aspect: '16/10',
          },
        ],
      },
      {
        title: 'Applied Problem Solving',
        body: 'Technique in service of a real need: I 3D-printed creature masks and photogrammetry-scanned a hardhat helmet so each mask could mount to it — giving performers a secure, wearable rig, fabricated and hand-painted to fit.',
        images: [
          { src: '/images/mask-helmet-lineup.jpg', alt: 'Four 3D-printed creature masks mounted on hardhat helmets, lined up on a workbench', caption: 'Printed creature masks mounted to scanned hardhat helmets — a wearable performer rig.', wide: true },
        ],
      },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
