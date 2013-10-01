class User < ActiveRecord::Base
	acts_as_gmappable, :check_process => false
	include Gravtastic
  	gravtastic

	attr_accessible :email, :gmaps, :latitude, :longitude, :name, :url, :location, :time_offset

	validates :name, presence: true
	validates :email, presence: true
	validates :url, presence: true
	validates :location, presence: true
	validates :time_offset, presence: true

	def gmaps4rails_address
	  "#{self.location}" 
	end
	def gmaps4rails_infowindow
		"<a href='#{self.url}'><img src='#{self.gravatar_url}'></a><br><span class='time' data-offset='#{self.time_offset}'></span><br><a href='#{self.url}'>#{self.name}</a>"
	end
end
