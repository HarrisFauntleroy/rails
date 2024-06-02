# frozen_string_literal: true

class User < ApplicationRecord
  include UserValidations
  include UserRelationships
  include UserScopes

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
