class AddBackImageUrlToCards < ActiveRecord::Migration[6.1]
  def change
    add_column :cards, :back_image_url, :string
  end
end
