module ApplicationHelper

  BGARR = ["Aurelia-Exemplar-of-Justice-Guilds-of-Ravnica-MtG-Art.jpg", "Boros-Guildgate-3-Guilds-of-Ravnica-MtG-Art.jpg", "Boros-Guildgate-Guilds-of-Ravnica-MtG-Art.jpg", "Citywatch-Sphinx-Guilds-of-Ravnica-MtG-Art.jpg", "Conclave-Guildmage-Guilds-of-Ravnica-MtG-Art.jpg", "Dimir-Guildgate-Guilds-of-Ravnica-MtG-Art.jpg", "Doom-Whisperer-Guilds-of-Ravnica-MtG-Art.jpg", "Dream-Eater-Guilds-of-Ravnica-MtG-Art.jpg", 
  "Find-Guilds-of-Ravnica-MtG-Art.jpg", 
  "Generous-Stray-Guilds-of-Ravnica-MtG-Art.jpg", "Hatchery-Spider-Guilds-of-Ravnica-MtG-Art.jpg", "Healers-Hawk-Guilds-of-Ravnica-MtG-Art.jpg", "Hypothesizzle-Guilds-of-Ravnica-MtG-Art.jpg", "Integrity-Guilds-of-Ravnica-MtG-Art.jpg", "Intervention-Guilds-of-Ravnica-MtG-Art.jpg", "Izzet-Guildgate-Guilds-of-Ravnica-MtG-Art.jpg", 
  "Knight-of-Autumn.jpg", "League-Guildmage-Guilds-of-Ravnica-MtG-Art.jpg", "Maximize-Velocity-Guilds-of-Ravnica-MtG-Art.jpg", "Midnight-Reaper-Guilds-of-Ravnica-MtG-Art.jpg", "Mission-Briefing-Guilds-of-Ravnica-MtG-Art.jpg", "Molderhulk-Guilds-of-Ravnica-MtG-Art.jpg", "Nightveil-Predator-Guilds-of-Ravnica-MtG-Art.jpg", "Niv-Mizzet-Parun-Guilds-of-Ravnica-MtG-Art.jpg", "Selesnya-Guildgate-Guilds-of-Ravnica-MtG-Art.jpg", "Whispering-Snitch-Guilds-of-Ravnica-MtG-Art.jpg"]

  def get_random_bg_image
    image_path BGARR[rand(0..BGARR.length)]
  end
end
