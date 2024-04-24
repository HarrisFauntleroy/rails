# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

user = User.create!(email: 'admin@example.com', password: 'Password!1', admin: true, moderator: true,
                    username: 'Testington')

# Create category groups
category_groups = [
  { name: 'Chatting and Socializing (Restricted Access)', user_id: user.id },
  { name: 'Science and Technology (Restricted Access)', user_id: user.id },
  { name: 'Site Discussion and Utilities (Restricted Access)', user_id: user.id }
]

category_groups.each do |group_attributes|
  CategoryGroup.create!(group_attributes)
end

forums_data = [
  { name: 'General Chatting',
    description: 'Want to chat about something not covered by any of the other boards? This is the place to do it. Please remember that most of the site rules still apply here.', user_id: user.id, category_group: CategoryGroup.find_by(name: 'Chatting and Socializing (Restricted Access)') },
  { name: 'Sale and Trade',
    description: 'This board is for the sale and trade of items related to *any* area of science. You can sell items here, or announce an ebay, amazon, etc. auction.', user_id: user.id, category_group: CategoryGroup.find_by(name: 'Chatting and Socializing (Restricted Access)') },
  { name: 'General Science and Electronics',
    description: "This board is for anything that doesn't fit the categories below, but still falls under the realm of science or electronics.", user_id: user.id, category_group: CategoryGroup.find_by(name: 'Science and Technology (Restricted Access)') },
  { name: 'High Voltage',
    description: "Post here regarding high voltage. This includes Marx generators, cascades, flybacks, and more. Please use the 'Tesla coil' forum for Tesla coils.", user_id: user.id, category_group: CategoryGroup.find_by(name: 'Science and Technology (Restricted Access)') },
  { name: 'Tesla Coils',
    description: 'This is the dedicated Tesla coil board. If it has to do with Tesla coils, post it here. Air-cored resonant transformers only, please!', user_id: user.id, category_group: CategoryGroup.find_by(name: 'Science and Technology (Restricted Access)') },
  { name: 'Electromagnetic Radiation',
    description: 'This group of boards is for anything having to do with electromagnetic radiation. This would include RF energy, HERF, EMP, lighting, and optics.', user_id: user.id, category_group: CategoryGroup.find_by(name: 'Science and Technology (Restricted Access)') },
  { name: 'Electromagnetic Projectile Accelerators',
    description: 'This board is for devices that use electromagnetic energy to accelerate a projectile. Rail guns and coil guns welcome!', user_id: user.id, category_group: CategoryGroup.find_by(name: 'Science and Technology (Restricted Access)') },
  { name: 'Chemistry',
    description: 'Everything chemistry-related goes here, including pyrotechnics, endothermic and exothermic reactions, combustion, and decomposition. Note that illegal explosives are not an acceptable topic of discussion.', user_id: user.id, category_group: CategoryGroup.find_by(name: 'Science and Technology (Restricted Access)') },
  { name: 'Computer Science',
    description: 'This is where to post everything computer-related, such as hardware, software, and programming. PICs and BASIC Stamps welcome!', user_id: user.id, category_group: CategoryGroup.find_by(name: 'Science and Technology (Restricted Access)') },
  { name: 'Projects',
    description: 'This is a place where members can showcase their latest projects. Check here to see what new and exciting things our members have been working on!', user_id: user.id, category_group: CategoryGroup.find_by(name: 'Science and Technology (Restricted Access)') },
  { name: 'HvWiki Discussion',
    description: 'Discuss the HvWiki here. Coordinate your efforts with others, or point out interesting articles. If you have a question about the wiki, or would like to register, use this board.', user_id: user.id, category_group: CategoryGroup.find_by(name: 'Site Discussion and Utilities (Restricted Access)') },
  { name: 'Attachments',
    description: "This is the place to post attachments that you'd like to include in other threads. Remember, images and files uploaded to this section are for use on the forum only!", user_id: user.id, category_group: CategoryGroup.find_by(name: 'Site Discussion and Utilities (Restricted Access)') },
  { name: 'Suggestion Box',
    description: "Your opinion matters. No, really! If you would like to see something changed, or you just have a suggestion, post it here. We'll talk about it, and you just may change things for the better!", user_id: user.id, category_group: CategoryGroup.find_by(name: 'Site Discussion and Utilities (Restricted Access)') },
  { name: 'Archive Discussion',
    description: 'This board is for pointing out good threads that are found in the archives, located at Link2 and Link2 Please remember, this board is for archive-related discussion only! For actual discussion of the topics, use one of the other boards.', user_id: user.id, category_group: CategoryGroup.find_by(name: 'Site Discussion and Utilities (Restricted Access)') }
]

forums_data.each do |forum_attributes|
  Forum.create!(forum_attributes)
end
