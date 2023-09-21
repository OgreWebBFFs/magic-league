require 'open-uri'
require 'rmagick'
require 'enumerator'

include Magick

module DraffleImgHelper

  ROW_LENGTH = 5

  def build_prize_pool_img prizes
    compiled_img = ImageList.new
    prizes.each_slice(ROW_LENGTH) do |prize_row|
      img_row = ImageList.new
      prize_row.each do |prize|
        blob_img = URI.open(prize.image).read
        img = Image.from_blob(blob_img).first
        if prize.foiled
          foil = Image.read("./app/javascript/images/foil_indicator.png").first
          img = img.composite(foil, CenterGravity, OverCompositeOp)
        end
        img_row.push(img)
      end
      compiled_img.push(img_row.append(false))
    end
    compiled_img.append(true).write("test.png")
  end
end