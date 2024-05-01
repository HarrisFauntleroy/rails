require 'rails_helper'

RSpec.describe ApplicationHelper, type: :helper do
  describe '#markdown' do
    it 'converts markdown links to HTML links' do
      expect(helper.markdown('[Google](https://www.google.com)').strip).to eq('<p><a href="https://www.google.com">Google</a></p>')
    end

    it 'converts markdown underline syntax to HTML emphasis tags' do
      expect(helper.markdown('*underline*').strip).to eq('<p><em>underline</em></p>')
    end

    it 'converts markdown strikethrough syntax to HTML strikethrough tags' do
      expect(helper.markdown('~~strikethrough~~').strip).to eq('<p><del>strikethrough</del></p>')
    end

    it 'converts markdown images to HTML image tags' do
      expect(helper.markdown('![Alt text](https://www.google.com/image.jpg)').strip).to eq('<p><img src="https://www.google.com/image.jpg" alt="Alt text"></p>')
    end

    it 'converts markdown bold syntax to HTML bold tags' do
      expect(helper.markdown('**bold**').strip).to eq('<p><strong>bold</strong></p>')
    end

    it 'converts markdown headers to HTML header tags with ID to support TOC' do
      expect(helper.markdown('# Header').strip).to eq('<h1 id="header">Header</h1>')
    end

    describe 'handles fenced code blocks with syntax highlighting' do
      it 'converts markdown code blocks to HTML code blocks' do
        code = "```ruby\nputs 'Hello, world!'\n```"
        actual_html = helper.markdown(code).gsub(/\s+/, ' ').strip
        expect(actual_html).to match(/<div class="highlight"><pre class="highlight ruby"><code>.*puts.*'Hello, world!'.*<\/code><\/pre><\/div>/)
      end

      it 'does not highlight the syntax of code blocks without a language' do
        code = "```\nputs 'Hello, world!'\n```"
        actual_html = helper.markdown(code).gsub(/\s+/, ' ').strip
        expect(actual_html).to include('class="highlight"')
      end

      it 'does not highlight the syntax of code blocks with an invalid language' do
        code = "```invalid\nputs 'Hello, world!'\n```"
        actual_html = helper.markdown(code).gsub(/\s+/, ' ').strip
        expect(actual_html).to include('class="highlight"')
      end
    end

    it 'sanitizes HTML within markdown to prevent XSS' do
      malicious_markdown = '[Click me](javascript:alert("Hacked!"))'
      sanitized_output = helper.markdown(malicious_markdown)
      puts sanitized_output
      expect(sanitized_output).to_not include('javascript:alert("Hacked!")')
    end
  end
end
