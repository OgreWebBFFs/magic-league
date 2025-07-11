json.extract! wiki, :id, :title, :content, :slug, :children, :created_at, :updated_at
json.url wiki_url(wiki, format: :json)
