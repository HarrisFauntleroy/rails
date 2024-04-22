require 'rails_helper'

RSpec.describe UserHelper, type: :helper do
  describe '#formatted_date' do
    it 'formats the datetime to a specific string format' do
      datetime = DateTime.new(2023, 4, 1, 14, 30)
      expect(helper.formatted_date(datetime)).to eq('01 Apr 2023 at 02:30 PM')
    end
  end

  describe '#truncated_content' do
    it 'truncates content to the specified length' do
      content = 'This is a long sentence that will be truncated.'
      expect(helper.truncated_content(content, length: 10)).to eq('This is...')
    end
  end
end
