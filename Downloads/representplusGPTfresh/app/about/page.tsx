import Image from "next/image";

// --- NEW DATA FOR THE ARTISTS SECTION ---
// We define it right here in the file for simplicity.
const ARTISTS = [
  { name: 'Jane Doe', specialty: 'Dramatic Actor', image: '/artist-jane.jpg' },
  { name: 'John Smith', specialty: 'Voice Over Artist', image: '/artist-john.jpg' },
  { name: 'Alina Petrova', specialty: 'Commercial Model', image: '/artist-alina.jpg' },
  { name: 'Ken Watanabe', specialty: 'Character Actor', image: '/artist-ken.jpg' },
];

const Hero = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div className="hero-map" />

      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <Image 
          src="/camp.svg"
          alt="camp"
          width={50}
          height={50}
          className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
        />
        <h1 className="bold-52 lg:bold-88">Represent GPT</h1>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]">
          We want to be on each of your journeys seeking the satisfaction of seeing the incorruptible beauty of nature. We can help you on an adventure around the world in just one app
        </p>

        {/* ... (Your stars and reviews section remains the same) ... */}
        <div className="my-11 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {Array(5).fill(1).map((_, index) => (
              <Image 
                src="/star.svg"
                key={index}
                alt="star"
                width={24}
                height={24}
              />
            ))}
          </div>

          <p className="bold-16 lg:bold-20 text-blue-70">
            198k
            <span className="regular-16 lg:regular-20 ml-1">Excellent Reviews</span>
          </p>
        </div>

        {/* ... (Your button section remains the same) ... */}
        <div className="flex flex-col w-full gap-3 sm:flex-row">
          {/* You can replace 'green-50' with a new color in tailwind.config.ts if you wish */}
          <button type="button" className="btn_green">Download App</button>
          <button type="button" className="btn_white_text">How we work?</button>
        </div>
      </div>
      {/* ... (Your hero card section remains the same) ... */}
    </section>
  )
}

const Features = () => {
  return (
    // ADDED UNIFORM PADDING AND A CLEAR BACKGROUND
    <section className="flex-col flexCenter overflow-hidden bg-feature-bg bg-center bg-no-repeat py-24">
      <div className="max-container padding-container relative w-full flex justify-end">
        {/* RESTRUCTURED INTO A TWO-COLUMN LAYOUT */}
        <div className="flex flex-1 lg:min-h-[900px]">
          <Image
            src="/phone.png"
            alt="phone"
            width={440}
            height={1000}
            className="feature-phone"
          />
        </div>

        <div className="z-20 flex w-full flex-col lg:w-[60%]">
          <div className='relative'>
            <Image
              src="/camp.svg"
              alt="camp"
              width={50}
              height={50}
              className="absolute left-[-5px] top-[-28px] w-10 lg:w-[50px]"
            />
            <h2 className="bold-40 lg:bold-64">Our Features</h2>
          </div>
          {/* Note: This section currently has no features listed. This is a placeholder for where they would go. */}
          <p className="regular-16 mt-5 text-gray-30">
            This section is ready for your feature list. You can add a grid of features here to describe what makes your agency platform unique and powerful for talent representation.
          </p>
        </div>
      </div>
    </section>
  )
}

// --- NEW ARTISTS SECTION ---
const Artists = () => {
  return (
    <section className="max-container padding-container py-24">
      <div className="flex flex-col items-center text-center">
        <h2 className="bold-40 lg:bold-64">Featured Talent</h2>
        <p className="regular-16 mt-4 text-gray-30 max-w-lg">
          A selection of the exceptional individuals we represent, ready to bring your creative vision to life.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
        {ARTISTS.map(artist => (
          <div key={artist.name} className="flex flex-col items-center text-center group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gray-500 group-hover:border-green-50 transition-all duration-300">
              {/* You will need to add these images to your /public folder */}
              <Image 
                src={artist.image} 
                alt={artist.name} 
                layout="fill" 
                objectFit="cover" 
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="bold-20 mt-4">{artist.name}</h3>
            {/* Using the same green as your buttons for consistency */}
            <p className="regular-16 text-green-50">{artist.specialty}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const Guide = () => {
  return (
    <section className="flexCenter flex-col py-24">
      {/* ... (Your existing Guide component code) ... */}
    </section>
  )
}

const GetApp = () => {
  return (
    <section className="flexCenter w-full flex-col pb-[100px]">
      {/* ... (Your existing GetApp component code) ... */}
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Artists /> {/* MOVED ARTISTS TO BE MORE PROMINENT */}
      <Guide />
      <Features />
      <GetApp />
    </>
  )
}