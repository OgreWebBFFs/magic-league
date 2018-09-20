# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#

pat = User.find_or_create_by(email: "patrickwroach@gmail.com", name: "Pat Roach")
pat.password = '12345678'
pat.save!
