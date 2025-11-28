export default function AboutUs() {
  return (
    <section className="relative py-20 bg-[#F7F7F2] overflow-hidden">

      {/* Side Decorative Images */}
      <img
        src="https://www.benihanainternational.com/wp-content/themes/grilla/img/left-letters.svg"
        alt=""
        className="absolute left-0 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none hidden md:block"
      />
      <img
        src="https://www.benihanainternational.com/wp-content/themes/grilla/img/right-letters.svg"
        alt=""
        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none hidden md:block"
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

        {/* Flower Icon */}
        <img
          src="https://www.benihanainternational.com/wp-content/uploads/2025/07/flower.svg"
          alt=""
          className="mx-auto mb-10 w-24 md:w-32"
        />

        {/* Title */}
        <h2 className="text-3xl md:text-[32px] font-extrabold leading-snug text-[#02130E] uppercase tracking-wide">
          Two Benihana Restaurants in London –
        </h2>

        {/* Description */}
        <div className="mt-6 space-y-5 text-base md:text-lg text-[#333] max-w-2xl mx-auto leading-relaxed">
          <p>
            At Benihana, every meal is more than just dining — it’s a show.
            With two London locations in Chelsea and Covent Garden, we bring
            world-famous Japanese teppanyaki theatre to your table.
          </p>
          <p>
            Whether you’re celebrating a birthday, marking an anniversary,
            hosting a business dinner, or simply gathering with friends,
            Benihana sets the stage for unforgettable moments.
          </p>
          <p>
            From hibachi steak to sushi and cocktails, choose your London
            Benihana and let the celebration begin.
          </p>
        </div>

        {/* Cards Section */}
        {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">

         
          <a
            href="/locations/chelsea"
            className="group relative rounded-[32px] overflow-hidden shadow-lg transition-all duration-500"
          >
          
            <img
              src="https://www.benihanainternational.com/wp-content/uploads/2025/07/Chelsea-Hero-Shot.jpg"
              alt="Chelsea"
              className="w-full h-96 object-cover group-hover:scale-105 transition-all duration-700"
            />

           
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all duration-300"></div>

          
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent"></div>

          
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">

           
              <h3 className="
                text-2xl md:text-3xl 
                uppercase font-extrabold tracking-wide 
                absolute top-6 left-1/2 -translate-x-1/2
              ">
                Chelsea
              </h3>

              <p className="opacity-90 text-sm md:text-base mt-auto">
                West London
              </p>

              <span className="mt-3 inline-block bg-[#E41E26] text-white px-6 py-2 text-xs md:text-sm font-semibold tracking-widest rounded-full">
                Explore Chelsea
              </span>
            </div>
          </a>

         
          <a
            href="/locations/covent-garden"
            className="group relative rounded-[32px] overflow-hidden shadow-lg transition-all duration-500"
          >
            <img
              src="https://www.benihanainternational.com/wp-content/uploads/2025/07/CG-Ground-Floor.jpg"
              alt="Covent Garden"
              className="w-full h-96 object-cover group-hover:scale-105 transition-all duration-700"
            />

            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all duration-300"></div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent"></div>

            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">

            
              <h3 className="
                text-2xl md:text-3xl
                uppercase font-extrabold tracking-wide
                absolute top-6 left-1/2 -translate-x-1/2
              ">
                Covent Garden
              </h3>

              <p className="opacity-90 text-sm md:text-base mt-auto">
                Central London
              </p>

              <span className="mt-3 inline-block bg-[#E41E26] text-white px-6 py-2 text-xs md:text-sm font-semibold tracking-widest rounded-full">
                Covent Garden
              </span>
            </div>
          </a>

        </div> */}
      </div>
    </section>
  );
}
