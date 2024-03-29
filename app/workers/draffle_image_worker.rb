require 'open-uri'
require 'rmagick'
require 'enumerator'

include Magick

class DraffleImageWorker

  ROW_LENGTH = 7

  def initialize draffle
    @draffle = draffle
    @prize_grid = draffle.draffle_prizes.each_slice(ROW_LENGTH).to_a
    @cleanup = Array.new
  end

  def draw_current_draft_board
    @draffle.update(status: 'processing')
    grid_img = draw_card_grid
    @draffle.board.filled_slots.each do |slot|
      selection_overlay = draw_selection_overlay slot
      selection_overlay.draw(grid_img)
    end
    upload_image grid_img
  end

  def draw_selection selection
    @draffle.update(status: 'processing')
    @draffle.draffle_img.blob.open do |tmpfile|
      tmp_blob = File.open(tmpfile).read
      new_img = Image.from_blob(tmp_blob).first
      selection_overlay = draw_selection_overlay selection
      selection_overlay.draw(new_img)
      upload_image new_img
    end
  end
  
  private 

  def draw_card_grid
    foil = Image.read("./app/javascript/images/foil_indicator.png").first
    @cleanup.push(foil)
    compiled_img = ImageList.new
    rows = 0
    @prize_grid.each do |prize_row|
      img_row = ImageList.new
      prize_row.each do |prize|
        blob_img = URI.open(prize.image).read
        img = Image.from_blob(blob_img).first
        if prize.foiled
          img = img.composite(foil, CenterGravity, OverCompositeOp)
        end
        img = img.resize_to_fit(373, 520)
        img_row.push(img)
        @cleanup.push(img)
        rows = rows + 1
      end
      @cleanup.push(img_row)
      compiled_img.push(img_row.append(false))
    end
    @cleanup.push(compiled_img)
    compiled_img.append(true)
  end

  def draw_selection_overlay selection
    pick_num = selection.pick_num
    pick_name = selection.user.name.gsub(/[^\u{0000}-\u{007F}]/, "").truncate(25)
    x = get_prize_x selection.prize
    y = get_prize_y selection.prize
    pen = Draw.new
    pen.stroke '#5c1009'
    pen.stroke_width 10
    pen.fill '#5c1009'
    pen.fill_opacity 0.8
    pen.rectangle 372*x, 520*y, 372*(x + 1), 520*(y+1)

    pen.stroke 'white'
    pen.stroke_width 0
    pen.fill 'white'
    pen.font_family('helvetica')
    pen.font_weight(NormalWeight)
    pen.pointsize(24)
    pen.font_style(NormalStyle)
  
    pen.text_align CenterAlign
    pen.text 372*(x + 0.5), 520*(y + 0.5), "Pick ##{pick_num}\nBy: #{pick_name}"
    pen
  end

  def get_prize_x prize
    @prize_grid.find { |row| row.include? prize }.index prize
  end

  def get_prize_y prize
    @prize_grid.index { |row| row.include? prize }
  end

  def upload_image img
    filename = "#{@draffle.name.parameterize(separator: "_")}_img[#{@draffle.board.filled_slots.length}].png"
    @draffle.draffle_img.purge
    @draffle.draffle_img.attach(io: StringIO.new(img.to_blob), filename: filename, content_type: 'image/png')
    @cleanup.each do |trash|
      trash.destroy!
    end
    @draffle.update(status: 'started')
    @draffle.progress_draft
    GC.start
  end
end