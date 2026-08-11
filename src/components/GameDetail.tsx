import { useState } from "react";
import TrailerPlayer from "./TrailerPlayer";
import type { Game } from "../data/games";

type Props = { game: Game };

export default function GameDetail({ game }: Props) {
  const [shot, setShot] = useState(0);

  return (
    <div className="pb-24">
      <section className="relative min-h-[70vh] overflow-hidden pt-24">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(3,3,6,0.55), #030306), url(${game.header})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[280px_1fr] md:px-8 lg:grid-cols-[320px_1fr]">
          <img
            src={game.cover}
            alt={`${game.shortTitle} cover`}
            className="mx-auto w-56 border border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.6)] md:mx-0 md:w-full"
          />
          <div>
            <p className="font-display text-xs tracking-[0.35em] uppercase" style={{ color: game.accent }}>
              {game.status} · {game.releaseDate}
            </p>
            <h1 className="mt-3 font-display text-4xl tracking-[0.08em] text-bone md:text-6xl">
              {game.shortTitle}
            </h1>
            <p className="mt-3 font-serif text-xl text-mute">{game.subtitle}</p>
            <p className="mt-6 max-w-2xl font-serif leading-relaxed text-bone/90">{game.blurb}</p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { k: "Protagonist", v: game.protagonist },
                { k: "Setting", v: game.setting },
                { k: "Price", v: game.priceUsd },
                {
                  k: "Reviews",
                  v:
                    game.reviewPct != null
                      ? `${game.reviewLabel} · ${game.reviewPct}% (${game.reviewCount})`
                      : game.reviewLabel,
                },
                { k: "Developer", v: game.developers.join(", ") },
                { k: "Publisher", v: game.publishers.join(", ") },
              ].map((row) => (
                <div key={row.k} className="border-t border-white/10 pt-3">
                  <dt className="font-display text-[10px] tracking-[0.25em] uppercase text-neon">
                    {row.k}
                  </dt>
                  <dd className="mt-1 font-serif text-sm text-bone">{row.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={game.href}
                target="_blank"
                rel="noreferrer"
                className="border border-phoenix bg-phoenix px-6 py-3 font-display text-xs tracking-[0.25em] uppercase text-void transition hover:bg-ember"
              >
                {game.comingSoon ? "Wishlist on Steam" : "View on Steam"}
              </a>
              <a
                href="/#games"
                className="border border-white/20 px-6 py-3 font-display text-xs tracking-[0.25em] uppercase text-bone transition hover:border-neon hover:text-neon"
              >
                All Titles
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[...game.genres, ...game.tags].map((t) => (
                <span
                  key={t}
                  className="border border-white/15 px-2.5 py-1 font-display text-[10px] tracking-[0.16em] uppercase text-mute"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 md:px-8">
        <div>
          <h2 className="font-display text-sm tracking-[0.3em] uppercase text-neon">Trailer</h2>
          <div className="mt-4">
            <TrailerPlayer
              src={game.trailer.hls}
              poster={game.trailer.thumbnail}
              title={game.trailer.name}
              accent={game.accent}
            />
          </div>
        </div>
        <div>
          <h2 className="font-display text-sm tracking-[0.3em] uppercase text-neon">Systems</h2>
          <ul className="mt-4 space-y-3">
            {game.features.map((f) => (
              <li key={f} className="flex gap-3 border-b border-white/10 pb-3 font-serif text-bone/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: game.accent }} />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3 font-display text-[10px] tracking-[0.2em] uppercase text-mute">
            {game.platforms.windows && <span className="border border-white/15 px-2 py-1">Windows</span>}
            {game.platforms.mac && <span className="border border-white/15 px-2 py-1">macOS</span>}
            {game.platforms.linux && <span className="border border-white/15 px-2 py-1">Linux</span>}
            {game.achievements != null && (
              <span className="border border-white/15 px-2 py-1">{game.achievements} Achievements</span>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
        <h2 className="font-display text-sm tracking-[0.3em] uppercase text-neon">Screenshots</h2>
        <div className="mt-4 overflow-hidden border border-white/10">
          <img
            src={game.screenshots[shot]?.full}
            alt={`${game.shortTitle} screenshot ${shot + 1}`}
            className="aspect-video w-full object-cover"
          />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {game.screenshots.map((s, i) => (
            <button
              key={s.full}
              type="button"
              onClick={() => setShot(i)}
              className={`h-16 w-28 shrink-0 overflow-hidden border ${
                i === shot ? "border-neon" : "border-white/15 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={s.thumb} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
