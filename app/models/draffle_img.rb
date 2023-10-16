require 'open-uri'
require 'rmagick'
require 'enumerator'

include Magick

class DraffleImg

  ROW_LENGTH = 7

  def initialize draffle
    @draffle = draffle
    @prize_grid = draffle.draffle_prizes.sort_by{ |prize| [prize.name, prize.id] }.each_slice(ROW_LENGTH).to_a
    if !File.exists?("./draffle_base.png")
      draw_card_grid
    end
  end

  def self.reset
    FileUtils.rm "./draffle_base.png", :force => true
  end

  def build_current_draft_board 
    clear_board
    @draffle.board.filled_slots.each do |slot|
      draw_selection slot
    end
  end
  
  private 

  def clear_board
    FileUtils.cp("./draffle_base.png", "./draffle.png")
  end

  def draw_selection selection
    pick_num = selection.pick_num
    pick_name = selection.user.name
    x = get_prize_x selection.prize
    y = get_prize_y selection.prize
    draw_selection_overlay x, y, pick_num, pick_name
  end

  def draw_card_grid
    compiled_img = ImageList.new
    rows = 0
    @prize_grid.each do |prize_row|
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
    compiled_img.write("draffle_base.png")
  end

  def draw_selection_overlay (x, y, pick_num, pick_name)
    parsed_pick_name = pick_name.gsub(/[^\u{0000}-\u{007F}]/, "").truncate(25)
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
    gc.text 372*(x + 0.5), 520*(y + 0.5), "Pick ##{pick_num}\nBy: #{parsed_pick_name}"

    gc.draw(new_img)
    new_img.write("draffle.png")
  end

  def get_prize_x prize
    @prize_grid.find { |row| row.include? prize }.index prize
  end

  def get_prize_y prize
    @prize_grid.index { |row| row.include? prize }
  end

end