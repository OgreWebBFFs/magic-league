require 'open-uri'
require 'rmagick'
require 'enumerator'

include Magick

module DraffleImgHelper

  ROW_LENGTH = 5

  def build_prize_pool_img prizes
    compiled_img = ImageList.new
    rows = 0
    prizes.sort_by(&:id).each_slice(ROW_LENGTH) do |prize_row|
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
    compiled_img.write("draffle.png")
  end

  def update_prize_pool_img prizes
    all_prizes = prizes.sort_by(&:id)
    picked_prizes = all_prizes.reject{ |prize| prize.draffle_participant_id.nil? }
    last_picked_prize = picked_prizes.sort_by(&:updated_at).last

    pick_number = picked_prizes.length
    picker_name = last_picked_prize.draffle_participant.user.name
    i = all_prizes.index last_picked_prize

    x = i % ROW_LENGTH
    y = (i / ROW_LENGTH).floor

    puts "Coordinates: #{i} = #{x}, #{y}"

    new_img = Image.read('./draffle.png').first
    gc = Draw.new
    gc.stroke '#5c1009'
    gc.stroke_width 10
    gc.fill '#5c1009'
    gc.fill_opacity 0.8
    gc.rectangle 372*x, 520*y, 372*(x + 1), 520*(y+1)

    gc.stroke 'white'
    gc.stroke_width 0
    gc.fill 'white'
    gc.font_family('helvetica')
    gc.font_weight(NormalWeight)
    gc.pointsize(24)
    gc.font_style(NormalStyle)
  
    gc.text_align CenterAlign
    gc.text 372*(x + 0.5), 520*(y + 0.5), "Pick ##{pick_number}\nBy: #{picker_name}"

    gc.draw(new_img)
    new_img.write("draffle.png")

  end

end