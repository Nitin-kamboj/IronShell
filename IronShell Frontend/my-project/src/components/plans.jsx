
export function Plans(){
    {/* --- PRICING SECTION --- */}
      return <section className="bg-black py-24 px-6 ">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white uppercase">
              WAYS TO <span className="text-green-300 underline decoration-8 underline-offset-[12px]">JOIN US</span>
            </h2>
            <p className="text-zinc-500 mt-8 font-black tracking-[0.2em] uppercase text-sm">
              Choose your level of commitment
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Plan 1: Monthly */}
            <div className="group p-8 bg-zinc-900/50 border border-zinc-800 hover:border-green-300 transition-all duration-500 rounded-sm md:skew-x-[-3deg]">
              <div className="md:skew-x-[3deg]">
                <h2 className="text-2xl font-black text-white italic uppercase">Monthly</h2>
                <div className="mt-4 flex items-baseline">
                  <span className="text-6xl font-black text-green-300">$49</span>
                  <span className="text-zinc-500 ml-2 font-bold uppercase text-xs">/ Month</span>
                </div>
                <ul className="mt-10 space-y-5 text-zinc-400 font-bold uppercase text-sm">
                  <li className="flex items-center gap-3"><span className="text-green-300 text-xl">✔</span> Full Gym Access</li>
                  <li className="flex items-center gap-3"><span className="text-green-300 text-xl">✔</span> Locker Room & Showers</li>
                  <li className="flex items-center gap-3 text-zinc-700">✘ Personal Trainer</li>
                </ul>
                <button className="w-full mt-12 py-4 bg-zinc-800 text-white font-black uppercase tracking-widest hover:bg-green-300 hover:text-black transition-all">
                  Select Plan
                </button>
              </div>
            </div>

            {/* Plan 2: Yearly (Featured) */}
            <div className="relative p-10 bg-zinc-800 border-2 border-green-300 lg:scale-110 shadow-[0_0_50px_rgba(187,247,208,0.15)] z-20">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-300 text-black px-6 py-1 text-xs font-black uppercase tracking-widest">
                Best Value
              </div>
              <h2 className="text-3xl font-black text-white italic uppercase">Yearly</h2>
              <div className="mt-4 flex items-baseline">
                <span className="text-7xl font-black text-green-300">$399</span>
                <span className="text-zinc-500 ml-2 font-bold uppercase text-xs">/ Year</span>
              </div>
              <ul className="mt-10 space-y-5 text-zinc-200 font-black uppercase text-sm">
                <li className="flex items-center gap-3"><span className="text-green-300 text-xl">✔</span> Everything in Monthly</li>
                <li className="flex items-center gap-3"><span className="text-green-300 text-xl">✔</span> 2 Personal Training Sessions</li>
                <li className="flex items-center gap-3"><span className="text-green-300 text-xl">✔</span> Nutrition Guide</li>
              </ul>
              <button className="w-full mt-12 py-5 bg-green-300 text-black font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-green-300/20">
                Start Training
              </button>
            </div>

            {/* Plan 3: Half-Yearly */}
            <div className="group p-8 bg-zinc-900/50 border border-zinc-800 hover:border-green-300 transition-all duration-500 rounded-sm md:skew-x-[3deg]">
              <div className="md:skew-x-[-3deg]">
                <h2 className="text-2xl font-black text-white italic uppercase">6-Month</h2>
                <div className="mt-4 flex items-baseline">
                  <span className="text-6xl font-black text-green-300">$240</span>
                  <span className="text-zinc-500 ml-2 font-bold uppercase text-xs">/ 6 Mo</span>
                </div>
                <ul className="mt-10 space-y-5 text-zinc-400 font-bold uppercase text-sm">
                  <li className="flex items-center gap-3"><span className="text-green-300 text-xl">✔</span> Full Gym Access</li>
                  <li className="flex items-center gap-3"><span className="text-green-300 text-xl">✔</span> 1 PT Session</li>
                  <li className="flex items-center gap-3 text-zinc-700">✘ Free Supplements</li>
                </ul>
                <button className="w-full mt-12 py-4 bg-zinc-800 text-white font-black uppercase tracking-widest hover:bg-green-300 hover:text-black transition-all">
                  Select Plan
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
}