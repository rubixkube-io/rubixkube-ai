import { DISCORD_URL, FOUNDER } from '../content'

export function Founder() {
  const [first, second] = FOUNDER.letter
  return (
    <section className="founder" id="founder">
      <div className="ftext">
        <h2>
          Built in the open.<span>With the people on call.</span>
        </h2>
        <p>{first}</p>
        <p>
          {second}{' '}
          <a href={DISCORD_URL} rel="noopener">
            Discord
          </a>
          .{FOUNDER.letterEnd}
        </p>
        <p className="sig">
          <b>{FOUNDER.name}</b>
          {FOUNDER.role}
        </p>
      </div>
      <div className="fphoto" role="img" aria-label={FOUNDER.photoAlt} />
    </section>
  )
}
