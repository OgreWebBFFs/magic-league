module ApplicationHelper

  BGARR = ["bg-Unbridled-Growth.jpg", "bg-Llanowar-Envoy-Dominaria-MtG-Art.jpg", "bg-Ancient-Hellkite-MtG-Art-1024x640.jpg", "bg-Slinn-Voda-the-Rising-Deep-Dominaria-MtG-Art.jpg", "bg-Traxos-Scourge-of-Kroog-Dominaria-MtG-Art.jpg", "bg-Mana-Charged-Dragon-MtG-Art.jpg"]

  def get_random_bg_image
    image_path BGARR[rand(0..5)]
  end
end
