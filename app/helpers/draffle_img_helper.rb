require 'open-uri'
require 'rmagick'
require 'enumerator'

include Magick

module DraffleImgHelper

  ROW_LENGTH = 5

  def build_prize_pool_img prizes
    compiled_img = ImageList.new
    rows = 0
    prizes.each_slice(ROW_LENGTH) do |prize_row|
      img_row = ImageList.new
      prize_row.each do |prize|
        blob_img = URI.open(prize.image).read
        img = Image.from_blob(blob_img).first
        if prize.foiled
          foil = Image.read("./app/javascript/images/foil_indicator.png").first
          img = img.composite(foil, CenterGravity, OverCompositeOp)
        end
        img = img.resize_to_fit(373, 520)
        img_row.push(img)
        rows = rows + 1
      end
      compiled_img.push(img_row.append(false))
    end
    compiled_img = compiled_img.append(true)
    gc = Draw.new
    gc.stroke '#5c1009'
    gc.stroke_width 10
    gc.fill 'black'
    gc.fill_opacity 0.8
    gc.rectangle 372, 520, 744, 1040
    gc.draw(compiled_img)
    compiled_img.write("test.png")
  end
end